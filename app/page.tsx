import catalog from "./catalog.json"
import { Hero } from "./hero"
import { CatalogBoard } from "./catalog-board"

export default function Home() {
  return (
    <>
      <section className="intro">
        <p className="eyebrow">Sistema de diseño · {catalog.length} componentes · MIT</p>
        <h1 className="title">Componentes React para copiar y pegar.<br /><span>Grandes, de puntos, accesibles.</span></h1>
        <p className="lead">El código se copia a tu proyecto y es tuyo. Tema claro y oscuro, 0 infracciones de accesibilidad y listos para UI generada por un modelo.</p>
        <div className="cmd">npx shadcn@latest add https://frekvens-ui.vercel.app/r/switch.json</div>
      </section>
      <Hero />
      <CatalogBoard heading="Catálogo" />
    </>
  )
}
