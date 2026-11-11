import { examples } from "../examples"
import { ExamplesGrid } from "../examples-grid"
export const metadata = { title: "Ejemplos — Frekvens" }
export default function Page() {
  return (
    <section className="board-wrap" aria-labelledby="examples-title">
      <div className="index__head">
        <h1 id="examples-title">Ejemplos</h1>
        <span className="eyebrow">{examples.length} apps</span>
      </div>
      <p className="lead examples__lead">Pantallas completas montadas solo con componentes de Frekvens, en rejilla de dos columnas.</p>
      <ExamplesGrid />
    </section>
  )
}
