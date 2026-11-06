# UI generativa y conversación

Frekvens está pensado para que lo componga una persona o un modelo. Cada componente tiene un nombre, unas props declaradas y un comportamiento accesible por defecto, así que una IA puede describir una pantalla en JSON y `Frekvens.Render` la pinta con todas las reglas de la casa ya aplicadas.

## El spec

Un nodo es `{ "type", "props", "children" }`. `type` es el nombre de un componente; `children` es texto, otro nodo o una lista.

```json
{ "type": "Stack", "props": { "gap": 3 }, "children": [
  { "type": "Text", "props": { "variant": "title", "sub": "3 de 5 sesiones" }, "children": "Tu semana" },
  { "type": "Grid", "props": { "columns": 2 }, "children": [
    { "type": "Tile", "props": { "tone": "rams", "title": "Minutos", "value": "184" } },
    { "type": "Tile", "props": { "title": "Racha", "subtitle": "días", "value": "12" } } ] },
  { "type": "KeyButton", "props": { "tone": "klein", "shape": "pill", "block": true, "onClick": "action:reservar" }, "children": "Reservar la próxima" } ] }
```

- **Acciones**: una prop con valor `"action:nombre"` llama a `actions.nombre` en el host. El modelo nunca escribe funciones.
- **Props como nodo**: `value` de un `Tile`, y `content` de `tabs` o `drawers`, aceptan un nodo.
- **Errores**: un `type` desconocido se pinta como recuadro discontinuo con su nombre; un JSON roto, como aviso. Nunca rompe la pantalla.
- **Catálogo**: `frekvens.schema.json` contiene el JSON Schema del spec y, en `x-frekvens`, cada componente con su grupo, resumen y props tipadas, los tonos, los iconos, los estilos de texto y las reglas. Dáselo al modelo como contexto o como esquema de salida estructurada.

## Frekvens Lang (para que un modelo escriba UI en streaming)

El JSON solo se puede pintar cuando llega entero. Frekvens Lang es un formato de **una línea por componente** que se pinta mientras llega (la misma idea que OpenUI Lang): cada línea define un id; las referencias a ids que aún no han llegado se ven como un hueco de puntos y se rellenan solas.

```
root = Stack({"gap":3}, [head, kpis])
head = Text({"variant":"title","sub":"Agente · hace 1 min"}, "Ventas · Q4")
kpis = Grid({"columns":2}, [k1, k2])
k1 = Stat({"label":"Pipeline","value":"6,8","unit":" M€","delta":"+12 %"})
k2 = Stat({"label":"Tasa de cierre","value":"27","unit":" %"})
```

- Forma: `id = Tipo({props JSON}, [ids o "texto"])` o `id = Tipo("texto")`. El nodo raíz es `root` (o la primera línea).
- Úsalo con `<Render lang={texto} />` o `Frekvens.parseLang(texto)` → spec. Una línea mal escrita se ignora sin romper el resto.
- Ocupa menos tokens que el JSON anidado y deja ver la pantalla desde la primera línea. Ver `PantallaDashboardIA`.

## Reglas para quien genera (persona o modelo)

1. Compón con `Stack`, `Grid` y `Text`; no escribas estilos ni tamaños.
2. Una acción `klein` por vista; un número héroe por vista; como mucho dos tonos de bloque además de papel y tinta.
3. Título con `Text variant="title"` o `display-xl` y el estado en `sub`.
4. Todo lo pulsable es una tecla (`KeyButton`, `Tile` con `onClick`, `ListRow` con `onClick`); nunca texto clicable suelto.
5. Lo irreversible (pagar, borrar, terminar) va con `HoldButton` o `SlideToStart`.
6. Elige el control por la tarea: valor de 2–4 opciones → `Segmented`; 5–8 → `Select`; cantidad pequeña → `Stepper`; hora → `Wheel`; nivel → `Slider`, `Dial` o `VolumeWheel`; tiempo → `Timer`, `Stopwatch`, `Hourglass`.
7. Estados por forma: pendiente/en curso/hecho con `StateMark`, no solo con color.
8. Español, frases cortas, verbo primero, sin emoji.

## Conversación

Los componentes de conversación comparten el lenguaje de puntos del resto del sistema.

| Pieza | Componente | Comportamiento |
| --- | --- | --- |
| Turno | `Message` | Usuario: bocadillo `ink` a la derecha. Asistente: texto libre a la izquierda con avatar de estado (puntos mientras escribe, disco al terminar). Sistema: línea mono centrada. |
| Pensando | `DotLoader` / `Message thinking` | Tres puntos que laten; si pasa de ~3 s, decir qué se está haciendo. |
| Escribiendo | `Message streaming` | Punto `rams` parpadeando al final del texto. |
| UI en la respuesta | `Message ui={spec}` | La UI generada va debajo del texto, nunca en su lugar: el texto responde, la UI deja actuar. |
| Sugerencias | `Suggestions` | 2–4 chips en la voz del usuario. |
| Escribir o hablar | `Composer` | Enter envía; mantener o tocar el micro abre la escucha. |
| Voz | `VoiceOrb` | `idle`, `listening` (nivel real del micro en `level`), `thinking`, `speaking`. |

### Flujo de un turno

1. El usuario envía → su `Message` entra con `dur-base`.
2. El asistente aparece con `thinking` → `DotLoader`.
3. Llega texto → `streaming` con el punto `rams`.
4. Si hay acción posible, el texto termina y aparece la UI (`ui`) con `Reveal`.
5. El usuario actúa en la UI → la acción vuelve al host → un `Toast` confirma y, si procede, ofrece "Deshacer".

### Voz

- El orbe es la única pieza grande en modo voz; el texto transcrito va debajo en `body`.
- El estado se dice también en texto (`EN ESPERA · ESCUCHANDO · PENSANDO · HABLANDO`).
- Interrumpir siempre es posible: la tecla de parar está en el mismo sitio que la del micro.
