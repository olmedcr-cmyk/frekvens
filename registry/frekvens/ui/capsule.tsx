"use client"
/* Frekvens · Capsule — MIT © Cris Olmedo */

import * as React from "react"
import { cx } from "./lib"

import type { CapsuleProps } from "./types"
export type { CapsuleProps }

const h: any = React.createElement

/* ---------- Capsule: bloque en forma de estadio para abrir o cerrar una página ---------- */
export function Capsule(props: CapsuleProps): React.ReactElement
export function Capsule(p?: any): any {
  return h(
    p.as || "section",
    {
      className: cx("frk-capsule", "frk-tone--" + (p.tone || "ink"), p.className),
    },
    <div className="frk-capsule__body">
      {p.eyebrow ? <p className="frk-capsule__eyebrow">{p.eyebrow}</p> : null}
      {h(
        p.level === 1 ? "h1" : "h2",
        {
          className: "frk-capsule__title",
        },
        p.title,
      )}
      {p.text ? <p className="frk-capsule__text">{p.text}</p> : null}
      {p.actions ? <div className="frk-capsule__actions">{p.actions}</div> : null}
    </div>,
    p.children ? <div className="frk-capsule__art">{p.children}</div> : null,
  )
}
