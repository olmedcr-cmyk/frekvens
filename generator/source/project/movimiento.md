# Movimiento y transiciones

Frekvens se mueve como un mecanismo: responde al instante, viaja con intención y frena largo. Nada aparece de golpe y lo sólido no se desvanece atravesando: se desplaza, escala, rueda o se descubre.

## Tokens

| Token | Valor | Para |
| --- | --- | --- |
| `dur-press` | 90 ms | Tecla pulsada (squeeze a 0.965) |
| `dur-fast` | 150 ms | Cambios de estado, salidas de popover |
| `dur-base` | 220 ms | Abrir popovers, cambio de pestaña, cambio de pantalla |
| `dur-sheet` | 500 ms | Hojas, revelados, vuelta tras arrastrar |
| `dur-grow` | 640 ms | Algo que crece: carta, cajón, anillo, giro del reloj de arena |
| `stagger` | 50 ms | Desfase entre elementos de una lista |
| `ease-ui` | `cubic-bezier(0.3, 0.75, 0.1, 1)` | Respuesta por defecto |
| `ease-arrive` | `cubic-bezier(0.25, 0.8, 0.25, 1)` | Llegadas y crecimientos largos |
| `ease-travel` | `cubic-bezier(0.45, 0, 0.1, 1)` | Algo que viaja de A a B |
| `ease-throw` | `cubic-bezier(0.25, 1, 0.5, 1)` | Soltar tras arrastrar |
| `ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Salidas |
| `ease-settle` | `cubic-bezier(0.22, 1, 0.36, 1)` | Aterrizajes cortos (250–300 ms): disco del `Switch`, burbujas. Frena en el último tercio, sin rebote |
| `ease-press` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | La pulsación (escala 0.97, 90–180 ms) |
| `shadow-lift` | 1 px + sombra corta | Tecla o tarjeta bajo el ratón. En oscuro, una superficie más clara en vez de sombra |
| `shadow-float` | sombra cercana | Popovers, menús, toasts y lo que se arrastra |

## Catálogo de transiciones

| Situación | Cómo | Componente |
| --- | --- | --- |
| Pulsar | Escala 0.965 + `shadow-press`, `dur-press` | `KeyButton`, `HoldButton`, chips |
| Encender | El disco viaja al otro extremo (250 ms `ease-settle`), se estira al pulsar y se rellena de `sol`; `ON`/`OFF` se cruzan | `Switch`, `Rocker` (bascula ±14°) |
| Abrir popover | Desde el borde del disparador: escala .96→1 y sube 6 px, `dur-base` `ease-ui`; contenido con 25 ms de desfase | `Select`, `Menu` |
| Cerrar popover | Hacia donde se abrió, `dur-fast` `ease-exit` | `Select`, `Menu` |
| Hoja | Sube desde abajo, `dur-sheet` `ease-ui`; arrastre libre; al soltar, `ease-throw` | `Sheet` |
| Elegir entre opciones | La pieza elegida viaja con un muelle que conserva el impulso (`useFollow`); el panel nuevo sube 8 px | `Segmented`, `Tabs` |
| Abrir cajón | Sale 10 px, el tirador se alarga, el contenido se despliega con `dur-grow` | `Cabinet` |
| Crecer | `dur-grow` `ease-arrive`: arranque suave, frenada larga | `CardStack`, `ProgressRing` |
| Número que cambia | Rueda desde abajo, cifras tabulares | `Stepper`, `Timer` (3·2·1 escala desde 1.25) |
| Entrar en pantalla | Escalonado 50 ms: `rise`, `scale`, `wipe`, `focus` | `Reveal` |
| Cambio de pantalla | La vieja se funde en 120 ms; la nueva sube 8 px en 200 ms. Nunca deslizar de lado | View Transitions (en `bundle.css`) |
| Aviso | Sube 12 px y aparece; sale más rápido | `Toast` |
| Tiempo | Seno para el péndulo; lineal para la arena; pasos para los pilotos | `Pendulum`, `Hourglass`, `LED` |
| Voz | Puntos que laten, barren o emiten ondas según el estado | `VoiceOrb` |
| Puntero | Los puntos cercanos crecen hasta un 60 % | `DotMatrix reactive` |

## Reglas

1. Toda salida es más corta que su entrada y vuelve hacia donde nació.
2. Nada sólido se desvanece atravesando otra cosa: se desplaza o se escala.
3. Un solo movimiento protagonista a la vez; el resto acompaña con desfase.
4. Lo que el usuario arrastra sigue al dedo sin transición; la transición empieza al soltar.
5. Los pilotos parpadean en dos pasos (encendido/apagado), nunca en fundido.
6. Sin rebotes, sin parallax, sin autoavance.
7. **Movimiento reducido**: se quitan desplazamientos, escalados, giros y oscilaciones; se mantienen cambios de color y la respuesta directa al puntero. Cada estado final se entiende sin haber visto la animación.

## Detalle fino

Lo que hace que se note que está bien hecho. Aprendido de la skill *stageshow* de Benji Taylor (MIT) y pasado a las piezas de Frekvens.

| Detalle | Cómo |
| --- | --- |
| **Piezas que viajan** | El disco del `Switch` va de un extremo a otro (250 ms, `ease-settle`) y se estira 10 px mientras pulsas. La pieza clara de `Segmented` y la de `Tabs` se mueven con un **muelle que conserva el impulso** (`useFollow`: rigidez 0.25, amortiguación 2·√k·0.95, paso de 60 Hz): si cambias de opción a mitad de camino, gira desde donde está sin frenar a cero. Una transición CSS volvería a arrancar parada. |
| **Aterrizar sin rebote** | Nada rebota ni late al llegar: frena en el último tercio y queda quieto. |
| **Hover** | Un paso del propio color (6 % más oscuro; en oscuro, 8 % más claro). Nunca cambiar a gris. Teclas y tarjetas suben 1 px con `shadow-lift`. |
| **Pulsar** | La pieza se hunde (escala 0.97 o 2 px abajo con sombra recogida) y la etiqueta no se mueve dentro. |
| **Foco** | El anillo no aparece: se cierra sobre la pieza desde 8 px (220 ms, `ease-arrive`). Solo con teclado. |
| **Casilla** | El ✓ se traza en 220 ms. |
| **Campos** | Al pasar, un filete de 1.5 px; al enfocar, el filete se oscurece y el fondo se aclara. |
| **Lo que se arrastra** | Escala 1.03, 1.5° de giro, sombra más honda y `will-change: transform` solo en esa pieza; al soltarla aterriza plana. Lo que queda detrás es un hueco con filete, no una copia gris. |
| **Sombras** | Pequeñas y cercanas (luz cenital). El disco del `Switch`: `0 0.5px 1.5px` — una sombra grande ensucia la pista. |
| **Texto que cambia** | `ON`/`OFF` se cruzan moviéndose 8 px; nunca se sustituyen de golpe. |

Con movimiento reducido: los viajes se vuelven saltos, las piezas no suben ni se estiran, el ✓ aparece entero y el foco aparece sin cerrarse. Los colores sí cambian.
