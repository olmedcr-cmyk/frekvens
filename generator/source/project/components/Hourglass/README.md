# Hourglass

Reloj de arena de puntos `tabaco`: el triángulo de arriba se vacía desde arriba y el de abajo se llena desde abajo; un grano cae por el cuello mientras corre. Se gira al tocarlo (180°, `dur-grow`) y empieza de nuevo.

- **Props**: `duration` (segundos), `autoStart`, `onComplete()`, `pitch` (12), `label`.
- Para tiempos de descanso o espera donde el número exacto importa menos que la sensación. Lleva siempre la lectura en segundos debajo.
