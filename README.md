# Howick 2026

Blog website for a **Brave Church** mission trip to Howick, South Africa in
July 2026 — trip info, the team, ministry partners, a photo gallery, a team blog
with public comments and likes, and a donate page.

Built with **Next.js 16 + Tailwind v4 + Supabase**, themed to match
[brave.org](https://brave.org) so it can later be integrated into the main church
site. See `DESIGN_TOKENS.md` for the brand tokens and `AGENTS.md` (`CLAUDE.md`)
for architecture.

## Getting started

```bash
npm install
cp .env.example .env.local   # add your Supabase URL + anon key
npm run dev                  # http://localhost:3000
```

The site runs without Supabase configured (empty data, widgets show a hint).
To enable the backend:

1. Create a project at [supabase.com](https://supabase.com); copy the URL + anon
   key into `.env.local`.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Create one Auth user (Authentication → Users) — the shared team login. Sign in
   at `/login`, post from `/admin`.

## Routes

| Path | What |
|---|---|
| `/` | Landing: hero, trip, team, partners, gallery, latest posts |
| `/blog` · `/blog/[slug]` | Blog list and posts (likes + comments) |
| `/donate` | Info + link to the team giving page |
| `/login` · `/admin` | Shared team login and post authoring |

## Next step

This is an intentionally plain foundation. Run `/design-sync` to design the real
UI/UX on top of the brand-token layer.
