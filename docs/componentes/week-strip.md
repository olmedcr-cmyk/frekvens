# WeekStrip

Los siete días de una semana con su estado (hecho, a medias, sin hacer) para elegir uno.

- **Props**: `days` (`{label, day, name, state, today}[]`), `value` / `defaultValue` (índice), `onChange`, `tone`, `label`.
- Es un grupo de opciones: Tab entra, las flechas cambian de día. El estado se dice con forma (disco lleno, medio disco, aro) y en el nombre accesible; hoy lleva un punto.
- Para una semana. Para un mes, `Calendar`; para el progreso de un proceso, `Steps`.
