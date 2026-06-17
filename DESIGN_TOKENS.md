# Design Tokens — Brave Church brand

These tokens are extracted from **brave.org** (Rock RMS theme `BraveChurch2025`,
`/Themes/BraveChurch2025/Styles/theme.css`) so this site reads as native to the
main church website and can be folded into it later. The live values are wired
into `src/app/globals.css` (`:root` + Tailwind `@theme`). **This file is the
human-readable source of truth — keep the two in sync.**

## Color

| Token | Value | Brave usage | Tailwind utility |
|---|---|---|---|
| `--brand` | `#aa1f23` | Primary deep red — `.btn-primary`, links, accents | `bg-brand` `text-brand` `border-brand` |
| `--brand-shade` | `#941b1f` | Hover / active state | `bg-brand-shade` |
| `--brand-tint` | `#efa6a8` | Light red wash / accent | `text-brand-tint` |
| `--ink` | `#272221` | Warm near-black — dark sections, body text | `bg-ink` `text-ink` |
| `--ink-deep` | `#191817` | Deepest near-black | `bg-ink-deep` |
| `--paper` | `#ffffff` | Default background | `bg-paper` |
| `--paper-soft` | `#f5f5f5` | Muted section background | `bg-paper-soft` |
| `--line` | `#e6e6e6` | Borders / dividers | `border-line` |
| `--line-strong` | `#d9d9d9` | Stronger borders | `border-line-strong` |
| `--mute` | `#8b8b8b` | Muted text | `text-mute` |
| `--gray-700` | `#333333` | Body text on light | `text-gray-700` |
| `--gray-600` | `#555555` | Secondary text | `text-gray-600` |

## Type

Brave's real stack uses **Draught** (custom display), **Montserrat**, and Adobe
Typekit **proxima-nova**. Draught and proxima-nova are licensed, so this site
ships with the free Google equivalents already used on brave.org. The token names
stay stable, so the licensed faces can drop in later for a pixel-perfect match.

| Token | Font (now) | Brave equivalent | Role |
|---|---|---|---|
| `--font-display` | **Oswald** (400/500/700) | Draught | Eyebrows, hero headlines, uppercase labels |
| `--font-heading` | **Montserrat** (300–800) | Montserrat | Section headings, UI, buttons |
| `--font-body` | **Open Sans** (400/600/700) | proxima-nova | Body copy |

Use `font-display`, `font-heading`, `font-body` utilities. Loaded via `next/font`
in `src/app/layout.tsx`.

## Component signatures

- **Primary button** (`.btn-primary` on brave.org): solid `--brand` fill, **2px
  solid border**, white text, `0.2s` transition; hover → `--brand-shade`. See
  `src/components/Button.tsx`.
- Headings are uppercase + tracked for the bold, mission-forward Brave feel.

## Swapping in the licensed brand fonts later

1. Add the Adobe Fonts (Typekit) kit `bvc8gzh` and self-host the `Draught` files.
2. Point `--font-display` → Draught and `--font-body` → `proxima-nova` in
   `globals.css`. No component changes needed.
