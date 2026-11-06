"use client"
/* Frekvens · Sidebar — MIT © Cris Olmedo */

import * as React from "react"
import { Badge } from "./badge"
import { Icon } from "./icon"
import { cx, useValue } from "./lib"

import type { SidebarProps } from "./types"
export type { SidebarProps }

const { useState }: any = React

/* ---------- Sidebar: navegación de escritorio/iPad ---------- */
export function Sidebar(props: SidebarProps): React.ReactElement
export function Sidebar(p?: any): any {
  var st: any = useValue(
      p,
      p.sections && p.sections[0] && p.sections[0].items[0] && p.sections[0].items[0].id,
    ),
    v: any = st[0]
  var c: any = useState(!!p.defaultCollapsed),
    col: any = p.collapsed != null ? p.collapsed : c[0]
  return (
    <nav
      className={cx("frk-side", col && "is-collapsed", "frk-tone--" + (p.tone || "surface"), p.className)}
      aria-label={p.label || "Secciones"}
    >
      <div className="frk-side__head">
        {col ? null : p.header}
        <button
          type="button"
          className="frk-side__toggle"
          aria-label={col ? "Expandir barra lateral" : "Contraer barra lateral"}
          aria-expanded={!col}
          onClick={function (): any {
            c[1](!col)
            p.onCollapse && p.onCollapse(!col)
          }}
        >
          <Icon name={col ? "arrow-right" : "arrow-left"} size={18} />
        </button>
      </div>
      {(p.sections || []).map(function (sec?: any, si?: any): any {
        return (
          <div key={si} className="frk-side__sec">
            {sec.label && !col ? <span className="frk-side__label">{sec.label}</span> : null}
            <ul>
              {sec.items.map(function (it?: any): any {
                var on: any = it.id === v
                return (
                  <li key={it.id}>
                    <button
                      type="button"
                      className={cx("frk-side__item", on && "is-on")}
                      aria-current={on ? "page" : undefined}
                      aria-label={col ? it.label : undefined}
                      title={col ? it.label : undefined}
                      onClick={function (): any {
                        st[1](it.id)
                      }}
                    >
                      <Badge dot={col && !!it.count} tone={it.alert ? "rec" : "rams"}>
                        <Icon name={it.icon || "dots"} size={20} />
                      </Badge>
                      {col ? null : <span className="frk-side__text">{it.label}</span>}
                      {!col && it.count != null ? (
                        <span className={cx("frk-side__count", it.alert && "is-alert")}>{it.count}</span>
                      ) : null}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
      {p.footer && !col ? <div className="frk-side__foot">{p.footer}</div> : null}
    </nav>
  )
}

/* ---------- DataTable ---------- */
