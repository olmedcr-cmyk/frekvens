"use client"
/* Frekvens · Chip — MIT © Cris Olmedo */

import * as React from "react"
import { cx } from "./lib"

import type { ChipProps } from "./types"
export type { ChipProps }

/* ---------- Chip: mono pill ---------- */
export function Chip(props: ChipProps): React.ReactElement
export function Chip(p?: any): any {
  return (
    <span
      className={cx("frk-chip", "frk-tone--" + (p.tone || "well"), p.square && "frk-chip--sq", p.className)}
    >
      {p.dot ? <span className="frk-chip__dot" /> : null}
      {p.children}
    </span>
  )
}

/* ================= overlays, inputs, motion ================= */
