"use client"
/* Frekvens · TabBar — MIT © Cris Olmedo */

import * as React from "react"
import { Badge } from "./badge"
import { Icon } from "./icon"
import { cx, useValue } from "./lib"

import type { TabBarProps } from "./types"
export type { TabBarProps }

/* ---------- TabBar: navegación inferior ---------- */
export function TabBar(props: TabBarProps): React.ReactElement
export function TabBar(p?: any): any {
  var items: any = p.items || [],
    st: any = useValue(p, items[0] && items[0].id),
    v: any = st[0]
  return (
    <nav className={cx("frk-tabbar", p.className)} aria-label={p.label || "Principal"}>
      {items.map(function (it?: any): any {
        var on: any = it.id === v
        return (
          <button
            key={it.id}
            type="button"
            className={cx("frk-tabbar__item", on && "is-on")}
            aria-current={on ? "page" : undefined}
            aria-label={it.label}
            onClick={function (): any {
              st[1](it.id)
            }}
          >
            <Badge count={it.badge} dot={it.dot}>
              <Icon name={it.icon || "home"} size={22} />
            </Badge>
            <span className="frk-tabbar__label" aria-hidden={true}>
              {it.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

/* ---------- TopBar ---------- */
