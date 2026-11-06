# Notch

Isla de IA en la parte superior (el notch del portátil o la isla del móvil): en reposo es una píldora negra con un orbe y un piloto; al pasar el puntero o al tocarla, crece con un rebote corto y muestra el estado, lo que está diciendo o haciendo, el progreso y 1–3 acciones.

- **Props**: `state` (`idle` · `listening` · `thinking` · `speaking` · `done`), `name`, `peek` (texto de la píldora), `text`, `progress` (0–100), `actions` (`[{label, icon, onClick}]`, la primera es la principal), `expanded` (controlado) o `defaultExpanded`, `tone`, `inline` (maquetas; si no, fija arriba al centro).
- Siempre negra, en cualquier tema: es hardware. El estado se dice en texto además de en el piloto.
