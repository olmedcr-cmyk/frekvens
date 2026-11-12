# Frekvens — guía para agentes de código

Sistema de diseño de Cris Olmedo publicado como componentes React para copiar y pegar (registro compatible con `npx shadcn add`). Idioma del proyecto: español (textos, docs y commits). Las notas completas están en `CLAUDE.md`; esto es el resumen que vale para cualquier asistente.

## Dónde se edita

Casi todo el repo se **genera**. Edita solo la fuente y regenera:

| Para cambiar… | Edita |
| --- | --- |
| Un componente (código, estilo, tipos) | `generator/source/project/components/bundle.js`, `bundle.css`, `index.d.ts` |
| La ficha o la demo de un componente | `generator/source/project/components/<Nombre>/README.md` y `preview.html` |
| Tokens y temas | `generator/source/project/tokens.json` |
| La web, los tests, el README, la CI | `generator/tpl/` |
| Versiones de dependencias, scripts | `generator/build.mjs` (escribe `package.json`) |

No edites a mano `registry/`, `public/`, `app/`, `docs/`, `previews/`, `test/`, `README.md` ni `package.json`: se sobrescriben.

## Ciclo

```sh
cd generator && npm install && npm run build && cd ..   # regenera el repo
npm run thumbs -- <slug> …                              # si cambia el aspecto de una pieza; luego regenera otra vez
npm test && npm run test:a11y && npm run build          # antes de subir
```

`npm run test:a11y` y `npm run thumbs` necesitan `npx playwright install chromium`.

## Reglas que no se negocian

- 0 infracciones de axe (WCAG 2.2 AA) en los tres temas: Papel (`light`), Carbón (`dark`) y Blanco (`blanco`).
- Los componentes no llevan clases Tailwind: el estilo vive en `bundle.css`, con tokens (`var(--…)`), nunca valores sueltos de color, radio o duración.
- Hover solo dentro de `@media (hover: hover)`; toda animación se detiene o se acorta con `prefers-reduced-motion`.
- Nada se sale de su caja a 320 px de ancho; objetivo táctil ≥ 44 px.
- Un tema es un bloque de variables en `tokens.json`: no se añaden colores dentro de un componente para un tema concreto.
- `"use client"` es la primera línea de cada `.tsx`; el código generado pasa `tsc --strict`.
- Una rama por cambio y commits en español. Un push a `main` despliega solo en https://frekvens-ui.vercel.app.

## Para quien usa Frekvens

La documentación para agentes que **consumen** la librería está en https://frekvens-ui.vercel.app/llms.txt (índice) y `/llms-full.txt` (todo, con props). `docs/agentes.md` explica cómo aplicar las piezas en un proyecto.
