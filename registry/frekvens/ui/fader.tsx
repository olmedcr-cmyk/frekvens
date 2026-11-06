"use client"
/* Frekvens · Fader — MIT © Cris Olmedo */

import * as React from "react"
import { clamp, cx, range, useValue } from "./lib"

import type { FaderProps } from "./types"
export type { FaderProps }

const { useRef }: any = React

/* ---------- Fader: deslizador vertical ---------- */
export function Fader(props: FaderProps): React.ReactElement
export function Fader(p?: any): any {
  var min: any = p.min || 0,
    max: any = p.max == null ? 100 : p.max,
    H: any = p.height || 200,
    st: any = useValue(p, p.defaultValue != null ? p.defaultValue : 50),
    v: any = st[0],
    ref: any = useRef(null),
    drag: any = useRef(false)
  function set(n?: any): any {
    n = clamp(Math.round(n), min, max)
    if (n !== v) st[1](n)
  }
  function fromE(e?: any): any {
    var r: any = ref.current.getBoundingClientRect()
    set(min + (1 - (e.clientY - r.top) / r.height) * (max - min))
  }
  var pct: any = (v - min) / (max - min || 1)
  return (
    <div className={cx("frk-fader", p.className)}>
      <div
        ref={ref}
        className="frk-fader__track"
        style={{
          height: H,
        }}
        role="slider"
        tabIndex={0}
        aria-orientation="vertical"
        aria-label={p.label || "Fader"}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={v}
        onPointerDown={function (e?: any): any {
          drag.current = true
          e.currentTarget.setPointerCapture(e.pointerId)
          fromE(e)
        }}
        onPointerMove={function (e?: any): any {
          if (drag.current) fromE(e)
        }}
        onPointerUp={function (): any {
          drag.current = false
        }}
        onKeyDown={function (e?: any): any {
          var d: any = (
            {
              ArrowUp: 1,
              ArrowRight: 1,
              ArrowDown: -1,
              ArrowLeft: -1,
              PageUp: 10,
              PageDown: -10,
            } as any
          )[e.key]
          if (d) {
            e.preventDefault()
            set(v + d * (p.step || 1))
          }
        }}
      >
        <span className="frk-fader__slot" />
        {range(11).map(function (i?: any): any {
          return (
            <span
              key={i}
              className="frk-fader__tick"
              style={{
                bottom: i * 10 + "%",
              }}
            />
          )
        })}
        <span
          className={cx("frk-fader__cap", "frk-tone--" + (p.tone || "ink"))}
          style={{
            bottom: "calc(" + pct * 100 + "% - 14px)",
          }}
        />
      </div>
      <span className="frk-fader__val">{p.format ? p.format(v) : v}</span>
      {p.label ? <span className="frk-fader__lbl">{p.label}</span> : null}
    </div>
  )
}

/* ---------- Keycap: tecla mecánica esculpida ---------- */
