# LED

Piloto de máquina: un rectángulo de luz de 10×6 px con halo. Estado de un aparato (calentando, listo, grabando) junto a una etiqueta mono.

- **Props**: `tone` (`rec` · `verde` · `sol` · `klein`), `on` (true), `blink` (parpadeo de 1.2 s en dos pasos, sin fundido), `children` (etiqueta).
- Siempre con etiqueta: el color solo no dice nada. Se anuncia "(encendido)/(apagado)" a lectores de pantalla.
- En fila sobre teclas (como los pilotos de una cafetera) o al lado de un `Chip`.
