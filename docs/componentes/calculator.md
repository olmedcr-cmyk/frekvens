# Calculator

Calculadora plana: la cifra grande arriba, la operación en curso encima en pequeño y una rejilla de 4 × 5 teclas iguales. Números en `paper`, operadores en `well`, `=` en `ink`, `0` doble. La variante `round` usa teclas circulares.

- **Props**: `variant` (`keys` · `round`), `keyboard` (escucha el teclado físico: dígitos, + − * /, Enter, Esc, Retroceso).
- Coma decimal española; resultado redondeado a 10 decimales; dividir entre 0 muestra "Error". La pantalla es `aria-live`.
