# Usar en React

Frekvens también es una librería de React: `@crisolmedo/frekvens`. Los mismos 114 componentes de este manual, con tipos de TypeScript, tokens en CSS, tema claro/oscuro/auto y el esquema para UI generativa.

```sh
npm install ./crisolmedo-frekvens-0.1.0.tgz
```

```jsx
import '@crisolmedo/frekvens/styles.css';
import { applyTheme, Switch, Segmented, KeyButton, Render } from '@crisolmedo/frekvens';

applyTheme('auto');
```

| Pieza | Qué es |
| --- | --- |
| `dist/index.js` · `index.cjs` | Módulo ES y CommonJS, `'use client'`, solo pide `react` ≥ 18 |
| `dist/index.d.ts` | Tipos de todas las props |
| `styles.css` · `styles-nofonts.css` | Tokens + componentes (con o sin las fuentes de Google) |
| `tokens.css` · `tokens.json` | Solo los tokens, para otras herramientas |
| `schema.json` | El catálogo para un modelo que genera UI (`Render`) |
| `docs/` | Este manual en Markdown, con una ficha por componente |
| `examples/vite` | Una app de ejemplo con tema, reservas, tablero, calculadora y Frekvens Lang |

Probado: los 114 componentes se renderizan en servidor sin errores (`npm test`), y el ejemplo compila con Vite y funciona en los dos temas sin errores en consola.

El tema va en `<html>` (`data-theme`). `applyTheme('auto')` sigue al sistema y escucha sus cambios.
