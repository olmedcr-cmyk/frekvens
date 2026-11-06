# CaptureKey

Tecla de captura, como una tecla física dedicada: un toque captura (pantalla, foto, enlace), mantener graba voz mientras dura la pulsación. Todo va a un único espacio que la IA ordena después.

- **Props**: `onCapture({kind, ms})`, `onVoiceStart()`, `hint`, `label`.
- Estados visibles: reposo (punto), destello, escuchando (orbe sobre `rec`), guardado (`verde`). Funciona con Espacio/Enter igual que con el dedo.
