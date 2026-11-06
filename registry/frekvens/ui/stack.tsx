"use client"
/* Frekvens · Stack — MIT © Cris Olmedo */

import * as React from "react"
import { cx } from "./lib"

import type { StackProps } from "./types"
export type { StackProps }

/* ---------- Layout primitives (para composición generativa) ---------- */
export function Stack(props: StackProps): React.ReactElement
export function Stack(p?: any): any {
  return (
    <div
      className={cx("frk-stackl", p.className)}
      style={Object.assign(
        {
          display: "flex",
          flexDirection: p.direction === "row" ? "row" : "column",
          gap: "var(--space-" + (p.gap == null ? 3 : p.gap) + ")",
          alignItems: p.align,
          justifyContent: p.justify,
          flexWrap: p.wrap ? "wrap" : undefined,
          padding: p.padding != null ? "var(--space-" + p.padding + ")" : undefined,
        },
        p.style,
      )}
    >
      {p.children}
    </div>
  )
}
