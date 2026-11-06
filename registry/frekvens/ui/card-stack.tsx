"use client"
/* Frekvens · CardStack — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { cx, useValue } from "./lib"

import type { CardStackProps } from "./types"
export type { CardStackProps }

/* ---------- CardStack: overlapping coloured cards ---------- */
export function CardStack(props: CardStackProps): React.ReactElement
export function CardStack(p?: any): any {
  var items: any = p.items || []
  var st: any = useValue(p, p.defaultValue != null ? p.defaultValue : 0),
    v: any = st[0]
  return (
    <div className={cx("frk-stack", p.className)} role="list">
      {items.map(function (it?: any, i?: any): any {
        var on: any = i === v
        return (
          <div
            key={i}
            role="listitem"
            className="frk-stack__item"
            style={{
              zIndex: i + 1,
            }}
          >
            <button
              type="button"
              className={cx("frk-stack__card", "frk-tone--" + (it.tone || "surface"), on && "is-open")}
              aria-expanded={on}
              onClick={function (): any {
                st[1](i)
              }}
            >
              <span className="frk-stack__top">
                <span className="frk-stack__badge">{it.badge}</span>
                {it.icon ? (
                  <span className="frk-stack__badge">
                    <Icon name={it.icon} size={20} />
                  </span>
                ) : null}
              </span>
              <span className="frk-stack__bottom">
                <span className="frk-stack__title">
                  {it.title}
                  {it.subtitle ? <span className="frk-stack__sub">{it.subtitle}</span> : null}
                </span>
                {it.value != null ? <span className="frk-stack__value">{it.value}</span> : null}
              </span>
            </button>
          </div>
        )
      })}
    </div>
  )
}

/* ---------- LED: indicator light ---------- */
