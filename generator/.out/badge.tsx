"use client"
/* Frekvens · Badge — MIT © Cris Olmedo */

import * as React from "react"
import { cx } from "./lib"

import type { BadgeProps } from "./types"
export type { BadgeProps }

/* ---------- Badge: contador sobre otro elemento ---------- */
export function Badge(props: BadgeProps): React.ReactElement
export function Badge(p?: any): any {
  var c: any = p.count,
    show: any = p.dot || (c != null && c > 0),
    txt: any = c > (p.max || 99) ? (p.max || 99) + "+" : c
  return (
    <span className={cx("frk-badge-wrap", p.className)}>
      {p.children}
      {show ? (
        <span
          className={cx("frk-badge", "frk-tone--" + (p.tone || "rams"), p.dot && "is-dot")}
          aria-hidden={true}
        >
          {p.dot ? null : txt}
        </span>
      ) : null}
      {show && !p.dot ? <span className="frk-sr">{" (" + c + " " + (p.label || "nuevos") + ")"}</span> : null}
    </span>
  )
}

/* ---------- TabBar: navegación inferior ---------- */
