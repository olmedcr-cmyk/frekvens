"use client"
/* Frekvens · Switch — MIT © Cris Olmedo */

import * as React from "react"
import { cx } from "./lib"

import type { SwitchProps } from "./types"
export type { SwitchProps }

const R: any = React
const { useState }: any = React

export function Switch(props: SwitchProps): React.ReactElement
export function Switch(p?: any): any {
  var st: any = useState(!!p.defaultChecked),
    on: any = p.checked != null ? p.checked : st[0],
    lid: any = R.useId ? R.useId() : null
  function toggle(): any {
    if (p.checked == null) st[1](!on)
    if (p.onChange) p.onChange(!on)
    if (navigator.vibrate)
      try {
        navigator.vibrate(6)
      } catch (e) {}
  }
  var sw: any = (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={p.showLabel ? undefined : p.label}
      aria-labelledby={p.showLabel ? lid : undefined}
      disabled={p.disabled}
      onClick={toggle}
      className={cx("frk-switch", on && "is-on", !p.showLabel && p.className)}
    >
      <span className="frk-switch__text frk-switch__text--on" aria-hidden={true}>
        {p.onText || "ON"}
      </span>
      <span className="frk-switch__text frk-switch__text--off" aria-hidden={true}>
        {p.offText || "OFF"}
      </span>
      <span className="frk-switch__dot" aria-hidden={true} />
    </button>
  )
  return p.showLabel ? (
    <div className={cx("frk-switchrow", p.className)}>
      <span id={lid} className="frk-switchrow__label" onClick={p.disabled ? undefined : toggle}>
        {p.label}
      </span>
      {sw}
    </div>
  ) : (
    sw
  )
}

/* ---------- Segmented: pill toggle con disco que viaja ---------- */
