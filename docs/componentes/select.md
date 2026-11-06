# Select

Desplegable de selección única (patrón listbox de ARIA). El disparador es una píldora de 56 px; la lista se abre en un panel `ink` anclado al borde del que sale, con las opciones entrando escalonadas.

- **Props**: `options` (strings o `{value, label, meta, disabled}`), `value`/`defaultValue`, `onChange(v)`, `label` (mono encima), `placeholder`, `hint`, `disabled`, `block` (ancho completo), `defaultOpen` (solo para documentar).
- **Teclado**: ↓ ↑ Enter o Espacio abren; ↓ ↑ Inicio Fin mueven; Enter o Espacio eligen; Esc cierra; Tab cierra y sigue; escribir salta a la opción que empieza así. El foco no sale del disparador (`aria-activedescendant`).
- **Movimiento**: entra en `dur-base` con `ease-ui` (escala .96 → 1, sube 6 px); sale en `dur-fast` con `ease-exit`. Opciones con 25 ms de desfase. El chevron gira 180°.
- Hasta ~8 opciones. Con más, una `Sheet` con lista. Con 2–4 opciones visibles a la vez, mejor `Segmented`.
