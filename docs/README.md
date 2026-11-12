Frekvens es la forma de diseñar apps de Cris Olmedo: interfaces que se manejan como un aparato. Botoneras gigantes, números enormes, círculos y puntos sobre una retícula exacta. La herencia es clara —Dieter Rams y Braun, Teenage Engineering, Nothing OS, IKEA, la lámpara Flowerpot, una cafetera de palanca— pero la regla es una: **si no se puede usar con el pulgar, sudando y sin mirar dos veces, no está terminado.**

## Principios

1. **Botonera, no página.** Cada pantalla es un panel de mandos: pocas teclas grandes (`KeyButton`, `Keypad`), un número que manda (`Readout`) y aire. Mínimo táctil `hit-min` (56 px); la acción principal en `key-l` o `key-xl`.
2. **El círculo es la unidad.** Puntos, discos, aros, diales. Las esquinas rectas se redondean con `radius-lg`; lo que es estado o valor, es círculo.
3. **Puntos con matemática.** Toda ilustración se dibuja con `DotMatrix` sobre `dot-pitch`. Nada de fotos decorativas, degradados ni ilustración plana.
4. **Plano y honesto.** Sin sombras de elevación (`shadow-none`). La jerarquía la dan el tamaño, el color de bloque y la posición. Lo único que se hunde es una tecla pulsada (`shadow-press`).
5. **Menos, pero mejor.** Un color de acción por pantalla, un número héroe por pantalla, dos líneas de título como máximo.
6. **Montaje IKEA.** Pasos numerados (`ListRow` con `index`), instrucciones de una frase, estados que se leen por forma (`StateMark`).

## Voz y contenido

- Frases cortas, verbo primero: "Empieza", "Reserva la hora", "Añade una serie". Sin exclamaciones ni emoji.
- Título de pantalla en dos líneas: la primera dice *qué* (`display-xl`, `ink`), la segunda el *estado* en `ink-muted` ("Tabata / 8 series · 20/10", "New York / 21° Sunny").
- Etiquetas técnicas en mono y MAYÚSCULAS, con dos puntos o punto medio: `PWR:4`, `SERIE 3/8`, `96.00kHz · 24 Bit`, `{0032}`.
- Números con su unidad pegada y pequeña: `42′`, `21.3kWh.`, `78%`. Cifras tabulares siempre.
- Tuteo. Español por defecto; los ejemplos en inglés de las referencias son solo referencia.

## Color

La base es papel cálido y tinta; el color se usa en **bloques sólidos completos**, nunca en filetes ni degradados.

- Fondo de pantalla `paper`; tiles y teclas en reposo `surface`; pistas, barras inactivas y huecos `well`. Texto `ink`; secundario `ink-muted`. `ink-faint` solo para deshabilitado y decoración: no llega a 4.5:1, así que nada que haya que leer (ni siquiera un 'Mañana' atenuado) va en `ink-faint`; para eso, `ink-muted`.
- **`klein`** (azul Klein) es la acción principal y el estado "activo/en marcha". Una tecla `klein` por pantalla. Texto encima en `on-klein`. Para texto azul sobre papel, `klein-ink`.
- **`rams`** (naranja Braun) es el mando físico: el cursor del `Slider`, el progreso de `DotGrid`, la tecla START. Texto encima en `on-rams` (negro, nunca blanco).
- **`sol`** (amarillo) es el dato destacado o el "ahora": un Tile protagonista, la línea temporal, el aviso suave. Texto en `on-sol`.
- **`verde`** (verde de cafetera) es identidad y estado 'listo/caliente': Tiles protagonistas, rejillas (`Grille`), el ✓ de `SlideToStart`, el piloto `LED` verde. Texto en `on-verde`.
- **`tabaco`** (marrón óxido) es material: un bloque de hora o historial. Texto en `on-tabaco`.
- **`rec`** solo para grabar, borrar o error, siempre con palabra o icono.
- Fondos ambientales **`salvia`**, **`lavanda`**, **`malva`**: una pantalla entera de una categoría (gastos, stock, tendencias). Todo el texto encima en `ink`; dentro de un contenedor `frk-tone--salvia/lavanda/malva`, `ink-muted` se oscurece solo para mantener 4.5:1.
- Por fila de tiles, un solo bloque de color; el otro en `surface`. Por pantalla, como mucho dos colores de bloque además de papel y tinta.
- Tema **Papel** (claro, cálido), **Blanco** (claro, grises neutros sobre blanco puro) y **Carbón** (oscuro). Blanco solo cambia los neutros (`paper`, `surface`, `well`, `line`, `dot-off`, `ink-muted`, `ink-faint`); los colores son los de Papel. En Carbón `ink` y `paper` se invierten; `sol` no cambia; `klein`, `rams`, `tabaco` y `klein-ink` se aclaran para mantener contraste.

