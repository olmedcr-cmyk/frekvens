"use client"
/* Frekvens · Dialog — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { KeyButton } from "./key-button"
import { Steps } from "./steps"
import { cx, usePresence } from "./lib"

import type { DialogProps } from "./types"
export type { DialogProps }

const { useId, useRef, useEffect }: any = React

/* ================= Frekvens 6: bloques SaaS + lenguaje generativo ================= */

/* ---------- Dialog: modal centrado ---------- */
export function Dialog(props: DialogProps): React.ReactElement
export function Dialog(p?: any): any {
  var pres: any = usePresence(!!p.open, 180),
    id: any = useId(),
    panel: any = useRef(null),
    back: any = useRef(null)
  useEffect(
    function (): any {
      if (!p.open) return
      back.current = document.activeElement
      var t: any = setTimeout(function (): any {
        var pc: any = panel.current
        if (!pc) return
        var f: any =
          pc.querySelector("input,textarea,select") ||
          (p.tone === "danger"
            ? pc.querySelector(".frk-dialog__actions [data-close]")
            : pc.querySelector(".frk-dialog__actions > :last-child"))
        ;(f || pc).focus()
      }, 30)
      return function (): any {
        clearTimeout(t)
        if (back.current && back.current.focus) back.current.focus()
      }
    },
    [p.open],
  )
  if (!pres[0]) return null
  function close(): any {
    p.onClose && p.onClose()
  }
  function key(e?: any): any {
    if (e.key === "Escape") {
      e.preventDefault()
      close()
    }
    if (e.key === "Tab") {
      var f: any = panel.current.querySelectorAll(
        'button:not([disabled]),[href],input,select,textarea,[tabindex]:not([tabindex="-1"])',
      )
      if (!f.length) return
      var a: any = f[0],
        z: any = f[f.length - 1]
      if (e.shiftKey && document.activeElement === a) {
        e.preventDefault()
        z.focus()
      } else if (!e.shiftKey && document.activeElement === z) {
        e.preventDefault()
        a.focus()
      }
    }
  }
  var tone: any = p.tone || "default"
  return (
    <div
      className={cx("frk-dialog", pres[1] && p.open && "is-in", p.inline && "frk-dialog--inline")}
      onKeyDown={key}
    >
      <div
        className="frk-dialog__scrim"
        onClick={p.dismissible === false ? undefined : close}
        aria-hidden={true}
      />
      <div
        ref={panel}
        className={cx("frk-dialog__panel", p.size && "frk-dialog--" + p.size)}
        role={tone === "danger" ? "alertdialog" : "dialog"}
        aria-modal={true}
        aria-labelledby={id + "t"}
        aria-describedby={p.text ? id + "d" : undefined}
        tabIndex={-1}
      >
        {p.icon || tone === "danger" ? (
          <span className={cx("frk-dialog__icon", tone === "danger" ? "frk-tone--rec" : "frk-tone--well")}>
            <Icon name={p.icon || "close"} size={24} />
          </span>
        ) : null}
        {p.steps ? <Steps steps={p.steps} current={p.step || 0} /> : null}
        <h2 id={id + "t"} className="frk-dialog__title">
          {p.title}
        </h2>
        {p.text ? (
          <p id={id + "d"} className="frk-dialog__text">
            {p.text}
          </p>
        ) : null}
        {p.children ? <div className="frk-dialog__body">{p.children}</div> : null}
        <div className="frk-dialog__actions">
          {p.secondary !== false ? (
            <KeyButton tone="well" shape="pill" data-close="" onClick={p.onSecondary || close}>
              {p.secondary || "Cancelar"}
            </KeyButton>
          ) : null}
          <KeyButton
            tone={tone === "danger" ? "rec" : "klein"}
            shape="pill"
            disabled={p.primaryDisabled}
            onClick={p.onPrimary}
          >
            {p.primary || "Aceptar"}
          </KeyButton>
        </div>
        {p.dismissible === false ? null : (
          <button type="button" className="frk-dialog__x" data-close="" aria-label="Cerrar" onClick={close}>
            <Icon name="close" size={20} />
          </button>
        )}
      </div>
    </div>
  )
}

/* ---------- FileDrop: subir archivos ---------- */
