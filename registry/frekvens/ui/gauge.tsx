"use client"
/* Frekvens · Gauge — MIT © Cris Olmedo */

import * as React from "react"
import { clamp, cx } from "./lib"

import type { GaugeProps } from "./types"
export type { GaugeProps }

/* ---------- Gauge: arc instrument ---------- */
export function Gauge(props: GaugeProps): React.ReactElement
export function Gauge(p?: any): any {
  var v: any = clamp(p.value == null ? 0 : p.value, 0, 100),
    w: any = p.width || 240,
    sw: any = p.thickness || 8
  var r: any = 120 - sw / 2,
    cyp: any = 120,
    show: any = p.readout !== false
  function pt(a?: any): any {
    var t: any = (a * Math.PI) / 180
    return [120 + r * Math.sin(t), cyp - r * Math.cos(t)]
  }
  function arc(from?: any, to?: any): any {
    var s: any = pt(from),
      e: any = pt(to)
    return (
      "M" +
      s[0].toFixed(2) +
      " " +
      s[1].toFixed(2) +
      " A" +
      r +
      " " +
      r +
      " 0 0 1 " +
      e[0].toFixed(2) +
      " " +
      e[1].toFixed(2)
    )
  }
  return (
    <div
      className={cx("frk-gauge", p.className)}
      role="meter"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={v}
      aria-label={p.label || "Nivel"}
      style={{
        width: w,
      }}
    >
      <svg viewBox={"0 0 240 " + (cyp + sw / 2)} aria-hidden={true}>
        <path d={arc(-90, 90)} className="frk-gauge__track" strokeWidth={sw} />
        {v > 0 ? (
          <path d={arc(-90, -90 + (180 * v) / 100)} className="frk-gauge__fill" strokeWidth={sw} />
        ) : null}
      </svg>
      {show || p.caption ? (
        <div className="frk-gauge__read">
          {show ? (
            <div
              className="frk-gauge__value"
              style={{
                fontSize: Math.round(w * 0.24),
              }}
            >
              {Math.round(v)}
              <span className="frk-gauge__unit">{p.unit == null ? "%" : p.unit}</span>
            </div>
          ) : null}
          {p.caption ? <div className="frk-gauge__caption">{p.caption}</div> : null}
        </div>
      ) : null}
    </div>
  )
}

/* ---------- Slider: track + rams dot ---------- */