## Tipografía

Tres familias, cada una con un trabajo (las razones y la escala completa, en *Tipografía — decisiones*):

- **Archivo** (`sans`) — todo lo que se lee. Títulos `display-xl` (56/0.95, 800, tracking −3%) arriba a la izquierda; valores grandes `numeral-xl` (96, peso 400, tracking −4%): el número fino y enorme contra el título negro y apretado es la firma; `title`, `headline`, `body`, `body-strong`, `caption` para el resto.
- **Doto** (`dot`) — números de máquina: temporizadores, cuenta atrás, contadores (`dot-hero` 120, `dot-display` 64, `dot-label` 24). Un `dot-hero` por pantalla.
- **IBM Plex Mono** (`mono`) — etiquetas de ingeniería (`label` 11, tracking +8%, MAYÚSCULAS) y datos técnicos (`readout` 14).
- Nunca más de dos tamaños de Archivo en una misma tarjeta. Nunca cursiva.

## Retícula, espacio y forma

- Rejilla de 4 px (`space-1` … `space-9`). Gutter de pantalla `space-5`; junta entre teclas y tiles `space-2` (la junta de la botonera); entre bloques `space-6`; aire bajo el título `space-7`.
- Retícula de puntos: `dot-size` 6 px sobre `dot-pitch` 10 px por defecto; en héroe se escala manteniendo paso ≥ 1.5 × diámetro.
- **Radios concéntricos**: radio de fuera = radio de dentro + padding. Las parejas buenas: `xl` 40 − 24 = `md` 16; `lg` 24 − 8 = `md` 16; `lg` 24 − 16 = `sm` 8; `md` 16 − 8 = `sm` 8. Un disco o una píldora dentro de una caja es la excepción: ahí manda la caja. Ver *Composición*.
- Radios: `radius-lg` (24) es el radio de la casa — tiles, teclas grandes, Keypad. `radius-xl` para la tecla de palma, `radius-md` para filas y teclas medianas, `radius-sm` para chips LCD, `radius-full` para todo lo que es punto, disco o píldora.
- Tamaños de tecla: `key-m` 88, `key-l` 120, `key-xl` 168. El tercio inferior de la pantalla es para el pulgar: ahí van la tecla principal y la navegación (`Segmented` flotante).
- Filetes de 1 px (`hairline`, color `line`) solo para separar filas de `ListRow` y las juntas del `Keypad`.

## Estados e interacción

- **Aro · Puntos · Disco** = Pendiente · En curso · Hecho (`StateMark`). Es el lenguaje de estado de todo el sistema: calendario, series, reservas, onboarding.
- Pulsado: la tecla se comprime a 0.965 en `dur-press` con `shadow-press`; una tecla `paper` activa se invierte a `ink`. El disparador de un popover se queda hundido mientras está abierto.
- Encendido: el aro del `Switch` se llena de `sol` y dice `ON`. Activo/en marcha: `klein`.
- Deshabilitado: fondo `well`, texto `ink-faint`, sin hundimiento.
- Foco: anillo sólido de 2 px en `focus`, a 2 px de distancia, en cada control; cumple 3:1 en todas las superficies de ambos temas.
- Pilotos: un `LED` con etiqueta para estados de aparato (listo, calentando, grabando); parpadeo en dos pasos, nunca fundido.
- Tiempo real (temporizadores): el número no anuncia cada segundo; solo hitos (`live` en `Readout`).

## Movimiento

El catálogo completo de transiciones está en la sección *Movimiento y transiciones*. En resumen: el movimiento es el de un mecanismo: responde al instante, viaja con intención y frena largo. Nada aparece de golpe y lo sólido no se desvanece atravesando: se desplaza, escala o rueda.

