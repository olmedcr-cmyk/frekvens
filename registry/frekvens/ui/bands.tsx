"use client"
/* Frekvens · Bands — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { cx } from "./lib"

import type { BandsProps } from "./types"
export type { BandsProps }

/* ---------- Bands: lista de franjas de color a todo el ancho ---------- */
export function Bands(props: BandsProps): React.ReactElement
export function Bands(p?: any): any {
  var items: any = p.items || []
  return (
    <ol className={cx("frk-bands", p.stacked && "frk-bands--stacked", p.className)} aria-label={p.label}>
      {items.map(function (it?: any, i?: any): any {
        var Tag: any = it.href ? "a" : it.onClick ? "button" : "div"
        return (
          <li key={i} className="frk-bands__item">
            <Tag
              href={it.href}
              type={Tag === "button" ? "button" : undefined}
              onClick={it.onClick}
              className={cx("frk-bands__band", "frk-tone--" + (it.tone || "surface"))}
            >
              {p.numbered === false ? null : (
                <span className="frk-bands__n" aria-hidden={true}>
                  {i + 1}
                </span>
              )}
              <span className="frk-bands__text">
                <span className="frk-bands__title">{it.title}</span>
                {it.sub ? <span className="frk-bands__sub">{it.sub}</span> : null}
              </span>
              {it.meta ? <span className="frk-bands__meta">{it.meta}</span> : null}
              {it.icon ? (
                <Icon name={it.icon} size={28} />
              ) : Tag !== "div" ? (
                <Icon name="arrow-right" size={24} />
              ) : null}
            </Tag>
          </li>
        )
      })}
    </ol>
  )
}

/* ---------- Eyes: dos ojos que dicen cómo está el agente ---------- */
