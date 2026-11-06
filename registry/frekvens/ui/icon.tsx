"use client"
/* Frekvens · Icon — MIT © Cris Olmedo */

import * as React from "react"
import { ICONS, cx } from "./lib"

import type { IconProps } from "./types"
export type { IconProps }

const h: any = React.createElement

export function Icon(props: IconProps): React.ReactElement
export function Icon(p?: any): any {
  var s: any = p.size || 24,
    parts: any = ICONS[p.name] || []
  return (
    <svg
      className={cx("frk-icon", p.className)}
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={p.strokeWidth || 2}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden={p.title ? undefined : true}
      role={p.title ? "img" : undefined}
      focusable="false"
    >
      {p.title ? <title>{p.title}</title> : null}
      {parts.map(function (x?: any, i?: any): any {
        return h(
          x[0],
          Object.assign(
            {
              key: i,
            },
            x[1],
          ),
        )
      })}
    </svg>
  )
}
Icon.names = Object.keys(ICONS)

/* ---------- KeyButton ---------- */
