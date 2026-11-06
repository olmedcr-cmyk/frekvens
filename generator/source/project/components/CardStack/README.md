# CardStack

Cartas de color apiladas que se solapan un radio: al tocar una, crece con frenada larga (`dur-grow`, `ease-arrive`) y muestra su título y su número. Listas cortas con personalidad: rutinas, playlists, categorías.

- **Props**: `items` (`[{badge, icon, title, subtitle, value, tone}]`), `value`/`defaultValue` (índice abierto), `onChange(i)`.
- 3–5 cartas, cada una de un tono distinto (`klein-soft`, `sol`, `rams`, `verde`, `lavanda`…). La última no se solapa con nada.
- La insignia es redonda con borde discontinuo: letra, número o icono.
