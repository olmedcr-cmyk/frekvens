import Link from "next/link"
import catalog from "../catalog.json"
export const metadata = { title: "Componentes — Frekvens" }
export default function Page() {
  return (<section><h1 style={{ font: "800 40px/1 var(--font-sans)", margin: "0 0 24px" }}>{catalog.length} componentes</h1><div className="grid">{catalog.map((c) => <Link key={c.slug} href={`/componentes/${c.slug}`} className="tile"><small>{c.group}</small><h3>{c.name}</h3><p>{c.description}</p></Link>)}</div></section>)
}
