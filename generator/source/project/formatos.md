# Formatos

Frekvens se diseña primero para el móvil en una mano y se adapta hacia arriba y hacia abajo. La pantalla `PantallaFormatos` muestra cada formato montado con componentes reales.

| Formato | Lienzo | Margen | Columnas | Reglas |
| --- | --- | --- | --- | --- |
| Móvil | 390 × 844 (mín. 320) | `space-5` | 2 | El formato base. Título de dos líneas, un héroe, mandos en el tercio inferior, `TabBar` flotante. |
| Móvil compacto | 320 de ancho | `space-4` | 2 | Todo componente cabe sin scroll horizontal (probado). Usa `numeral-xl` solo en la vista principal; dentro de `Tile` el valor ya va a 64 px. |
| Tableta | 820–1024 | `space-6` | 4 | Dos pantallas móviles lado a lado (lista + detalle). `Sheet` sigue saliendo de abajo, centrada y con un ancho máximo de 560 px. |
| Escritorio | ≥ 1280 | `space-8` | 6–12 | Paneles de `Tile`/`Strip` en rejilla de 6; `AgentWidget` fijo abajo a la derecha; `Ticker` a todo el ancho. Contenido de lectura a 60–75 caracteres. |
| Widget S | 2 × 2 (≈ 170 px) | `space-4` | 1 | Un `Tile`: título, dato. Nada pulsable dentro salvo el widget entero. |
| Widget M | 4 × 2 (≈ 364 × 170) | `space-4` | 2 | Un `Strip` o dos `Tile`. |
| Widget L | 4 × 4 (≈ 364 × 382) | `space-3` | 2 | Un héroe (`BarMeter`, `LineChart`) + dos `Tile`. |
| Reloj | 41–45 mm (≈ 198 × 242) | 22 px | 1 | Fondo siempre negro. Un número en `DotMatrix` o `dot-hero`, una etiqueta mono, un nivel. Sin texto corrido. |
| Actividad en vivo / isla | ≈ 364 × 84 | 12–18 px | — | Píldora negra: `VoiceOrb` o `Timer` pequeño + nombre + un número `dot`. |
| Embebido (web de terceros) | panel de 380 × ≤ 600 | `space-4` | 1 | `AgentWidget`: lanzador de 64 px y panel con `radius-xl`. |

## Reglas que no cambian con el formato

1. Objetivos táctiles ≥ 44 px; la acción principal ≥ 56 px. En reloj, toda la pantalla es la tecla.
2. Un número héroe por vista, también en un widget.
3. Los tonos de bloque no cambian; lo que cambia es cuántos caben (widget S: uno).
4. El texto no baja de 11 px ni en el reloj.
5. Se reorganiza por columnas de la rejilla; nunca se escala una pantalla entera hacia abajo.
