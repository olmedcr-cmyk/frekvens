# Reveal

Transición de entrada al aparecer en pantalla: los hijos entran escalonados (`stagger`, 50 ms) con una de cuatro formas — `rise` (sube 16 px), `scale` (de .94), `wipe` (se descubre de izquierda a derecha con el radio de la casa) o `focus` (de desenfoque a nítido).

- **Props**: `variant` (`rise` · `scale` · `wipe` · `focus`), `stagger` (ms), `delay` (ms), `once` (true; `false` repite al salir y entrar), `threshold`, `as`.
- Con movimiento reducido todo aparece ya colocado.
- Para portadas, listas largas y la entrada de una pantalla. No lo uses en controles: un botón que tarda en aparecer molesta.
