"use client"
/* Frekvens · StateMark — MIT © Cris Olmedo */

import * as React from "react"
import { cx } from "./lib"

import type { StateMarkProps } from "./types"
export type { StateMarkProps }

/* ---------- StateMark: ring · dots · disc ---------- */
export function StateMark(props: StateMarkProps): React.ReactElement
export function StateMark(p?: any): any {
  var s: any = p.size || 24,
    st: any = p.state || "empty",
    inner: any
  if (st === "empty")
    inner = <circle cx={12} cy={12} r={10} fill="none" stroke="currentColor" strokeWidth={2.4} />
  else if (st === "full") inner = <circle cx={12} cy={12} r={11} fill="currentColor" />
  else
    inner = [
      [6, 3],
      [12, 3],
      [18, 3],
      [3, 8],
      [9, 8],
      [15, 8],
      [21, 8],
      [6, 13],
      [12, 13],
      [18, 13],
      [3, 18],
      [9, 18],
      [15, 18],
      [21, 18],
      [9, 22.5],
      [15, 22.5],
    ].map(function (q?: any, i?: any): any {
      return <circle key={i} cx={q[0]} cy={q[1] - 0.8} r={1.6} fill="currentColor" />
    })
  var names: any = {
    empty: "Pendiente",
    partial: "En curso",
    full: "Hecho",
  }
  return (
    <span className={cx("frk-state", p.className)} title={p.title}>
      <svg
        {...(p.label === ""
          ? {
              width: s,
              height: s,
              viewBox: "0 0 24 24",
              "aria-hidden": true,
            }
          : {
              width: s,
              height: s,
              viewBox: "0 0 24 24",
              role: "img",
              "aria-label": p.label || names[st],
            })}
      >
        {inner}
      </svg>
      {p.children != null ? <span className="frk-state__text">{p.children}</span> : null}
    </span>
  )
}

/* ---------- LevelBars: battery-style vertical rules ---------- */
