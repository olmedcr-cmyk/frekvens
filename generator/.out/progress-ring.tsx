"use client"
/* Frekvens · ProgressRing — MIT © Cris Olmedo */

import * as React from "react"
import { clamp, cx } from "./lib"

import type { ProgressRingProps } from "./types"
export type { ProgressRingProps }

/* ---------- ProgressRing ---------- */
export function ProgressRing(props: ProgressRingProps): React.ReactElement
export function ProgressRing(p?: any): any {
  var v: any = clamp(p.value || 0, 0, 100),
    s: any = p.size || 96,
    w: any = p.thickness || 8,
    r: any = (s - w) / 2,
    c: any = 2 * Math.PI * r
  return (
    <div
      className={cx("frk-ring", "frk-ring--" + (p.tone || "rams"), p.className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={v}
      aria-label={p.label}
      style={{
        width: s,
        height: s,
      }}
    >
      <svg width={s} height={s} viewBox={"0 0 " + s + " " + s} aria-hidden={true}>
        <circle cx={s / 2} cy={s / 2} r={r} className="frk-ring__track" strokeWidth={w} />
        <circle
          cx={s / 2}
          cy={s / 2}
          r={r}
          className="frk-ring__fill"
          strokeWidth={w}
          strokeDasharray={c}
          strokeDashoffset={c * (1 - v / 100)}
          transform={"rotate(-90 " + s / 2 + " " + s / 2 + ")"}
        />
      </svg>
      <span className="frk-ring__text">{p.children != null ? p.children : Math.round(v) + "%"}</span>
    </div>
  )
}

/* ---------- SlideToStart: deliberate start, drag or press ---------- */
