# Sidebar

Barra lateral para iPad y escritorio: secciones con etiqueta mono, elementos con icono y contador (en `rec` si es una alerta), el activo en `ink`. Se contrae a una tira de iconos de 76 px.

- **Props**: `sections` (`[{label, items:[{id, label, icon, count, alert}]}]`), `value`/`defaultValue`, `onChange(id)`, `collapsed`/`defaultCollapsed`, `onCollapse(bool)`, `header`, `footer`, `tone` (`surface`), `label`.
- Contraída, cada icono conserva su nombre accesible y su título; los contadores pasan a punto.
