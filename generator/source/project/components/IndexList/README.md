# IndexList

Índice en letra grande: una palabra por línea y, en pequeño, cuántas cosas hay dentro.

- **Props**: `items` (texto o `{label, count, href, onClick, current}`), `label`.
- La línea actual va en `ink` y las demás en gris; cada línea mide 56 px como mínimo.
- Para elegir entre 3 y 8 secciones cuando el índice es la pantalla. Dentro de una pantalla con más contenido, `ListRow` o `Tabs`.
