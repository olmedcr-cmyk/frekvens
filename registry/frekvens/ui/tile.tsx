"use client"
/* Frekvens · Tile — MIT © Cris Olmedo */

import * as React from "react"
import { cx } from "./lib"

import type { TileProps } from "./types"
export type { TileProps }

/* ---------- Tile: widget card ---------- */
export function Tile(props: TileProps): React.ReactElement
export function Tile(p?: any): any {
  var Tag: any = p.onClick ? "button" : "div"
  return (
    <Tag
      type={p.onClick ? "button" : undefined}
      onClick={p.onClick}
      className={cx("frk-tile", "frk-tone--" + (p.tone || "surface"), p.className)}
      style={{
        minHeight: p.height,
      }}
    >
      <div className="frk-tile__head">
        <div className="frk-tile__title">
          {p.title}
          {p.subtitle ? <span className="frk-tile__sub">{p.subtitle}</span> : null}
        </div>
        {p.meta ? <span className="frk-tile__meta">{p.meta}</span> : null}
      </div>
      {p.children ? <div className="frk-tile__art">{p.children}</div> : <div className="frk-tile__art" />}
      {p.value != null ? <div className="frk-tile__value">{p.value}</div> : null}
    </Tag>
  )
}

/* ---------- Strip: horizontal instrument row ---------- */
