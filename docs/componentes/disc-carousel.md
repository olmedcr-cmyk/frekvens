# DiscCarousel

Elegir entre discos: el elegido en el centro, los vecinos más pequeños a los lados; al reproducir, el disco gira. La etiqueta del centro es el color o la imagen (`src`) del álbum, rutina o lista.

- **Props**: `items` (`[{title, subtitle, tone, src, badge}]`), `value`/`defaultValue`, `onChange(i)`, `playing`, `onPlay(i)`, `size` (220), `label`.
- **Teclado**: ← → para cambiar, Enter para reproducir. Funciona solo o con `ClickWheel`.
