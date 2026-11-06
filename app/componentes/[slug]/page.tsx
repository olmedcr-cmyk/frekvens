import fs from "node:fs"
import path from "node:path"
import Link from "next/link"
import catalog from "../../catalog.json"
import { Markdown } from "../../markdown"

export function generateStaticParams() { return catalog.map((c) => ({ slug: c.slug })) }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const c = catalog.find((x) => x.slug === slug); return { title: `${c?.name ?? "Componente"} — Frekvens` } }

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c = catalog.find((x) => x.slug === slug)
  if (!c) return <p>No existe.</p>
  const file = `registry/frekvens/ui/${c.slug}.tsx`
  const code = fs.readFileSync(path.join(process.cwd(), file), "utf8")
  const home = "https://frekvens.vercel.app"
  return (
    <article style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div><small style={{ font: "500 11px/14px var(--font-mono)", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-muted)" }}>{c.group}</small><h1 style={{ font: "800 48px/1 var(--font-sans)", letterSpacing: "-.02em", margin: "4px 0 0" }}>{c.name}</h1></div>
      <div className="preview"><iframe title={`Vista previa de ${c.name}`} src={`/preview/${c.name}.html`} loading="lazy" style={{ height: 420 }} /></div>
      <div className="cmd">npx shadcn@latest add {home}/r/{c.slug}.json</div>
      {c.deps.length ? <p style={{ margin: 0, color: "var(--ink-muted)" }}>Trae también: {c.deps.map((d, i) => <span key={d.slug}>{i ? ", " : ""}<Link href={`/componentes/${d.slug}`}>{d.name}</Link></span>)}.</p> : null}
      <Markdown src={c.doc} />
      <details><summary style={{ cursor: "pointer", font: "700 15px var(--font-sans)" }}>Código ({file})</summary><pre className="prose" style={{ maxWidth: "none" }}><code>{code}</code></pre></details>
    </article>
  )
}
