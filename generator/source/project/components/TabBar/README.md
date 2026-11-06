# TabBar

Barra de navegación inferior en píldora `ink`: iconos solos y, el activo, en píldora `paper` que se abre para mostrar su nombre. Flota centrada a `space-5` del borde inferior.

- **Props**: `items` (`[{id, label, icon, badge, dot}]`), `value`/`defaultValue`, `onChange(id)`, `label`.
- 3–5 destinos. El activo lleva `aria-current="page"`; cada icono tiene su nombre accesible aunque no se vea.
