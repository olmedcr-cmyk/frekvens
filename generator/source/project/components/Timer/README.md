# Timer

Cuenta atrás en un anillo de 60 puntos: los encendidos (`rams`) son el tiempo que queda; cada quinto punto es más grande, como las marcas de un reloj. En los tres últimos segundos el número cambia a una cuenta 3·2·1 gigante y, al terminar, el anillo se vuelve `verde`.

- **Props**: `duration` (segundos), `autoStart`, `onComplete()`, `label`, `doneText`, `size` (260), `dots` (60).
- Anuncia a lectores de pantalla solo la cuenta final y el final (`role="timer"`), no cada segundo.
- Para series encadenadas (Tabata), encadena Timers desde fuera con `onComplete`.
