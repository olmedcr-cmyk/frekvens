# SlideToStart

Arranque deliberado: arrastra el disco hasta el final para empezar. Evita empezar un entreno o un pago por un toque accidental. Si sueltas antes del 82 %, el disco vuelve con `ease-throw`; al completar se vuelve `verde` con ✓.

- **Props**: `onComplete()`, `children` (texto, "Desliza para empezar"), `doneLabel`, `icon` (`play`), `tone` (`surface`), `label`, `resetAfter` (vuelve al inicio tras 1.2 s; `false` para dejarlo hecho).
- Accesible sin arrastrar: el disco es un botón; Enter o Espacio completan.
- Una por pantalla, en la zona del pulgar. Para acciones reversibles, una `KeyButton` normal.
