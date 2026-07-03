// Talks to the sovereign Raven Assistant backend. The base URL is set per-environment
// in Vercel (Project -> Settings -> Environment Variables -> VITE_API_BASE), e.g.
//   https://api.dturaven.com
const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:8000";

export type Role = "user" | "assistant" | "system";
export interface ChatMessage {
  role: Role;
  content: string;
}
export interface ConversationSummary {
  id: string;
  title: string;
  created_at: string;
}
export interface ConversationDetail extends ConversationSummary {
  messages: { role: Role; content: string; created_at: string }[];
}

async function jsonOrThrow(res: Response) {
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(detail || `Request failed (${res.status})`);
  }
  return res.json();
}

export async function register(
  email: string,
  password: string,
  tenantName: string,
): Promise<string> {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, tenant_name: tenantName }),
  });
  const data = await jsonOrThrow(res);
  return data.access_token as string;
}

export async function login(email: string, password: string): Promise<string> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await jsonOrThrow(res);
  return data.access_token as string;
}

export async function listConversations(
  token: string,
): Promise<ConversationSummary[]> {
  const res = await fetch(`${API_BASE}/conversations`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return jsonOrThrow(res);
}

export async function getConversation(
  token: string,
  id: string,
): Promise<ConversationDetail> {
  const res = await fetch(`${API_BASE}/conversations/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return jsonOrThrow(res);
}

interface StreamHandlers {
  onDelta: (text: string) => void;
  onConversationId: (id: string) => void;
  onDone: () => void;
  onError: (message: string) => void;
}

// The backend streams Server-Sent Events shaped like:  data: {json}\n\n
// EventSource can't be used because this is a POST with an auth header, so we
// read the response body stream manually and parse frames as they arrive.
export async function streamChat(
  token: string,
  message: string,
  conversationId: string | null,
  handlers: StreamHandlers,
): Promise<void> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message, conversation_id: conversationId }),
    });
  } catch {
    handlers.onError("Can't reach the assistant. Check your connection.");
    return;
  }

  if (!res.ok || !res.body) {
    const detail = await res.text().catch(() => "");
    handlers.onError(detail || `Request failed (${res.status})`);
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    // Frames are separated by a blank line.
    const frames = buffer.split("\n\n");
    buffer = frames.pop() ?? ""; // keep the trailing partial frame

    for (const frame of frames) {
      const line = frame.trim();
      if (!line.startsWith("data:")) continue;
      const payload = line.slice(line.indexOf(":") + 1).trim();
      if (!payload) continue;
      try {
        const evt = JSON.parse(payload);
        if (evt.error) {
          handlers.onError(evt.error);
          return;
        }
        if (evt.conversation_id) handlers.onConversationId(evt.conversation_id);
        if (evt.delta) handlers.onDelta(evt.delta);
        if (evt.done) {
          handlers.onDone();
          return;
        }
      } catch {
        // Ignore malformed frames rather than breaking the stream.
      }
    }
  }
  handlers.onDone();
}
