import catalog from "./catalog.json"
import { Hero } from "./hero"
import { CategoryGrid } from "./category-grid"
import { ExamplesGrid } from "./examples-grid"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <section className="intro">
        <p className="eyebrow">Sistema de diseño · {catalog.length} componentes · MIT</p>
        <h1 className="title">Componentes React para copiar y pegar.<br /><span>Grandes, de puntos, accesibles.</span></h1>
        <p className="lead">El código se copia a tu proyecto y es tuyo. Tres temas, 0 infracciones de accesibilidad y documentación que también leen los agentes.</p>
        <div className="cmd">npx shadcn@latest add https://frekvens-ui.vercel.app/r/switch.json</div>
      </section>
      <Hero />
      <section className="board-wrap" aria-labelledby="examples-title">
        <div className="index__head">
          <h2 id="examples-title">Ejemplos</h2>
          <Link href="/ejemplos" className="eyebrow">Ver todos →</Link>
        </div>
        <ExamplesGrid />
      </section>
      <section className="board-wrap" aria-labelledby="catalog-title">
        <div className="index__head">
          <h2 id="catalog-title">Catálogo</h2>
          <Link href="/componentes" className="eyebrow">Ver los {catalog.length} →</Link>
        </div>
        <CategoryGrid />
      </section>
    </>
  )
}
