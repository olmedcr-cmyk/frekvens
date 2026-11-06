# Sheet

Hoja inferior modal: el sitio para formularios cortos, detalles y confirmaciones. Sube desde abajo con `dur-sheet` y `ease-ui`; se descarta arrastrando el asa más de 96 px, tocando el fondo, con Esc o con la ×.

- **Props**: `open`, `onClose()`, `title`, `label` (si no hay título), `tone` (`surface`), `inline` (se posiciona dentro del contenedor en vez de en la ventana; para maquetas), `children`.
- Atrapa el foco mientras está abierta y lo devuelve al disparador al cerrar. `role="dialog"` + `aria-modal`.
- Una acción principal al pie (`KeyButton` `pill` o `block`). Nunca una Sheet encima de otra.
