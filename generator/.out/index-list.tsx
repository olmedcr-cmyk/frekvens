"use client"
/* Frekvens · IndexList — MIT © Cris Olmedo */

import * as React from "react"
import { cx } from "./lib"

import type { IndexListProps } from "./types"
export type { IndexListProps }

/* ---------- IndexList: índice en letra grande, con la cuenta en pequeño ---------- */
export function IndexList(props: IndexListProps): React.ReactElement
export function IndexList(p?: any): any {
  var items: any = p.items || []
  return (
    <ul className={cx("frk-index", p.className)} aria-label={p.label}>
      {items.map(function (it?: any, i?: any): any {
        var o: any =
            typeof it === "string"
              ? {
                  label: it,
                }
              : it,
          Tag: any = o.href ? "a" : o.onClick ? "button" : "span"
        return (
          <li
            key={i}
            style={{
              animationDelay: i * 40 + "ms",
            }}
          >
            <Tag
              href={o.href}
              type={Tag === "button" ? "button" : undefined}
              onClick={o.onClick}
              aria-current={o.current ? "true" : undefined}
              className={cx("frk-index__item", o.current && "is-on")}
            >
              <span className="frk-index__label">{o.label}</span>
              {o.count != null ? (
                <span className="frk-index__count">
                  <span className="frk-sr">{", "}</span>
                  {o.count}
                </span>
              ) : null}
            </Tag>
          </li>
        )
      })}
    </ul>
  )
}
