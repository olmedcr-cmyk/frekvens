import Link from "next/link"
import catalog from "./catalog.json"

// Índice del catálogo: grupos con filete, piezas numeradas.
export function CatalogIndex({ heading, level = 2 }: { heading: string; level?: 1 | 2 }) {
  const groups = [...new Set(catalog.map((c) => c.group))]
  const ordered = groups.flatMap((g) => catalog.filter((c) => c.group === g))
  const num = new Map(ordered.map((c, i) => [c.slug, String(i + 1).padStart(3, "0")]))
  const plain = (s: string) => s.replace(/\*\*|`/g, "")
  const H = level === 1 ? "h1" : "h2"
  const G = level === 1 ? "h2" : "h3"
  return (
    <section className="index" aria-labelledby="index-title">
      <div className="index__head">
        <H id="index-title">{heading}</H>
        <span className="eyebrow">{groups.length} grupos</span>
      </div>
      {groups.map((g) => {
        const items = catalog.filter((c) => c.group === g)
        return (
          <div key={g} className="group">
            <G className="group__name">{g}<span>{items.length}</span></G>
            <ul className="items">
              {items.map((c) => (
                <li key={c.slug} className="item">
                  <Link href={`/componentes/${c.slug}`}>
                    <span className="item__num" aria-hidden="true">{num.get(c.slug)}</span>
                    <span className="item__name">{c.name}</span>
                    <span className="item__desc">{plain(c.description)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </section>
  )
}
