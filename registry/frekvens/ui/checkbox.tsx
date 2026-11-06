"use client"
/* Frekvens · Checkbox — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { cx } from "./lib"

import type { CheckboxProps } from "./types"
export type { CheckboxProps }

const { useId, useState }: any = React

/* ---------- Checkbox ---------- */
export function Checkbox(props: CheckboxProps): React.ReactElement
export function Checkbox(p?: any): any {
  var id: any = useId(),
    st: any = useState(!!p.defaultChecked),
    on: any = p.checked != null ? p.checked : st[0]
  function toggle(): any {
    if (p.disabled) return
    var n: any = p.indeterminate ? true : !on
    if (p.checked == null) st[1](n)
    p.onChange && p.onChange(n)
  }
  return (
    <label
      className={cx(
        "frk-check",
        on && "is-on",
        p.indeterminate && "is-mixed",
        p.disabled && "is-disabled",
        p.className,
      )}
      htmlFor={id}
    >
      <button
        id={id}
        type="button"
        role="checkbox"
        aria-label={p.ariaLabel}
        aria-checked={p.indeterminate ? "mixed" : on}
        disabled={p.disabled}
        className="frk-check__box"
        onClick={toggle}
        aria-describedby={p.hint ? id + "h" : undefined}
      >
        <Icon name={p.indeterminate ? "minus" : "check"} size={20} strokeWidth={2.6} />
      </button>
      <span className="frk-check__text">
        <span className="frk-check__label">{p.label || p.children}</span>
        {p.hint ? (
          <span id={id + "h"} className="frk-check__hint">
            {p.hint}
          </span>
        ) : null}
      </span>
    </label>
  )
}

/* ---------- RadioGroup: aro → disco ---------- */