- **Respuesta** (pulsar, cambiar de estado): `dur-press` / `dur-fast` con `ease-ui`. Un clic, no una animación.
- **Abrir** un popover (`Select`, `Menu`): `dur-base` con `ease-ui`, escalando de .96 a 1 y subiendo 6 px desde el borde del que cuelga; su contenido entra con 25 ms de desfase. **Cerrar**: `dur-fast` con `ease-exit`, siempre más corto que abrir y hacia donde se abrió.
- **Hojas** (`Sheet`): suben en `dur-sheet` con `ease-ui`; al soltar un arrastre, `ease-throw`. Se descartan arrastrando más de 96 px.
- **Crecer** (una carta que se abre, un anillo que se llena): `dur-grow` con `ease-arrive`, arranque suave y frenada larga. Un ease-in-out rápido aquí es un error.
- **Viajar** de un sitio a otro (indicadores, el disco de `SlideToStart` al volver): `ease-travel`.
- **Listas que aparecen**: `stagger` de 50 ms entre filas; 100 ms entre tiles de rejilla. Todo lo que sale, en menos de medio segundo.
- **Números**: ruedan desde abajo al cambiar (`Stepper`), con cifras tabulares para que no bailen.
- **Cambio de pantalla**: fundido de 200 ms del contenido con subida de 8 px. Nunca deslizar páginas de lado.
- **Puntero**: los dibujos de puntos pueden responder al dedo (`DotMatrix reactive`): los puntos cercanos crecen.
- **Movimiento reducido**: se quitan desplazamientos, escalados y rebotes; se mantienen los cambios de color y la respuesta directa al puntero. Cada estado final debe entenderse sin haber visto la animación.

## Desplegables, menús y hojas

- **`Select`** para elegir un valor de 5–8 opciones; **`Segmented`** si son 2–4 y caben a la vista; **`Sheet`** con lista si son más de 8 o necesitan explicación.
- **`Menu`** para acciones sobre algo (editar, duplicar, borrar), nunca para elegir un valor. La acción destructiva va la última, tras un separador, en `rams`.
- Los paneles de popover son `ink` con texto `paper`, `radius-lg`, 6 px de padding, filas de 48 px. Se abren pegados al borde del disparador (8 px de separación) y reservan el alto de la lista completa.
- Teclado completo en todos: flechas, Inicio/Fin, Enter/Espacio, Esc devuelve el foco al disparador, Tab cierra. `Select` además salta escribiendo.
- `Sheet` es modal: atrapa el foco, Esc y el fondo la cierran, y devuelve el foco a quien la abrió. Una acción principal al pie, nunca una hoja sobre otra.
- Confirmar después, no antes: acciones reversibles sin diálogo y con `Toast` + "Deshacer"; las irreversibles o de pago, con `SlideToStart`.

## Formularios

- Campos en píldora de 56 px (`TextField`, `Select`) sobre `well`; al enfocarse pasan a `surface` con borde `focus`.
- La etiqueta mono siempre visible encima; el placeholder es un ejemplo. La ayuda va debajo en `caption`.
- Error: borde `rec` + icono ✕ + una frase que dice qué hacer ("Escribe un correo con @"). Se valida al salir del campo, no mientras se escribe.
- Cantidades pequeñas con `Stepper`; códigos y correos con `mono`.

## Iconografía

Set propio en `assets/Iconos` y en `Frekvens.Icon`: rejilla 24, trazo 2 px, terminaciones rectas; transporte relleno. Los pictogramas grandes no son iconos: se dibujan con `DotMatrix` (sol, nube, gota, corazón, aro, disco). No hay logotipo en el sistema: el nombre se compone en Archivo 800.

## Composición de una pantalla

1. Título en dos líneas arriba a la izquierda (`display-xl` + segunda línea `ink-muted`).
2. Un héroe en el centro: `Readout`, `Dial`, `DotMatrix`, `DotGrid` o `BarMeter`.
3. Datos en `Tile` de dos columnas o en `Strip` apiladas.
4. Mandos en el tercio inferior: `KeyButton` `xl`, `Keypad`, `SlideToStart` o `Composer`, y la navegación `Segmented` o `Tabs`.

