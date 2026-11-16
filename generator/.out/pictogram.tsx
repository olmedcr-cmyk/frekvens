"use client"
/* Frekvens · Pictogram — MIT © Cris Olmedo */

import * as React from "react"
import { clamp, cx, range } from "./lib"

import type { PictogramProps } from "./types"
export type { PictogramProps }

/* ---------- Pictogram: una cantidad contada en fichas ---------- */
export function Pictogram(props: PictogramProps): React.ReactElement
export function Pictogram(p?: any): any {
  var total: any = p.total || 10,
    v: any = clamp(Math.round(p.value || 0), 0, total),
    shape: any = p.shape || "dot",
    end: any = p.from === "end"
  var cols: any = p.columns || (shape === "bar" ? total : Math.min(total, 5)),
    sty: any = {}
  sty["--cols"] = cols
  sty["--size"] = (p.size || (shape === "bar" ? 12 : 40)) + "px"
  return (
    <div
      className={cx("frk-picto", "frk-picto--" + shape, "frk-picto--" + (p.tone || "rams"), p.className)}
      role="img"
      aria-label={(p.label ? p.label + ": " : "") + v + " de " + total + (p.unit ? " " + p.unit : "")}
      style={sty}
    >
      {range(total).map(function (i?: any): any {
        return <span key={i} className={cx("frk-picto__u", (end ? i >= total - v : i < v) && "is-on")} />
      })}
    </div>
  )
}

/* ---------- DotColumns: columnas de puntos apilados, con el pico marcado ---------- */
