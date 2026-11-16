# FillCard

Tarjeta de progreso cuyo fondo se llena hasta el valor: el nombre arriba, la cifra abajo y el color avanzando de izquierda a derecha.

- **Props**: `title`, `value`, `max` (100), `unit` (`%`; `''` para quitarla), `caption`, `icon`, `tone` (`rams` por defecto), `format`, `onClick` (la convierte en tecla).
- El texto cambia de color justo donde pasa el relleno, así que se lee igual con un 5 % que con un 95 %.
- Para una lista corta de avances (ejercicios, depósitos, cargas). Un solo tono por tarjeta y como mucho tres tonos en la lista. Si solo hay un número sin tope, usa `Stat`.
