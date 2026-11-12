"use client"
/* Frekvens · Shape — MIT © Cris Olmedo */

import * as React from "react"
import { SHAPES, cx } from "./lib"

import type { ShapeProps } from "./types"
export type { ShapeProps }

const h: any = React.createElement

export function Shape(props: ShapeProps): React.ReactElement
export function Shape(p?: any): any {
  var size: any = p.size || 96,
    def: any = SHAPES[p.name] || SHAPES.disc
  return (
    <svg
      className={cx("frk-shape", p.soft && "frk-shape--soft", p.tone && "frk-shape--" + p.tone, p.className)}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role={p.label ? "img" : undefined}
      aria-label={p.label}
      aria-hidden={p.label ? undefined : true}
      focusable="false"
      style={
        p.rotate
          ? {
              transform: "rotate(" + p.rotate + "deg)",
            }
          : undefined
      }
    >
      {def.map(function (d?: any, i?: any): any {
        return h(
          d[0],
          Object.assign(
            {
              key: i,
            },
            d[1],
          ),
        )
      })}
    </svg>
  )
}

/* ---------- Ruler: regla de sintonía; se arrastra la escala bajo una aguja fija ---------- */
