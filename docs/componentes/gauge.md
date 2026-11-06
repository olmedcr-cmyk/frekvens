# Gauge

Arco de instrumento: pista `tabaco`, tramo recorrido en `ink` y un punto de lectura. Para un porcentaje de 0 a 100.

- **Props**: `value` (0–100), `width` (240 px), `thickness` (14), `caption` (texto bajo el arco, p. ej. `int. 80%`), `label` (nombre accesible).
- Solo lectura (`role="meter"`). Si el usuario debe ajustarlo, usa `Slider` o `Dial`.
- Va a la derecha de un `Strip`, con el valor en grande a la izquierda (`ON`, `78%`).
