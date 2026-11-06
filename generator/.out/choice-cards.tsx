"use client"
/* Frekvens · ChoiceCards — MIT © Cris Olmedo */

import * as React from "react"
import { Chip } from "./chip"
import { Icon } from "./icon"
import { cx, useValue } from "./lib"

import type { ChoiceCardsProps } from "./types"
export type { ChoiceCardsProps }

const { useRef }: any = React

/* ---------- ChoiceCards: planes, paquetes, opciones grandes ---------- */
export function ChoiceCards(props: ChoiceCardsProps): React.ReactElement
export function ChoiceCards(p?: any): any {
  var opts: any = p.options || [],
    st: any = useValue(p, p.defaultValue),
    v: any = st[0],
    refs: any = useRef([])
  function key(e?: any, i?: any): any {
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
      className={cx("frk-choices", p.className)}
      style={{
        gridTemplateColumns: "repeat(" + (p.columns || opts.length) + ", minmax(0,1fr))",
      }}
    >
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
            tabIndex={on || (sel < 0 && i === 0) ? 0 : -1}
            className={cx("frk-choice", on && "is-on", o.tone && "frk-tone--" + o.tone)}
            onClick={function (): any {
              st[1](o.value)
            }}
            onKeyDown={function (e?: any): any {
              key(e, i)
            }}
          >
            <span className="frk-choice__top">
              <span className="frk-choice__mark" aria-hidden={true} />
              {o.badge ? <Chip tone="sol">{o.badge}</Chip> : null}
            </span>
            <span className="frk-choice__title">{o.label}</span>
            {o.price ? (
              <span className="frk-choice__price">
                {o.price}
                {o.period ? <small>{" " + o.period}</small> : null}
              </span>
            ) : null}
            {o.hint ? <span className="frk-choice__hint">{o.hint}</span> : null}
            {o.features ? (
              <ul className="frk-choice__feat">
                {o.features.map(function (f?: any, k?: any): any {
                  return (
                    <li key={k}>
                      <Icon name="check" size={14} />
                      {f}
                    </li>
                  )
                })}
              </ul>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}

/* ---------- Stat: KPI con variación ---------- */
