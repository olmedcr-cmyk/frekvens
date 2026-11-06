# Cabinet

Archivero: cajones apilados con tirador en píldora. Al abrir uno, el cajón sale 10 px hacia fuera, el tirador se alarga y el contenido se despliega con frenada larga. Funciona como un acordeón de una sola apertura.

- **Props**: `drawers` (`[{label, index, meta, tone, content}]`), `value`/`defaultValue` (índice abierto, `-1` ninguno), `onChange(i)`.
- Para archivo, historial o ajustes agrupados. Cada cajón de un tono si representan categorías; todos `surface` si son iguales.
- El contenido cerrado no se lee ni se enfoca (`visibility: hidden` tras la animación).
