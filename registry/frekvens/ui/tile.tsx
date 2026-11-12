"use client"
/* Frekvens · Tile — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { cx } from "./lib"

import type { TileProps } from "./types"
export type { TileProps }

/* ---------- Tile: widget card ---------- */
export function Tile(props: TileProps): React.ReactElement
export function Tile(p?: any): any {
  var Tag: any = p.onClick ? "button" : "div",
    bottom: any = p.anchor === "bottom"
  var title: any =
    p.title != null || p.subtitle != null ? (
      <div className="frk-tile__title">
        {p.title}
        {p.subtitle ? <span className="frk-tile__sub">{p.subtitle}</span> : null}
      </div>
    ) : null
  return (
    <Tag
      type={p.onClick ? "button" : undefined}
      onClick={p.onClick}
      className={cx(
        "frk-tile",
        "frk-tone--" + (p.tone || "surface"),
        bottom && "frk-tile--bottom",
        p.className,
      )}
      style={{
        minHeight: p.height,
      }}
    >
      <div className={cx("frk-tile__head", p.icon && "frk-tile__head--icon")}>
        {p.icon ? (
          <span className="frk-tile__icon">
            <Icon name={p.icon} size={20} />
          </span>
        ) : null}
        {bottom ? null : title}
        {p.meta ? <span className="frk-tile__meta">{p.meta}</span> : null}
      </div>
      <div className="frk-tile__art">{p.children}</div>
      {p.value != null ? <div className="frk-tile__value">{p.value}</div> : null}
      {p.caption ? <div className="frk-tile__caption">{p.caption}</div> : null}
      {bottom ? title : null}
    </Tag>
  )
}

/* ---------- Strip: horizontal instrument row ---------- */
