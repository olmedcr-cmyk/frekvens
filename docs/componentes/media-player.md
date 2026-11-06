# MediaPlayer

Reproductor de vídeo. Tecla de play `rams` grande en el centro mientras está en pausa; barra de control flotante en píldora oscura con play, posición (con marcas de capítulo en `sol`), tiempo, sonido, subtítulos y pantalla completa. Al reproducir, la barra se esconde y vuelve al pasar el puntero o al enfocar.

- **Props**: `src`, `poster`, `title`, `badge` (chip `sol` arriba a la derecha), `chapters` (segundos), `captions` (URL .vtt) + `captionsLang` + `captionsOn`, `ratio` (`'16 / 9'`), `autoPlay`, `loop`, `muted`, `duration` (solo para el modo demo), `children` (póster de demo sin `src`).
- **Teclado** con el reproductor enfocado: Espacio/K play, ← → 5 s, M sonido, C subtítulos, F pantalla completa. La posición es un `slider` accesible.
- Sin `src` simula el tiempo: sirve para maquetas y para UI generada antes de tener el vídeo.
- Autoplay solo silenciado y en bucle (fondos); nunca con sonido.
