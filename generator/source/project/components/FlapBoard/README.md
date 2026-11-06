# FlapBoard

Panel de salidas: varias filas de `SplitFlap` alineadas en columnas (hora, qué, estado), con el estado teñido. Para horarios de clases, turnos, pedidos listos, llegadas.

- **Props**: `rows` (`[{id, time, text, status, tone}]`), `columns` (`[{key, label, length}]`, por defecto hora 5 · destino 12 · estado 9), `title`, `meta`, `size` (`s`), `label`.
- Es una tabla de verdad (`role="table"`): se lee fila a fila. 3–8 filas; más, usa `DataTable`.
