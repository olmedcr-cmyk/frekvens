"use client"
/* Frekvens · WeekStrip — MIT © Cris Olmedo */

import * as React from "react"
import { WEEK_STATES, cx, useValue } from "./lib"

import type { WeekStripProps } from "./types"
export type { WeekStripProps }

const { useRef }: any = React

export function WeekStrip(props: WeekStripProps): React.ReactElement
export function WeekStrip(p?: any): any {
  var days: any = p.days || [],
    st: any = useValue(p, 0),
    sel: any = st[0],
    root: any = useRef(null)
  function go(i?: any): any {
    i = (i + days.length) % days.length
    st[1](i)
    var el: any = root.current && root.current.querySelector('[data-day="' + i + '"]')
    if (el) el.focus()
  }
  return (
    <div
      ref={root}
      className={cx("frk-week", "frk-week--" + (p.tone || "ink"), p.className)}
      role="radiogroup"
      aria-label={p.label || "Semana"}
      onKeyDown={function (e?: any): any {
        var k: any = e.key
        if (k === "ArrowRight" || k === "ArrowDown") {
          e.preventDefault()
          go(sel + 1)
        } else if (k === "ArrowLeft" || k === "ArrowUp") {
          e.preventDefault()
          go(sel - 1)
        } else if (k === "Home") {
          e.preventDefault()
          go(0)
        } else if (k === "End") {
          e.preventDefault()
          go(days.length - 1)
        }
      }}
    >
      {days.map(function (d?: any, i?: any): any {
        var s: any = d.state || "none"
        return (
          <button
            key={i}
            type="button"
            role="radio"
            data-day={i}
            aria-checked={i === sel}
            tabIndex={i === sel ? 0 : -1}
            className={cx("frk-week__day", i === sel && "is-on", d.today && "is-today")}
            aria-label={(d.name || d.label) + " " + d.day + ", " + WEEK_STATES[s] + (d.today ? ", hoy" : "")}
            onClick={function (): any {
              st[1](i)
            }}
          >
            <span className={cx("frk-week__mark", "is-" + s)} aria-hidden={true} />
            <span className="frk-week__num" aria-hidden={true}>
              {d.day}
            </span>
            <span className="frk-week__lbl" aria-hidden={true}>
              {d.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

/* ---------- IndexList: índice en letra grande, con la cuenta en pequeño ---------- */
