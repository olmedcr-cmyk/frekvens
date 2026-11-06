# Tipografía — decisiones

Tres voces, cada una con un oficio. Nunca se mezclan dentro de la misma línea.

| Voz | Familia | Oficio | Estilos |
| --- | --- | --- | --- |
| La que habla | Archivo | Todo lo que se lee: títulos, cuerpo, valores grandes | `display-xl`, `title`, `headline`, `numeral-xl`, `body`, `body-strong`, `caption` |
| La máquina | Doto | Números que cambian solos: tiempo, cuentas, contadores | `dot-hero`, `dot-display`, `dot-label` |
| La etiqueta | IBM Plex Mono | Nombres técnicos, unidades, metadatos | `label`, `readout` |

## Por qué estas

- **Archivo** es una grotesca de origen industrial con anchos y pesos completos: aguanta el 800 apretado de un título y el 400 aireado de un número enorme sin cambiar de familia. Es el sustituto libre de las grotescas suizas de las referencias.
- **Doto** es una fuente de matriz de puntos: hace que el tiempo se vea como en una pantalla de aparato y conecta los números con `DotMatrix`, `Timer` y `VoiceOrb`. Solo se usa para cifras y palabras cortas en mayúsculas.
- **IBM Plex Mono** da la capa de ingeniería: `PWR:4`, `96.00kHz · 24 Bit`, `{0032}`. Mono para que las etiquetas se alineen como en un panel.

## La firma: negro apretado contra fino enorme

El título va en Archivo 800 con tracking −3 % y la cifra protagonista en Archivo 400 a 96 px con tracking −4 %. Ese contraste (pesado y pequeño arriba, ligero y gigante abajo) es lo que hace reconocible una pantalla Frekvens. No lo inviertas.

## Reglas

1. **Título en dos líneas**: la primera dice qué es (`ink`), la segunda el estado (`ink-muted`, mismo tamaño y peso). Nunca un subtítulo más pequeño debajo.
2. **Un número héroe por pantalla**: o `dot-hero` (si cambia solo) o `numeral-xl` (si es un dato).
3. **Unidades pequeñas y pegadas**: `42′`, `78%`, `21.3kWh.` — la unidad en `readout` o en el mismo estilo a la mitad de tamaño, nunca separada por un espacio grande.
4. **Cifras tabulares siempre** en tiempo, dinero y contadores (`font-variant-numeric: tabular-nums`).
5. **Mayúsculas solo en mono** (`label`), con tracking +8 %. Archivo va siempre en caja de oración.
6. **Interlineado**: 0.9–0.95 para display, 22/16 para cuerpo, 25/17 para conversación. Mínimo 1.3 en cualquier texto de más de una línea por debajo de 24 px.
7. **Medida**: 30–60 caracteres por línea en móvil; el cuerpo nunca pasa de 3 líneas fuera de la conversación.
8. **Tamaño mínimo** 11 px (solo `label`); texto legible 13 px o más.
9. **Sin cursiva, sin subrayado** salvo enlaces en texto corrido.
10. **Español**: tildes también en mayúsculas (`SESIÓN`), signos de apertura `¿¡`, comillas « » o " " pero no mezcladas, `·` como separador técnico, espacio fino antes de `%` no se usa (`78%`).

## Escala

| Estilo | Tamaño / interlínea | Peso | Uso |
| --- | --- | --- | --- |
| `dot-hero` | 120 / 0.9 | 800 | Temporizador, cuenta 3·2·1 |
| `numeral-xl` | 96 / 0.9 | 400 | Dato protagonista |
| `dot-display` | 64 / 1 | 800 | Lectura grande secundaria |
| `display-xl` | 56 / 0.95 | 800 | Título de pantalla |
| `title` | 32 / 1 | 800 | Título de sección, hoja |
| `dot-label` | 24 / 28 | 700 | Estado tipo LCD |
| `headline` | 20 / 24 | 700 | Nombre de Tile, fila |
| `body` | 16 / 22 | 400 | Texto corrido |
| `caption` | 13 / 18 | 500 | Ayudas, notas |
| `readout` | 14 / 18 mono | 500 | Datos técnicos |
| `label` | 11 / 14 mono | 500 | Etiquetas en mayúsculas |

En UI generativa, el texto se compone con `Text variant="…"`: un modelo elige el estilo por nombre, nunca un tamaño.
