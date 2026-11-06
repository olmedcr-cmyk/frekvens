"use client"
/* Frekvens · SplitBar — MIT © Cris Olmedo */

import * as React from "react"
import { cx } from "./lib"

import type { SplitBarProps } from "./types"
export type { SplitBarProps }

/* ---------- SplitBar: reparto en píldoras ---------- */
export function SplitBar(props: SplitBarProps): React.ReactElement
export function SplitBar(p?: any): any {
  var seg: any = p.segments || [],
    tot: any =
      seg.reduce(function (a?: any, s?: any): any {
        return a + s.value
      }, 0) || 1,
    tones: any = ["ink", "rams", "sol", "klein", "verde", "tabaco"]
  if (p.variant === "columns") {
    return (
      <div
        className={cx("frk-split", "frk-split--columns", p.className)}
        role="img"
        aria-label={seg
          .map(function (s?: any): any {
            return s.label + " " + Math.round((s.value / tot) * 100) + "%"
          })
          .join(", ")}
      >
        {seg.map(function (s?: any, i?: any): any {
          var pc: any = Math.round((s.value / tot) * 100)
          return (
            <div
              key={i}
              className="frk-split__col"
              style={{
                height: p.height || 220,
              }}
            >
              <div
                className={cx("frk-split__fill", "frk-tone--" + (s.tone || "surface"))}
                style={{
                  height: Math.max(30, pc) + "%",
                }}
              >
                <span className="frk-split__pc">{pc + "%"}</span>
                <span className="frk-split__lbl">{s.label}</span>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
  return (
    <div className={cx("frk-split", p.className)}>
      <div
        className="frk-split__bar"
        role="img"
        aria-label={seg
          .map(function (s?: any): any {
            return s.label + " " + Math.round((s.value / tot) * 100) + "%"
          })
          .join(", ")}
      >
        {seg.map(function (s?: any, i?: any): any {
          return (
            <span
              key={i}
              className={"frk-tone--" + (s.tone || tones[i % tones.length])}
              style={{
                flexGrow: s.value,
              }}
            />
          )
        })}
      </div>
      <ul className="frk-split__legend">
        {seg.map(function (s?: any, i?: any): any {
          return (
            <li key={i}>
              <span className={cx("frk-split__sw", "frk-tone--" + (s.tone || tones[i % tones.length]))} />
              <span>{s.label}</span>
              <b>{p.format ? p.format(s.value) : Math.round((s.value / tot) * 100) + "%"}</b>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/* ---------- Sparkline ---------- */
