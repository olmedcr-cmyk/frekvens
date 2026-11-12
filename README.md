# Frekvens

Componentes React para copiar y pegar, al estilo shadcn/ui. Grandes, de puntos, pensados para la mano entera. Código abierto (MIT), accesibles (0 infracciones de axe en las 228 vistas de los 114 componentes, en claro y oscuro) y listos para UI generada por un modelo.

Frekvens es el sistema de diseño de Cris Olmedo: Nothing, Teenage Engineering, Braun e IKEA pasados por una botonera. Azul Klein para la acción, naranja Rams para el mando, amarillo sol para el dato, verde de cafetera y marrón tabaco para el material.

## Instalar

Como en shadcn/ui, el código se copia a tu proyecto. No hay paquete que actualizar: el componente es tuyo.

```sh
npx shadcn@latest add https://frekvens-ui.vercel.app/r/switch.json
```

Eso crea `components/frekvens/switch.tsx` y trae lo que necesita: `components/frekvens/lib.tsx` (utilidades) y `styles/frekvens/*.css` (tokens y estilos). Después, importa los estilos una vez en tu CSS global:

```css
/* Con Tailwind v4 */
@import "tailwindcss";
@import "./frekvens/tailwind.css";     /* tokens + @theme: bg-klein, text-ink, rounded-xl, ease-settle… */
@import "./frekvens/components.css";   /* los componentes, en @layer components */

/* Sin Tailwind */
@import "./frekvens/frekvens.css";
```

Si ya usas shadcn/ui, ojo: `tailwind.css` redefine `rounded-sm/md/lg/xl` con los radios de Frekvens (8 · 16 · 24 · 40 px). Si no quieres eso, importa `tokens.css` en vez de `tailwind.css`: los componentes funcionan igual.

Y pon el tema en `<html data-theme="light">`: `light` (Papel, cálido), `blanco` (Blanco, grises neutros sobre blanco) o `dark` (Carbón). `applyTheme('auto')`, en `components/frekvens/theme.ts`, sigue al sistema.

Un tema es solo un bloque de variables CSS. Para hacer el tuyo, copia `[data-theme="blanco"]` de `tokens.css`, cámbiale el nombre y los valores: ningún componente hay que tocarlo.

Todo de una vez:

```sh
npx shadcn@latest add https://frekvens-ui.vercel.app/r/frekvens.json
```

O con el registro configurado en `components.json`:

```json
{ "registries": { "@frekvens": "https://frekvens-ui.vercel.app/r/{name}.json" } }
```

```sh
npx shadcn@latest add @frekvens/dot-grid @frekvens/board
```

## Usar

```tsx
import { Switch } from "@/components/frekvens/switch"
import { Segmented } from "@/components/frekvens/segmented"
import { DotGrid } from "@/components/frekvens/dot-grid"

<Switch label="Modo noche" showLabel />
<Segmented label="Vista" options={["Hoy", "Semana", "Mes"]} />
<DotGrid select="many" max={2} total={16} columns={4} disabled={[0, 1]} label="Plazas" />
```

## Cómo está hecho

- **Un archivo por componente**, en `registry/frekvens/ui/`. JSX legible, props tipadas en TypeScript, cuerpo en JavaScript (`@ts-nocheck`) para que puedas editarlo sin pelearte con tipos.
- **Los estilos viven en CSS**, no en clases Tailwind dentro del archivo: `components.css` está en `@layer components`, así que cualquier utilidad de Tailwind que añadas gana. Los tokens son variables CSS y, con Tailwind v4, utilidades (`bg-klein`, `text-on-sol`, `rounded-lg`, `duration-base`, `ease-settle`).
- **`lib.tsx`** trae lo compartido: `cx`, `useValue` (controlado o no), `useFollow` (el muelle con impulso que mueve las piezas de `Segmented` y `Tabs`), los iconos, `parseLang` para Frekvens Lang.
- **Sin dependencias** aparte de React 18+.
- **Servidor**: todo empieza con `"use client"` y los 114 componentes renderizan en Node (`npm test`).

## UI generativa

`Render` pinta un spec JSON o Frekvens Lang (línea a línea, en streaming) usando solo componentes del catálogo; un tipo desconocido sale como hueco, nunca rompe. El catálogo para el modelo está en `public/frekvens.schema.json`. Ver `docs/generativo.md`.

## Documentación

- `docs/README.md`: principios, color, tipografía, retícula.
- `docs/composicion.md`: pilas, gaps, radios concéntricos, menos es más.
- `docs/movimiento.md`: tokens de tiempo y curvas, el detalle fino.
- `docs/calidad.md`: heurísticas, pruebas y casuísticas.
- `docs/agentes.md`: cómo debe usar Frekvens un agente de código.
- `docs/componentes/*.md`: una ficha por componente.

## Para agentes

La web sirve la misma documentación en texto plano, para que un asistente de código la lea sin instalar nada:

- [`/llms.txt`](https://frekvens-ui.vercel.app/llms.txt): índice de los componentes por grupo, con una línea de cada uno.
- [`/llms-full.txt`](https://frekvens-ui.vercel.app/llms-full.txt): todo en un archivo, cada componente con su uso y sus props tal como están en los tipos.
- [`/r/registry.json`](https://frekvens-ui.vercel.app/r/registry.json): el registro, legible por máquina.

Pega esto en el `AGENTS.md` o `CLAUDE.md` de tu proyecto:

```md
Este proyecto usa Frekvens (componentes en `components/frekvens`, estilos en `styles/frekvens`).
Antes de crear UI, lee https://frekvens-ui.vercel.app/llms.txt y usa una pieza existente si encaja.
Para añadir una: `npx shadcn@latest add https://frekvens-ui.vercel.app/r/<nombre>.json`.
No añadas clases Tailwind a las piezas; el tema se cambia con `data-theme` en `<html>`.
```

## Desarrollar

```sh
npm install
npm run dev          # la web (Next.js) con los 114 componentes vivos
npm test             # SSR de todo el registry + integridad de /public/r
npm run test:a11y    # axe en claro y oscuro (npx playwright install chromium)
```

El código fuente de verdad es el sistema de diseño de Frekvens (un artefacto de Claude). Este repositorio se genera desde él con `generator/build.mjs` (`cd generator && npm install && npm run build`); los cambios a mano en `registry/` se pierden en la siguiente generación. Si quieres cambiar algo, cámbialo en el sistema y regenera.

## Licencia

MIT © 2026 Cris Olmedo. Ver `NOTICE.md` para lo que viene de otros (el muelle de *stageshow*, las fuentes).
