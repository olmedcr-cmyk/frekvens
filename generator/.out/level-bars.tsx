"use client"
/* Frekvens · LevelBars — MIT © Cris Olmedo */

import * as React from "react"
import { clamp, cx, range } from "./lib"

import type { LevelBarsProps } from "./types"
export type { LevelBarsProps }

/* ---------- LevelBars: battery-style vertical rules ---------- */
export function LevelBars(props: LevelBarsProps): React.ReactElement
export function LevelBars(p?: any): any {
  var n: any = p.count || 20,
    v: any = clamp(p.value == null ? 0 : p.value, 0, 100),
    on: any = Math.round((n * v) / 100)
  return (
    <div
      className={cx("frk-levels", p.className)}
      role="meter"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={v}
      aria-label={p.label || "Nivel"}
      style={{
        height: p.height || 64,
      }}
    >
      {range(n).map(function (i?: any): any {
        return <span key={i} className={cx("frk-levels__bar", i < on && "is-on")} />
      })}
    </div>
  )
}

/* ---------- BarMeter: pill bars, one active, hatched forecast ---------- */
