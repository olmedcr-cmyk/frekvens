"use client"
/* Frekvens · RadarChart — MIT © Cris Olmedo */

import * as React from "react"
import { clamp, cx, polar, range } from "./lib"

import type { RadarChartProps } from "./types"
export type { RadarChartProps }

/* ---------- RadarChart ---------- */
export function RadarChart(props: RadarChartProps): React.ReactElement
export function RadarChart(p?: any): any {
  var axes: any = p.axes || [],
    series: any = p.series || [],
    size: any = p.size || 260,
    c: any = size / 2,
    R: any = c - 34,
    n: any = axes.length,
    tones: any = ["rams", "klein"]
  function pt(i?: any, v?: any): any {
    return polar(c, c, R * v, (i * 360) / n)
  }
  return (
    <figure className={cx("frk-radar", p.className)}>
      <svg
        viewBox={"0 0 " + size + " " + size}
        width={size}
        height={size}
        role="img"
        aria-label={
          (p.label || "Radar") +
          ": " +
          series
            .map(function (s?: any): any {
              return (
                s.label +
                " — " +
                axes
                  .map(function (a?: any, i?: any): any {
                    return a + " " + Math.round(s.data[i] * 100) + "%"
                  })
                  .join(", ")
              )
            })
            .join("; ")
        }
      >
        {[0.25, 0.5, 0.75, 1].map(function (r?: any): any {
          return range(n * 6).map(function (i?: any): any {
            var q: any = polar(c, c, R * r, (i * 360) / (n * 6))
            return <circle key={r + "-" + i} cx={q[0]} cy={q[1]} r={1} className="frk-scatter__grid" />
          })
        })}
        {axes.map(function (a?: any, i?: any): any {
          var e: any = pt(i, 1),
            l: any = pt(i, 1.16)
          return (
            <g key={a}>
              <line x1={c} y1={c} x2={e[0]} y2={e[1]} className="frk-radar__axis" />
              <text x={l[0]} y={l[1]} textAnchor="middle" dominantBaseline="middle" className="frk-line__lbl">
                {a}
              </text>
            </g>
          )
        })}
        {series.map(function (s?: any, k?: any): any {
          var q: any = s.data.map(function (v?: any, i?: any): any {
            return pt(i, clamp(v, 0, 1))
          })
          var t: any = s.tone || tones[k % 2]
          return (
            <g key={k}>
              <polygon
                points={q
                  .map(function (x?: any): any {
                    return x.join(",")
                  })
                  .join(" ")}
                className={"frk-radar__shape frk-area--" + t}
              />
              {q.map(function (x?: any, i?: any): any {
                return (
                  <circle key={i} cx={x[0]} cy={x[1]} r={4} className={"frk-scatter__pt frk-area--" + t} />
                )
              })}
            </g>
          )
        })}
      </svg>
      {series.length > 1 ? (
        <figcaption className="frk-split__legend">
          {series.map(function (s?: any, k?: any): any {
            return (
              <span
                key={k}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span className={"frk-split__sw frk-tone--" + (s.tone || tones[k % 2])} />
                {s.label}
              </span>
            )
          })}
        </figcaption>
      ) : null}
    </figure>
  )
}

/* ---------- DonutChart ---------- */
