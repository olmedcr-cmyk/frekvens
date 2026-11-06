"use client"
/* Frekvens · LED — MIT © Cris Olmedo */

import * as React from "react"
import { cx } from "./lib"

import type { LEDProps } from "./types"
export type { LEDProps }

/* ---------- LED: indicator light ---------- */
export function LED(props: LEDProps): React.ReactElement
export function LED(p?: any): any {
  return (
    <span
      className={cx(
        "frk-led",
        "frk-led--" + (p.tone || "rec"),
        p.on !== false && "is-on",
        p.blink && "is-blink",
        p.className,
      )}
    >
      <span className="frk-led__lamp" aria-hidden={true} />
      {p.children != null ? <span className="frk-led__text">{p.children}</span> : null}
      <span className="frk-sr">{p.on !== false ? " (encendido)" : " (apagado)"}</span>
    </span>
  )
}

/* ---------- Grille: speaker/lamp grille in a disc or dome ---------- */
