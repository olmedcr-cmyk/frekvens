"use client"
/* Frekvens · Rocker — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { LED } from "./led"
import { cx } from "./lib"

import type { RockerProps } from "./types"
export type { RockerProps }

const { useState }: any = React

/* ---------- Rocker: interruptores basculantes con piloto ---------- */
export function Rocker(props: RockerProps): React.ReactElement
export function Rocker(p?: any): any {
  var items: any = p.items || []
  var s: any = useState(
      items.map(function (x?: any): any {
        return !!x.on
      }),
    ),
    on: any = s[0],
    setOn: any = s[1]
  return (
    <div className={cx("frk-rockers", p.className)} role="group" aria-label={p.label}>
      {items.map(function (x?: any, i?: any): any {
        var v: any = x.checked != null ? x.checked : on[i]
        return (
          <div key={i} className="frk-rocker">
            <button
              type="button"
              role="switch"
              aria-checked={v}
              aria-label={x.label}
              className={cx("frk-rocker__key", v && "is-on")}
              onClick={function (): any {
                var n: any = on.slice()
                n[i] = !v
                setOn(n)
                x.onChange && x.onChange(!v)
              }}
            >
              <span className="frk-rocker__face">
                <Icon name={x.icon || "power"} size={22} />
              </span>
            </button>
            <LED tone={x.tone || "rec"} on={v}>
              {x.label}
            </LED>
          </div>
        )
      })}
    </div>
  )
}

/* ---------- Reveal: transiciones de entrada ---------- */
