# RotarySelector

Selector de fuente de amplificador: pomo `ink` con una barra que apunta a la posición elegida y las opciones escritas alrededor en mono, giradas siguiendo el arco. Se gira arrastrando, con las flechas o pulsando una etiqueta.

- **Props**: `options` (`['tuner','phono','aux','cd','tape','usb']` o `[{value,label}]`), `value`/`defaultValue`, `onChange(v)`, `size` (200), `span` (300°), `label`.
- Patrón ARIA slider con `aria-valuetext` = la opción. Vibra 6 ms en cada paso donde hay vibración. Para 2–4 opciones, mejor `Segmented`.
