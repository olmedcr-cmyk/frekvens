"use client"
/* Frekvens · DotColumns — MIT © Cris Olmedo */

import * as React from "react"
import { clamp, cx, range } from "./lib"

import type { DotColumnsProps } from "./types"
export type { DotColumnsProps }

/* ---------- DotColumns: columnas de puntos apilados, con el pico marcado ---------- */
export function DotColumns(props: DotColumnsProps): React.ReactElement
export function DotColumns(p?: any): any {
  var data: any = p.data || [],
    rows: any = p.rows || 5,
    vals: any = data.map(function (d?: any): any {
      return typeof d === "number" ? d : d.value
    }),
    mx: any = p.max || Math.max.apply(null, vals.concat([1]))
  var act: any = p.active == null ? vals.indexOf(Math.max.apply(null, vals)) : p.active,
    hasLbl: any = data.some(function (d?: any): any {
      return d && d.label
    })
  var sum: any = data
      .map(function (d?: any, i?: any): any {
        return (d && d.label ? d.label + " " : "") + vals[i]
      })
      .join(", "),
    sty: any = {}
  sty["--size"] = (p.size || 16) + "px"
  return (
    <div
      className={cx("frk-dotcols", "frk-dotcols--" + (p.tone || "rams"), p.className)}
      role="img"
      aria-label={(p.label ? p.label + ": " : "") + sum}
      style={sty}
    >
      <div className="frk-dotcols__plot" aria-hidden={true}>
        {data.map(function (d?: any, i?: any): any {
          var n: any = clamp(Math.round((vals[i] / mx) * rows), vals[i] > 0 ? 1 : 0, rows)
          return (
            <div key={i} className={cx("frk-dotcols__col", i === act && "is-on")}>
              {i === act ? <span className="frk-dotcols__pin" /> : null}
              {range(rows).map(function (r?: any): any {
                var k: any = rows - 1 - r
                return (
                  <span
                    key={r}
                    className={cx("frk-dotcols__dot", k < n && "is-on", k === n - 1 && "is-top")}
                    style={{
                      animationDelay: i * 40 + k * 30 + "ms",
                    }}
                  />
                )
              })}
              {hasLbl ? <span className="frk-dotcols__lbl">{d.label}</span> : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ---------- Sequencer: rejilla de pasos por pista; flechas para moverse, espacio para marcar ---------- */
