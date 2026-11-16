# Sequencer

Rejilla de pasos por pista: cada casilla marca si esa pista suena en ese paso. Una fila por sonido, un paso por columna.

- **Props**: `rows` (nombres o `{label}`), `steps` (8), `value` / `defaultValue` (`boolean[][]`), `onChange`, `playhead` (paso que suena ahora), `tone`, `label`.
- Teclado: Tab entra en la rejilla, las flechas se mueven por ella, Inicio y Fin van a los extremos de la fila, Espacio o Intro marcan.
- Las casillas miden 44 px como mínimo; si no caben, la rejilla se desplaza en horizontal. No reproduce sonido: mueve `playhead` desde tu reloj y dispara los sonidos tú (con `PadGrid`, por ejemplo).
