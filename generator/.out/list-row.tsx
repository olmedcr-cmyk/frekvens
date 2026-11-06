"use client"
/* Frekvens · ListRow — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { cx } from "./lib"

import type { ListRowProps } from "./types"
export type { ListRowProps }

/* ---------- ListRow: hairline row, big index ---------- */
export function ListRow(props: ListRowProps): React.ReactElement
export function ListRow(p?: any): any {
  var Tag: any = p.onClick ? "button" : "div"
  return (
    <Tag type={p.onClick ? "button" : undefined} onClick={p.onClick} className={cx("frk-row", p.className)}>
      <span className="frk-row__lead">{p.icon ? <Icon name={p.icon} size={28} /> : p.index}</span>
      <span className="frk-row__body">
        <span className="frk-row__title">{p.title}</span>
        {p.detail ? <span className="frk-row__detail">{p.detail}</span> : null}
      </span>
      {p.value != null ? <span className="frk-row__value">{p.value}</span> : null}
    </Tag>
  )
}

/* ---------- Chip: mono pill ---------- */
