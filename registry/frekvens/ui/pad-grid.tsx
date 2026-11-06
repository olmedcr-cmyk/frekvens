"use client"
/* Frekvens · PadGrid — MIT © Cris Olmedo */

import * as React from "react"
import { PADKEYS, cx, range } from "./lib"

import type { PadGridProps } from "./types"
export type { PadGridProps }

const { useState, useRef, useEffect }: any = React

export function PadGrid(props: PadGridProps): React.ReactElement
export function PadGrid(p?: any): any {
  var n: any = (p.columns || 3) * (p.rows || 3),
    s: any = useState({}),
    hit: any = s[0],
    setHit: any = s[1],
    ctx: any = useRef(null)
  function play(i?: any): any {
    setHit(function (o?: any): any {
      var x: any = Object.assign({}, o)
      x[i] = Date.now()
      return x
    })
    setTimeout(function (): any {
      setHit(function (o?: any): any {
        var x: any = Object.assign({}, o)
        delete x[i]
        return x
      })
    }, 140)
    p.onPad && p.onPad(i)
    if (p.sound !== false)
      try {
        var c: any = (ctx.current =
          ctx.current || new (window.AudioContext || (window as any).webkitAudioContext)())
        var o: any = c.createOscillator(),
          g: any = c.createGain()
        o.type = i % 3 === 0 ? "sine" : i % 3 === 1 ? "triangle" : "square"
        o.frequency.setValueAtTime(110 * Math.pow(2, i / 4), c.currentTime)
        o.frequency.exponentialRampToValueAtTime(55, c.currentTime + 0.25)
        g.gain.setValueAtTime(0.12, c.currentTime)
        g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.3)
        o.connect(g)
        g.connect(c.destination)
        o.start()
        o.stop(c.currentTime + 0.3)
      } catch (e) {}
  }
  useEffect(function (): any {
    if (!p.keyboard) return
    function f(e?: any): any {
      var i: any = PADKEYS.indexOf(e.key.toLowerCase())
      if (i >= 0 && i < n && !e.repeat) play(i)
    }
    window.addEventListener("keydown", f)
    return function (): any {
      window.removeEventListener("keydown", f)
    }
  })
  return (
    <div
      className={cx("frk-pads", "frk-pads--" + (p.tone || "sol"), p.className)}
      role="group"
      aria-label={p.label || "Pads"}
      style={{
        gridTemplateColumns: "repeat(" + (p.columns || 3) + ", 1fr)",
      }}
    >
      {range(n).map(function (i?: any): any {
        var l: any = p.labels && p.labels[i]
        return (
          <button
            key={i}
            type="button"
            className={cx("frk-padkey", hit[i] && "is-hit")}
            aria-label={
              (l || "Pad " + (i + 1)) + (p.keyboard ? " (tecla " + PADKEYS[i].toUpperCase() + ")" : "")
            }
            onPointerDown={function (e?: any): any {
              e.preventDefault()
              play(i)
            }}
            onKeyDown={function (e?: any): any {
              if ((e.key === " " || e.key === "Enter") && !e.repeat) {
                e.preventDefault()
                play(i)
              }
            }}
          >
            {l ? <span className="frk-padkey__lbl">{l}</span> : null}
          </button>
        )
      })}
    </div>
  )
}

/* ---------- TapeDeck: dos carretes ---------- */
