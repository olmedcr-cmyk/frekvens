"use client"
/* Frekvens · Text — MIT © Cris Olmedo */

import * as React from "react"
import { TEXT_TAG, cx } from "./lib"

import type { TextProps } from "./types"
export type { TextProps }

const h: any = React.createElement

export function Text(props: TextProps): React.ReactElement
export function Text(p?: any): any {
  var v: any = p.variant || "body"
  return h(
    p.as || TEXT_TAG[v] || "p",
    {
      className: cx("frk-text", "frk-text--" + v, p.muted && "is-muted", p.className),
      style: p.style,
    },
    p.children,
    p.sub ? <span className="frk-text__sub">{p.sub}</span> : null,
  )
}

/* ---------- DotLoader: pensando ---------- */
