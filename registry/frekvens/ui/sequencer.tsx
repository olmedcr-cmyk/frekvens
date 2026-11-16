"use client"
/* Frekvens · Sequencer — MIT © Cris Olmedo */

import * as React from "react"
import { clamp, cx, range, useValue } from "./lib"

import type { SequencerProps } from "./types"
export type { SequencerProps }

const { useState, useRef }: any = React

/* ---------- Sequencer: rejilla de pasos por pista; flechas para moverse, espacio para marcar ---------- */
export function Sequencer(props: SequencerProps): React.ReactElement
export function Sequencer(p?: any): any {
  var rows: any = (p.rows || []).map(function (r?: any): any {
      return typeof r === "string"
        ? {
            label: r,
          }
        : r
    }),
    steps: any = p.steps || 8
  var st: any = useValue(p, []),
    val: any = st[0] || [],
    f: any = useState([0, 0]),
    foc: any = f[0],
    root: any = useRef(null),
    sty: any = {}
  sty["--steps"] = steps
  function on(r?: any, c?: any): any {
    return !!(val[r] && val[r][c])
  }
  function toggle(r?: any, c?: any): any {
    var next: any = rows.map(function (_?: any, i?: any): any {
      return range(steps).map(function (k?: any): any {
        return on(i, k)
      })
    })
    next[r][c] = !next[r][c]
    st[1](next)
  }
  function onKey(e?: any): any {
    var r: any = foc[0],
      c: any = foc[1],
      k: any = e.key
    if (k === "ArrowRight") c++
    else if (k === "ArrowLeft") c--
    else if (k === "ArrowDown") r++
    else if (k === "ArrowUp") r--
    else if (k === "Home") c = 0
    else if (k === "End") c = steps - 1
    else return
    e.preventDefault()
    r = clamp(r, 0, rows.length - 1)
    c = clamp(c, 0, steps - 1)
    f[1]([r, c])
    var el: any = root.current && root.current.querySelector('[data-cell="' + r + "-" + c + '"]')
    if (el) el.focus()
  }
  return (
    <div
      ref={root}
      className={cx("frk-seq", "frk-seq--" + (p.tone || "ink"), p.className)}
      role="group"
      aria-label={p.label || "Secuenciador"}
      onKeyDown={onKey}
      style={sty}
    >
      <div className="frk-seq__scroll">
        <div className="frk-seq__grid">
          <span className="frk-seq__corner" aria-hidden={true} />
          {range(steps).map(function (c?: any): any {
            return (
              <span
                key={"h" + c}
                className={cx("frk-seq__beat", c === p.playhead && "is-now", c % 4 === 0 && "is-bar")}
                aria-hidden={true}
              />
            )
          })}
          {rows.map(function (row?: any, r?: any): any {
            return [
              <span key={"l" + r} className="frk-seq__lbl">
                {row.label}
              </span>,
            ].concat(
              range(steps).map(function (c?: any): any {
                return (
                  <button
                    key={r + "-" + c}
                    type="button"
                    data-cell={r + "-" + c}
                    tabIndex={foc[0] === r && foc[1] === c ? 0 : -1}
                    className={cx("frk-seq__cell", on(r, c) && "is-on", c === p.playhead && "is-now")}
                    aria-pressed={on(r, c)}
                    aria-label={row.label + ", paso " + (c + 1)}
                    onFocus={function (): any {
                      f[1]([r, c])
                    }}
                    onClick={function (): any {
                      toggle(r, c)
                    }}
                  >
                    <span className="frk-seq__pad" />
                  </button>
                )
              }),
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ---------- TrimWave: onda con dos tiradores para recortar un tramo ---------- */
