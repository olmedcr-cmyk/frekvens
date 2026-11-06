"use client"
/* Frekvens · Readout — MIT © Cris Olmedo */

import * as React from "react"
import { cx } from "./lib"

import type { ReadoutProps } from "./types"
export type { ReadoutProps }

/* ---------- Readout: dot numerals + mono label ---------- */
export function Readout(props: ReadoutProps): React.ReactElement
export function Readout(p?: any): any {
  return (
    <div className={cx("frk-readout", "frk-readout--" + (p.size || "hero"), p.className)}>
      {p.label ? <div className="frk-readout__label">{p.label}</div> : null}
      <div className="frk-readout__value" aria-live={p.live ? "polite" : undefined}>
        {p.value}
        {p.unit ? <span className="frk-readout__unit">{p.unit}</span> : null}
      </div>
      {p.meta ? <div className="frk-readout__meta">{p.meta}</div> : null}
    </div>
  )
}

/* ---------- Tile: widget card ---------- */
