import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./chat.module.css";
import {
  ChatMessage,
  ConversationSummary,
  getConversation,
  listConversations,
  login as apiLogin,
  register as apiRegister,
  streamChat,
} from "@/lib/assistantApi";

const TOKEN_KEY = "raven_assistant_token";

export default function ChatClient() {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  // Restore session on load (client-only; localStorage is fine on Vercel).
  useEffect(() => {
    setToken(localStorage.getItem(TOKEN_KEY));
    setReady(true);
  }, []);

  const handleAuthed = useCallback((t: string) => {
    localStorage.setItem(TOKEN_KEY, t);
    setToken(t);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }, []);

  if (!ready) return null;
  if (!token) return <AuthScreen onAuthed={handleAuthed} />;
  return <Chat token={token} onLogout={handleLogout} />;
}

/* ─── Auth ──────────────────────────────────────────────────────────────── */
function AuthScreen({ onAuthed }: { onAuthed: (t: string) => void }) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tenant, setTenant] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setBusy(true);
    setError(null);
    try {
      const t =
        mode === "login"
          ? await apiLogin(email, password)
          : await apiRegister(email, password, tenant || "My workspace");
      onAuthed(t);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.auth}>
        <div className={styles.authTitle}>
          {mode === "login" ? "Sign in" : "Create workspace"}
        </div>
        <div className={styles.authSub}>Raven Assistant</div>

        {mode === "register" && (
          <div className={styles.field}>
            <label className={styles.label}>Workspace name</label>
            <input
              className={styles.authInput}
              value={tenant}
              onChange={(e) => setTenant(e.target.value)}
              placeholder="DTU Raven"
            />
          </div>
        )}
        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.authInput}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Password</label>
          <input
            className={styles.authInput}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />
        </div>

        {error && <div className={styles.errorBar}>{error}</div>}

        <button className={styles.authBtn} onClick={submit} disabled={busy}>
          {busy ? "…" : mode === "login" ? "Sign in" : "Create workspace"}
        </button>
        <button
          className={styles.authToggle}
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
            setError(null);
          }}
        >
          {mode === "login"
            ? "Need a workspace? Create one"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}

/* ─── Chat ──────────────────────────────────────────────────────────────── */
function Chat({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const refreshConversations = useCallback(async () => {
    try {
      setConversations(await listConversations(token));
    } catch {
      /* non-fatal */
    }
  }, [token]);

  useEffect(() => {
    refreshConversations();
  }, [refreshConversations]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  async function openConversation(id: string) {
    setActiveId(id);
    setError(null);
    try {
      const conv = await getConversation(token, id);
      setMessages(conv.messages.map((m) => ({ role: m.role, content: m.content })));
    } catch {
      setError("Couldn't load that conversation.");
    }
  }

  function newChat() {
    setActiveId(null);
    setMessages([]);
    setError(null);
  }

  async function send() {
    const text = input.trim();
    if (!text || streaming) return;
    setInput("");
    setError(null);
    setStreaming(true);

    // Optimistically show the user's message, plus an empty assistant slot.
    setMessages((m) => [
      ...m,
      { role: "user", content: text },
      { role: "assistant", content: "" },
    ]);

    let capturedId: string | null = activeId;
    await streamChat(token, text, activeId, {
      onConversationId: (id) => {
        capturedId = id;
        if (!activeId) setActiveId(id);
      },
      onDelta: (delta) => {
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = {
            role: "assistant",
            content: copy[copy.length - 1].content + delta,
          };
          return copy;
        });
      },
      onError: (msg) => {
        setError(msg);
        setMessages((m) => m.slice(0, -1)); // drop the empty assistant slot
      },
      onDone: () => {
        setStreaming(false);
        // If this was the first turn, the conversation is new — refresh the list.
        if (!activeId && capturedId) refreshConversations();
      },
    });
    setStreaming(false);
  }

  return (
    <div className={styles.wrap}>
      <aside className={styles.sidebar}>
        <button className={styles.newChat} onClick={newChat}>
          + New chat
        </button>
        <div className={styles.convList}>
          {conversations.map((c) => (
            <button
              key={c.id}
              className={`${styles.convItem} ${
                c.id === activeId ? styles.convItemActive : ""
              }`}
              onClick={() => openConversation(c.id)}
              title={c.title}
            >
              {c.title}
            </button>
          ))}
        </div>
        <div className={styles.sidebarFooter}>
          <button className={styles.logout} onClick={onLogout}>
            Sign out
          </button>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.messages} ref={scrollRef}>
          <div className={styles.thread}>
            {messages.length === 0 && (
              <div className={styles.empty}>
                <div className={styles.emptyTitle}>Raven Assistant</div>
                <div>Ask anything — your data stays in Denmark.</div>
              </div>
            )}
            {messages.map((m, i) => {
              const isUser = m.role === "user";
              const isLast = i === messages.length - 1;
              return (
                <div
                  key={i}
                  className={`${styles.row} ${isUser ? styles.rowUser : ""}`}
                >
                  <div
                    className={`${styles.bubble} ${
                      isUser ? styles.bubbleUser : styles.bubbleAssistant
                    }`}
                  >
                    {m.content}
                    {!isUser && isLast && streaming && (
                      <span className={styles.cursor} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.composer}>
          {error && <div className={styles.errorBar}>{error}</div>}
          <div className={styles.composerInner}>
            <textarea
              className={styles.input}
              value={input}
              rows={1}
              placeholder="Message Raven Assistant…"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
            />
            <button
              className={styles.send}
              onClick={send}
              disabled={streaming || !input.trim()}
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
