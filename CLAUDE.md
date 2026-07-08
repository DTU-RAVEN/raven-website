# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm i            # install deps
npm run dev      # dev server on http://localhost:8080 (host "::" — port set in vite.config.ts, NOT Vite's default 5173)
npm run build    # production build to ./dist
npm run build:dev # build with development mode/sourcemaps
npm run lint     # eslint over the repo
npm run preview  # serve the built ./dist locally
```

There is **no test framework** configured — no `npm test`, no test runner. Verify changes by running `npm run dev` and exercising the page.

Both `bun.lockb` and `package-lock.json` are committed; npm is the documented workflow.

## Architecture

Single-page marketing/content site for the DTU RAVEN student team. Vite + React 18 + TypeScript, shadcn/ui (Radix primitives) + Tailwind. There is no backend and no data fetching from a server — all content is static JSON bundled at build time.

**Routing uses `HashRouter`, not `BrowserRouter`** (see `src/App.tsx`). URLs look like `/#/join`. This is deliberate so the site can be served as static files (Dokploy/Nixpacks/Nginx, publish dir `./dist`) without server-side rewrite rules. Add new routes in `App.tsx` above the catch-all `*` route; pages are lazy-loaded via `React.lazy`.

**Content lives in `src/data/`, not in components:**
- `team-members.json` and `sponsors.json` — edited directly; see `src/data/README.md` for the non-technical editing guide (this file is written for non-coders, keep it accurate if you change the JSON shapes).
- `src/data/news/*.json` — one file per news article. Articles are discovered automatically at runtime via `import.meta.glob('../data/news/*.json')` in `src/components/NewsArticleList.tsx`. **The article `id` (and its `/news/:id` URL) is the filename without `.json`.** To add an article, drop a new JSON file in that folder matching the `Article` shape (`src/types/Article.ts`: `title`, `date`, `image`, `content`, optional `excerpt`); no code changes or registration needed.
- Images referenced from JSON live in `public/` and are referenced with a leading slash (e.g. `/Pictures/foo.jpg`).

**Styling has two parallel systems** — be aware of which one a component uses:
1. A bespoke design system in `src/index.css` (~1500 lines) built on CSS custom properties like `--crimson`, `--paper`, `--ink`, `--teal`, plus utility classes (`.wrap`, `.eyebrow`, `.mono`, `.sec-head`, `.news-grid`, etc.). Most page/section components use these hand-written classes.
2. Tailwind + shadcn/ui HSL theme variables (also in `src/index.css`, under `@layer base`), used by the `src/components/ui/*` primitives.

New feature UI generally follows system #1 (the hand-rolled classes); the shadcn `ui/` components are the base library for dialogs, forms, toasts, etc.

**Autoplay background videos** (`Hero.tsx`, `Project.tsx`): browsers only autoplay genuinely-muted videos, and React does not reliably reflect the `muted` prop to the DOM. `Hero.tsx` works around this with a ref that sets `video.muted = true` and calls `.play()` on mount — replicate that pattern for any new autoplay video rather than relying on the `muted` JSX attribute alone.

## Conventions

- Path alias `@/` → `src/` (configured in both `vite.config.ts` and `tsconfig`).
- TypeScript is configured **loosely**: `strict: false`, `strictNullChecks: false`, `noImplicitAny: false`, unused-vars checks off. Don't assume strict-mode guarantees.
- `manualChunks` in `vite.config.ts` splits vendor bundles (`vendor-react`, `vendor-ui`, `vendor-utils`). If you add a heavy dependency, consider whether it belongs in a chunk.
- SEO/meta per page is handled with `react-helmet-async` via the `MetaTags` component; `@vercel/analytics` is wired in.
- Application/contact emails are generated through `src/lib/mailto.ts` (`createApplicationMailto`) — reuse it rather than hand-building `mailto:` links.

## Deployment

Static build deployed via Dokploy using Git + Nixpacks; publish directory `./dist`, port 80. A Dockerfile (build + Nginx serve) is an alternative. See `README.md`.
