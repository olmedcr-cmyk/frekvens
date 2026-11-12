# Capsule

Bloque en forma de estadio para abrir o cerrar una página: titular, una línea de texto, las acciones y, a un lado, el arte.

- **Props**: `title`, `text`, `eyebrow`, `actions` (teclas; una sola `klein`), `tone` (`ink` por defecto), `level` (`1` si es el titular de la página; `2` por defecto), `as`, `children` (el arte).
- El relleno crece con el ancho para que el texto nunca toque la curva; en estrecho el arte baja debajo del texto.
- Una por pantalla, dos como mucho (apertura y cierre). No la uses como tarjeta de contenido: para eso está `Tile`.
