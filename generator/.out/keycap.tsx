"use client"
/* Frekvens · Keycap — MIT © Cris Olmedo */

import * as React from "react"
import { cx, omit } from "./lib"

import type { KeycapProps } from "./types"
export type { KeycapProps }

/* ---------- Keycap: tecla mecánica esculpida ---------- */
export function Keycap(props: KeycapProps): React.ReactElement
export function Keycap(p?: any): any {
  var rest: any = omit(p, ["tone", "w", "h", "sub", "className", "children", "legend"])
  return (
    <button
      {...Object.assign(
        {
          type: "button",
        },
        rest,
        {
          className: cx("frk-keycap", "frk-keycap--" + (p.tone || "paper"), p.className),
          style: Object.assign(
            {
              gridColumn: p.w > 1 ? "span " + p.w : undefined,
              gridRow: p.h > 1 ? "span " + p.h : undefined,
            },
            p.style,
          ),
        },
      )}
    >
      <span className="frk-keycap__top">
        <span className="frk-keycap__legend">{p.children}</span>
        {p.sub ? <span className="frk-keycap__sub">{p.sub}</span> : null}
      </span>
    </button>
  )
}

/* ---------- Calculator ---------- */
