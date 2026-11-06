"use client"
/* Frekvens · DotMatrix — MIT © Cris Olmedo */

import * as React from "react"
import { cx, shapeRows, textRows } from "./lib"

import type { DotMatrixProps } from "./types"
export type { DotMatrixProps }

const { useState }: any = React

export function DotMatrix(props: DotMatrixProps): React.ReactElement
export function DotMatrix(p?: any): any {
  var rows: any = p.rows || (p.text != null ? textRows(p.text) : shapeRows(p.shape || "sun", p.grid || 15))
  var dot: any = p.dot || 6,
    pitch: any = p.pitch || 10,
    H: any = rows.length,
    W: any = rows.reduce(function (m?: any, r?: any): any {
      return Math.max(m, r.length)
    }, 0)
  var ps: any = useState(null),
    ptr: any = ps[0],
    setPtr: any = ps[1],
    reach: any = pitch * 3.2
  var dots: any = []
  rows.forEach(function (r?: any, y?: any): any {
    for (var x: any = 0; x < W; x++) {
      var on: any = r[x] === "1" || r[x] === "#"
      var px: any = x * pitch + pitch / 2,
        py: any = y * pitch + pitch / 2,
        rr: any = dot / 2
      if (ptr) {
        var dd: any = Math.hypot(px - ptr[0], py - ptr[1])
        if (dd < reach) rr = rr * (1 + 0.6 * (1 - dd / reach))
      }
      if (on || p.showOff)
        dots.push(
          <circle key={x + "-" + y} cx={px} cy={py} r={rr} className={on ? "frk-dm__on" : "frk-dm__off"} />,
        )
    }
  })
  return (
    <svg
      className={cx("frk-dm", "frk-dm--" + (p.tone || "ink"), p.className)}
      width={W * pitch}
      height={H * pitch}
      viewBox={"0 0 " + W * pitch + " " + H * pitch}
      role="img"
      aria-label={p.label || (p.text != null ? String(p.text) : p.shape)}
      onPointerMove={
        p.reactive
          ? function (e?: any): any {
              var b: any = e.currentTarget.getBoundingClientRect()
              setPtr([
                (e.clientX - b.left) * ((W * pitch) / b.width),
                (e.clientY - b.top) * ((H * pitch) / b.height),
              ])
            }
          : undefined
      }
      onPointerLeave={
        p.reactive
          ? function (): any {
              setPtr(null)
            }
          : undefined
      }
    >
      {dots}
    </svg>
  )
}

/* ---------- DotGrid: n of m discs ---------- */
