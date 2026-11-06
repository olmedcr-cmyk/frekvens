"use client"
/* Frekvens · Grid — MIT © Cris Olmedo */

import * as React from "react"
import { cx } from "./lib"

import type { GridProps } from "./types"
export type { GridProps }

export function Grid(props: GridProps): React.ReactElement
export function Grid(p?: any): any {
  return (
    <div
      className={cx("frk-grid", p.className)}
      style={Object.assign(
        {
          display: "grid",
          gridTemplateColumns: "repeat(" + (p.columns || 2) + ", minmax(0, 1fr))",
          gap: "var(--space-" + (p.gap == null ? 2 : p.gap) + ")",
        },
        p.style,
      )}
    >
      {p.children}
    </div>
  )
}
