# Gauge

Medio arco fino: pista tenue, tramo recorrido en el color del texto y la cifra dentro. Sin aguja ni punto: solo la lectura. Para un porcentaje de 0 a 100.

- **Props**: `value` (0–100), `width` (240 px), `thickness` (8), `unit` (`%`; pasa `''` para quitarla), `readout` (`false` deja solo el arco), `caption` (etiqueta bajo la cifra, p. ej. `Intensidad`), `label` (nombre accesible).
- Toma el color del texto de donde vive, así que funciona sobre cualquier tono.
- Solo lectura (`role="meter"`). Si el usuario debe ajustarlo, usa `Slider` o `Dial`.
- A la derecha de un `Strip`, que ya dice el valor en grande, úsalo con `readout={false}`.
