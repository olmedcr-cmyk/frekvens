# Message

Un turno de conversación. **Usuario**: bocadillo `ink` a la derecha. **Asistente**: sin bocadillo, texto a la izquierda con un avatar redondo que usa el lenguaje de estados (puntos mientras escribe, disco al terminar). **Sistema**: línea mono centrada.

- **Props**: `role` (`user` · `assistant` · `system`), `children` (texto), `streaming` (punto `rams` parpadeando al final), `thinking` (muestra `DotLoader` en vez de texto), `ui` (spec JSON: incrusta UI generada con `Render`), `actions` (para esa UI), `name`, `meta` (hora, modelo), `onCopy`, `onRetry`.
- El texto del asistente es `body` a 17/25: se lee, no se escanea. La UI incrustada va debajo del texto, nunca en lugar de la respuesta.
