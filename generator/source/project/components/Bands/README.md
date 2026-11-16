# Bands

Lista de franjas de color a todo el ancho, con el número, un titular grande y un dato o un icono a la derecha.

- **Props**: `items` (`{title, sub, meta, icon, tone, href, onClick}[]`), `numbered` (`false` quita el número), `stacked` (franjas con la esquina redondeada que se montan una sobre otra), `label`.
- Una franja con `href` u `onClick` es toda ella el objetivo táctil (88 px de alto).
- De 3 a 6 franjas y un tono distinto por franja. Para una lista larga o densa, `ListRow`.
