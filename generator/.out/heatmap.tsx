"use client"
/* Frekvens · Heatmap — MIT © Cris Olmedo */

import * as React from "react"
import { cx, lvl } from "./lib"

import type { HeatmapProps } from "./types"
export type { HeatmapProps }

/* ---------- Heatmap: semitono de puntos ---------- */
export function Heatmap(props: HeatmapProps): React.ReactElement
export function Heatmap(p?: any): any {
  var data: any = p.data || [],
    rows: any = p.rows || 7,
    cols: any = Math.ceil(data.length / rows),
    size: any = p.cell || 14,
    mx: any = Math.max.apply(null, data.concat([1]))
  var total: any = data.reduce(function (a?: any, b?: any): any {
      return a + b
    }, 0),
    days: any = data.filter(function (x?: any): any {
      return x > 0
    }).length
  return (
    <figure className={cx("frk-heat", "frk-heat--" + (p.tone || "ink"), p.className)}>
      <svg
        width={cols * size}
        height={rows * size}
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
        viewBox={"0 0 " + cols * size + " " + rows * size}
        role="img"
        aria-label={
          (p.label || "Actividad") +
          ": " +
          days +
          " de " +
          data.length +
          " días con actividad, total " +
          total +
          (p.unit || "")
        }
      >
        {data.map(function (v?: any, i?: any): any {
          var c: any = Math.floor(i / rows),
            r: any = i % rows,
            k: any = lvl(v, mx)
          return (
            <circle
              key={i}
              cx={c * size + size / 2}
              cy={r * size + size / 2}
              r={v > 0 ? size * (0.18 + 0.27 * k) : size * 0.12}
              className={v > 0 ? "is-on" : ""}
            >
              <title>{v + (p.unit || "")}</title>
            </circle>
          )
        })}
      </svg>
      {p.caption ? <figcaption className="frk-line__cap">{p.caption}</figcaption> : null}
    </figure>
  )
}

/* ---------- SplitBar: reparto en píldoras ---------- */
