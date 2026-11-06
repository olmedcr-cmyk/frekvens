"use client"
/* Frekvens · Toast — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { cx, usePresence } from "./lib"

import type { ToastProps } from "./types"
export type { ToastProps }

const { useEffect }: any = React

/* ---------- Toast ---------- */
export function Toast(props: ToastProps): React.ReactElement
export function Toast(p?: any): any {
  var pres: any = usePresence(!!p.open, 150)
  useEffect(
    function (): any {
      if (!p.open || !p.duration) return
      var t: any = setTimeout(function (): any {
        p.onClose && p.onClose()
      }, p.duration)
      return function (): any {
        clearTimeout(t)
      }
    },
    [p.open, p.duration],
  )
  if (!pres[0]) return null
  return (
    <div
      role={p.tone === "rec" ? "alert" : "status"}
      className={cx(
        "frk-toast",
        "frk-tone--" + (p.tone || "ink"),
        pres[1] && p.open && "is-in",
        p.fixed && "frk-toast--fixed",
      )}
    >
      {p.icon ? <Icon name={p.icon} size={20} /> : null}
      <span className="frk-toast__text">{p.children}</span>
      {p.action ? (
        <button type="button" className="frk-toast__action" onClick={p.action.onClick}>
          {p.action.label}
        </button>
      ) : null}
      {p.onClose ? (
        <button type="button" className="frk-toast__close" aria-label="Cerrar" onClick={p.onClose}>
          <Icon name="close" size={18} />
        </button>
      ) : null}
    </div>
  )
}

/* ---------- TextField: pill input, optional submit key ---------- */
