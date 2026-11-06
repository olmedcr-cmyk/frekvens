# KeyButton

Tecla grande, plana y táctil: la unidad básica de toda la casa. Úsala para cualquier acción; el tamaño dice la importancia, no el color.

- **Props**: `tone` (`paper` · `ink` · `klein` · `sol` · `rams` · `tabaco` · `rec` · `well`), `size` (`s` 56 · `m` 88 · `l` 120 · `xl` 168 px), `shape` (`square` · `pill` · `round`), `label` (etiqueta mono arriba a la izquierda), `icon` (nombre de `Icon`), `active`, `toggle` (expone `aria-pressed`), `block` (ancho completo), `children` (la palabra o número grande), más cualquier atributo de `<button>`.
- Una sola tecla `klein` por pantalla: la acción para la que existe la pantalla. `rams` = arrancar/empezar algo físico (START del temporizador). `rec` solo para grabar o destruir, con palabra.
- La tecla de palma (`xl`) va en el tercio inferior, al alcance del pulgar. Nada pulsable por debajo de `hit-min`.
- Texto: una o dos palabras, verbo o número. Etiqueta mono en MAYÚSCULAS para el *qué* (`SERIES`), texto grande para el *valor* (`8`).
- Pulsada: se comprime a 0.965 en `dur-press` con `shadow-press`, como un botón físico; en `paper` activa se invierte a `ink`. Con un popover abierto (`data-open`) se queda hundida.
