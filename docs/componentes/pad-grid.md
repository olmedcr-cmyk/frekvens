# PadGrid

Rejilla de pads de percusión tipo controlador MIDI: fondo `ink`, pads grises que se encienden en `sol` (o `rams`, `klein`) al golpearlos y suenan con WebAudio. Con `keyboard`, Q W E / A S D / Z X C los tocan.

- **Props**: `columns` (3), `rows` (3), `labels`, `tone`, `sound` (true), `keyboard`, `onPad(i)`, `label`.
- Responde en `pointerdown` (sin esperar al soltar) y a Espacio/Enter con el foco.
