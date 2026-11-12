"use client"
/* Frekvens · Strip — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { cx } from "./lib"

import type { StripProps } from "./types"
export type { StripProps }

/* ---------- Strip: horizontal instrument row ---------- */
export function Strip(props: StripProps): React.ReactElement
export function Strip(p?: any): any {
  return (
    <div className={cx("frk-strip", "frk-tone--" + (p.tone || "surface"), p.className)}>
      <div className="frk-strip__read">
        {p.title || p.icon ? (
          <div className="frk-strip__title">
            {p.icon ? (
              <span className="frk-strip__icon">
                <Icon name={p.icon} size={16} />
              </span>
            ) : null}
            {p.title}
          </div>
        ) : null}
        <div className="frk-strip__value">
          {p.value}
          {p.unit ? <span className="frk-strip__unit">{p.unit}</span> : null}
        </div>
      </div>
      {p.children ? <div className="frk-strip__inst">{p.children}</div> : null}
    </div>
  )
}

/* ---------- ListRow: hairline row, big index ---------- */
