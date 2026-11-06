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
    sw: any = p.thickness || 14
  var r: any = 100,
    cxp: any = 120,
    cyp: any = 118,
    a0: any = -62,
    a1: any = 62
  function pt(a?: any): any {
    var t: any = (a * Math.PI) / 180
    return [cxp + r * Math.sin(t), cyp - r * Math.cos(t)]
  }
  function arc(from?: any, to?: any): any {
    var s: any = pt(from),
      e: any = pt(to)
    return "M" + s[0] + " " + s[1] + " A" + r + " " + r + " 0 0 1 " + e[0] + " " + e[1]
  }
  var av: any = a0 + ((a1 - a0) * v) / 100,
    dot: any = pt(av)
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
      <svg
        viewBox={"0 0 240 " + (cyp - r * Math.cos((a1 * Math.PI) / 180) + sw)}
        width={w}
        aria-hidden={true}
      >
        <path d={arc(a0, a1)} className="frk-gauge__track" strokeWidth={sw} />
        <path d={arc(a0, av)} className="frk-gauge__fill" strokeWidth={sw} />
        <circle cx={dot[0]} cy={dot[1]} r={sw * 0.42} className="frk-gauge__dot" />
      </svg>
      {p.caption ? <div className="frk-gauge__caption">{p.caption}</div> : null}
    </div>
  )
}

/* ---------- Slider: track + rams dot ---------- */
