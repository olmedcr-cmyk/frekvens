"use client"
/* Frekvens · Hourglass — MIT © Cris Olmedo */

import * as React from "react"
import { clamp, cx, useClock } from "./lib"

import type { HourglassProps } from "./types"
export type { HourglassProps }

const { useState, useEffect }: any = React

/* ---------- Hourglass: reloj de arena de puntos, se gira al tocar ---------- */
export function Hourglass(props: HourglassProps): React.ReactElement
export function Hourglass(p?: any): any {
  var dur: any = (p.duration || 30) * 1000,
    rows: any = 8,
    pitch: any = p.pitch || 12,
    dot: any = pitch * 0.55
  var r: any = useState(!!p.autoStart),
    run: any = r[0],
    setRun: any = r[1]
  var f: any = useState(0),
    flips: any = f[0],
    setFlips: any = f[1]
  var c: any = useClock(run),
    prog: any = clamp(c[0] / dur, 0, 1)
  useEffect(
    function (): any {
      if (prog >= 1 && run) {
        setRun(false)
        p.onComplete && p.onComplete()
      }
    },
    [prog >= 1],
  )
  var top: any = [],
    bot: any = []
  for (var y: any = 0; y < rows; y++) {
    var w: any = rows - y
    for (var x: any = 0; x < w; x++) {
      top.push([x - (w - 1) / 2, y])
      bot.push([x - (y + 1 - 1) / 2 - 0, rows + 1 + y])
    }
  }
  bot = []
  for (var y2: any = 0; y2 < rows; y2++) {
    var w2: any = y2 + 1
    for (var x2: any = 0; x2 < w2; x2++) bot.push([x2 - (w2 - 1) / 2, rows + 1 + y2])
  }
  var total: any = top.length,
    fallen: any = Math.round(prog * total)
  var topOrder: any = top.slice().sort(function (a?: any, b?: any): any {
    return a[1] - b[1] || Math.abs(b[0]) - Math.abs(a[0])
  })
  var gone: any = {}
  topOrder.slice(0, fallen).forEach(function (q?: any): any {
    gone[q[0] + "," + q[1]] = 1
  })
  var botOrder: any = bot.slice().sort(function (a?: any, b?: any): any {
    return b[1] - a[1] || Math.abs(a[0]) - Math.abs(b[0])
  })
  var filled: any = {}
  botOrder.slice(0, fallen).forEach(function (q?: any): any {
    filled[q[0] + "," + q[1]] = 1
  })
  var W: any = rows * pitch + pitch,
    H: any = (rows * 2 + 1) * pitch + pitch,
    cxp: any = W / 2
  function circ(q?: any, on?: any, k?: any): any {
    return (
      <circle
        key={k}
        cx={cxp + q[0] * pitch}
        cy={pitch / 2 + q[1] * pitch + pitch / 2}
        r={dot / 2}
        className={on ? "is-on" : ""}
      />
    )
  }
  return (
    <div className={cx("frk-hourglass", p.className)}>
      <button
        type="button"
        className="frk-hourglass__body"
        style={{
          transform: "rotate(" + flips * 180 + "deg)",
        }}
        aria-label={
          (p.label || "Reloj de arena") + ": " + Math.ceil(((1 - prog) * dur) / 1000) + " s. Toca para girar"
        }
        onClick={function (): any {
          c[1]()
          setFlips(flips + 1)
          setRun(true)
        }}
      >
        <svg width={W} height={H} viewBox={"0 0 " + W + " " + H} aria-hidden={true}>
          {top.map(function (q?: any, i?: any): any {
            return circ(q, !gone[q[0] + "," + q[1]], "t" + i)
          })}
          {run ? (
            <circle
              className="is-on frk-hourglass__grain"
              cx={cxp}
              cy={pitch / 2 + rows * pitch + pitch / 2}
              r={dot / 2}
            />
          ) : null}
          {bot.map(function (q?: any, i?: any): any {
            return circ(q, !!filled[q[0] + "," + q[1]], "b" + i)
          })}
        </svg>
      </button>
      <span className="frk-hourglass__read">{Math.ceil(((1 - prog) * dur) / 1000) + " s"}</span>
    </div>
  )
}

/* ---------- Pendulum: metrónomo ---------- */
