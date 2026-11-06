"use client"
/* Frekvens · Stepper — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { clamp, cx, useValue } from "./lib"

import type { StepperProps } from "./types"
export type { StepperProps }

/* ---------- Stepper: − value + ---------- */
export function Stepper(props: StepperProps): React.ReactElement
export function Stepper(p?: any): any {
  var min: any = p.min == null ? 0 : p.min,
    max: any = p.max == null ? 99 : p.max,
    step: any = p.step || 1
  var st: any = useValue(p, min),
    v: any = st[0]
  function set(n?: any): any {
    n = clamp(n, min, max)
    if (n !== v) st[1](n)
  }
  return (
    <div className={cx("frk-stepper", p.className)} role="group" aria-label={p.label}>
      <button
        type="button"
        className="frk-key frk-tone--well frk-key--s frk-key--round"
        aria-label={"Menos " + (p.label || "")}
        disabled={v <= min}
        onClick={function (): any {
          set(v - step)
        }}
      >
        <span className="frk-key__main">
          <Icon name="minus" size={22} />
        </span>
      </button>
      <div className="frk-stepper__val">
        <output aria-live="polite" key={v} className="frk-stepper__num">
          {v}
        </output>
        {p.unit ? <span className="frk-stepper__unit">{p.unit}</span> : null}
      </div>
      <button
        type="button"
        className="frk-key frk-tone--ink frk-key--s frk-key--round"
        aria-label={"Más " + (p.label || "")}
        disabled={v >= max}
        onClick={function (): any {
          set(v + step)
        }}
      >
        <span className="frk-key__main">
          <Icon name="plus" size={22} />
        </span>
      </button>
    </div>
  )
}

/* ---------- ProgressRing ---------- */
