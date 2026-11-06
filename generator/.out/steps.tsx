"use client"
/* Frekvens · Steps — MIT © Cris Olmedo */

import * as React from "react"
import { StateMark } from "./state-mark"
import { cx } from "./lib"

import type { StepsProps } from "./types"
export type { StepsProps }

/* ---------- Steps: progreso por pasos ---------- */
export function Steps(props: StepsProps): React.ReactElement
export function Steps(p?: any): any {
  var steps: any = p.steps || [],
    cur: any = p.current || 0
  return (
    <ol className={cx("frk-steps", p.className)} aria-label={p.label || "Progreso"}>
      {steps.map(function (s?: any, i?: any): any {
        var state: any = i < cur ? "full" : i === cur ? "partial" : "empty"
        return (
          <li
            key={i}
            className={cx("frk-steps__item", "is-" + state)}
            aria-current={i === cur ? "step" : undefined}
          >
            <StateMark state={state} size={22} label="" />
            <span className="frk-steps__label">{s}</span>
            <span className="frk-sr">
              {state === "full" ? " (hecho)" : state === "partial" ? " (actual)" : " (pendiente)"}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

/* ---------- Tooltip ---------- */
