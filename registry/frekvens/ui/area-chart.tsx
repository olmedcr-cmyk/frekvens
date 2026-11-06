"use client"
/* Frekvens · AreaChart — MIT © Cris Olmedo */

import * as React from "react"
import { cx, range } from "./lib"

import type { AreaChartProps } from "./types"
export type { AreaChartProps }

const { useId }: any = React

/* ---------- AreaChart: área en semitono ---------- */
export function AreaChart(props: AreaChartProps): React.ReactElement
export function AreaChart(p?: any): any {
  var series: any = p.series || [],
    W: any = p.width || 520,
    H: any = p.height || 200,
    pd: any = 14,
    n: any = (series[0] && series[0].data.length) || 0,
    id: any = useId()
  var all: any = [].concat.apply(
      [],
      series.map(function (s?: any): any {
        return s.data
      }),
    ),
    mx: any = Math.max.apply(null, all.concat([1])),
    mn: any = p.zero === false ? Math.min.apply(null, all) : 0
  function pts(d?: any): any {
    return d.map(function (v?: any, i?: any): any {
      return [
        pd + (i / (n - 1 || 1)) * (W - pd * 2),
        pd + (1 - (v - mn) / (mx - mn || 1)) * (H - pd * 2 - 18),
      ]
    })
  }
  function curve(q?: any): any {
    return q
      .map(function (pt?: any, i?: any): any {
        if (!i) return "M" + pt[0] + " " + pt[1]
        var a: any = q[i - 1],
          c: any = (pt[0] - a[0]) / 2
        return "C" + (a[0] + c) + " " + a[1] + " " + (pt[0] - c) + " " + pt[1] + " " + pt[0] + " " + pt[1]
      })
      .join(" ")
  }
  var tones: any = ["rams", "ink", "klein", "verde"]
  return (
    <figure
      className={cx("frk-area", p.className)}
      style={{
        maxWidth: W,
      }}
    >
      <svg
        viewBox={"0 0 " + W + " " + H}
        width="100%"
        role="img"
        aria-label={
          (p.label || "Gráfico de área") +
          ": " +
          series
            .map(function (s?: any): any {
              return s.label + " de " + s.data[0] + " a " + s.data[s.data.length - 1]
            })
            .join("; ")
        }
      >
        <defs>
          {series.map(function (s?: any, k?: any): any {
            var t: any = s.tone || tones[k]
            return (
              <pattern key={k} id={id + "p" + k} width={6} height={6} patternUnits="userSpaceOnUse">
                <circle cx={3} cy={3} r={1.5} className={"frk-area__dot frk-area--" + t} />
              </pattern>
            )
          })}
        </defs>
        {range(4).map(function (i?: any): any {
          var y: any = pd + (i * (H - pd * 2 - 18)) / 3
          return <line key={i} x1={pd} x2={W - pd} y1={y} y2={y} className="frk-area__grid" />
        })}
        {series
          .map(function (s?: any, k?: any): any {
            return k
          })
          .sort(function (i?: any, j?: any): any {
            function m(d?: any): any {
              return (
                d.reduce(function (x?: any, y?: any): any {
                  return x + y
                }, 0) / d.length
              )
            }
            return m(series[j].data) - m(series[i].data)
          })
          .map(function (k?: any): any {
            var s: any = series[k],
              q: any = pts(s.data),
              base: any = H - 18 - 4
            return (
              <path
                key={"f" + k}
                d={curve(q) + " L" + q[q.length - 1][0] + " " + base + " L" + q[0][0] + " " + base + " Z"}
                fill={"url(#" + id + "p" + k + ")"}
                className="frk-area__fill"
              />
            )
          })}
        {series.map(function (s?: any, k?: any): any {
          return (
            <path
              key={"l" + k}
              d={curve(pts(s.data))}
              className={"frk-area__line frk-area--" + (s.tone || tones[k])}
            />
          )
        })}
        {(p.labels || []).map(function (l?: any, i?: any): any {
          var x: any = pd + (i / (p.labels.length - 1 || 1)) * (W - pd * 2)
          return (
            <text
              key={i}
              x={x}
              y={H - 2}
              className="frk-line__lbl"
              textAnchor={i === 0 ? "start" : i === p.labels.length - 1 ? "end" : "middle"}
            >
              {l}
            </text>
          )
        })}
      </svg>
      {series.length > 1 || p.legend ? (
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
                <span className={"frk-split__sw frk-tone--" + (s.tone || tones[k])} />
                {s.label}
              </span>
            )
          })}
        </figcaption>
      ) : null}
    </figure>
  )
}

/* ---------- Scatter ---------- */
