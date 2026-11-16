# Frekvens

[Español](https://github.com/olmedcr-cmyk/frekvens/blob/main/README.md) · **English**

React components to copy and paste, shadcn/ui style. Big, dotted, made for the whole hand. Open source (MIT), accessible (zero axe violations, WCAG 2.2 AA, across every preview in all three themes) and ready for model-generated UI.

Frekvens is Cris Olmedo's design system: Nothing, Teenage Engineering, Braun and IKEA run through a button panel. Klein blue for the action, Rams orange for the control, sun yellow for the data, coffee-machine green and tobacco brown for the material.

The component labels, the examples and the per-component docs are written in Spanish. The API (component names, props, tokens) is in English, and every visible text is a prop, so nothing is locked to one language.

Live site: [frekvens-ui.vercel.app](https://frekvens-ui.vercel.app/en)

## Install

As with shadcn/ui, the code is copied into your project. There is no package to update: the component is yours.

```sh
npx shadcn@latest add https://frekvens-ui.vercel.app/r/switch.json
```

That creates `components/frekvens/switch.tsx` and brings what it needs: `components/frekvens/lib.tsx` (utilities) and `styles/frekvens/*.css` (tokens and styles). Then import the styles once in your global CSS. Paths are relative to that file; in a standard Next.js project it is `app/globals.css`, so go up one level:

```css
/* With Tailwind v4 */
@import "tailwindcss";
@import "../styles/frekvens/tailwind.css";  /* tokens + @theme: bg-klein, text-ink, rounded-xl, ease-settle… */
@import "../styles/frekvens/components.css";  /* the components, in @layer components */

/* Without Tailwind */
@import "../styles/frekvens/frekvens.css";
```

If you already use shadcn/ui, note that `tailwind.css` redefines `rounded-sm/md/lg/xl` with Frekvens radii (8 · 16 · 24 · 40 px). If you don't want that, import `tokens.css` instead of `tailwind.css`: the components work the same. Files go to `components/frekvens/`, never `components/ui/`, so they don't overwrite shadcn components with the same name.

Set the theme on `<html data-theme="light">`: `light` (Papel, warm), `blanco` (Blanco, neutral greys on white) or `dark` (Carbón). `applyTheme('auto')`, in `components/frekvens/theme.ts`, follows the system.

A theme is just a block of CSS variables. To make your own, copy `[data-theme="blanco"]` from `tokens.css`, rename it and change the values: no component needs touching.

Everything at once:

```sh
npx shadcn@latest add https://frekvens-ui.vercel.app/r/frekvens.json
```

Or with the registry set up in `components.json`:

```json
{ "registries": { "@frekvens": "https://frekvens-ui.vercel.app/r/{name}.json" } }
```

```sh
npx shadcn@latest add @frekvens/dot-grid @frekvens/board
```

## Use

```tsx
import { Switch } from "@/components/frekvens/switch"
import { Segmented } from "@/components/frekvens/segmented"
import { DotGrid } from "@/components/frekvens/dot-grid"

<Switch label="Night mode" showLabel />
<Segmented label="View" options={["Today", "Week", "Month"]} />
<DotGrid select="many" max={2} total={16} columns={4} disabled={[0, 1]} label="Seats" />
```

## How it is built

- **One file per component**, in `registry/frekvens/ui/`. Readable JSX, typed props, a loosely typed body so you can edit it without fighting the types. Everything passes `tsc --strict`.
- **Styles live in CSS**, not in Tailwind classes inside the file: `components.css` sits in `@layer components`, so any Tailwind utility you add wins. Tokens are CSS variables and, with Tailwind v4, utilities (`bg-klein`, `text-on-sol`, `rounded-lg`, `duration-base`, `ease-settle`).
- **`lib.tsx`** holds what is shared: `cx`, `useValue` (controlled or not), `useFollow` (the spring with momentum that moves the pieces in `Segmented` and `Tabs`), the icons, and `parseLang` for Frekvens Lang.
- **No dependencies** beyond React 18+.
- **Server**: every file starts with `"use client"` and all 119 components render in Node (`npm test`).
- **Accessibility is the bar, not a feature**: touch targets of at least 44 px (56 for the main action), a keyboard alternative for every drag, reduced motion respected.

## Generative UI

`Render` draws a JSON spec or Frekvens Lang (line by line, streaming) using only catalogue components; an unknown type renders as a placeholder and never breaks. The catalogue for the model is in `public/frekvens.schema.json`. See `docs/generativo.md`.

## Documentation (in Spanish)

- `docs/README.md`: principles, colour, typography, grid.
- `docs/composicion.md`: stacks, gaps, concentric radii, less is more.
- `docs/movimiento.md`: timing and easing tokens, the fine detail.
- `docs/calidad.md`: heuristics, tests and edge cases.
- `docs/agentes.md`: how a coding agent should use Frekvens.
- `docs/componentes/*.md`: one page per component.

## For agents

The site serves the same documentation as plain text, so a coding assistant can read it without installing anything:

- [`/llms.txt`](https://frekvens-ui.vercel.app/llms.txt): index of components by group, one line each.
- [`/llms-full.txt`](https://frekvens-ui.vercel.app/llms-full.txt): everything in one file, each component with its usage and its props as they appear in the types.
- [`/r/registry.json`](https://frekvens-ui.vercel.app/r/registry.json): the registry, machine-readable.

Paste this into your project's `AGENTS.md` or `CLAUDE.md`:

```md
This project uses Frekvens (components in `components/frekvens`, styles in `styles/frekvens`).
Before building UI, read https://frekvens-ui.vercel.app/llms.txt and use an existing piece if one fits.
To add one: `npx shadcn@latest add https://frekvens-ui.vercel.app/r/<name>.json`.
Don't add Tailwind classes to the pieces; switch the theme with `data-theme` on `<html>`.
```

## Develop

```sh
npm install
npm run dev          # the site (Next.js) with all 119 components live
npm test             # strict tsc + SSR of the whole registry + /public/r integrity
npm run test:a11y    # axe in all three themes (npx playwright install chromium)
```

The source of truth is the Frekvens design system in `generator/source/project/`. This repository is generated from it with `generator/build.mjs` (`cd generator && npm install && npm run build`); hand edits in `registry/` are lost on the next build. To change something, change it in the system and regenerate.

## Licence

MIT © 2026 Cris Olmedo. See `NOTICE.md` for what comes from others (the *stageshow* spring, the fonts).
