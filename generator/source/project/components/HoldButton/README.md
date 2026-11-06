# HoldButton

Mantén pulsado para confirmar: un anillo `rams` se llena alrededor del botón en `duration` ms; si sueltas antes, se vacía. Al completarse se vuelve `verde` con ✓.

- **Props**: `onComplete()`, `duration` (1200 ms), `size` (120), `tone` (`ink`), `icon` (`stop`), `children` (texto, `Mantén`), `doneLabel`, `label`, `disabled`.
- Accesible: mantener Espacio o Enter funciona igual.
- Para terminar un entreno, borrar algo o parar una grabación: acciones que no quieres hacer por accidente pero sí rápido.
