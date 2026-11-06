# Calendar

Calendario de discos: vista **semana** (una tira de 7 días, la de las referencias) o **mes**. Hoy lleva aro; el día elegido, disco `ink`; los días con sesión, un punto `rams` debajo.

- **Props**: `value`/`defaultValue` (`'AAAA-MM-DD'`), `onChange(iso)`, `view` (`week` · `month`), `switchable` (tecla para cambiar de vista), `marks` (fechas con punto), `today`.
- **Teclado**: ← → un día, ↑ ↓ una semana; solo el día elegido entra en el orden de tabulación.
