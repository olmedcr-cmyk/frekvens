# Eyes

Dos ojos que dicen cómo está el agente: atento, contento, enfadado, con sueño, pensando o sorprendido. Parpadean cada pocos segundos.

- **Props**: `mood` (`neutral` | `happy` | `angry` | `sleepy` | `thinking` | `surprised`), `size`, `tone`, `still` (sin parpadeo), `label` (por defecto, el nombre del estado).
- El estado se anuncia como texto alternativo, no solo con la forma. Con movimiento reducido no parpadean.
- Uno por pantalla, junto al texto que explica qué pasa. Para el estado de voz (escucha, habla), `VoiceOrb`.
