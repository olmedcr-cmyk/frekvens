"use client"
/* Frekvens · ColumnChart — MIT © Cris Olmedo */

import * as React from "react"
import { clamp, cx } from "./lib"

import type { ColumnChartProps } from "./types"
export type { ColumnChartProps }

/* ---------- ColumnChart: columnas con su cifra encima; una destacada ---------- */
export function ColumnChart(props: ColumnChartProps): React.ReactElement
export function ColumnChart(p?: any): any {
  var data: any = p.data || [],
    vals: any = data.map(function (d?: any): any {
      return d.value
    }),
    mx: any = p.max || Math.max.apply(null, vals.concat([1])),
    H: any = p.height || 200
  var fmt: any =
      p.format ||
      function (n?: any): any {
        return String(n)
      },
    act: any = p.active == null ? vals.indexOf(Math.max.apply(null, vals)) : p.active
  var sum: any = data
    .map(function (d?: any): any {
      return d.label + " " + fmt(d.value) + (p.unit ? " " + p.unit : "")
    })
    .join(", ")
  return (
    <div
      className={cx(
        "frk-cols",
        "frk-cols--" + (p.shape || "bar"),
        p.track && p.track !== "none" && "frk-cols--track-" + p.track,
        "frk-cols--" + (p.tone || "rams"),
        p.className,
      )}
      role="img"
      aria-label={(p.label ? p.label + ": " : "") + sum}
    >
      {data.map(function (d?: any, i?: any): any {
        var on: any = i === act,
          pc: any = clamp(d.value / mx, 0, 1) * 100
        return (
          <div key={i} className={cx("frk-cols__col", on && "is-on")} aria-hidden={true}>
            <div
              className="frk-cols__slot"
              style={{
                height: H,
              }}
            >
              <span
                className="frk-cols__bar"
                style={{
                  height: pc + "%",
                }}
              />
              {p.values === false ? null : (
                <span
                  className="frk-cols__val"
                  style={{
                    bottom: pc + "%",
                  }}
                >
                  {fmt(d.value)}
                </span>
              )}
            </div>
            <span className="frk-cols__lbl">{d.label}</span>
          </div>
        )
      })}
    </div>
  )
}

/* ---------- Pictogram: una cantidad contada en fichas ---------- */
