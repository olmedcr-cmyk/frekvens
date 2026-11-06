# Frekvens — notas para Claude Code

Repositorio de **Frekvens**, el sistema de diseño de Cris Olmedo publicado como componentes React para copiar y pegar al estilo shadcn/ui (registro compatible con `npx shadcn add`). MIT. Idioma del proyecto: español (textos, docs, commits).

## Cómo está montado

- `registry/frekvens/ui/*.tsx`: un archivo por componente (114). **Generados**: no los edites a mano, se sobrescriben.
- `registry/frekvens/ui/lib.tsx`, `types.ts`, `catalog.ts`, `*.css`: utilidades compartidas, tipos, catálogo de `Render` y estilos. También generados.
- `public/r/*.json`: lo que lee `npx shadcn add <url>`. Generado.
- `public/preview/*.html`: vistas previas vivas (bundle clásico + React UMD) que la web muestra en iframes y que usa `test/a11y.mjs`.
- `app/`: la web de documentación (Next.js 15, App Router, Tailwind v4). Viene de `generator/tpl/app`.
- `generator/`: **la fuente de verdad del repo**.
  - `source/project/`: el sistema de diseño (`components/bundle.js`, `bundle.css`, `index.d.ts`, `tokens.json`, `*.md`, `components/<X>/README.md` y `preview.html`).
  - `split.mjs`: parte `bundle.js` en un `.tsx` por componente (Babel: `h()` → JSX, tipos `any` en el cuerpo, sobrecarga tipada con `XProps`).
  - `build.mjs`: monta todo el repo (registry, CSS, `public/r`, previews, docs, app desde `tpl/`).
  - `tpl/`: plantillas que se copian tal cual (app, tests, README, CI, tsconfig.registry.json).

Para cambiar un componente: edita `generator/source/project/components/bundle.js` (o `bundle.css`, `index.d.ts`, su `README.md`) y regenera. Para cambiar la web, los tests o el README: edita `generator/tpl/` y regenera.

```sh
cd generator && npm install && FREKVENS_URL=https://<dominio-final> npm run build && cd ..
npm install
npm test            # tsc estricto sobre registry + SSR de los 114 + integridad de public/r
npm run test:a11y   # axe en claro y oscuro sobre public/preview (npx playwright install chromium)
npm run build       # web estática
```

`build.mjs` borra todo lo de la raíz salvo `node_modules`, `.git`, `.next`, `generator`, `CLAUDE.md` y `HANDOFF.md`.

## Reglas

- Los componentes no llevan clases Tailwind: el estilo vive en `components.css` dentro de `@layer components`; los tokens se exponen a Tailwind v4 en `tailwind.css` (`bg-klein`, `text-ink`, `rounded-xl`…).
- Archivos destino en el proyecto del usuario: `components/frekvens/*` y `styles/frekvens/*` (nunca `components/ui`, para no pisar los componentes de shadcn con el mismo nombre).
- `"use client"` debe ser la primera línea de cada `.tsx` (shadcn elimina los comentarios que van antes).
- Nada de `@ts-nocheck`: el código generado pasa `tsc --strict` (ver `tsconfig.registry.json`).
- Accesibilidad: 0 infracciones de axe (WCAG 2.2 AA) en claro y oscuro es el listón; objetivo táctil ≥ 44 px (56 la acción principal); todo arrastre tiene alternativa de teclado; movimiento reducido respetado.
- Commits en español.
