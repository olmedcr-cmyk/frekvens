# NoteEditor

Cuaderno por bloques: escribir es lo primero. Enter crea un bloque, borrar en uno vacío lo une al anterior y `/` abre el menú para cambiar el tipo: texto, título, tarea (con el lenguaje aro → disco), cita o nota de voz.

- **Props**: `defaultBlocks` (`[{type:'p'|'h'|'todo'|'quote'|'voice', text, done, duration}]`), `onChange(blocks)`, `title` (muestra el campo de título), `meta`, `placeholder`.
- **Teclado**: ↑ ↓ entre bloques; en el menú `/`, ↑ ↓ Enter Esc.
