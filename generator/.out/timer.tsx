"use client"
/* Frekvens · Timer — MIT © Cris Olmedo */

import * as React from "react"
import { roundKey } from "./stopwatch"
import { cx, fmt, range, useClock } from "./lib"

import type { TimerProps } from "./types"
export type { TimerProps }

const { useState, useRef, useEffect }: any = React

/* ---------- Timer: cuenta atrás en un anillo de puntos ---------- */
export function Timer(props: TimerProps): React.ReactElement
export function Timer(p?: any): any {
  var dur: any = (p.duration || 60) * 1000,
    size: any = p.size || 260,
    n: any = p.dots || 60
  var r: any = useState(!!p.autoStart),
    run: any = r[0],
    setRun: any = r[1]
  var c: any = useClock(run),
    left: any = Math.max(0, dur - c[0]),
    done: any = left === 0
  var fired: any = useRef(false)
  useEffect(
    function (): any {
      if (done && run) {
        setRun(false)
        if (!fired.current) {
          fired.current = true
          p.onComplete && p.onComplete()
        }
      }
      if (!done) fired.current = false
    },
    [done, run],
  )
  var lit: any = Math.ceil((left / dur) * n),
    secs: any = Math.ceil(left / 1000),
    last3: any = run && secs <= 3 && secs > 0
  var dots: any = range(n).map(function (i?: any): any {
    var a: any = (i / n) * 2 * Math.PI,
      R0: any = size / 2 - 10
    return (
      <circle
        key={i}
        cx={size / 2 + R0 * Math.sin(a)}
        cy={size / 2 - R0 * Math.cos(a)}
        r={i % 5 === 0 ? 4 : 2.6}
        className={i < lit ? "is-on" : ""}
      />
    )
  })
  return (
    <div className={cx("frk-timer", done && "is-done", p.className)}>
      <div
        className="frk-timer__face"
        style={{
          width: size,
          height: size,
        }}
      >
        <svg width={size} height={size} aria-hidden={true}>
          {dots}
        </svg>
        <div className="frk-timer__center">
          {p.label ? <span className="frk-timer__label">{p.label}</span> : null}
          <span
            key={last3 ? secs : "v"}
            className={cx("frk-timer__value", last3 && "is-count")}
            role="timer"
            aria-live={last3 || done ? "assertive" : "off"}
          >
            {done ? p.doneText || "Hecho" : last3 ? String(secs) : fmt(left)}
          </span>
        </div>
      </div>
      <div className="frk-watch__keys">
        {roundKey(
          "well",
          "refresh",
          "Reiniciar",
          function (): any {
            c[1]()
            setRun(false)
          },
          {
            disabled: left === dur,
          },
        )}
        {run
          ? roundKey("rams", "pause", "Pausa", function (): any {
              setRun(false)
            })
          : roundKey("rams", "play", "Empezar", function (): any {
              if (done) c[1]()
              setRun(true)
            })}
      </div>
    </div>
  )
}

/* ---------- Hourglass: reloj de arena de puntos, se gira al tocar ---------- */
