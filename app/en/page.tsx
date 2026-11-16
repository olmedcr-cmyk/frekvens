import type { Metadata } from "next"
import catalog from "../catalog.json"
import { Hero } from "../hero"
import { CategoryGrid } from "../category-grid"
import { ExamplesGrid } from "../examples-grid"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Frekvens — React components to copy and paste",
  description: `${catalog.length} accessible components, shadcn/ui style: big button panels, dots, instruments, conversation and AI. Open source, MIT.`,
  alternates: { canonical: "https://frekvens-ui.vercel.app/en", languages: { es: "https://frekvens-ui.vercel.app/", en: "https://frekvens-ui.vercel.app/en" } },
}

// Portada en inglés: el texto propio va en inglés; las piezas, los ejemplos y el catálogo siguen en español (lang="es" heredado).
export default function HomeEn() {
  return (
    <>
      <section className="intro" lang="en">
        <p className="eyebrow">Design system · {catalog.length} components · MIT</p>
        <h1 className="title">React components to copy and paste.<br /><span>Big, dotted, accessible.</span></h1>
        <p className="lead">The code is copied into your project and becomes yours. Three themes, zero accessibility violations, and docs that coding agents can read too.</p>
        <p className="lead">Labels, examples and component docs are in Spanish. The API is in English, and every visible text is a prop.</p>
        <div className="cmd">npx shadcn@latest add https://frekvens-ui.vercel.app/r/switch.json</div>
      </section>
      <Hero />
      <section className="board-wrap" aria-labelledby="examples-title">
        <div className="index__head" lang="en">
          <h2 id="examples-title">Examples</h2>
          <Link href="/ejemplos" className="eyebrow">See all →</Link>
        </div>
        <ExamplesGrid />
      </section>
      <section className="board-wrap" aria-labelledby="catalog-title">
        <div className="index__head" lang="en">
          <h2 id="catalog-title">Catalogue</h2>
          <Link href="/componentes" className="eyebrow">See all {catalog.length} →</Link>
        </div>
        <CategoryGrid />
      </section>
    </>
  )
}
