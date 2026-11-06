# Blueprint

Lienzo de plano: la hoja de puntos de una pizarra, pero ingenieril. Rejilla de puntos cada 10 unidades y líneas `klein` cada 50, reglas en X e Y con la medida real, ajuste a la rejilla, cotas de la pieza elegida (ancho y alto en `rams`), conectores ortogonales con flecha y etiqueta, y una lectura de coordenadas del cursor.

- **Props**: `nodes` (`[{id, x, y, w, h, title, text, tone, kind:'circle'}]`), `edges` (`[{from, to, label}]`), `grid` (10), `majorEvery` (5), `snap` (true), `unit` (`mm`), `unitPerGrid` (1), `height`, `wheelZoom` (true), `onChange(nodes)`, `label`.
- **Moverse**: arrastra el fondo; rueda o pellizco para acercar (30–300 %), Mayús + rueda para desplazar, botones − 100 % +. **Editar**: arrastra las piezas (se ajustan a la rejilla), flechas para moverlas un paso (Mayús = 5), Supr para quitar, herramienta "+ Nota" para pegar una nota `sol` donde pulses.
