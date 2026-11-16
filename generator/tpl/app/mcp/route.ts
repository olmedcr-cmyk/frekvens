// Servidor MCP de Frekvens: lo que ChatGPT (u otro cliente MCP) usa para conocer el catálogo y pintar pantallas en la conversación.
// Dirección para conectar: https://<dominio>/mcp
import { createMcpHandler } from "mcp-handler"
import { z } from "zod"
import catalog from "../catalog.json"
import schema from "../../public/frekvens.schema.json"
import { WIDGET_MIME, WIDGET_URI, widgetHtml } from "./widget"

type Item = { name: string; group: string; description: string; doc: string; props: { name: string; type: string; optional: boolean }[] }
const items = (catalog as unknown as Item[]).filter((c) => !c.name.startsWith("Pantalla") && !c.name.startsWith("App") && c.name !== "Render")
const byName = new Map(items.map((c) => [c.name, c]))
const rules = (schema as unknown as { "x-frekvens": { rules: string[]; tones: string[]; icons: string[] } })["x-frekvens"]

const BASE = (process.env.FREKVENS_URL || (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://frekvens-ui.vercel.app")).replace(/\/$/, "")
const readOnly = { readOnlyHint: true, destructiveHint: false, openWorldHint: false, idempotentHint: true }
const text = (t: string) => ({ content: [{ type: "text" as const, text: t }] })

// Tipos del spec que no existen en el catálogo: se devuelven al modelo para que corrija antes de pintar.
function unknownTypes(node: unknown, out = new Set<string>()): Set<string> {
  if (Array.isArray(node)) node.forEach((n) => unknownTypes(n, out))
  else if (node && typeof node === "object") {
    const n = node as { type?: unknown; props?: Record<string, unknown>; children?: unknown }
    if (typeof n.type === "string" && !byName.has(n.type)) out.add(n.type)
    unknownTypes(n.children, out)
    if (n.props) Object.values(n.props).forEach((v) => { if (v && typeof v === "object") unknownTypes(v, out) })
  }
  return out
}

const handler = createMcpHandler((server) => {
  server.registerResource("frekvens-render", WIDGET_URI, { title: "Frekvens", description: "Pinta una pantalla hecha con componentes de Frekvens.", mimeType: WIDGET_MIME }, async () => ({
    contents: [{
      uri: WIDGET_URI, mimeType: WIDGET_MIME, text: widgetHtml(BASE),
      _meta: {
        ui: { prefersBorder: true, csp: { connectDomains: [], resourceDomains: [BASE, "https://fonts.googleapis.com", "https://fonts.gstatic.com"] } },
        "openai/widgetDescription": "Una pantalla interactiva montada con componentes de Frekvens. Lo que el usuario pulse llega a la conversación como «Acción «nombre»».",
      },
    }],
  }))

  server.registerTool("list_components", {
    title: "Catálogo de Frekvens",
    description: "Lista los componentes de Frekvens (nombre, grupo y para qué sirve) y las reglas de composición. Úsala antes de render_ui para elegir piezas.",
    inputSchema: z.object({ group: z.string().optional().describe("Filtra por grupo, por ejemplo Instrumentos, Controles o Superficies.") }),
    annotations: readOnly,
  }, async ({ group }) => {
    const list = group ? items.filter((c) => c.group.toLowerCase() === group.toLowerCase()) : items
    const groups = [...new Set(list.map((c) => c.group))]
    return text([
      `Frekvens: ${list.length} componentes.`,
      ...groups.map((g) => `\n## ${g}\n` + list.filter((c) => c.group === g).map((c) => `- ${c.name}: ${c.description}`).join("\n")),
      `\n## Reglas\n` + rules.rules.map((r) => `- ${r}`).join("\n"),
      `\nTonos: ${rules.tones.join(", ")}.\nIconos: ${rules.icons.join(", ")}.`,
    ].join("\n"))
  })

  server.registerTool("get_component", {
    title: "Ficha de un componente",
    description: "Devuelve las props tipadas y las normas de uso de hasta 8 componentes de Frekvens. Úsala antes de render_ui para no inventar props.",
    inputSchema: z.object({ names: z.array(z.string()).min(1).max(8).describe("Nombres exactos, por ejemplo [\"FillCard\", \"ColumnChart\"].") }),
    annotations: readOnly,
  }, async ({ names }) => text(names.map((n) => {
    const c = byName.get(n)
    if (!c) return `## ${n}\nNo existe. Llama a list_components.`
    return `## ${c.name} (${c.group})\n${c.doc.split("\n").slice(1).join("\n").trim()}\n\nProps:\n${c.props.map((p) => `- ${p.name}${p.optional ? "?" : ""}: ${p.type}`).join("\n")}`
  }).join("\n\n")))

  server.registerTool("render_ui", {
    title: "Pintar con Frekvens",
    description: [
      "Pinta en la conversación una pantalla hecha con componentes de Frekvens.",
      "`spec` es un nodo { type, props, children }: `type` es el nombre de un componente; `children` es texto, un nodo o una lista de nodos.",
      "Compón con Stack, Grid y Text; no escribas estilos. Una prop con valor \"action:nombre\" (por ejemplo onClick) avisa a la conversación cuando el usuario la pulsa.",
      "Textos en español, frases cortas, sin emoji. Una sola acción en tono klein por pantalla.",
      "Antes de usarla, consulta list_components y get_component para elegir piezas y props reales.",
    ].join(" "),
    inputSchema: z.object({
      spec: z.record(z.string(), z.unknown()).describe("Nodo raíz: { type, props?, children? }."),
      theme: z.enum(["blanco", "light", "dark"]).optional().describe("Tema en claro: blanco (neutro, por defecto) o light (Papel, cálido). En oscuro se sigue al cliente."),
    }),
    annotations: readOnly,
    _meta: { ui: { resourceUri: WIDGET_URI }, "openai/outputTemplate": WIDGET_URI, "openai/toolInvocation/invoking": "Montando la pantalla…", "openai/toolInvocation/invoked": "Pantalla lista" },
  }, async ({ spec, theme }) => {
    const bad = [...unknownTypes(spec)]
    if (typeof spec.type !== "string") return { ...text("El spec necesita un `type` en la raíz, por ejemplo { \"type\": \"Stack\", \"children\": [...] }."), isError: true }
    if (bad.length) return { ...text(`Estos tipos no existen en Frekvens: ${bad.join(", ")}. Consulta list_components y vuelve a intentarlo.`), isError: true }
    return { ...text("Pantalla pintada con Frekvens. No repitas su contenido en texto; añade solo lo que la pantalla no dice."), structuredContent: { spec, theme: theme ?? "blanco" } }
  })
}, { serverInfo: { name: "frekvens", version: "0.1.0" } })

export { handler as GET, handler as POST }
