# Render

El motor de UI generativa: pinta una interfaz Frekvens a partir de un **spec JSON** que puede escribir un modelo. Cada nodo es `{type, props, children}`; `type` es el nombre de cualquier componente del sistema; los hijos son nodos o texto.

- **Props**: `spec` (objeto, array o string JSON), `actions` (mapa nombre → función).
- **Acciones**: cualquier prop con valor `"action:nombre"` se convierte en una llamada a `actions.nombre` (p. ej. `"onClick": "action:reservar"`). Una acción sin definir avisa en consola y no rompe.
- Props que son nodos (`value`, `content` de `tabs`/`drawers`) también se pueden escribir como spec.
- Un `type` desconocido se pinta como un recuadro discontinuo con su nombre: nunca rompe la pantalla.
- El catálogo completo con props está en `frekvens.schema.json`; las reglas para modelos, en la sección *UI generativa y conversación*.
