# Wheel

Rueda selectora vertical con scroll-snap: los valores se atenúan y encogen según se alejan del centro; el elegido queda en una ventana `surface`. Para horas, minutos, repeticiones.

- **Props**: `items` (strings o `{value,label}`; por defecto 00–59), `value`/`defaultValue`, `onChange(v)`, `label`, `unit`, `visible` (5 filas), `rowHeight` (48), `width`.
- **Teclado**: ↑ ↓ de uno en uno, RePág/AvPág de cinco. `role="spinbutton"`.
- Pon dos o tres en fila con `space-2` para una hora completa.
