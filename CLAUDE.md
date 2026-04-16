# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check
```

No test suite configured.

## Architecture

**Agency website + admin panel.** Next.js App Router, React 19, TypeScript, Tailwind CSS 4.

### Routing

- `/` `/about` `/services` `/portfolio` `/blog` `/contact` — public pages
- `/admin` — login page
- `/admin/(dashboard)/*` — protected admin panel (route group)
- `/blog/[slug]` — dynamic blog post page
- `/api/*` — REST endpoints (GET/POST/PUT/DELETE)

### Auth

JWT in `xverse_admin_token` HTTP-only cookie (7-day expiry). Credentials checked against `ADMIN_EMAIL` / `ADMIN_PASSWORD` env vars — no user DB table. Admin routes call `isAuthenticated()` from `src/lib/auth.ts`. Token verified via `/api/auth/me`.

### Database Layer (`src/lib/database.ts`)

Dual-mode JSON store:

| Env | Storage | Details |
|-----|---------|---------|
| Local dev | `/data/db.json` | File system, lazy-loaded |
| Vercel | `@vercel/blob` (`xverse-db.json`) | CDN cache-bust on reads, in-memory request cache |

Single schema: `services`, `projects`, `teamMembers`, `testimonials`, `homepageContent`, `blogPosts`, `contactSubmissions`.

### API Pattern

All endpoints use `jsonResponse()` wrapper (adds no-cache headers). Mutations check `isAuthenticated()` first. No ORM — raw JSON read/write.

### Key `src/lib/` files

- `database.ts` — read/write abstraction (local + blob)
- `auth.ts` — `isAuthenticated()`, JWT helpers
- `api-utils.ts` — `jsonResponse()`, shared API helpers

### Styling

Tailwind CSS 4 via `@tailwindcss/postcss`. CSS variables in `src/app/globals.css` define the design system (dark theme, indigo/violet/cyan palette, Manrope font). Use CSS vars (`var(--color-primary)`) not hardcoded hex values.

### Environment Variables

```
JWT_SECRET=
ADMIN_EMAIL=
ADMIN_PASSWORD=
BLOB_READ_WRITE_TOKEN=  # Auto-set on Vercel; not needed locally
```

Copy `.env.example` to `.env.local` for local dev.
