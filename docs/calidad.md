# Calidad — heurísticas, pruebas y casuísticas

Cómo cumple Frekvens las heurísticas de usabilidad y accesibilidad, qué se ha probado y qué casos cubre cada componente. Úsalo como checklist al diseñar una pantalla nueva.

## Pruebas automáticas (noviembre 2026)

| Prueba | Alcance | Resultado |
| --- | --- | --- |
| axe-core 4.10 (WCAG 2.0/2.1/2.2 A y AA + buenas prácticas) | 145 vistas (114 componentes y 31 pantallas) × tema Papel y Carbón = 290 páginas | **0 infracciones** |
| Contraste de texto | Todos los pares de tokens + lo que pinta cada vista | Todo ≥ 4.5:1 (≥ 3:1 en texto grande y marcas). `ink-faint` queda a 2.7:1 a propósito: solo deshabilitado y decoración |
| Tamaño de objetivo | Todo lo pulsable | ≥ 44 px. Excepción: la casilla de `Checkbox` mide 32 px, pero toda su fila (casilla + texto, ≥ 44 px) es pulsable |
| Foco visible | Tabulación por cada vista | Anillo sólido `focus` de 2 px en todo control. En `Composer` y `PromptBox` el anillo está en la caja que contiene el campo, y en el `slider` de `MediaPlayer`, en el disco de la posición |
| Radios concéntricos | Cada hijo pegado a la esquina de su caja, en las 145 vistas | **0 desajustes** (radio de dentro = radio de fuera − padding, ±4 px; los discos y píldoras dentro de una caja quedan fuera de la regla) |
| Teclado y comportamiento | 34 pruebas de interacción | **34/34**: Calculator (12 × 3 y ÷ 0), Board (coger, mover y soltar con teclado; arrastre con puntero), Blueprint (mover con flechas y Mayús, zoom), RotarySelector, Fader, DotGrid (elegir y ocupadas), VoicePosition (anuncio), Select (abrir, mover, elegir, Esc, escribir para saltar), Menu, Sheet y Dialog (foco atrapado; en destructivo empieza en Cancelar), CommandBar (filtrar y ejecutar), Tabs, Calendar, RadioGroup, ChoiceCards, Checkbox, DataTable (ordenar), NoteEditor (Enter y `/`), Deck, ClickWheel, HoldButton (soltar antes no confirma), pausa del Ticker, MediaPlayer, Wheel, Render con tipo desconocido, Frekvens Lang con líneas pendientes, AgentWidget, movimiento reducido, reflujo a 320 px (23 componentes) |
| Errores de JavaScript | 290 páginas | 0 |

## Las 10 heurísticas de Nielsen

| Heurística | Cómo la cumple Frekvens |
| --- | --- |
| 1. Visibilidad del estado del sistema | Lenguaje de estados por forma (`StateMark` aro/puntos/disco), `Aura` para disponible, `Beam` mientras se genera, pilotos `LED` con etiqueta, `Readout` y `Timer` en vivo, `DotLoader`/`Skeleton` en las esperas, `VoiceOrb` con 4 estados de voz, `Steps` en los procesos, `aria-live` en los cambios importantes. |
| 2. Relación con el mundo real | Metáforas físicas: teclas que se hunden, diales, interruptores basculantes, archivero con cajones, reloj de arena, metrónomo, panel de paletas, rueda estriada. Idioma del usuario (español, tuteo, verbo primero). |
| 3. Control y libertad | `Toast` con "Deshacer", Esc en toda capa, `Sheet` se descarta arrastrando, `Ticker` y `MediaPlayer` se pausan, colgar en la misma tecla que hablar (`AgentWidget`). |
| 4. Consistencia y estándares | Un solo juego de tonos, radios y tiempos; patrones ARIA estándar (combobox, menu, dialog, tabs, radiogroup, slider, switch); las mismas teclas en el mismo sitio (Empezar/Parar comparten hueco). |
| 5. Prevención de errores | `HoldButton` y `SlideToStart` para lo irreversible; límites en `Stepper`, `Wheel`, `Dial`; opciones deshabilitadas que se saltan con el teclado; validación al salir del campo. |
| 6. Reconocer antes que recordar | Etiquetas mono siempre visibles, valores elegidos a la vista (`Select`, `Segmented`), `Suggestions` en conversación, marcas de días con sesión en `Calendar`. |
| 7. Flexibilidad y eficiencia | Atajos de teclado (reproductor: Espacio, K, M, C, F; Select: escribir para saltar; calculadora y pads con el teclado físico; plano con flechas y Mayús), rueda del ratón en `VolumeWheel`, arrastre en `Dial`, `Deck`, `Sheet`; voz o texto en `Composer`. |
| 8. Estética y diseño minimalista | Un número héroe, una acción `klein`, dos tonos de bloque como máximo, sin sombras ni decoración que no informe. |
| 9. Reconocer, diagnosticar y recuperarse de errores | `Banner` de error con causa y acción ("No te hemos cobrado" + Reintentar), errores de campo que dicen qué hacer, `Render` que nunca rompe con un spec malo. |
| 10. Ayuda y documentación | `Tooltip` para controles sin texto, `hint` en campos y opciones, `EmptyState` que dice qué hacer, y este manual + `frekvens.schema.json` para quien diseña o genera. |

## Accesibilidad (WCAG 2.2 AA), lo esencial

