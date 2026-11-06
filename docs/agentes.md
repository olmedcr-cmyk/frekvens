# Skill para agentes

Cómo debe trabajar un agente de código (Claude Code, Cursor, Codex…) con Frekvens. La idea viene de la skill de libraries.dev: no basta con un catálogo; el agente tiene que **ver dónde encaja cada pieza en el proyecto, ponerla conectada al estado real y afinarla con pocas opciones**. Son cuatro órdenes.

## `frekvens revelar`

Lista el catálogo en una línea por pieza, agrupado (Botonera, Controles, Tiempo, Puntos, Datos, Gráficas, Arrastre, Conversación…). Responde también a "¿qué hay en Frekvens?".

## `frekvens revisar` (solo lectura)

Lee el stack y busca huecos donde una pieza encaja. Devuelve una lista por archivo: **qué pieza va dónde y por qué**. No toca nada.

| Si encuentra… | Propone |
| --- | --- |
| Una espera (spinner, "Cargando…") | `Skeleton` (< 3 s) o `DotLoader` con texto (> 3 s) |
| Un campo de chat o de prompt | `Composer` / `PromptBox`, y `Beam` mientras genera |
| Un botón de micrófono | `VoiceOrb`; `VoicePosition` si la app sabe de qué lado viene la voz |
| Un punto verde de "en línea" | `Avatar` con `status` (aura) |
| Un número importante | `Readout` o `Stat` |
| Un contador o progreso por pasos | `DotGrid` (contar) o `Steps` |
| Elegir asiento, día u hora | `DotGrid` con `select` |
| Una lista que se reordena | `Sortable`; columnas de estado → `Board` |
| Un horario o un dato que cambia | `SplitFlap` / `FlapBoard` |
| Un `confirm()` destructivo | `Dialog` `danger` o `HoldButton` |
| Un gráfico genérico | `AreaChart`, `DonutChart`, `Scatter`, `RadarChart`, `LineChart` |
| Un lienzo, diagrama o plano | `Blueprint` |

## `frekvens aplicar [pieza]`

Elige la pieza que mejor encaja con el trabajo actual (o la que se nombra), la importa, la coloca con las props correctas y **la conecta al estado real** de la app: `busy` al estado de la petición, `status` a la presencia, `value`/`onChange` a la fuente de datos. Nunca deja datos de ejemplo.

Reglas al aplicar:

1. Lee *Composición* y respeta pila, gap, padding y radios concéntricos.
2. Una acción `klein` por pantalla; un `Beam` y un aura por zona.
3. Toda pieza que se arrastra conserva su alternativa de teclado.
4. Textos en español, verbo primero, tuteo.
5. Comprueba con axe y con movimiento reducido antes de dar el trabajo por hecho.

## `frekvens afinar "descripción"`

Convierte una descripción ("más tranquilo", "más cálido", "que se vea de lejos") en **los mínimos cambios de props o tokens**, dentro de sus rangos, y para los dos temas:

| Pide | Cambia |
| --- | --- |
| Más tranquilo | `ease-travel` en vez de `ease-ui`, `interval` más largo, `Aura` sin `is-fast` |
| Más cálido | `tone` de `klein` a `rams` o `tabaco` |
| Que se vea de lejos | `size` al siguiente escalón (56 → 88 → 120), `Readout size="hero"` |
| Menos ruido | quita la pieza que repite información; baja a un tono de bloque |

## Ejemplos de petición

- "Revisa mi proyecto y dime dónde encaja Frekvens."
- "Pon un haz en el campo de prompt mientras responde."
- "Que el avatar de cada agente de la barra lateral respire según su estado."
- "Haz la reserva de plazas con puntos."
