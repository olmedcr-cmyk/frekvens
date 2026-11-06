"use client"
/* Frekvens · RotarySelector — MIT © Cris Olmedo */

import * as React from "react"
import { clamp, cx, norm, polar, useValue } from "./lib"

import type { RotarySelectorProps } from "./types"
export type { RotarySelectorProps }

const { useRef }: any = React

/* ---------- RotarySelector: selector de fuente ---------- */
export function RotarySelector(props: RotarySelectorProps): React.ReactElement
export function RotarySelector(p?: any): any {
  var opts: any = norm(p.options),
    n: any = opts.length,
    st: any = useValue(p, opts[0] && opts[0].value),
    v: any = st[0],
    size: any = p.size || 200,
    c: any = size / 2,
    ref: any = useRef(null),
    drag: any = useRef(false)
  var span: any = p.span || 300,
    start: any = -span / 2,
    idx: any = 0
  opts.forEach(function (o?: any, i?: any): any {
    if (o.value === v) idx = i
  })
  function angOf(i?: any): any {
    return start + (span * i) / (n - 1 || 1)
  }
  function pick(i?: any): any {
    i = clamp(i, 0, n - 1)
    if (opts[i].value !== v) {
      st[1](opts[i].value)
      if (navigator.vibrate)
        try {
          navigator.vibrate(6)
        } catch (e) {}
    }
  }
  function fromE(e?: any): any {
    var r: any = ref.current.getBoundingClientRect(),
      a: any =
        (Math.atan2(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2))) * 180) /
        Math.PI
    pick(Math.round(((clamp(a, start, start + span) - start) / span) * (n - 1)))
  }
  var kp: any = polar(c, c, c * 0.24, angOf(idx))
  return (
    <div
      className={cx("frk-rotary", p.className)}
      style={{
        width: size,
        height: size,
      }}
    >
      {opts.map(function (o?: any, i?: any): any {
        var q: any = polar(c, c, c * 0.86, angOf(i))
        return (
          <span
            key={o.value}
            aria-hidden={true}
            className={cx("frk-rotary__lbl", i === idx && "is-on")}
            style={{
              left: q[0],
              top: q[1],
              transform: "translate(-50%,-50%) rotate(" + angOf(i) + "deg)",
            }}
            onClick={function (): any {
              pick(i)
            }}
          >
            {o.label}
          </span>
        )
      })}
      <div
        ref={ref}
        className="frk-rotary__knob"
        role="slider"
        tabIndex={0}
        aria-label={p.label || "Selector"}
        aria-valuemin={0}
        aria-valuemax={n - 1}
        aria-valuenow={idx}
        aria-valuetext={opts[idx] && String(opts[idx].label)}
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
              ArrowRight: 1,
              ArrowUp: 1,
              ArrowLeft: -1,
              ArrowDown: -1,
            } as any
          )[e.key]
          if (d) {
            e.preventDefault()
            pick(idx + d)
          }
          if (e.key === "Home") pick(0)
          if (e.key === "End") pick(n - 1)
        }}
      >
        <span
          className="frk-rotary__bar"
          style={{
            transform: "rotate(" + angOf(idx) + "deg)",
          }}
        />
      </div>
      <span className="frk-rotary__mark" aria-hidden={true} />
    </div>
  )
}

/* ---------- Fader: deslizador vertical ---------- */
