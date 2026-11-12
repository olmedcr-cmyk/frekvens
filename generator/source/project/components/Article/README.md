# Article

Tarjeta de artículo partida en dos: arriba la fecha, la categoría y el titular; abajo un bloque de color con el arte. Para listas de novedades, entradas de blog o lanzamientos.

- **Props**: `title`, `date`, `category`, `href` (la convierte en enlace) u `onClick` (en botón), `tone` del bloque de arte (`ink` por defecto), `children` (el arte: `Shape`, `Keycap`, `DotMatrix`).
- Toda la tarjeta es un solo destino: no metas otros botones dentro. La flecha solo aparece si lleva `href` u `onClick`.
- En rejilla, dos o tres por fila con `space-2` de junta; cambia el `tone` del arte entre vecinas, no el del texto.
