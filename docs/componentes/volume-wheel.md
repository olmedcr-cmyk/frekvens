# VolumeWheel

Rueda lateral estriada, como la rueda de scroll de un dispositivo de bolsillo: se gira con la rueda del ratón, arrastrando arriba/abajo o con las flechas, y sus estrías se desplazan al girar. Al lado, una columna de segmentos y el valor en puntos.

- **Props**: `value`/`defaultValue` (0–100), `onChange(n)`, `step` (5), `segments` (16), `height` (240), `tone` (`rams` · `klein` · `ink`), `label`, `unitLabel` (`VOL`).
- Úsala para volumen, intensidad o cualquier nivel que se ajusta "sin mirar". `role="slider"` vertical.
