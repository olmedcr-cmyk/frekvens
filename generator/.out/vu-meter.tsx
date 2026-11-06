"use client"
/* Frekvens · VUMeter — MIT © Cris Olmedo */

import * as React from "react"
import { clamp, cx, polar, range } from "./lib"

import type { VUMeterProps } from "./types"
export type { VUMeterProps }

const { useState, useEffect }: any = React

/* ---------- VUMeter: aguja analógica ---------- */
export function VUMeter(props: VUMeterProps): React.ReactElement
export function VUMeter(p?: any): any {
  var size: any = p.size || 180,
    c: any = size / 2,
    scale: any = p.scale || ["50", "40", "30", "20", "10", "5", "0", "3"],
    live: any = p.level == null && p.live
  var s: any = useState(p.value || 0),
    lv: any = s[0],
    set: any = s[1]
  useEffect(
    function (): any {
      if (!live) return
      var t0: any = performance.now(),
        raf: any
      function f(): any {
        var t: any = (performance.now() - t0) / 1000
        set(45 + 25 * Math.sin(t * 3.1) + 18 * Math.sin(t * 7.3) * Math.random())
        raf = requestAnimationFrame(f)
      }
      raf = requestAnimationFrame(f)
      return function (): any {
        cancelAnimationFrame(raf)
      }
    },
    [live],
  )
  var v: any = clamp(p.value != null ? p.value : p.level != null ? p.level : lv, 0, 100),
    a0: any = -52,
    a1: any = 52,
    ang: any = a0 + ((a1 - a0) * v) / 100,
    n: any = scale.length,
    py: any = size * 0.64
  var tip: any = polar(c, py, size * 0.44, ang),
    base: any = polar(c, py, -size * 0.04, ang)
  return (
    <div className={cx("frk-vu", p.className)}>
      <svg
        width={size}
        height={size}
        viewBox={"0 0 " + size + " " + size}
        role="meter"
        aria-label={p.label || "Nivel de pico"}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(v)}
      >
        <circle cx={c} cy={c} r={c - 1} className="frk-vu__face" />
        {scale.map(function (t?: any, i?: any): any {
          var q: any = polar(c, py, size * 0.4, a0 + ((a1 - a0) * i) / (n - 1))
          return (
            <text
              key={i}
              x={q[0]}
              y={q[1]}
              className={cx("frk-vu__num", i >= n - 2 && "is-red")}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize: Math.round(clamp(size / 15, 9, 13)) + "px",
              }}
            >
              {t}
            </text>
          )
        })}
        <line x1={base[0]} y1={base[1]} x2={tip[0]} y2={tip[1]} className="frk-vu__needle" />
        {range(21).map(function (i?: any): any {
          var aa: any = a0 + ((a1 - a0) * i) / 20,
            o: any = polar(c, py, size * 0.33, aa),
            e: any = polar(c, py, size * (i % 5 ? 0.31 : 0.295), aa)
          return (
            <line
              key={"t" + i}
              x1={o[0]}
              y1={o[1]}
              x2={e[0]}
              y2={e[1]}
              className={cx("frk-vu__tick", i > 16 && "is-red")}
            />
          )
        })}
        <circle cx={c} cy={py} r={5} className="frk-vu__pin" />
        <text x={c} y={size * 0.78} textAnchor="middle" className="frk-vu__label">
          {p.caption || "peak power level"}
        </text>
        <circle cx={c} cy={size * 0.86} r={3.5} className={cx("frk-vu__peak", v > 88 && "is-on")} />
      </svg>
    </div>
  )
}

/* ---------- RotarySelector: selector de fuente ---------- */
