"use client"
/* Frekvens · Tabs — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { cx, useFollow, useValue } from "./lib"

import type { TabsProps } from "./types"
export type { TabsProps }

const { useId, useRef, useState, useEffect }: any = React

/* ---------- Tabs: pestañas con indicador que viaja ---------- */
export function Tabs(props: TabsProps): React.ReactElement
export function Tabs(p?: any): any {
  var tabs: any = p.tabs || [],
    id: any = useId(),
    variant: any = p.variant || "pill"
  var st: any = useValue(p, tabs[0] && tabs[0].id),
    v: any = st[0]
  var list: any = useRef(null),
    ind: any = useState(null),
    box: any = ind[0],
    setBox: any = ind[1]
  var tref: any = useFollow(
    box
      ? {
          x: box.x,
          y: 0,
          w: box.w,
          h: 0,
        }
      : null,
  )
  useEffect(
    function (): any {
      var el: any = list.current && list.current.querySelector('[aria-selected="true"]')
      if (!el) return
      setBox({
        x: el.offsetLeft,
        w: el.offsetWidth,
      })
    },
    [v, tabs.length],
  )
  function key(e?: any): any {
    var i: any = -1
    tabs.forEach(function (t?: any, j?: any): any {
      if (t.id === v) i = j
    })
    var n: any =
      e.key === "ArrowRight"
        ? i + 1
        : e.key === "ArrowLeft"
          ? i - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? tabs.length - 1
              : null
    if (n == null) return
    e.preventDefault()
    n = (n + tabs.length) % tabs.length
    st[1](tabs[n].id)
    setTimeout(function (): any {
      var el: any = document.getElementById(id + "t" + tabs[n].id)
      el && el.focus()
    }, 0)
  }
  var cur: any = tabs.filter(function (t?: any): any {
    return t.id === v
  })[0]
  return (
    <div className={cx("frk-tabs", "frk-tabs--" + variant, p.className)}>
      <div ref={list} role="tablist" aria-label={p.label} className="frk-tabs__list" onKeyDown={key}>
        {variant === "pill" && box ? <span ref={tref} className="frk-tabs__ind" aria-hidden={true} /> : null}
        {tabs.map(function (t?: any): any {
          var sel: any = t.id === v
          return (
            <button
              key={t.id}
              id={id + "t" + t.id}
              type="button"
              role="tab"
              aria-selected={sel}
              aria-controls={cur && cur.content != null ? id + "p" : undefined}
              tabIndex={sel ? 0 : -1}
              className={cx("frk-tabs__tab", sel && "is-on", t.tone && "frk-tone--" + t.tone)}
              onClick={function (): any {
                st[1](t.id)
              }}
            >
              {t.icon ? <Icon name={t.icon} size={18} /> : null}
              <span>{t.label}</span>
              {t.count != null ? <span className="frk-tabs__count">{t.count}</span> : null}
            </button>
          )
        })}
      </div>
      {cur && cur.content != null ? (
        <div
          id={id + "p"}
          role="tabpanel"
          aria-labelledby={id + "t" + v}
          tabIndex={0}
          key={v}
          className={cx("frk-tabs__panel", cur.tone && "frk-tone--" + cur.tone)}
        >
          {cur.content}
        </div>
      ) : null}
    </div>
  )
}

/* ---------- Pager: carrusel con botones de scroll y puntos ---------- */
