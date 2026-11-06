"use client"
/* Frekvens · Calendar — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { DOW, MES, addD, cx, iso, parseISO, useValue } from "./lib"

import type { CalendarProps } from "./types"
export type { CalendarProps }

const { useState, useRef }: any = React

export function Calendar(props: CalendarProps): React.ReactElement
export function Calendar(p?: any): any {
  var today: any = p.today ? parseISO(p.today) : new Date()
  today.setHours(0, 0, 0, 0)
  var st: any = useValue(p, iso(today)),
    v: any = st[0],
    sel: any = parseISO(v)
  var vw: any = useState(p.view || "week"),
    view: any = vw[0]
  var cur: any = useState(sel),
    anchor: any = cur[0],
    setAnchor: any = cur[1],
    grid: any = useRef(null)
  var marks: any = {}
  ;(p.marks || []).forEach(function (m?: any): any {
    marks[m] = 1
  })
  var days: any = []
  if (view === "week") {
    var mon: any = addD(anchor, -((anchor.getDay() + 6) % 7))
    for (var i: any = 0; i < 7; i++) days.push(addD(mon, i))
  } else {
    var first: any = new Date(anchor.getFullYear(), anchor.getMonth(), 1),
      start: any = addD(first, -((first.getDay() + 6) % 7))
    for (var j: any = 0; j < 42; j++) days.push(addD(start, j))
  }
  function pick(d?: any): any {
    st[1](iso(d))
    setAnchor(d)
    setTimeout(function (): any {
      var el: any = grid.current && grid.current.querySelector('[data-day="' + iso(d) + '"]')
      el && el.focus()
    }, 0)
  }
  function key(e?: any): any {
    var m: any = (
      {
        ArrowRight: 1,
        ArrowLeft: -1,
        ArrowDown: 7,
        ArrowUp: -7,
      } as any
    )[e.key]
    if (m == null) return
    e.preventDefault()
    pick(addD(sel, view === "week" && Math.abs(m) === 7 ? m : m))
  }
  function shift(n?: any): any {
    var a: any =
      view === "week" ? addD(anchor, n * 7) : new Date(anchor.getFullYear(), anchor.getMonth() + n, 1)
    setAnchor(a)
  }
  var title: any = MES[anchor.getMonth()] + " " + anchor.getFullYear()
  return (
    <div className={cx("frk-cal", "frk-cal--" + view, p.className)}>
      <div className="frk-cal__head">
        <span className="frk-cal__title" aria-live="polite">
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </span>
        <div className="frk-pager__btns">
          {p.switchable !== false ? (
            <button
              type="button"
              className="frk-cal__view"
              onClick={function (): any {
                vw[1](view === "week" ? "month" : "week")
              }}
              aria-label={view === "week" ? "Ver mes" : "Ver semana"}
            >
              {view === "week" ? "Mes" : "Semana"}
            </button>
          ) : null}
          <button
            type="button"
            className="frk-key frk-tone--well frk-key--s frk-key--round"
            aria-label={view === "week" ? "Semana anterior" : "Mes anterior"}
            onClick={function (): any {
              shift(-1)
            }}
          >
            <span className="frk-key__main">
              <Icon name="arrow-left" size={20} />
            </span>
          </button>
          <button
            type="button"
            className="frk-key frk-tone--well frk-key--s frk-key--round"
            aria-label={view === "week" ? "Semana siguiente" : "Mes siguiente"}
            onClick={function (): any {
              shift(1)
            }}
          >
            <span className="frk-key__main">
              <Icon name="arrow-right" size={20} />
            </span>
          </button>
        </div>
      </div>
      <div className="frk-cal__dow" aria-hidden={true}>
        {DOW.map(function (d?: any): any {
          return <span key={d}>{d}</span>
        })}
      </div>
      <div ref={grid} className="frk-cal__grid" role="group" aria-label="Días" onKeyDown={key}>
        {days.map(function (d?: any): any {
          var k: any = iso(d),
            isSel: any = k === v,
            isToday: any = k === iso(today),
            out: any = view === "month" && d.getMonth() !== anchor.getMonth(),
            past: any = d < today
          return (
            <button
              key={k}
              type="button"
              data-day={k}
              tabIndex={isSel ? 0 : -1}
              aria-pressed={isSel}
              aria-current={isToday ? "date" : undefined}
              aria-label={
                d.getDate() +
                " de " +
                MES[d.getMonth()] +
                (marks[k] ? ", con sesión" : "") +
                (isToday ? ", hoy" : "")
              }
              className={cx(
                "frk-cal__day",
                isSel && "is-sel",
                isToday && "is-today",
                out && "is-out",
                past && !isSel && "is-past",
                marks[k] && "has-mark",
              )}
              onClick={function (): any {
                pick(d)
              }}
            >
              <span>{d.getDate()}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ---------- Banner: aviso en línea ---------- */
