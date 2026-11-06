# ClickWheel

Rueda táctil circular, como la de los reproductores de bolsillo: deslizar el dedo en círculo avanza o retrocede paso a paso (con un pulso háptico donde exista), con cuatro botones en los ejes y un botón central.

- **Props**: `onStep(±1)`, `onSelect()` (centro), `onMenu()`, `onPlay()`, `playing`, `detent` (grados por paso, 24), `size` (220), `tone` (`surface`), `labels` (`{top}`), `label`, `valueText`.
- **Teclado**: flechas = paso, Enter = centro, Espacio = reproducir, M = menú. Combínala con `DiscCarousel` o una lista.
