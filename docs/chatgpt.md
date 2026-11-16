# Frekvens en ChatGPT

Frekvens se puede usar dentro de una conversación de ChatGPT: el modelo consulta el catálogo, compone una pantalla y ChatGPT la pinta con las piezas de verdad, no con una imagen. Funciona con cualquier cliente que entienda MCP Apps; ChatGPT es uno de ellos.

## Qué hay

La web sirve un servidor MCP en `/mcp` (en producción, `https://frekvens-ui.vercel.app/mcp`) con tres herramientas:

| Herramienta | Qué hace | Pinta |
| --- | --- | --- |
| `list_components` | Lista las piezas por grupo, con una línea de cada una, y las reglas de composición. | No |
| `get_component` | Devuelve las props tipadas y las normas de uso de hasta 8 piezas. | No |
| `render_ui` | Recibe un spec `{ type, props, children }` y lo pinta en la conversación con `Render`. | Sí |

`render_ui` comprueba el spec antes de pintar: si lleva un tipo que no existe, se lo devuelve al modelo con el nombre para que corrija. El spec es el mismo de `generativo.md`.

## Conectarlo

1. En ChatGPT, abre la página de plugins y elige añadir un servidor MCP propio.
2. Pon de nombre «Frekvens», como dirección `https://frekvens-ui.vercel.app/mcp` y sin autenticación.
3. Abre una conversación nueva, menciona el plugin con `@` y pide una pantalla: «Enséñame cómo va el depósito del huerto esta semana».

Después de cada despliegue, pulsa «Refresh» en el plugin para que ChatGPT vuelva a leer las herramientas.

## Cómo se comporta el widget

- **Tema**: en oscuro sigue a ChatGPT (Carbón); en claro usa Blanco, o Papel si el modelo pide `theme: "light"`.
- **Acciones**: una prop con valor `"action:nombre"` (por ejemplo, el `onClick` de una tecla) manda a la conversación el mensaje «Acción «nombre»», y el modelo decide qué hacer. El widget no guarda datos ni llama a ningún servicio.
- **Alto**: el widget avisa de su alto cada vez que cambia, así que no hay barras de desplazamiento dentro.
- **Lo que carga**: la hoja de estilos y el bundle de Frekvens desde la web, y las fuentes de Google Fonts. Nada más: esos tres dominios son los únicos declarados.

## Añadir una pieza nueva

No hay que tocar el servidor. Las herramientas leen `app/catalog.json` y `public/frekvens.schema.json`, que se generan con el resto del repo. Una pieza nueva aparece en ChatGPT cuando:

1. Está en `components/bundle.js` y exportada en `api`.
2. Tiene su `README.md` (primera frase: para qué sirve) y sus props en `index.d.ts`.
3. Está en `frekvens.schema.json`: en la lista de tipos y en `x-frekvens.components`.

Si cambias el HTML del widget (`app/mcp/widget.ts`), sube `WIDGET_VERSION`: ChatGPT guarda el widget por su dirección y, sin el cambio de versión, seguiría enseñando el anterior.

## Probarlo sin ChatGPT

```sh
npm run build && FREKVENS_URL=http://localhost:3000 npm start
npx @modelcontextprotocol/inspector   # Streamable HTTP, http://localhost:3000/mcp
```

`FREKVENS_URL` le dice al widget de dónde cargar los estilos y el bundle; en Vercel no hace falta.
