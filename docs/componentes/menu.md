# Menu

Menú de acciones en un botón redondo de `dots`: editar, duplicar, borrar. Panel `ink` anclado al disparador; la acción destructiva va en `rams` y al final, tras un separador.

- **Props**: `items` (`[{label, icon, onSelect, shortcut, danger, disabled} | {separator:true}]`), `label` (nombre accesible del botón), `icon` (`dots` por defecto), `align` (`start` · `end`, de qué borde cuelga), `tone`, `defaultOpen`.
- **Teclado**: ↓ en el disparador abre; ↓ ↑ Inicio Fin recorren; Enter elige; Esc cierra y devuelve el foco al botón.
- Mientras está abierto, el disparador se queda hundido (`data-open`). Para elegir un valor, no uses Menu: usa `Select`.
