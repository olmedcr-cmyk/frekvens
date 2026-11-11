import Link from "next/link"
import catalog from "./catalog.json"

// Índice por grupos: una tarjeta cuadrada por grupo con una pieza representativa y el recuento.
export function CategoryGrid() {
  const groups = [...new Set(catalog.map((c) => c.group))]
  return (
    <ul className="cats">
      {groups.map((g) => {
        const items = catalog.filter((c) => c.group === g)
        // La pieza cuya miniatura se acerca más a 4:3 llena mejor el cuadrado.
        const rep = items.filter((c) => c.thumb).sort((a, b) => Math.abs(a.thumb![0] / a.thumb![1] - 1.33) - Math.abs(b.thumb![0] / b.thumb![1] - 1.33))[0]
        return (
          <li key={g} className="cat">
            <Link href={`/componentes#${encodeURIComponent(g)}`}>
              <span className="cat__card">
                {rep ? <img src={`/thumbs/${rep.slug}.jpg`} width={rep.thumb![0]} height={rep.thumb![1]} alt="" loading="lazy" decoding="async" /> : null}
              </span>
              <span className="cat__cap"><span className="cat__name">{g}</span><span className="pill">{items.length} {items.length === 1 ? "componente" : "componentes"}</span></span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
