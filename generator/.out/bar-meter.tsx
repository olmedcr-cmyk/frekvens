"use client"
/* Frekvens · BarMeter — MIT © Cris Olmedo */

import * as React from "react"
import { cx } from "./lib"

import type { BarMeterProps } from "./types"
export type { BarMeterProps }

/* ---------- BarMeter: pill bars, one active, hatched forecast ---------- */
export function BarMeter(props: BarMeterProps): React.ReactElement
export function BarMeter(p?: any): any {
  var data: any = p.data || [],
    mx: any = Math.max.apply(
      null,
      data
        .map(function (d?: any): any {
          return d.value
        })
        .concat([1]),
    ),
    H: any = p.height || 160,
    w: any = p.barWidth || 40
  return (
    <div
      className={cx("frk-bars", p.className)}
      role="img"
      aria-label={
        p.label ||
        data
          .map(function (d?: any): any {
            return d.label + " " + d.value
          })
          .join(", ")
      }
    >
      {data.map(function (d?: any, i?: any): any {
        return (
          <div key={i} className="frk-bars__col">
            <div
              className="frk-bars__slot"
              style={{
                height: H,
                width: w,
              }}
            >
              <span
                className={cx("frk-bars__bar", i === p.active && "is-on", d.hatched && "is-hatched")}
                style={{
                  height: Math.max(w, (d.value / mx) * H),
                }}
              />
            </div>
            <span className={cx("frk-bars__lbl", i === p.active && "is-on")}>{d.label}</span>
          </div>
        )
      })}
    </div>
  )
}

/* ---------- Readout: dot numerals + mono label ---------- */
