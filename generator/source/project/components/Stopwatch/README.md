# Stopwatch

Cronómetro con centésimas, vueltas y la mejor vuelta marcada en `klein-ink`. Dos teclas redondas que cambian de papel según el estado (Empezar/Parar en `rams`, Vuelta/Reiniciar al lado), siempre en el mismo sitio.

- **Props**: `autoStart`, `onLap(ms)`, `label`, `size` (`display` · `hero`, el tamaño del `Readout`).
- Las cifras son tabulares: no bailan. El estado de las teclas comparte hueco (Vuelta ↔ Reiniciar, Parar ↔ Empezar) para que el pulgar no tenga que buscar.
