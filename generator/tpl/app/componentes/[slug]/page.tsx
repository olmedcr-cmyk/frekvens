import fs from "node:fs"
import path from "node:path"
import Link from "next/link"
import catalog from "../../catalog.json"
import { Markdown } from "../../markdown"
import { PreviewFrame } from "../../preview-frame"

export function generateStaticParams() { return catalog.map((c) => ({ slug: c.slug })) }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const c = catalog.find((x) => x.slug === slug); return { title: `${c?.name ?? "Componente"} — Frekvens` } }

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c = catalog.find((x) => x.slug === slug)
  if (!c) return <p>No existe.</p>
  const file = `registry/frekvens/ui/${c.slug}.tsx`
  const code = fs.readFileSync(path.join(process.cwd(), file), "utf8")
  const home = "https://frekvens-ui.vercel.app"
  return (
    <article className="sheet">
      <div className="sheet__head">
        <Link href="/componentes" className="back">← Componentes</Link>
        <p className="eyebrow">{c.group}</p>
        <h1 className="title">{c.name}</h1>
      </div>
      <div className="preview"><PreviewFrame title={`Vista previa de ${c.name}`} src={`/preview/${c.name}.html`} /></div>
      <div className="cmd">npx shadcn@latest add {home}/r/{c.slug}.json</div>
      {c.deps.length ? <p className="deps">Trae también: {c.deps.map((d, i) => <span key={d.slug}>{i ? ", " : ""}<Link href={`/componentes/${d.slug}`}>{d.name}</Link></span>)}.</p> : null}
      <Markdown src={c.doc} />
      <details className="code"><summary>Código · {file}</summary><pre tabIndex={0}><code>{code}</code></pre></details>
    </article>
  )
}
