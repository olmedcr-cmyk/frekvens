# Deck

Carrusel de cartas apiladas: la de arriba se arrastra y, si pasa de 90 px, sale lanzada (`ease-throw`) y se va al fondo del mazo. También con botones y ← →. Para elegir entre opciones de una en una (rutinas, recomendaciones, onboarding).

- **Props**: `children` (una carta cada uno; normalmente `Tile`), `height` (280), `onChange(i)`, `label`.
- Se ven tres cartas como mucho; el contador `01 / 05` dice dónde estás. No lo uses para contenido que hay que comparar: para eso, `Pager` o `Grid`.
