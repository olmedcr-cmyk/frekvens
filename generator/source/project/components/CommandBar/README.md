# CommandBar

Paleta de comandos (⌘K / Ctrl+K): buscar y ejecutar cualquier acción sin tocar el ratón. Panel `ink` con buscador, resultados agrupados y atajos.

- **Props**: `commands` (`[{id, label, group, icon, shortcut, keywords, onRun}]`), `open`/`defaultOpen`, `onClose()`, `onRun(id)`, `hotkey` (escucha ⌘K), `placeholder`, `label`, `inline` (maquetas).
- **Teclado**: escribir filtra, ↑ ↓ mueven, Enter ejecuta, Esc cierra y devuelve el foco.
