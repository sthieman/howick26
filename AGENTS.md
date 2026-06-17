<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Howick 2026

Blog site for the **Brave Church** mission trip to Howick, South Africa
(July 2026). A public landing page (trip, team, ministry partners, photo
gallery) plus a team blog with public comments and likes, and a donate page
that links out to the team's existing giving page.

Built to mirror the **brave.org** brand so it can later be folded into the main
church website. brave.org runs on **Rock RMS** (ASP.NET) with a Bootstrap theme;
this is a standalone Next.js app that matches the brand at the **token** level
(see `DESIGN_TOKENS.md`) rather than the framework level.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — brand tokens in `src/app/globals.css` (`@theme`)
- **Supabase** — auth (single shared team login), Postgres (posts, comments,
  likes), Storage (gallery + cover images)
- Fonts via `next/font/google`: Oswald / Montserrat / Open Sans

## Architecture

```
src/
├── app/
│   ├── layout.tsx              # Fonts, <SiteHeader>/<SiteFooter>, metadata
│   ├── page.tsx                # Landing: hero, about, team, partners, gallery, latest posts
│   ├── globals.css             # Brave design tokens (see DESIGN_TOKENS.md)
│   ├── blog/
│   │   ├── page.tsx            # Published post list
│   │   └── [slug]/page.tsx     # Single post + likes + comments
│   ├── donate/page.tsx         # Info + outbound link to the team giving page
│   ├── login/page.tsx          # Shared team sign-in (client)
│   └── admin/                  # Team-only (gated by middleware)
│       ├── page.tsx            # Post dashboard
│       ├── new/page.tsx        # New-post form
│       └── actions.ts          # Server actions: createPost, signOut
├── components/
│   ├── SiteHeader.tsx / SiteFooter.tsx
│   ├── Button.tsx              # Brave .btn-primary signature
│   ├── Gallery.tsx
│   ├── LikeButton.tsx          # Client — anonymous, deduped likes
│   └── CommentsSection.tsx     # Client — public comment form + list
├── content/
│   └── trip.ts                 # Editable static content: trip facts, team, partners
├── lib/
│   ├── supabase/
│   │   ├── config.ts           # Env + isSupabaseConfigured() gate
│   │   ├── client.ts           # Browser client (Client Components)
│   │   ├── server.ts           # Server client (cookies; Server Components/Actions)
│   │   └── middleware.ts       # Session refresh + /admin guard
│   ├── data/                   # Server-only read layer
│   │   ├── posts.ts  comments.ts  likes.ts  gallery.ts
│   ├── types.ts                # DB row shapes (mirror supabase/schema.sql)
│   └── visitor.ts              # localStorage visitor id for like dedupe
├── proxy.ts                    # Next 16 proxy convention — wires updateSession()
supabase/
└── schema.sql                  # Tables, RLS, storage bucket — run on a new project
```

## Data model & access (RLS)

The full schema is `supabase/schema.sql`. `src/lib/types.ts` mirrors it — change
both together. Access model:

| Table | Public | Shared team account (`authenticated`) |
|---|---|---|
| `posts` | read **published** only | full CRUD; read drafts |
| `comments` | read + insert (on published posts) | delete (moderation) |
| `likes` | read + insert/delete own (by `visitor_id`) | — |
| `gallery_photos` | read | full CRUD |
| Storage `gallery` | read | upload/delete |

**Auth is a single shared login** — one Supabase Auth user for the whole team.
Any signed-in session can author. Likes are deduped per browser via a random
`visitor_id` in localStorage (`src/lib/visitor.ts`) — not identity, just
anti-spam.

## Module boundaries

- **`lib/data/*`**: `server-only` read functions. Each returns empty/null when
  Supabase isn't configured so the app renders before env is wired. Reads only —
  writes go through Server Actions (`app/admin/actions.ts`) or Client Components.
- **`lib/supabase/config.ts`**: the single place env is read. `isSupabaseConfigured()`
  is the graceful-degradation switch used across the data layer, middleware, and
  client widgets.
- **`content/trip.ts`**: human-owned static copy (trip/team/partners). Not in the
  DB by design — it changes rarely and isn't public-CMS content.
- **`components/*Button|Gallery`**: presentational. `LikeButton`/`CommentsSection`
  are the only Client Components that talk to Supabase directly (browser client).

## Design tokens

`DESIGN_TOKENS.md` is the source of truth; `globals.css` is the wired version.
All brand color/type comes from brave.org's `theme.css`. The free Google fonts
stand in for the licensed Draught / proxima-nova faces and can be swapped without
touching components. Don't hardcode hex values in components — use the token
utilities (`bg-brand`, `text-ink`, `border-line`, `font-display`, …).

## Running locally

```bash
npm install
cp .env.example .env.local   # fill in Supabase URL + anon key
npm run dev
```

The app runs **without** Supabase configured — pages render with empty data and
the login/like/comment widgets show a "connect Supabase" hint. To enable the
backend:

1. Create a Supabase project; put the URL + anon key in `.env.local`.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Create one Auth user (Authentication → Users) — these are the shared team
   credentials. Sign in at `/login`.

## Conventions

- **Verify before claiming done**: run `npx tsc --noEmit` and `npm run build`;
  don't report success on a non-zero exit.
- **Git**: feature branch + PR for non-trivial changes; doc-only edits may go to
  `main`. Never commit `.env.local` or any keys.
- **Design work**: this scaffold is intentionally plain. `/design-sync` (Claude
  Design) builds the real UI/UX on top of the token layer — prefer adjusting
  tokens and components over one-off inline styles.

## Brave.org integration (later)

Integration with the Rock RMS site means **brand parity + clean components**, not
dropping this app into Rock. Paths to integrate, easiest first: (1) host at a
subdomain (e.g. `howick.brave.org`) that already looks native; (2) iframe-embed
into a Rock page; (3) port markup into a Rock theme page + Lava blocks. Keeping
tokens in `DESIGN_TOKENS.md` and components token-driven keeps all three open.
