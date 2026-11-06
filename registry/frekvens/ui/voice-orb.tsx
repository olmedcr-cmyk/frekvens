"use client"
/* Frekvens · VoiceOrb — MIT © Cris Olmedo */

import * as React from "react"
import { clamp, cx, reduced } from "./lib"

import type { VoiceOrbProps } from "./types"
export type { VoiceOrbProps }

const { useState, useEffect }: any = React

/* ---------- VoiceOrb: orbe de puntos para voz ---------- */
export function VoiceOrb(props: VoiceOrbProps): React.ReactElement
export function VoiceOrb(p?: any): any {
  var size: any = p.size || 200,
    n: any = p.grid || 15,
    pitch: any = size / n,
    state: any = p.state || "idle"
  var s: any = useState(0),
    t: any = s[0],
    setT: any = s[1]
  useEffect(
    function (): any {
      if (state === "idle" || reduced()) return
      var raf: any
      var t0: any = performance.now()
      function tick(): any {
        setT((performance.now() - t0) / 1000)
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
      return function (): any {
        cancelAnimationFrame(raf)
      }
    },
    [state],
  )
  var lvl: any = p.level != null ? p.level : 0.5,
    c: any = (n - 1) / 2,
    dots: any = []
  for (var y: any = 0; y < n; y++)
    for (var x: any = 0; x < n; x++) {
      var dx: any = x - c,
        dy: any = y - c,
        d: any = Math.sqrt(dx * dx + dy * dy)
      if (d > c + 0.2) continue
      var k: any = 0.35
      if (state === "listening")
        k = 0.35 + lvl * 0.55 * (0.6 + 0.4 * Math.sin(t * 9 + d * 0.9)) * (1 - d / (c + 1))
      else if (state === "speaking") k = 0.3 + 0.5 * Math.max(0, Math.sin(d * 0.9 - t * 7)) * lvl * 1.4
      else if (state === "thinking") {
        var a: any = Math.atan2(dy, dx),
          ph: any = (((a - t * 3) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
        k = 0.25 + (ph < 1.2 ? 0.45 * (1 - ph / 1.2) : 0) * (d / (c + 0.5))
      }
      dots.push(
        <circle
          key={x + "-" + y}
          cx={x * pitch + pitch / 2}
          cy={y * pitch + pitch / 2}
          r={(clamp(k, 0.15, 0.95) * pitch) / 2}
        />,
      )
    }
  var names: any = {
    idle: "En espera",
    listening: "Escuchando",
    thinking: "Pensando",
    speaking: "Hablando",
  }
  return (
    <div
      className={cx("frk-orb", "frk-orb--" + state, "frk-orb--" + (p.tone || "ink"), p.className)}
      style={{
        width: size,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={"0 0 " + size + " " + size}
        role="img"
        aria-label={p.label || names[state]}
      >
        {dots}
      </svg>
      {p.caption !== false ? (
        <span className="frk-orb__caption" aria-live="polite">
          {p.caption || names[state]}
        </span>
      ) : null}
    </div>
  )
}

/* ---------- Message: turno de conversación ---------- */
