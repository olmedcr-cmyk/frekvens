"use client"
/* Frekvens · Segmented — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { cx, useFollow, useIsoLayout, useValue } from "./lib"

import type { SegmentedProps } from "./types"
export type { SegmentedProps }

const { useRef, useState }: any = React

/* ---------- Segmented: pill toggle con disco que viaja ---------- */
export function Segmented(props: SegmentedProps): React.ReactElement
export function Segmented(p?: any): any {
  var opts: any = (p.options || []).map(function (o?: any): any {
    return typeof o === "string"
      ? {
          value: o,
          label: o,
        }
      : o
  })
  var st: any = useValue(p, opts[0] && opts[0].value),
    v: any = st[0],
    box: any = useRef(null),
    th: any = useState(null),
    thumb: any = th[0],
    setThumb: any = th[1],
    first: any = useRef(true)
  var fref: any = useFollow(thumb)
  useIsoLayout(
    function (): any {
      var el: any = box.current
      if (!el) return
      function m(): any {
        var on: any = el.querySelector('[aria-checked="true"]')
        if (on)
          setThumb({
            x: on.offsetLeft,
            w: on.offsetWidth,
            h: on.offsetHeight,
            y: on.offsetTop,
          })
      }
      m()
      var ro: any = window.ResizeObserver ? new ResizeObserver(m) : null
      ro && ro.observe(el)
      return function (): any {
        ro && ro.disconnect()
      }
    },
    [v, opts.length],
  )
  function key(e?: any): any {
    var i: any = 0
    opts.forEach(function (o?: any, k?: any): any {
      if (o.value === v) i = k
    })
    var d: any = (
      {
        ArrowRight: 1,
        ArrowDown: 1,
        ArrowLeft: -1,
        ArrowUp: -1,
      } as any
    )[e.key]
    if (!d) return
    e.preventDefault()
    var n: any = (i + d + opts.length) % opts.length
    st[1](opts[n].value)
    var bs: any = box.current.querySelectorAll("[role=radio]")
    bs[n] && bs[n].focus()
  }
  return (
    <div
      ref={box}
      className={cx("frk-seg", thumb && "has-thumb", p.className)}
      role="radiogroup"
      aria-label={p.label}
      onKeyDown={key}
    >
      {thumb ? <span ref={fref} className="frk-seg__thumb" aria-hidden={true} /> : null}
      {opts.map(function (o?: any): any {
        var sel: any = o.value === v
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            tabIndex={sel ? 0 : -1}
            aria-checked={sel}
            aria-label={o.ariaLabel}
            className={cx("frk-seg__opt", sel && "is-on")}
            onClick={function (): any {
              st[1](o.value)
            }}
          >
            {o.icon ? <Icon name={o.icon} size={18} /> : null}
            {o.label ? <span>{o.label}</span> : null}
          </button>
        )
      })}
    </div>
  )
}

/* ---------- DotMatrix: glyphs & shapes in dots ---------- */
