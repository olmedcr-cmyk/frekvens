"use client"
/* Frekvens · TrimWave — MIT © Cris Olmedo */

import * as React from "react"
import { clamp, cx, useValue, wavePeaks } from "./lib"

import type { TrimWaveProps } from "./types"
export type { TrimWaveProps }

const { useRef }: any = React

export function TrimWave(props: TrimWaveProps): React.ReactElement
export function TrimWave(p?: any): any {
  var peaks: any = p.peaks || wavePeaks(48),
    st: any = useValue(p, [20, 80]),
    a: any = clamp(st[0][0], 0, 100),
    b: any = clamp(st[0][1], 0, 100),
    gap: any = p.minGap || 2
  var track: any = useRef(null),
    drag: any = useRef(null),
    fmt: any =
      p.format ||
      function (n?: any): any {
        return Math.round(n) + " %"
      }
  function set(which?: any, n?: any): any {
    n = Math.round(n)
    if (which === 0) st[1]([clamp(n, 0, b - gap), b])
    else st[1]([a, clamp(n, a + gap, 100)])
  }
  function pctOf(e?: any): any {
    var r: any = track.current.getBoundingClientRect()
    return clamp(((e.clientX - r.left) / r.width) * 100, 0, 100)
  }
  function handle(which?: any): any {
    var v: any = which === 0 ? a : b
    return (
      <span
        className="frk-trim__handle"
        style={{
          left: v + "%",
        }}
        role="slider"
        tabIndex={0}
        aria-label={which === 0 ? p.startLabel || "Inicio" : p.endLabel || "Final"}
        aria-valuemin={which === 0 ? 0 : a + gap}
        aria-valuemax={which === 0 ? b - gap : 100}
        aria-valuenow={v}
        aria-valuetext={fmt(v)}
        aria-orientation="horizontal"
        onKeyDown={function (e?: any): any {
          var k: any = e.key,
            d: any =
              k === "ArrowRight" || k === "ArrowUp"
                ? 1
                : k === "ArrowLeft" || k === "ArrowDown"
                  ? -1
                  : k === "PageUp"
                    ? 10
                    : k === "PageDown"
                      ? -10
                      : k === "Home"
                        ? -100
                        : k === "End"
                          ? 100
                          : 0
          if (!d) return
          e.preventDefault()
          set(which, v + d)
        }}
        onPointerDown={function (e?: any): any {
          drag.current = which
          if (e.currentTarget.setPointerCapture) {
            try {
              e.currentTarget.setPointerCapture(e.pointerId)
            } catch (err) {}
          }
        }}
        onPointerMove={function (e?: any): any {
          if (drag.current === which) set(which, pctOf(e))
        }}
        onPointerUp={function (): any {
          drag.current = null
        }}
        onPointerCancel={function (): any {
          drag.current = null
        }}
      >
        <span className="frk-trim__grip" />
      </span>
    )
  }
  return (
    <div
      className={cx("frk-trim", "frk-trim--" + (p.tone || "rams"), p.className)}
      role="group"
      aria-label={p.label || "Recorte"}
    >
      <div className="frk-trim__track" ref={track}>
        <div className="frk-trim__wave" aria-hidden={true}>
          {peaks.map(function (v?: any, i?: any): any {
            var x: any = ((i + 0.5) / peaks.length) * 100
            return (
              <span
                key={i}
                className={cx("frk-trim__bar", x >= a && x <= b && "is-on")}
                style={{
                  height: Math.max(8, v * 100) + "%",
                }}
              />
            )
          })}
        </div>
        <span
          className="frk-trim__range"
          aria-hidden={true}
          style={{
            left: a + "%",
            width: b - a + "%",
          }}
        />
        {handle(0)}
        {handle(1)}
      </div>
      {p.readout === false ? null : (
        <div className="frk-trim__read" aria-hidden={true}>
          <span>{fmt(a)}</span>
          <span>{fmt(b)}</span>
        </div>
      )}
    </div>
  )
}

/* ---------- Bands: lista de franjas de color a todo el ancho ---------- */
