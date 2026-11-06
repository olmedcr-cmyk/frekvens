# Beam

Haz de puntos que recorre el borde de una caja mientras algo trabaja: un tren de siete puntos `klein` (y su eco a media opacidad) da la vuelta sobre una pista punteada tenue. Para el campo de prompt mientras genera, una tarjeta que se está rellenando, un agente ocupado.

Aprendido de *Border beam* (libraries.dev), en el idioma de Frekvens: puntos en vez de luz.

- **Props**: `active` (true), `tone` (`klein` · `rams` · `sol` · `ink`), `radius` (24, igual que la caja que envuelve), `label` (se anuncia como estado: "Generando"), `children`.
- Envuelve cualquier caja: `h(F.Beam, {active: busy, label: 'Generando'}, h(F.PromptBox, …))`. Pone `aria-busy`. Con movimiento reducido, el tren se queda quieto y la pista sigue indicando que trabaja.
- Solo uno por pantalla, y solo mientras hay trabajo de verdad: si se queda encendido, deja de significar algo.
