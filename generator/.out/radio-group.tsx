"use client"
/* Frekvens · RadioGroup — MIT © Cris Olmedo */

import * as React from "react"
import { cx, norm, useValue } from "./lib"

import type { RadioGroupProps } from "./types"
export type { RadioGroupProps }

const { useRef }: any = React

/* ---------- RadioGroup: aro → disco ---------- */
export function RadioGroup(props: RadioGroupProps): React.ReactElement
export function RadioGroup(p?: any): any {
  var opts: any = norm(p.options),
    st: any = useValue(p, p.defaultValue),
    v: any = st[0],
    refs: any = useRef([])
  function key(e?: any, i?: any): any {
    var d: any =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? 1
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? -1
          : 0
    if (!d) return
    e.preventDefault()
    var n: any = i
    for (var k: any = 0; k < opts.length; k++) {
      n = (n + d + opts.length) % opts.length
      if (!opts[n].disabled) break
    }
    st[1](opts[n].value)
    refs.current[n] && refs.current[n].focus()
  }
  var sel: any = -1
  opts.forEach(function (o?: any, i?: any): any {
    if (o.value === v) sel = i
  })
  return (
    <div
      role="radiogroup"
      aria-label={p.label}
      className={cx("frk-radio", p.direction === "row" && "frk-radio--row", p.className)}
    >
      {p.label ? (
        <span className="frk-field__label" aria-hidden={true}>
          {p.label}
        </span>
      ) : null}
      {opts.map(function (o?: any, i?: any): any {
        var on: any = o.value === v
        return (
          <button
            key={o.value}
            ref={function (el?: any): any {
              refs.current[i] = el
            }}
            type="button"
            role="radio"
            aria-checked={on}
            disabled={o.disabled}
            tabIndex={on || (sel < 0 && i === 0) ? 0 : -1}
            className={cx("frk-radio__opt", on && "is-on")}
            onClick={function (): any {
              st[1](o.value)
            }}
            onKeyDown={function (e?: any): any {
              key(e, i)
            }}
          >
            <span className="frk-radio__mark" aria-hidden={true} />
            <span className="frk-check__text">
              <span className="frk-check__label">{o.label}</span>
              {o.hint ? <span className="frk-check__hint">{o.hint}</span> : null}
            </span>
          </button>
        )
      })}
    </div>
  )
}

/* ---------- Calendar: tira de semana o mes ---------- */
