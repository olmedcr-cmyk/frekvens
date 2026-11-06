# Slider

Pista en píldora de 56 px de alto con dos puntos `ink` en los extremos y el cursor en `rams`. Usa un `<input type="range">` nativo encima: teclado y lector de pantalla funcionan solos.

- **Props**: `value`/`defaultValue`, `onChange(n)`, `min`, `max`, `step`, `label` (mono arriba), `stops` (etiquetas bajo la pista: `['Soft','Normal','Hard']`), `format(v)` para `aria-valuetext`.
- Un slider por grupo; si hay tres, conviértelos en `Dial`s.
