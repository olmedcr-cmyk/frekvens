# DataTable

Tabla de datos para SaaS: cabecera fija en mono, ordenación por columna (con `aria-sort`), selección de filas con `Checkbox`, y tipos de celda: `status` (Chip con punto), `spark` (Sparkline), `bar` (barra de 0–100), `avatar`, `mono`.

- **Props**: `columns` (`[{key, label, sortable, align:'end', mono, type, tones}]`), `rows` (con `id`), `selectable`, `dense`, `defaultSort` (`{key, dir}`), `onRowClick(row)`, `caption`, `label`, `emptyTitle`, `emptyText`.
- Sin filas pinta un `EmptyState`. En móvil, se desplaza en horizontal dentro de su caja: para listas en móvil, mejor `ListRow`.
