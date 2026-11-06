# Ticker

Cinta que corre en horizontal: noticias, marcadores, horarios, valores. Se pausa sola al pasar el puntero o al enfocarla, y lleva siempre su propia tecla de pausa (todo lo que se mueve más de 5 s debe poder pararse).

- **Props**: `items` (strings o `{label, value, delta}`; `delta` negativo pinta ▼, positivo ▲ en negrita: la flecha lleva el significado, no el color), `speed` (segundos por vuelta, 30), `tone` (`ink`), `label`.
- Con movimiento reducido no corre: se convierte en una fila desplazable. Una cinta por pantalla, nunca información crítica solo ahí.