- **Percibir**: contraste comprobado en los dos temas; nada se comunica solo por color (▲▼, palabras en `LED`, formas en `StateMark`); subtítulos en `MediaPlayer`; textos alternativos en gráficos (`LineChart`, `BarMeter`, `DotMatrix`).
- **Operar**: todo funciona con teclado; objetivos ≥ 44 px (la acción principal, ≥ 56 px); lo que se mueve más de 5 s se puede pausar; sin parpadeos de más de 3 por segundo; arrastres siempre con alternativa por botón o teclado (`Deck`, `SlideToStart`, `Sheet`, `Dial`).
- **Entender**: etiquetas visibles, errores en texto, comportamiento predecible (Esc cierra, el foco vuelve a quien abrió).
- **Robusto**: roles y estados ARIA nativos; `Render` acepta solo componentes del catálogo.
- **Movimiento reducido**: se quitan desplazamientos, giros y oscilaciones; la cinta deja de correr; cada estado final se entiende sin animación.

## Casuísticas cubiertas

| Caso | Con qué |
| --- | --- |
| Primera vez / onboarding | `Steps`, `Pager`, `RadioGroup`, `KeyButton pill` · ver `PantallaEstados` |
| Cargando | `Skeleton` (< 3 s), `DotLoader` + texto (> 3 s) |
| Vacío | `EmptyState` con acción |
| Sin conexión | `Banner warn` + la tarea sigue funcionando |
| Error recuperable | `Banner error` con acción, `TextField error` |
| Confirmar algo irreversible | `HoldButton`, `SlideToStart` |
| Deshacer | `Toast` con acción |
| Elegir un valor | `Segmented` (2–4), `Select` (5–8), `RadioGroup` (con explicación), `Wheel` (horas), `Calendar` (fechas) |
| Ajustar un nivel | `Slider`, `Dial`, `VolumeWheel`, `Stepper` |
| Medir tiempo | `Timer`, `Stopwatch`, `Hourglass`, `Pendulum` |
| Ver datos | `Readout`, `Tile`, `Strip`, `BarMeter`, `LineChart`, `LevelBars`, `Gauge`, `ProgressRing`, `DotGrid` |
| Recorrer contenido | `Pager` (carrusel con asomo), `Deck` (cartas apiladas), `CardStack`, `Cabinet`, `Tabs` |
| Información que corre | `Ticker`, `SplitFlap` |
| Vídeo y audio | `MediaPlayer`, `AudioTrack` |
| Conversación y voz | `Message`, `Composer`, `Suggestions`, `VoiceOrb`, `AgentWidget` |
| UI generada por un modelo | `Render` (spec JSON o Frekvens Lang en streaming) + `frekvens.schema.json` |
| Decidir en un modal | `Dialog` (confirmar, destructivo, dato, compartir, pasos, fecha) |
| Subir archivos | `FileDrop` |
| Elegir plan o paquete | `ChoiceCards` |
| Paneles SaaS / iPad | `Sidebar`, `DataTable`, `Stat`, `UsageMeter`, `CommandBar`, `Timeline`, `Checklist` |
| IA en el escritorio | `Notch`, `AgentWidget`, `PromptBox` |
| Música y medios a elegir | `DiscCarousel` + `ClickWheel` |
| Dinero | `PaymentCard`, `NumPad`, `SplitBar`, `SlideToStart` |
| Energía y suministros | `HourStrip`, `Heatmap`, `Gauge` |
| Capturar el momento | `CaptureKey`, `Recorder`, `Viewfinder`, `NoteEditor` |
| 3D | `Viewport3D` |
| Navegar | `TopBar`, `TabBar`, `Segmented`, `Menu` |
| Reservar plaza, día u hora | `DotGrid` con `select` (lente al pasar, salto al elegir, ocupadas tachadas) · ver `PantallaPlazas` |
| Decir que alguien está disponible | `Aura` / `Avatar status`: halo que respira, no un punto |
| Algo está generando | `Beam` en el borde de la caja |
| Horarios y datos que cambian | `SplitFlap` (con `cycle`), `FlapBoard` |
| Reordenar y mover entre estados | `Sortable`, `Board` (puntero y teclado) |
| Dibujar un plano o diagrama | `Blueprint` (rejilla, reglas, cotas, ajuste, zoom) |
| Calcular | `Calculator` (teclas o redonda), `Keycap` |
| Sonido y estudio | `PadGrid`, `Fader`, `VUMeter`, `RotarySelector`, `TapeDeck`, `Scope` |
| Hora | `Clock` (disco, esfera de puntos, matriz) |
| Gráficas | `AreaChart`, `DonutChart`, `Scatter`, `RadarChart`, `Scope`, `LineChart`, `Heatmap` |
| Voz con dirección | `VoicePosition` |
| Avisar sin interrumpir | `Badge`, `LED`, `Toast`, `Banner` |

## Límites conocidos

- Las fuentes vienen de Google Fonts: sin red, se usan las de respaldo (Helvetica/Arial y monospace del sistema). Para producción, alojarlas en el propio proyecto.
- Sin RTL ni traducciones: el sistema está escrito en español.
- `AreaChart` y `RadarChart` admiten varias series; más de tres se leen mal. `Scope` y `VUMeter` simulan señal si no se les pasa una.
- `VoicePosition` pinta el dato, no lo mide: en el navegador el micrófono es mono; el lado tiene que venir de la app nativa (dos micrófonos) o de un micrófono estéreo.
- `Blueprint` no redimensiona piezas ni dibuja conectores a mano: se mueven, se crean notas y se borran; las conexiones vienen en `edges`.
- `Viewport3D` es CSS 3D para cubos y pilas; para modelos reales hay que meter un render WebGL dentro de su marco.
- `Recorder` y `Viewfinder` usan micrófono y cámara reales solo con `real`/`live` y permiso del usuario; si no, funcionan en modo demostración.
- `Tooltip` no existe en táctil: lo esencial nunca vive solo ahí.
- `Render` confía en el catálogo, no en el contenido: el host debe validar las acciones que ejecuta.
