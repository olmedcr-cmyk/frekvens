# AgentWidget

Agente embebible: un lanzador redondo (con un orbe de puntos que respira) que abre un panel con dos modos. **Voz**: orbe grande, transcripción y una tecla grande para hablar/colgar. **Texto**: conversación con `Message` y `Composer`. El estado (disponible, escuchando, pensando, hablando) se ve en el piloto, en el orbe y en el color del lanzador.

- **Props**: `name`, `state` (controlado), `defaultState`, o `demo` (recorre escuchando → pensando → hablando solo), `mode` (`voice` · `chat`), `messages` (`[{role, text, ui…}]`), `transcript`, `level`, `suggestions`, `tone` (`rams`), `onStart()`, `onEnd()`, `onSend(text)`, `defaultOpen`, `inline` (para maquetas; si no, fijo abajo a la derecha).
- Esc cierra y devuelve el foco al lanzador. Colgar está siempre en la misma tecla que hablar.
- Pensado para enchufar un agente de voz real: pasa su estado y su nivel de audio y el widget hace el resto.
