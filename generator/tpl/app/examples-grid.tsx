import Link from "next/link"
import { examples } from "./examples"
import thumbs from "./thumbs.json"

// Rejilla de apps de ejemplo: la pantalla en miniatura y su nombre.
export function ExamplesGrid() {
  const sizes: Record<string, number[] | undefined> = thumbs
  return (
    <ul className="examples">
      {examples.map((e) => {
        const t = sizes["app-" + e.slug]
        return (
          <li key={e.slug} className="pin">
            <Link href={`/ejemplos/${e.slug}`}>
              <figure>
                {t ? <img src={`/thumbs/app-${e.slug}.jpg`} width={t[0]} height={t[1]} alt="" loading="lazy" decoding="async" /> : <span className="pin__blank" aria-hidden="true" />}
                <figcaption><span className="pin__name">{e.name}</span><span className="pin__group">App</span></figcaption>
              </figure>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
