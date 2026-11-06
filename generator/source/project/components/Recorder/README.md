# Recorder

Grabadora de bolsillo: carrete de puntos que gira mientras graba, piloto REC, tiempo en `dot`, nivel de entrada y una botonera de tres teclas (grabar/parar, marca, modo). Cada toma queda debajo como `AudioTrack`.

- **Props**: `real` (graba de verdad con el micrófono vía MediaRecorder; si se deniega, sigue en modo demo), `takes`, `onSave(take)`, `onMark(ms)`.
- Para notas de voz, entrevistas, ideas sueltas. La transcripción y el resumen los pone el host.
