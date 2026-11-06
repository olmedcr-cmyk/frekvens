"use client"
/* Frekvens · Stat — MIT © Cris Olmedo */

import * as React from "react"
import { Chip } from "./chip"
import { Icon } from "./icon"
import { Sparkline } from "./sparkline"
import { cx } from "./lib"

import type { StatProps } from "./types"
export type { StatProps }

/* ---------- Stat: KPI con variación ---------- */
export function Stat(props: StatProps): React.ReactElement
export function Stat(p?: any): any {
  var d: any = p.delta,
    neg: any = (d != null && String(d).trim().charAt(0) === "-") || String(d).charAt(0) === "−"
  var good: any = p.inverse ? neg : !neg
  return (
    <div className={cx("frk-stat", "frk-tone--" + (p.tone || "surface"), p.className)}>
      <div className="frk-stat__head">
        <span className="frk-stat__label">{p.label}</span>
        {p.status ? (
          <Chip
            tone={
              (
                {
                  ok: "verde",
                  warn: "sol",
                  risk: "rec",
                } as any
              )[p.status] || "well"
            }
            dot={true}
          >
            {p.statusLabel ||
              (
                {
                  ok: "En objetivo",
                  warn: "Atención",
                  risk: "En riesgo",
                } as any
              )[p.status]}
          </Chip>
        ) : null}
      </div>
      <div className="frk-stat__row">
        <span className="frk-stat__value">
          {p.value}
          {p.unit ? <small>{p.unit}</small> : null}
        </span>
        {p.trend ? <Sparkline data={p.trend} tone={good ? "ink" : "rams"} label={p.label} /> : null}
      </div>
      <div className="frk-stat__foot">
        {d != null ? (
          <span className={cx("frk-stat__delta", good ? "is-good" : "is-bad")}>
            {(neg ? "▼ " : "▲ ") + String(d).replace(/^[-−+]/, "")}
          </span>
        ) : null}
        {p.previous ? <span className="frk-stat__prev">{"antes " + p.previous}</span> : null}
        {p.link ? (
          <button type="button" className="frk-stat__link" onClick={p.link.onClick}>
            {p.link.label}
            <Icon name="arrow-right" size={14} />
          </button>
        ) : null}
      </div>
    </div>
  )
}

/* ---------- UsageMeter: cuota usada ---------- */
