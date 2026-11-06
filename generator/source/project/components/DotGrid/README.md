# DotGrid

Discos en rejilla. Dos usos:

1. **Contar** (sin `select`): n de m llenos, como un ábaco (`3 de 20`, series hechas).
2. **Elegir** (`select: 'one' | 'many'`): cada disco es un botón de 56 px. Al pasar el puntero el disco crece y sus vecinos se asoman (efecto lente), al pulsarlo se hunde y se rellena con un pequeño salto. Los ocupados quedan hundidos y tachados. Para plazas de una clase, asientos, días de un calendario, franjas horarias.

- **Props comunes**: `total`, `columns` (4), `size` (48 contar · 56 elegir), `gap`, `tone` (`klein` · `rams` · `ink` · `sol` · `verde`), `label`.
- **Contar**: `filled`.
- **Elegir**: `select`, `value`/`defaultValue` (índice o lista), `onChange`, `disabled` (índices ocupados), `labels` (nombre de cada disco: `'A3'`, `'18:00'`, `12`), `showLabels`, `max` (en `many`), `deselect` (true), `caption` (o `false`).
- Teclado: flechas por la rejilla, Inicio/Fin, Espacio/Enter elige. Vibra 8 ms al elegir. Nunca solo color: ocupado = tachado, elegido = relleno + `aria-pressed`.
