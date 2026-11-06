"use client"
/* Frekvens · Sparkline — MIT © Cris Olmedo */

import * as React from "react"
import { cx } from "./lib"

import type { SparklineProps } from "./types"
export type { SparklineProps }

/* ---------- Sparkline ---------- */
export function Sparkline(props: SparklineProps): React.ReactElement
export function Sparkline(p?: any): any {
  var d: any = p.data || [],
    W: any = p.width || 96,
    H: any = p.height || 28,
    mn: any = Math.min.apply(null, d),
    mx: any = Math.max.apply(null, d),
    sp: any = mx - mn || 1
  var pts: any = d.map(function (v?: any, i?: any): any {
    return [2 + (i / (d.length - 1 || 1)) * (W - 6), 3 + (1 - (v - mn) / sp) * (H - 6)]
  })
  var last: any = pts[pts.length - 1] || [0, 0],
    up: any = d[d.length - 1] >= d[0]
  return (
    <svg
      className={cx("frk-spark", "frk-spark--" + (p.tone || "ink"), p.className)}
      width={W}
      height={H}
      viewBox={"0 0 " + W + " " + H}
      role="img"
      aria-label={(p.label || "Tendencia") + (up ? " al alza" : " a la baja") + ", último " + d[d.length - 1]}
    >
      <polyline
        points={pts
          .map(function (q?: any): any {
            return q.join(",")
          })
          .join(" ")}
      />
      <circle cx={last[0]} cy={last[1]} r={3} />
    </svg>
  )
}

/* ---------- ClickWheel: rueda táctil tipo reproductor de bolsillo ---------- */
