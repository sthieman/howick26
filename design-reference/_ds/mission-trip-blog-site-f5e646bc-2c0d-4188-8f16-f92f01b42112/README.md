# Howick (howick26@0.1.0)

This design system is the published howick26 React library, bundled as a single
browser global. All 4 components are the real upstream code.

## Where things are

- `_ds_bundle.js` — the whole-DS bundle at the project root; loads every component to `window.Howick`. First line is a `/* @ds-bundle: … */` metadata header.
- `styles.css` — the token/font entry point; `@import`s token and font CSS. `_ds_bundle.css` carries the component styles — link both.
- `components/<group>/<Name>/<Name>.prompt.md` (example JSX + variants), `<Name>.d.ts` (types), `<Name>.html` (variant grid).
- `tokens/*.css` — CSS custom properties, names verbatim from upstream.
- `fonts/` — `@font-face` files + `fonts.css` (when the package ships fonts).

For a specific component, `read_file("components/<group>/<Name>/<Name>.prompt.md")`.

## Loading

Add these three lines to your page once (React must be on the page first):

```html
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="_ds_bundle.css">
<script src="_ds_bundle.js"></script>
```

Components are then available at `window.Howick.*`:

```jsx
const { Button } = window.Howick;
```

## Tokens

0 CSS custom properties from howick26. Names are
preserved verbatim from upstream. See `tokens/` for the full list.



## Components

### general
- `Button`
- `Gallery`
- `SiteFooter`
- `SiteHeader`
