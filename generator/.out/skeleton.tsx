"use client"
/* Frekvens · Skeleton — MIT © Cris Olmedo */

import * as React from "react"
import { cx, range } from "./lib"

import type { SkeletonProps } from "./types"
export type { SkeletonProps }

/* ---------- Skeleton: carga de puntos ---------- */
export function Skeleton(props: SkeletonProps): React.ReactElement
export function Skeleton(p?: any): any {
  var shape: any = p.shape || "text",
    lines: any = p.lines || 3
  var body: any =
    shape === "text" ? (
      range(lines).map(function (i?: any): any {
        return (
          <span
            key={i}
            className="frk-skel__line"
            style={{
              width: i === lines - 1 ? "60%" : "100%",
            }}
          />
        )
      })
    ) : (
      <span
        className={"frk-skel__" + shape}
        style={{
          height: p.height,
          width: p.width,
        }}
      />
    )
  return (
    <div className={cx("frk-skel", "frk-skel--" + shape, p.className)} aria-busy={true} role="status">
      {body}
      <span className="frk-sr">{p.label || "Cargando"}</span>
    </div>
  )
}

/* ---------- EmptyState ---------- */
