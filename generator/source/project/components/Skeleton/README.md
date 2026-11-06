# Skeleton

Carga en puntos: el hueco del contenido que viene se dibuja como una trama de puntos `dot-off` con un brillo que la recorre. Nada de rectángulos grises.

- **Props**: `shape` (`text` · `tile` · `circle`), `lines` (3), `width`, `height`, `label`.
- Solo si la carga pasa de ~300 ms; si pasa de 3 s, añade un `DotLoader` con texto.
