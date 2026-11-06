# Viewfinder

Visor de cámara y escáner: rejilla de tercios, HUD arriba, obturador grande, miniatura con el número de capturas y modos Foto / Vídeo / Escanear (con esquinas de enfoque `sol`).

- **Props**: `live` (usa la cámara real con permiso), `mode`/`defaultMode`, `onModeChange`, `onShoot(mode)`, `shots`, `ratio` (`'3 / 4'`), `children` (vista simulada).
- Siempre negro, en cualquier tema. Sin `live`, enseña una vista de puntos: sirve para maquetas y para UI generada.
