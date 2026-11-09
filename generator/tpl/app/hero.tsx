"use client"
import Link from "next/link"
import { Switch } from "@/registry/frekvens/ui/switch"
import { Readout } from "@/registry/frekvens/ui/readout"
import { Segmented } from "@/registry/frekvens/ui/segmented"

// Tres piezas sueltas, una por celda, sin decoración.
const specimens = [
  { slug: "switch", name: "Switch", node: <Switch label="Avisar al empezar" defaultChecked /> },
  { slug: "readout", name: "Readout", node: <Readout value="18:00" label="Próxima clase" size="display" /> },
  { slug: "segmented", name: "Segmented", node: <Segmented label="Vista" options={["Hoy", "Semana", "Mes"]} /> },
]

export function Hero() {
  return (
    <section className="specimens" aria-label="Muestras">
      {specimens.map((s, i) => (
        <div key={s.slug} className="specimen">
          <div className="specimen__body">{s.node}</div>
          <div className="specimen__cap"><span>{String(i + 1).padStart(2, "0")}</span><Link href={`/componentes/${s.slug}`}>{s.name}</Link></div>
        </div>
      ))}
    </section>
  )
}
