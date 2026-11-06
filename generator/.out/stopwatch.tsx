"use client"
/* Frekvens · Stopwatch — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { Readout } from "./readout"
import { cx, fmt, pad, useClock } from "./lib"

import type { StopwatchProps } from "./types"
export type { StopwatchProps }

const { useState }: any = React

export function roundKey(tone?: any, icon?: any, label?: any, onClick?: any, extra?: any): any {
  return (
    <button
      {...Object.assign(
        {
          type: "button",
          className: "frk-key frk-tone--" + tone + " frk-key--m frk-key--round",
          "aria-label": label,
          onClick: onClick,
        },
        extra || {},
      )}
    >
      <span className="frk-key__main">
        <Icon name={icon} size={28} />
      </span>
    </button>
  )
}

/* ---------- Stopwatch: cronómetro con vueltas ---------- */
/* ---------- Stopwatch: cronómetro con vueltas ---------- */
export function Stopwatch(props: StopwatchProps): React.ReactElement
export function Stopwatch(p?: any): any {
  var r: any = useState(!!p.autoStart),
    run: any = r[0],
    setRun: any = r[1]
  var c: any = useClock(run),
    t: any = c[0]
  var l: any = useState([]),
    laps: any = l[0],
    setLaps: any = l[1]
  function lap(): any {
    var last: any = laps.length ? laps[0].at : 0
    var n: any = [
      {
        at: t,
        split: t - last,
      },
    ].concat(laps)
    setLaps(n)
    p.onLap && p.onLap(t)
  }
  function reset(): any {
    c[1]()
    setLaps([])
  }
  var best: any =
    laps.length > 1
      ? Math.min.apply(
          null,
          laps.map(function (x?: any): any {
            return x.split
          }),
        )
      : -1
  return (
    <div className={cx("frk-watch", p.className)}>
      <Readout label={p.label || "Cronómetro"} value={fmt(t, true)} size={p.size || "display"} />
      <div className="frk-watch__keys">
        {run
          ? roundKey("ink", "flag", "Vuelta", lap)
          : roundKey("well", "refresh", "Reiniciar", reset, {
              disabled: t === 0,
            })}
        {run
          ? roundKey("rams", "pause", "Parar", function (): any {
              setRun(false)
            })
          : roundKey("rams", "play", t ? "Continuar" : "Empezar", function (): any {
              setRun(true)
            })}
      </div>
      {laps.length ? (
        <ol className="frk-watch__laps" aria-label="Vueltas">
          {laps.map(function (x?: any, i?: any): any {
            return (
              <li key={laps.length - i} className={cx("frk-watch__lap", x.split === best && "is-best")}>
                <span>{"V" + pad(laps.length - i)}</span>
                <span>{fmt(x.split, true)}</span>
                <span>{fmt(x.at, true)}</span>
              </li>
            )
          })}
        </ol>
      ) : null}
    </div>
  )
}

/* ---------- Timer: cuenta atrás en un anillo de puntos ---------- */
