# Board

Tablero kanban con arrastrar y soltar real: la tarjeta deja un hueco translúcido, una copia flota inclinada 2° bajo el dedo y una línea `klein` con dos puntos marca dónde caerá. La columna de destino se marca con un borde.

- **Props**: `columns` (`[{id, title, state, items:[{id, title, meta, tag, tagTone, avatar, tone}]}]`), `onChange(columns)`, `variant` (`list` → `Sortable`).
- **Teclado**: Espacio coge la tarjeta, las flechas la mueven (←→ entre columnas, ↑↓ dentro), Espacio la suelta, Esc cancela. Cada movimiento se anuncia. El arrastre empieza a los 5 px: un toque no mueve nada.
