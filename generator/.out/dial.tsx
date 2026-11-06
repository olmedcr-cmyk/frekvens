"use client"
/* Frekvens · Dial — MIT © Cris Olmedo */

import * as React from "react"
import { clamp, cx, range, useValue } from "./lib"

import type { DialProps } from "./types"
export type { DialProps }

const { useRef }: any = React

/* ---------- Dial: black disc knob ---------- */
export function Dial(props: DialProps): React.ReactElement
export function Dial(p?: any): any {
  var min: any = p.min || 0,
    max: any = p.max == null ? 8 : p.max,
    size: any = p.size || 160,
    span: any = max - min || 1
  var st: any = useValue(p, min),
    v: any = st[0],
    set: any = function (n?: any): any {
      n = clamp(Math.round(n), min, max)
      if (n !== v) st[1](n)
    }
  var ref: any = useRef(null)
  var ang: any = ((-135 + ((v - min) / span) * 270) * Math.PI) / 180
  function fromEvent(e?: any): any {
    var r: any = ref.current.getBoundingClientRect()
    var a: any =
      (Math.atan2(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2))) * 180) / Math.PI
    set(min + ((clamp(a, -135, 135) + 135) / 270) * span)
  }
  function key(e?: any): any {
    var k: any = e.key
    if (k === "ArrowUp" || k === "ArrowRight") {
      set(v + 1)
      e.preventDefault()
    } else if (k === "ArrowDown" || k === "ArrowLeft") {
      set(v - 1)
      e.preventDefault()
    } else if (k === "Home") {
      set(min)
      e.preventDefault()
    } else if (k === "End") {
      set(max)
      e.preventDefault()
    }
  }
  var ticks: any = range(max - min + 1).map(function (i?: any): any {
    var a: any = ((-135 + (i / span) * 270) * Math.PI) / 180
    return (
      <circle
        key={i}
        cx={50 + 47 * Math.sin(a)}
        cy={50 - 47 * Math.cos(a)}
        r={1.5}
        className={cx("frk-dial__tick", i <= v - min && "is-on")}
      />
    )
  })
  return (
    <div
      className={cx("frk-dial", "frk-dial--" + (p.tone || "ink"), p.className)}
      style={{
        width: size,
      }}
    >
      <div
        ref={ref}
        className="frk-dial__knob"
        role="slider"
        tabIndex={0}
        aria-label={p.label || "Dial"}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={v}
        onPointerDown={function (e?: any): any {
          e.currentTarget.setPointerCapture(e.pointerId)
          fromEvent(e)
        }}
        onPointerMove={function (e?: any): any {
          if (e.buttons) fromEvent(e)
        }}
        onKeyDown={key}
        style={{
          width: size,
          height: size,
        }}
      >
        <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden={true}>
          {ticks}
          <circle cx={50} cy={50} r={41} className="frk-dial__disc" />
          <line
            x1={50 + 4 * Math.sin(ang + 2.4)}
            y1={50 - 4 * Math.cos(ang + 2.4)}
            x2={50 + 14 * Math.sin(ang + 0.5)}
            y2={50 - 14 * Math.cos(ang + 0.5)}
            className="frk-dial__needle"
          />
          <circle
            cx={50 + 30 * Math.sin(ang)}
            cy={50 - 30 * Math.cos(ang)}
            r={4.2}
            className="frk-dial__dot"
          />
        </svg>
      </div>
      {p.label ? <div className="frk-dial__label">{p.label + ":" + v}</div> : null}
    </div>
  )
}

/* ---------- Gauge: arc instrument ---------- */
