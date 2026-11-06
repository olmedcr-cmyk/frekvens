"use client"
/* Frekvens · Keypad — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { cx } from "./lib"

import type { KeypadProps } from "./types"
export type { KeypadProps }

/* ---------- Keypad: flush TE-style key strip ---------- */
export function Keypad(props: KeypadProps): React.ReactElement
export function Keypad(p?: any): any {
  var cols: any = p.columns || (p.keys ? p.keys.length : 3)
  return (
    <div
      className={cx("frk-keypad", p.className)}
      role="group"
      aria-label={p.label}
      style={{
        gridTemplateColumns: "repeat(" + cols + ",1fr)",
        height: p.height,
      }}
    >
      {(p.keys || []).map(function (k?: any, i?: any): any {
        return (
          <button
            key={i}
            type="button"
            onClick={k.onClick}
            aria-label={k.ariaLabel}
            aria-pressed={k.active != null ? !!k.active : undefined}
            className={cx("frk-keypad__key", "frk-tone--" + (k.tone || "paper"), k.active && "is-active")}
          >
            {k.icon ? <Icon name={k.icon} size={28} /> : null}
            {k.label ? <span className="frk-keypad__label">{k.label}</span> : null}
          </button>
        )
      })}
    </div>
  )
}

/* ---------- Dial: black disc knob ---------- */
