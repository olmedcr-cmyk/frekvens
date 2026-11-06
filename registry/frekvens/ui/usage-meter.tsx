"use client"
/* Frekvens · UsageMeter — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { SplitBar } from "./split-bar"
import { clamp, cx } from "./lib"

import type { UsageMeterProps } from "./types"
export type { UsageMeterProps }

/* ---------- UsageMeter: cuota usada ---------- */
export function UsageMeter(props: UsageMeterProps): React.ReactElement
export function UsageMeter(p?: any): any {
  var used: any = p.used || 0,
    limit: any = p.limit || 1,
    pct: any = clamp((used / limit) * 100, 0, 100),
    level: any = pct >= 90 ? "is-high" : pct >= 70 ? "is-mid" : ""
  var f: any =
    p.format ||
    function (n?: any): any {
      return n.toLocaleString("es-ES")
    }
  return (
    <div className={cx("frk-usage", level, p.className)}>
      <div className="frk-usage__head">
        <span className="frk-usage__label">{p.label}</span>
        <span className="frk-usage__num">{f(used) + " / " + f(limit) + (p.unit ? " " + p.unit : "")}</span>
      </div>
      {p.segments ? (
        <SplitBar segments={p.segments} />
      ) : (
        <span
          className="frk-usage__bar"
          role="meter"
          aria-label={p.label}
          aria-valuemin={0}
          aria-valuemax={limit}
          aria-valuenow={used}
          aria-valuetext={Math.round(pct) + " %"}
        >
          <span
            style={{
              width: pct + "%",
            }}
          />
        </span>
      )}
      {level === "is-high" && p.action ? (
        <button type="button" className="frk-stat__link" onClick={p.action.onClick}>
          {p.action.label}
          <Icon name="arrow-right" size={14} />
        </button>
      ) : null}
    </div>
  )
}

/* ---------- Timeline: actividad, despliegues, historia ---------- */
