"use client"
/* Frekvens · Scatter — MIT © Cris Olmedo */

import * as React from "react"
import { cx, range } from "./lib"

import type { ScatterProps } from "./types"
export type { ScatterProps }

/* ---------- Scatter ---------- */
export function Scatter(props: ScatterProps): React.ReactElement
export function Scatter(p?: any): any {
  var pts: any = p.points || [],
    W: any = p.width || 420,
    H: any = p.height || 260,
    pd: any = 28,
    xs: any = pts.map(function (q?: any): any {
      return q.x
    }),
    ys: any = pts.map(function (q?: any): any {
      return q.y
    })
  var x0: any = Math.min.apply(null, xs),
    x1: any = Math.max.apply(null, xs),
    y0: any = Math.min.apply(null, ys),
    y1: any = Math.max.apply(null, ys),
    mx: any = (x1 - x0) * 0.08 || 1,
    my: any = (y1 - y0) * 0.08 || 1
  x0 -= mx
  x1 += mx
  y0 -= my
  y1 += my
  function X(v?: any): any {
    return pd + ((v - x0) / (x1 - x0 || 1)) * (W - pd * 2)
  }
  function Y(v?: any): any {
    return H - pd - ((v - y0) / (y1 - y0 || 1)) * (H - pd * 2)
  }
  return (
    <figure
      className={cx("frk-scatter", p.className)}
      style={{
        maxWidth: W,
      }}
    >
      <svg
        viewBox={"0 0 " + W + " " + H}
        width="100%"
        role="img"
        aria-label={(p.label || "Dispersión") + ": " + pts.length + " puntos"}
      >
        {range(6).map(function (i?: any): any {
          return range(5).map(function (j?: any): any {
            return (
              <circle
                key={i + "-" + j}
                cx={pd + (i * (W - pd * 2)) / 5}
                cy={pd + (j * (H - pd * 2)) / 4}
                r={1.3}
                className="frk-scatter__grid"
              />
            )
          })
        })}
        <line x1={pd} y1={H - pd} x2={W - pd} y2={H - pd} className="frk-scatter__axis" />
        <line x1={pd} y1={pd} x2={pd} y2={H - pd} className="frk-scatter__axis" />
        {pts.map(function (q?: any, i?: any): any {
          return (
            <circle
              key={i}
              cx={X(q.x)}
              cy={Y(q.y)}
              r={q.size || 6}
              className={"frk-scatter__pt frk-area--" + (q.tone || "ink")}
            >
              <title>{(q.label ? q.label + ": " : "") + q.x + ", " + q.y}</title>
            </circle>
          )
        })}
        <text x={W - pd} y={H - 8} textAnchor="end" className="frk-line__lbl">
          {p.xLabel || "x"}
        </text>
        <text x={4} y={pd - 10} className="frk-line__lbl">
          {p.yLabel || "y"}
        </text>
      </svg>
    </figure>
  )
}

/* ---------- RadarChart ---------- */
