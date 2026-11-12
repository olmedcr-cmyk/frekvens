# Tile

Tarjeta-widget: título arriba a la izquierda, pictograma de puntos en el centro y el valor enorme abajo a la izquierda. La pieza de los dashboards de dos columnas.

- **Props**: `title`, `subtitle` (segunda línea atenuada), `meta` (mono arriba a la derecha), `value`, `caption` (línea pequeña bajo el valor: «de 1.880»), `icon` (glifo en un disco, arriba a la izquierda), `anchor` (`bottom` baja el título al pie: el formato de tile de acción), `tone` (`surface` · `sol` · `klein` · `rams` · `tabaco` · `ink` · `klein-soft` · `salvia` · `lavanda` · `malva`), `height`, `children` (el arte: `DotMatrix`, `DotGrid`, `Icon`), `onClick` (la convierte en botón).
- Dos por fila con `space-2` de junta. Una sola Tile de color por fila; la otra en `surface`.
