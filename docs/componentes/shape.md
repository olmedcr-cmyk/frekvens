# Shape

Forma geométrica plana para el arte de un tile, una portada o un póster: once siluetas que se combinan como piezas.

- **Props**: `name` (`disc` · `ring` · `half` · `quarter` · `arch` · `pill` · `arrow` · `cross` · `steps` · `slash` · `cloud`), `size` (px, 96 por defecto), `tone` (`ink` · `paper` · `klein` · `rams` · `sol` · `verde` · `tabaco` · `rec`; sin tono hereda el color del texto), `soft` (tono sobre tono: 16 % del color heredado), `rotate` (grados), `label`.
- Es decorativa: sin `label` queda oculta a los lectores de pantalla. Si la forma significa algo (una flecha de dirección), dale `label`.
- Dentro de un `Tile` de color, úsala con `soft` y sin `tone`: toma el color del texto del tile y nunca rompe el contraste.
- Una forma grande por superficie. Para pictogramas de puntos usa `DotMatrix`; para glifos de interfaz, `Icon`.
