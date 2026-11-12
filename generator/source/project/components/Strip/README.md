# Strip

Fila de instrumento horizontal: título y valor grande a la izquierda, instrumento a la derecha. Se apilan con `space-2` como un panel de control.

- **Props**: `title`, `value`, `unit` (unidad pequeña junto al valor), `icon` (glifo en un disco junto al título), `tone` (`surface` por defecto), `children` (el instrumento: `Gauge`, `LevelBars`, `DotMatrix`, texto secundario).
- Para pantallas de estado: temperatura, batería, luz, hora. El valor siempre legible sin el instrumento.
