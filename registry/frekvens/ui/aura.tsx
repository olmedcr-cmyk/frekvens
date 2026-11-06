"use client"
/* Frekvens · Aura — MIT © Cris Olmedo */

import * as React from "react"
import { AURA, cx } from "./lib"

import type { AuraProps } from "./types"
export type { AuraProps }

export function Aura(props: AuraProps): React.ReactElement
export function Aura(p?: any): any {
  var tone: any = AURA[p.status] || p.tone || "verde",
    on: any = p.active !== false && p.status !== "offline"
  return (
    <span
      className={cx(
        "frk-aura",
        "frk-aura--" + tone,
        on && "is-on",
        p.status === "live" && "is-fast",
        p.shape === "rect" && "frk-aura--rect",
        p.className,
      )}
      style={p.style}
    >
      {p.children}
      {p.label ? <span className="frk-sr">{" · " + p.label}</span> : null}
    </span>
  )
}

/* ---------- FlapBoard: panel de salidas con paletas ---------- */
