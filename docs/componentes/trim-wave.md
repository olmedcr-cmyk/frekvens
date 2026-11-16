# TrimWave

Onda con dos tiradores para recortar un tramo: lo que queda dentro va en color, lo de fuera se apaga.

- **Props**: `peaks` (alturas de 0 a 1), `value` / `defaultValue` (`[inicio, final]` en tanto por ciento), `onChange`, `minGap` (2), `format`, `readout`, `tone`, `label`, `startLabel`, `endLabel`.
- Cada tirador es un deslizador: flechas de uno en uno, Re Pág y Av Pág de diez en diez, Inicio y Fin a su tope. Nunca se cruzan.
- Para elegir un tramo de un audio o un vídeo. Para reproducir, `AudioTrack`.
