"use client"
/* Frekvens · Sheet — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { cx, usePresence } from "./lib"

import type { SheetProps } from "./types"
export type { SheetProps }

const { useId, useRef, useState, useEffect }: any = React

/* ---------- Sheet: bottom sheet, modal, drag to dismiss ---------- */
export function Sheet(props: SheetProps): React.ReactElement
export function Sheet(p?: any): any {
  var pres: any = usePresence(!!p.open, 260),
    id: any = useId()
  var panel: any = useRef(null),
    back: any = useRef(null),
    drag: any = useRef(null)
  var d: any = useState(0),
    dy: any = d[0],
    setDy: any = d[1]
  useEffect(
    function (): any {
      if (!p.open) return
      back.current = document.activeElement
      var t: any = setTimeout(function (): any {
        var f: any =
          panel.current &&
          panel.current.querySelector('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')
        ;(f || panel.current) && (f || panel.current).focus()
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
      var first: any = f[0],
        last: any = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }
  function down(e?: any): any {
    drag.current = {
      y: e.clientY,
    }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  function mv(e?: any): any {
    if (drag.current) setDy(Math.max(0, e.clientY - drag.current.y))
  }
  function up(): any {
    if (!drag.current) return
    drag.current = null
    if (dy > 96) {
      setDy(0)
      close()
    } else setDy(0)
  }
  var inn: any = pres[1] && p.open
  return (
    <div className={cx("frk-sheet", inn && "is-in", p.inline && "frk-sheet--inline")} onKeyDown={key}>
      <div className="frk-sheet__scrim" onClick={close} aria-hidden={true} />
      <div
        ref={panel}
        role="dialog"
        aria-modal={true}
        aria-labelledby={p.title ? id : undefined}
        aria-label={p.title ? undefined : p.label}
        tabIndex={-1}
        className={cx(
          "frk-sheet__panel",
          drag.current && "is-dragging",
          "frk-tone--" + (p.tone || "surface"),
        )}
        style={
          dy
            ? {
                transform: "translateY(" + dy + "px)",
              }
            : undefined
        }
      >
        <div
          className="frk-sheet__grab"
          onPointerDown={down}
          onPointerMove={mv}
          onPointerUp={up}
          onPointerCancel={up}
          aria-hidden={true}
        >
          <span />
        </div>
        {p.title ? (
          <div className="frk-sheet__head">
            <h2 id={id} className="frk-sheet__title">
              {p.title}
            </h2>
            <button
              type="button"
              className="frk-key frk-tone--well frk-key--s frk-key--round"
              aria-label="Cerrar"
              onClick={close}
            >
              <span className="frk-key__main">
                <Icon name="close" size={20} />
              </span>
            </button>
          </div>
        ) : null}
        <div className="frk-sheet__body">{p.children}</div>
      </div>
    </div>
  )
}

/* ---------- Toast ---------- */
