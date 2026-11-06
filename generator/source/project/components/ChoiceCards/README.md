# ChoiceCards

Opciones grandes en tarjeta para decidir con información: planes, paquetes, tipos de cuenta. Cada tarjeta lleva el aro que se llena (lenguaje de estados), título, precio, explicación y ventajas; la elegida se marca con un borde `ink`.

- **Props**: `options` (`[{value, label, price, period, hint, features, badge, tone}]`), `value`/`defaultValue`, `onChange(v)`, `columns`, `label`.
- Patrón ARIA radiogroup: flechas para moverse. 2–4 opciones; la recomendada lleva `badge`.
