# DotMatrix

Dibuja números y formas con puntos sobre una retícula: la firma visual del sistema. Sol, nube, gota, aro, disco, corazón, o cualquier texto numérico en una fuente de 5×7.

- **Props**: `shape` (`sun` · `cloud` · `drop` · `ring` · `disc` · `heart`), `grid` (lado en puntos, 15), `text` (dígitos, `:` `.` `°` `%` `-`), `rows` (array de strings `'0101'` para un dibujo propio), `dot` (diámetro, 6), `pitch` (paso, 10), `showOff` (dibuja también los puntos apagados en `dot-off`), `tone` (`ink` · `klein` · `rams` · `tabaco` · `paper`), `label`, `reactive` (los puntos cercanos al puntero crecen hasta un 60 %: el dibujo responde al dedo; se mantiene con movimiento reducido porque es respuesta directa).
- Es la ilustración del sistema: no uses fotos ni ilustración plana. Un pictograma de puntos por Tile o por pantalla.
- `pitch` ≥ `dot` × 1.5 para que respire; en héroe, `dot` 8–10.
