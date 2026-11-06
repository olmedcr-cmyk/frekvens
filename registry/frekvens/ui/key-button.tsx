"use client"
/* Frekvens · KeyButton — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { cx, omit } from "./lib"

import type { KeyButtonProps } from "./types"
export type { KeyButtonProps }

/* ---------- KeyButton ---------- */
export function KeyButton(props: KeyButtonProps): React.ReactElement
export function KeyButton(p?: any): any {
  var tone: any = p.tone || "paper",
    size: any = p.size || "m",
    shape: any = p.shape || "square"
  var isz: any = size === "xl" ? 48 : size === "l" ? 32 : size === "s" ? 20 : 24
  var rest: any = omit(p, [
    "tone",
    "size",
    "shape",
    "label",
    "icon",
    "active",
    "block",
    "toggle",
    "className",
    "children",
  ])
  return (
    <button
      {...Object.assign(
        {
          type: "button",
        },
        rest,
        {
          className: cx(
            "frk-key",
            "frk-tone--" + tone,
            "frk-key--" + size,
            "frk-key--" + shape,
            p.block && "frk-key--block",
            p.active && "is-active",
            p.className,
          ),
          "aria-pressed": p.toggle ? !!p.active : undefined,
        },
      )}
    >
      {p.label ? <span className="frk-key__label">{p.label}</span> : null}
      <span className="frk-key__main">
        {p.icon ? <Icon name={p.icon} size={isz} /> : null}
        {p.children != null ? <span className="frk-key__text">{p.children}</span> : null}
      </span>
    </button>
  )
}

/* ---------- Keypad: flush TE-style key strip ---------- */
