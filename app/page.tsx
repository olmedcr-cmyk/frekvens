import Link from "next/link"
import catalog from "./catalog.json"
import { Hero } from "./hero"

export default function Home() {
  const groups = [...new Set(catalog.map((c) => c.group))]
  return (
    <>
      <section className="prose" style={{ maxWidth: "none" }}>
        <h1 style={{ fontSize: 56, lineHeight: 0.95, maxWidth: 720 }}>Componentes React para copiar y pegar.<br /><span style={{ color: "var(--ink-muted)" }}>Grandes, de puntos, accesibles.</span></h1>
        <p className="prose" style={{ margin: "16px 0 0" }}>Frekvens es el sistema de diseño de Cris Olmedo hecho librería al estilo shadcn/ui: el código se copia a tu proyecto, lo editas tú y no dependes de nadie. {catalog.length} componentes, tema claro y oscuro, 0 infracciones de accesibilidad en {catalog.length * 2} vistas y listos para UI generada por un modelo.</p>
        <div className="cmd" style={{ marginTop: 24, maxWidth: 560 }}>npx shadcn@latest add https://frekvens-ui.vercel.app/r/switch.json</div>
      </section>
      <Hero />
      {groups.map((g) => (
        <section key={g}>
          <h2 style={{ font: "800 24px/28px var(--font-sans)", margin: "0 0 12px" }}>{g}</h2>
          <div className="grid">
            {catalog.filter((c) => c.group === g).map((c) => (
              <Link key={c.slug} href={`/componentes/${c.slug}`} className="tile"><small>{c.group}</small><h3>{c.name}</h3><p>{c.description}</p></Link>
            ))}
          </div>
        </section>
      ))}
    </>
  )
}
