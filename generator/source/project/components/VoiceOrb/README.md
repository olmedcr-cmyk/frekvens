# VoiceOrb

Orbe de puntos para la voz: el estado de un agente de voz se lee en cómo se mueven los puntos. **En espera**: quietos y apagados. **Escuchando**: laten desde el centro según el nivel del micrófono. **Pensando**: un barrido gira como un radar. **Hablando**: ondas que salen hacia fuera.

- **Props**: `state` (`idle` · `listening` · `thinking` · `speaking`), `level` (0–1, nivel de audio real si lo tienes), `size` (200), `grid` (15), `tone` (`ink` · `klein` · `rams` · `paper`), `caption` (texto bajo el orbe; `false` lo oculta), `label`.
- El texto de estado se anuncia (`aria-live`). Con movimiento reducido, el orbe queda quieto y el estado se dice en texto.
