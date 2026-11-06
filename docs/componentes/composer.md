# Composer

Barra para escribir o hablar: textarea en píldora que crece hasta 160 px, tecla de micrófono y tecla de enviar `klein`. Al hablar, la barra se enmarca en `rec`, aparece un `VoiceOrb` pequeño y la tecla pasa a ■.

- **Props**: `value`/`onChange`, `onSend(text)`, `placeholder`, `suggestions` (pinta `Suggestions` encima), `voice` (true), `listening` + `onListen(bool)` (para controlar el micro desde fuera), `level` (nivel de audio), `listeningText`, `busy` (deshabilita enviar y muestra `DotLoader`), `label`.
- Enter envía; Mayús+Enter es salto de línea. Enviar está deshabilitado con el campo vacío.
