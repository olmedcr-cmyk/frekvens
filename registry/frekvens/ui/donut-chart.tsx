"use client"
/* Frekvens · DonutChart — MIT © Cris Olmedo */

import * as React from "react"
import { cx, polar } from "./lib"

import type { DonutChartProps } from "./types"
export type { DonutChartProps }

/* ---------- DonutChart ---------- */
export function DonutChart(props: DonutChartProps): React.ReactElement
export function DonutChart(p?: any): any {
  var seg: any = p.segments || [],
    size: any = p.size || 200,
    c: any = size / 2,
    w: any = p.thickness || 22,
    r: any = c - w / 2 - 2,
    tot: any =
      seg.reduce(function (a?: any, s?: any): any {
        return a + s.value
      }, 0) || 1,
    gap: any = p.gap == null ? 6 : p.gap,
    a: any = 0,
    tones: any = ["ink", "rams", "sol", "klein", "verde"]
  function arc(a0?: any, a1?: any): any {
    var s: any = polar(c, c, r, a0),
      e: any = polar(c, c, r, a1)
    return (
      "M" +
      s[0] +
      " " +
      s[1] +
      " A" +
      r +
      " " +
      r +
      " 0 " +
      (a1 - a0 > 180 ? 1 : 0) +
      " 1 " +
      e[0] +
      " " +
      e[1]
    )
  }
  return (
    <figure className={cx("frk-donut", p.className)}>
      <div
        className="frk-donut__wrap"
        style={{
          width: size,
          height: size,
        }}
      >
        <svg
          viewBox={"0 0 " + size + " " + size}
          width={size}
          height={size}
          role="img"
          aria-label={
            (p.label || "Reparto") +
            ": " +
            seg
              .map(function (s?: any): any {
                return s.label + " " + Math.round((s.value / tot) * 100) + "%"
              })
              .join(", ")
          }
        >
          {seg.map(function (s?: any, i?: any): any {
            var sw: any = (s.value / tot) * 360,
              a0: any = a + gap / 2,
              a1: any = a + sw - gap / 2
            a += sw
            return a1 > a0 ? (
              <path
                key={i}
                d={arc(a0, a1)}
                strokeWidth={w}
                className={"frk-donut__seg frk-area--" + (s.tone || tones[i % 5])}
              />
            ) : null
          })}
        </svg>
        <div className="frk-donut__center">
          <span className="frk-donut__value">{p.value != null ? p.value : tot}</span>
          {p.caption ? <span className="frk-donut__cap">{p.caption}</span> : null}
        </div>
      </div>
      <figcaption className="frk-split__legend">
        {seg.map(function (s?: any, i?: any): any {
          return (
            <span
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span className={"frk-split__sw frk-tone--" + (s.tone || tones[i % 5])} />
              {s.label}
              <b>{Math.round((s.value / tot) * 100) + "%"}</b>
            </span>
          )
        })}
      </figcaption>
    </figure>
  )
}

/* ---------- Scope: osciloscopio ---------- */