Pantallas completas por sector: entrenamiento (`PantallaTimer`, `PantallaTiempo`, `PantallaReserva`, `PantallaEstado`), IA y conversación (`PantallaConversacion`, `PantallaIA`, `PantallaNotch`, `PantallaDashboardIA`), SaaS e iPad (`PantallaControl`, `PantallaAnalitica`, `PantallaStats`, `PantallaOnboarding`, `PantallaLogin`, `PantallaDialogos`), música (`PantallaMusica`), 3D (`Pantalla3D`), niños (`PantallaJuego`), neobanco (`PantallaBanco`), suministros (`PantallaSuministros`), captura y notas (`PantallaCaptura`), estados (`PantallaEstados`), formatos (`PantallaFormatos`), hi-fi (`PantallaHiFi`), teclas y calculadoras (`PantallaTeclas`), estudio de sonido (`PantallaEstudio`), relojes (`PantallaRelojes`), plano (`PantallaPlano`), tablero (`PantallaKanban`), gráficas (`PantallaGraficas`), voz con posición (`PantallaVoz`) y reservar con puntos (`PantallaPlazas`).

## Componentes

En un proyecto React, instala `@crisolmedo/frekvens` (ver *Usar en React*). En una página suelta, `window.Frekvens` (React 18): carga los tokens, `components/bundle.css` (incluye las fuentes de Google) y `components/bundle.js`.

- Botonera: `KeyButton`, `Keypad`, `HoldButton`, `SlideToStart`, `Rocker`, `ClickWheel`, `NumPad`, `Keycap`, `Calculator`, `PadGrid`.
- Controles: `Dial`, `Slider`, `Switch`, `Segmented`, `Stepper`, `Wheel`, `VolumeWheel`, `RotarySelector`, `Fader`.
- Formularios y capas: `Checkbox`, `RadioGroup`, `ChoiceCards`, `Select`, `Menu`, `Tabs`, `TextField`, `Calendar`, `FileDrop`, `Sheet`, `Dialog`, `CommandBar`.
- Feedback: `Toast`, `Banner`, `Tooltip`, `Skeleton`, `EmptyState`.
- Navegación: `TopBar`, `TabBar`, `Sidebar`, `Steps`.
- Tiempo: `Timer`, `Stopwatch`, `Hourglass`, `Pendulum`, `Clock`.
- Medios: `MediaPlayer`, `AudioTrack`, `DiscCarousel`, `Ticker`, `SplitFlap`, `FlapBoard`, `TapeDeck`.
- Captura: `CaptureKey`, `Recorder`, `Viewfinder`, `NoteEditor`.
- Puntos: `DotMatrix`, `DotGrid` (contar o elegir), `StateMark`, `Grille`, `LED`, `Aura`.
- Datos: `Stat`, `UsageMeter`, `Gauge`, `LevelBars`, `BarMeter`, `LineChart`, `Sparkline`, `Heatmap`, `SplitBar`, `HourStrip`, `ProgressRing`, `Readout`, `DataTable`, `VUMeter`.
- Gráficas: `AreaChart`, `Scatter`, `RadarChart`, `DonutChart`, `Scope` (y `LineChart`, `BarMeter`, `Heatmap`, `Sparkline`).
- Arrastre y lienzo: `Board`, `Sortable`, `Blueprint`.
- Superficies y carruseles: `Tile`, `Strip`, `CardStack`, `Cabinet`, `Checklist`, `Timeline`, `Pager`, `Deck`, `ListRow`, `PaymentCard`, `Viewport3D`.
- Conversación e IA: `Message`, `Composer`, `PromptBox`, `Suggestions`, `VoiceOrb`, `VoicePosition`, `Beam`, `DotLoader`, `AgentWidget`, `Notch`.
- Generativo: `Render` (spec JSON o Frekvens Lang), `Stack`, `Grid`, `Text`. Movimiento: `Reveal`.
- Base: `Icon`, `Chip`, `Badge`, `Avatar`.

Para UI generada por un modelo, lee *UI generativa y conversación* y pásale `frekvens.schema.json`. Para patrones SaaS habituales, *Bloques y patrones*. Antes de componer, *Composición*; antes de dar por buena una pantalla, *Calidad*; si un agente va a usar el sistema, *Skill para agentes*; para widgets, reloj o escritorio, *Formatos*.
