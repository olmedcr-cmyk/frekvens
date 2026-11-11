"use client"
import Link from "next/link"
import { useState } from "react"

export type Pin = { slug: string; name: string; group: string; thumb: [number, number] | null }

export function Board({ heading, level, groups, pins }: { heading: string; level: 1 | 2; groups: string[]; pins: Pin[] }) {
  const [group, setGroup] = useState<string | null>(null)
  const shown = group ? pins.filter((p) => p.group === group) : pins
  const H = level === 1 ? "h1" : "h2"
  return (
    <section className="board-wrap" aria-labelledby="board-title">
      <div className="index__head">
        <H id="board-title">{heading}</H>
        <span className="eyebrow" aria-live="polite">{shown.length} de {pins.length}</span>
      </div>
      <div className="board-filter" role="group" aria-label="Filtrar por grupo">
        <button type="button" aria-pressed={group === null} onClick={() => setGroup(null)}>Todos</button>
        {groups.map((g) => (
          <button key={g} type="button" aria-pressed={group === g} onClick={() => setGroup(group === g ? null : g)}>{g}</button>
        ))}
      </div>
      <ul className="board">
        {shown.map((p) => (
          <li key={p.slug} className="pin">
            <Link href={`/componentes/${p.slug}`}>
              <figure>
                {p.thumb
                  ? <img src={`/thumbs/${p.slug}.jpg`} width={p.thumb[0]} height={p.thumb[1]} alt="" loading="lazy" decoding="async" />
                  : <span className="pin__blank" aria-hidden="true" />}
                <figcaption><span className="pin__name">{p.name}</span><span className="pin__group">{p.group}</span></figcaption>
              </figure>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
