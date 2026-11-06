# AudioTrack

Pista de audio con la onda como barra de posición: barras redondeadas, las reproducidas en el color del texto. Tecla redonda de play, título, tiempo y chip de velocidad.

- **Props**: `src`, `title`, `peaks` (array 0–1; si no, se genera una onda estable con `seed`), `bars` (56), `tone` (`surface`), `rate`, `speed` (false oculta el chip), `duration` (modo demo).
- La onda es un `slider`: ← → 5 s, Espacio play. Para notas de voz, podcasts, mensajes del entrenador.
