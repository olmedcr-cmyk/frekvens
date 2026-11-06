"use client"
/* Frekvens · NumPad — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { KeyButton } from "./key-button"
import { cx, useValue } from "./lib"

import type { NumPadProps } from "./types"
export type { NumPadProps }

const { useEffect }: any = React

/* ---------- NumPad: introducir importes ---------- */
export function NumPad(props: NumPadProps): React.ReactElement
export function NumPad(p?: any): any {
  var st: any = useValue(p, ""),
    v: any = st[0],
    max: any = p.maxLength || 7
  function press(k?: any): any {
    var n: any = v
    if (k === "del") n = v.slice(0, -1)
    else if (k === ",") {
      if (v.indexOf(",") < 0) n = (v || "0") + ","
    } else {
      if (v.replace(",", "").length >= max) return
      if (v.indexOf(",") >= 0 && v.split(",")[1].length >= 2) return
      n = v === "0" ? k : v + k
    }
    st[1](n)
  }
  useEffect(function (): any {
    if (!p.keyboard) return
    function f(e?: any): any {
      if (/^[0-9]$/.test(e.key)) press(e.key)
      else if (e.key === "," || e.key === ".") press(",")
      else if (e.key === "Backspace") press("del")
    }
    window.addEventListener("keydown", f)
    return function (): any {
      window.removeEventListener("keydown", f)
    }
  })
  var keys: any = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ",", "0", "del"]
  return (
    <div className={cx("frk-numpad", p.className)}>
      <output
        className={cx("frk-numpad__display", !v && "is-empty")}
        aria-live="polite"
        aria-label={(p.label || "Importe") + ": " + (v || "0") + " " + (p.currency || "€")}
      >
        {v || "0"}
        <span className="frk-numpad__cur">{p.currency || "€"}</span>
      </output>
      {p.hint ? <span className="frk-numpad__hint">{p.hint}</span> : null}
      <div className="frk-numpad__keys" role="group" aria-label="Teclado numérico">
        {keys.map(function (k?: any): any {
          return (
            <button
              key={k}
              type="button"
              className="frk-numpad__key"
              aria-label={k === "del" ? "Borrar" : k === "," ? "Coma decimal" : k}
              onClick={function (): any {
                press(k)
              }}
            >
              {k === "del" ? <Icon name="arrow-left" size={24} /> : k}
            </button>
          )
        })}
      </div>
      {p.onSubmit ? (
        <KeyButton
          tone="klein"
          shape="pill"
          block={true}
          disabled={!v || parseFloat(v.replace(",", ".")) === 0}
          onClick={function (): any {
            p.onSubmit(parseFloat(v.replace(",", ".")))
          }}
        >
          {p.submitLabel || "Continuar"}
        </KeyButton>
      ) : null}
    </div>
  )
}

/* ---------- HourStrip: precio por horas ---------- */
