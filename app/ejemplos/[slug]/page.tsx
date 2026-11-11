import Link from "next/link"
import catalog from "../../catalog.json"
import { examples } from "../../examples"
import { PreviewFrame } from "../../preview-frame"

export function generateStaticParams() { return examples.map((e) => ({ slug: e.slug })) }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const e = examples.find((x) => x.slug === slug); return { title: `${e?.name ?? "Ejemplo"} — Frekvens` } }

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const e = examples.find((x) => x.slug === slug)
  if (!e) return <p>No existe.</p>
  const used = e.uses.map((s) => catalog.find((c) => c.slug === s)).filter((c) => c != null)
  return (
    <article className="sheet">
      <div className="sheet__head">
        <Link href="/ejemplos" className="back">← Ejemplos</Link>
        <p className="eyebrow">App de ejemplo</p>
        <h1 className="title">{e.name}</h1>
        <p className="lead">{e.description}</p>
      </div>
      <div className="example">
        <div className="example__screen"><PreviewFrame title={`App de ejemplo: ${e.name}`} src={`/preview/${e.file}.html`} /></div>
        <div className="example__side">
          <p className="eyebrow">Componentes usados</p>
          <ul className="example__uses">
            {used.map((c) => <li key={c.slug}><Link href={`/componentes/${c.slug}`}>{c.name}</Link><span>{c.group}</span></li>)}
          </ul>
          <a className="back" href={`/preview/${e.file}.html`}>Abrir la pantalla sola →</a>
        </div>
      </div>
    </article>
  )
}
