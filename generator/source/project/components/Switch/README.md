# Switch

Interruptor en píldora de 120 × 56. El disco **viaja** de un extremo al otro y aterriza con un rebote corto (`ease-spring`); al pulsar se estira, como un pulgar que empuja. Encendido: pista `ink`, disco `sol` con un halo pequeño. `ON`/`OFF` se cruzan con el disco, así que nunca depende solo del color.

- **Props**: `checked`/`defaultChecked`, `onChange(bool)`, `label` (nombre accesible), `showLabel` (pinta la etiqueta a la izquierda y la fila entera es pulsable), `onText`, `offText`, `disabled`.
- Efecto inmediato (luz, sonido, modo). Si el cambio requiere confirmar, usa `KeyButton`.
- Vibra 6 ms donde hay vibración. Con movimiento reducido el disco cambia de lado sin viajar.
