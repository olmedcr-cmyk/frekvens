# ListRow

Fila con filete superior y número o icono grande a la izquierda: pasos, historial, ajustes. Sin tarjetas, sin sombras.

- **Props**: `index` (número grande), `icon` (alternativa al número), `title`, `detail`, `value` (mono, a la derecha), `onClick` (la convierte en botón).
- Pasos de un proceso: `index` 1…n. Ajustes: `icon` + `value`. Nunca chevron decorativo: si navega, el `value` es `→`.
