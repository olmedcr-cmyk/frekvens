"use client"
/* Frekvens · LineChart — MIT © Cris Olmedo */

import * as React from "react"
import { cx } from "./lib"

import type { LineChartProps } from "./types"
export type { LineChartProps }

/* ---------- LineChart: línea con marcador de "ahora" ---------- */
export function LineChart(props: LineChartProps): React.ReactElement
export function LineChart(p?: any): any {
  var data: any = p.data || [],
    W: any = p.width || 360,
    H: any = p.height || 140,
    pd: any = 12,
    n: any = data.length
  var mn: any = Math.min.apply(null, data),
    mx: any = Math.max.apply(null, data),
    sp: any = mx - mn || 1
  var pts: any = data.map(function (v?: any, i?: any): any {
    return [pd + (i / (n - 1)) * (W - pd * 2), pd + (1 - (v - mn) / sp) * (H - pd * 2 - 18)]
  })
  var d: any = pts
    .map(function (q?: any, i?: any): any {
      if (!i) return "M" + q[0] + " " + q[1]
      var a: any = pts[i - 1],
        c: any = (q[0] - a[0]) / 2
      return "C" + (a[0] + c) + " " + a[1] + " " + (q[0] - c) + " " + q[1] + " " + q[0] + " " + q[1]
    })
    .join(" ")
  var now: any = p.now != null ? p.now : -1,
    np: any = pts[now]
  return (
    <figure
      className={cx("frk-line", "frk-line--" + (p.tone || "ink"), p.className)}
      style={{
        width: "100%",
        maxWidth: W,
      }}
    >
      <svg
        viewBox={"0 0 " + W + " " + H}
        width="100%"
        role="img"
        aria-label={
          (p.label || "Gráfico") +
          ": mínimo " +
          mn +
          (p.unit || "") +
          ", máximo " +
          mx +
          (p.unit || "") +
          (np ? ", ahora " + data[now] + (p.unit || "") : "")
        }
      >
        <path d={d} className={np ? "frk-line__path is-future" : "frk-line__path"} />
        {np ? (
          <path
            d={d}
            className="frk-line__path"
            style={{
              clipPath: "inset(0 " + Math.round(((W - np[0]) / W) * 100) + "% 0 0)",
            }}
          />
        ) : null}
        {np ? (
          <g>
            <line x1={np[0]} y1={np[1]} x2={np[0]} y2={H - 18} className="frk-line__now" />
            <circle cx={np[0]} cy={np[1]} r={7} className="frk-line__ring" />
            <circle cx={np[0]} cy={np[1]} r={2.5} className="frk-line__dot" />
          </g>
        ) : null}
        {(p.labels || []).map(function (l?: any, i?: any): any {
          var x: any = pd + (i / (p.labels.length - 1 || 1)) * (W - pd * 2)
          return (
            <text
              key={i}
              x={x}
              y={H - 2}
              className={cx("frk-line__lbl", i === now && "is-now")}
              textAnchor={i === 0 ? "start" : i === p.labels.length - 1 ? "end" : "middle"}
            >
              {l}
            </text>
          )
        })}
      </svg>
      {p.caption ? <figcaption className="frk-line__cap">{p.caption}</figcaption> : null}
    </figure>
  )
}

/* ================= Frekvens 5: datos densos, música, SaaS, notch, 3D, banca, energía, captura ================= */
