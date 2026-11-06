"use client"
/* Frekvens · Cabinet — MIT © Cris Olmedo */

import * as React from "react"
import { cx, pad, useValue } from "./lib"

import type { CabinetProps } from "./types"
export type { CabinetProps }

const { useId }: any = React

/* ---------- Cabinet: archivero, cajones que se abren ---------- */
export function Cabinet(props: CabinetProps): React.ReactElement
export function Cabinet(p?: any): any {
  var items: any = p.drawers || [],
    id: any = useId()
  var st: any = useValue(p, p.defaultValue != null ? p.defaultValue : -1),
    v: any = st[0]
  return (
    <div className={cx("frk-cabinet", p.className)}>
      {items.map(function (d?: any, i?: any): any {
        var open: any = v === i
        return (
          <div key={i} className={cx("frk-drawer", "frk-tone--" + (d.tone || "surface"), open && "is-open")}>
            <button
              type="button"
              id={id + "h" + i}
              className="frk-drawer__front"
              aria-expanded={open}
              aria-controls={id + "p" + i}
              onClick={function (): any {
                st[1](open ? -1 : i)
              }}
            >
              <span className="frk-drawer__label">
                <span className="frk-drawer__index">{d.index != null ? d.index : pad(i + 1)}</span>
                {d.label}
              </span>
              <span className="frk-drawer__handle" aria-hidden={true} />
              {d.meta ? <span className="frk-drawer__meta">{d.meta}</span> : null}
            </button>
            <div
              id={id + "p" + i}
              role="region"
              aria-labelledby={id + "h" + i}
              className="frk-drawer__body"
              aria-hidden={!open}
            >
              <div className="frk-drawer__inner">
                <div className="frk-drawer__pad">{d.content}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ---------- Tabs: pestañas con indicador que viaja ---------- */
