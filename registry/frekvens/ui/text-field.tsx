"use client"
/* Frekvens · TextField — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { cx, omit } from "./lib"

import type { TextFieldProps } from "./types"
export type { TextFieldProps }

const { useId }: any = React

/* ---------- TextField: pill input, optional submit key ---------- */
export function TextField(props: TextFieldProps): React.ReactElement
export function TextField(p?: any): any {
  var id: any = useId(),
    err: any = p.error,
    rest: any = omit(p, ["label", "hint", "error", "onSubmit", "submitLabel", "className", "mono", "block"])
  function submit(e?: any): any {
    e.preventDefault()
    p.onSubmit && p.onSubmit(e.currentTarget.elements[0].value)
  }
  var input: any = (
    <input
      {...Object.assign(
        {
          id: id,
          className: cx("frk-input", p.mono && "frk-input--mono"),
          "aria-invalid": err ? true : undefined,
          "aria-describedby": err || p.hint ? id + "-d" : undefined,
        },
        rest,
      )}
    />
  )
  var body: any = p.onSubmit ? (
    <form className="frk-field__row" onSubmit={submit}>
      {input}
      <button
        type="submit"
        className="frk-key frk-tone--klein frk-key--round frk-field__go"
        aria-label={p.submitLabel || "Enviar"}
      >
        <span className="frk-key__main">
          <Icon name="arrow-right" size={28} />
        </span>
      </button>
    </form>
  ) : (
    input
  )
  return (
    <div className={cx("frk-field", err && "is-error", p.className)}>
      {p.label ? (
        <label htmlFor={id} className="frk-field__label">
          {p.label}
        </label>
      ) : null}
      {body}
      {err ? (
        <span id={id + "-d"} className="frk-field__error">
          <Icon name="close" size={14} />
          {err}
        </span>
      ) : p.hint ? (
        <span id={id + "-d"} className="frk-field__hint">
          {p.hint}
        </span>
      ) : null}
    </div>
  )
}

/* ---------- Stepper: − value + ---------- */
