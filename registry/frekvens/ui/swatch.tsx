"use client"
/* Frekvens · Swatch — MIT © Cris Olmedo */

import * as React from "react"
import { cx, swatchColor } from "./lib"

import type { SwatchProps } from "./types"
export type { SwatchProps }

export function Swatch(props: SwatchProps): React.ReactElement
export function Swatch(p?: any): any {
  var size: any = p.size || 96
  return (
    <figure className={cx("frk-swatch", p.className)}>
      <span
        className="frk-swatch__disc"
        aria-hidden={true}
        style={{
          width: size,
          height: size,
          background: swatchColor(p.ground),
        }}
      >
        {p.mark ? (
          <span
            className="frk-swatch__mark"
            style={{
              background: swatchColor(p.mark),
            }}
          />
        ) : null}
      </span>
      {p.label ? (
        <figcaption className="frk-swatch__label">
          {p.label}
          {p.note ? <span className="frk-swatch__note">{p.note}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  )
}

/* ---------- WeekStrip: los días de una semana con su estado; se elige uno ---------- */
