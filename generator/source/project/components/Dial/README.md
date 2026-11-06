# Dial

Mando circular: disco `ink`, punto indicador en `paper`, aguja `sol` y marcas de paso alrededor. Se arrastra girando o con flechas del teclado.

- **Props**: `value`/`defaultValue`, `onChange(n)`, `min` (0), `max` (8), `size` (160 px), `tone` (`ink` · `klein` · `tabaco`), `label` (mono, se muestra como `PWR:4`).
- Para valores discretos y pocos (≤ 12 pasos): intensidad, modo, nivel. Para rangos continuos usa `Slider`.
- En rejilla de 2×2 con `space-6` de separación como panel de mandos. La etiqueta siempre debajo, nunca dentro del disco.
