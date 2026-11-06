"use client"
/* Frekvens · TapeDeck — MIT © Cris Olmedo */

import * as React from "react"
import { Keypad } from "./keypad"
import { clamp, cx, fmt, polar, range, useClock } from "./lib"

import type { TapeDeckProps } from "./types"
export type { TapeDeckProps }

const { useState }: any = React

/* ---------- TapeDeck: dos carretes ---------- */
export function TapeDeck(props: TapeDeckProps): React.ReactElement
export function TapeDeck(p?: any): any {
  var ps: any = useState(!!p.playing),
    playing: any = ps[0],
    c: any = useClock(playing),
    dur: any = (p.duration || 180) * 1000,
    pr: any = clamp(c[0] / dur, 0, 1)
  var W: any = 320,
    Hh: any = 150,
    r1: any = 46 - pr * 18,
    r2: any = 28 + pr * 18
  function reel(x?: any, r?: any, k?: any): any {
    return (
      <g
        key={k}
        className={cx("frk-tape__reel", playing && "is-spin")}
        style={{
          transformOrigin: x + "px 70px",
          animationDuration: 0.6 + r / 40 + "s",
        }}
      >
        <circle cx={x} cy={70} r={50} className="frk-tape__ring" />
        <circle cx={x} cy={70} r={r} className="frk-tape__wound" />
        <circle cx={x} cy={70} r={9} className="frk-tape__hub" />
        {range(3).map(function (i?: any): any {
          var q: any = polar(x, 70, 16, i * 120)
          return <circle key={i} cx={q[0]} cy={q[1]} r={3} className="frk-tape__spoke" />
        })}
      </g>
    )
  }
  return (
    <div className={cx("frk-tape", p.className)}>
      <div className="frk-tape__head">
        <span className="frk-tape__title">{p.title || "tape preview"}</span>
        <span className="frk-tape__count">{fmt(c[0])}</span>
      </div>
      <svg
        viewBox={"0 0 " + W + " " + Hh}
        width="100%"
        role="img"
        aria-label={
          (p.title || "Cinta") +
          (playing ? ", reproduciendo" : ", en pausa") +
          ", " +
          Math.round(pr * 100) +
          " %"
        }
      >
        <path
          d={"M" + (90 - r1) + " 70 L" + (90 - r1) + " 132 L" + (230 + r2) + " 132 L" + (230 + r2) + " 70"}
          className="frk-tape__belt"
        />
        {reel(90, r1, "a")}
        {reel(230, r2, "b")}
        <rect x={150} y={124} width={20} height={14} rx={3} className="frk-tape__headblock" />
      </svg>
      <div className="frk-tape__prog">
        <span
          style={{
            width: pr * 100 + "%",
          }}
        />
      </div>
      <Keypad
        label="Transporte"
        height={64}
        keys={[
          {
            icon: "arrow-left",
            ariaLabel: "Rebobinar",
            onClick: function (): any {
              c[1]()
            },
          },
          {
            icon: playing ? "pause" : "play",
            ariaLabel: playing ? "Pausa" : "Reproducir",
            tone: "sol",
            onClick: function (): any {
              ps[1](!playing)
            },
          },
          {
            icon: "stop",
            ariaLabel: "Parar",
            onClick: function (): any {
              ps[1](false)
              c[1]()
            },
          },
          {
            icon: "rec",
            ariaLabel: "Grabar",
            tone: "rec",
          },
        ]}
      />
    </div>
  )
}

/* ---------- Board / Sortable: arrastrar y soltar (puntero + teclado) ---------- */
