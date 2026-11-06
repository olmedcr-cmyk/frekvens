"use client"
/* Frekvens · Scope — MIT © Cris Olmedo */

import * as React from "react"
import { cx, range, reduced } from "./lib"

import type { ScopeProps } from "./types"
export type { ScopeProps }

const { useState, useEffect }: any = React

/* ---------- Scope: osciloscopio ---------- */
export function Scope(props: ScopeProps): React.ReactElement
export function Scope(p?: any): any {
  var W: any = p.width || 360,
    H: any = p.height || 180,
    s: any = useState(0),
    t: any = s[0],
    set: any = s[1],
    live: any = p.live !== false && !reduced()
  useEffect(
    function (): any {
      if (!live) return
      var raf: any,
        t0: any = performance.now()
      function f(): any {
        set((performance.now() - t0) / 1000)
        raf = requestAnimationFrame(f)
      }
      raf = requestAnimationFrame(f)
      return function (): any {
        cancelAnimationFrame(raf)
      }
    },
    [live],
  )
  var fr: any = p.frequency || 2,
    amp: any = p.amplitude || 0.7,
    pts: any = []
  for (var x: any = 0; x <= W; x += 3) {
    var ph: any = (x / W) * Math.PI * 2 * fr + t * 4,
      y: any =
        H / 2 -
        (Math.sin(ph) * amp +
          Math.sin(ph * 3.1) * 0.12 * amp +
          (p.noise ? (Math.random() - 0.5) * p.noise : 0)) *
          H *
          0.42
    pts.push(x + "," + y.toFixed(1))
  }
  return (
    <figure
      className={cx("frk-scope", p.className)}
      style={{
        maxWidth: W,
      }}
    >
      <svg
        viewBox={"0 0 " + W + " " + H}
        width="100%"
        role="img"
        aria-label={
          (p.label || "Señal") + ": onda de " + fr + " ciclos, amplitud " + Math.round(amp * 100) + " %"
        }
      >
        {range(11).map(function (i?: any): any {
          return range(7).map(function (j?: any): any {
            return (
              <circle
                key={i + "-" + j}
                cx={(i * W) / 10}
                cy={(j * H) / 6}
                r={i === 5 || j === 3 ? 1.6 : 1}
                className="frk-scope__grid"
              />
            )
          })
        })}
        <polyline points={pts.join(" ")} className="frk-scope__trace" />
      </svg>
      {p.caption ? (
        <figcaption className="frk-scope__cap">
          <span>{p.caption}</span>
          <span>{fr + " Hz · " + Math.round(amp * 100) + "%"}</span>
        </figcaption>
      ) : null}
    </figure>
  )
}
/* ---------- VoicePosition: de dónde viene la voz (idea de libraries.dev/voice-position) ---------- */
