"use client"
/* Frekvens · Calculator — MIT © Cris Olmedo */

import * as React from "react"
import { Keycap } from "./keycap"
import { cx } from "./lib"

import type { CalculatorProps } from "./types"
export type { CalculatorProps }

const { useState, useEffect }: any = React

/* ---------- Calculator ---------- */
export function Calculator(props: CalculatorProps): React.ReactElement
export function Calculator(p?: any): any {
  var s: any = useState({
      cur: "0",
      acc: null,
      op: null,
      fresh: true,
      expr: "",
    }),
    st: any = s[0],
    set: any = s[1]
  function num(x?: any): any {
    return parseFloat(String(x).replace(",", "."))
  }
  function out(x?: any): any {
    if (!isFinite(x)) return "Error"
    var r: any = Math.round(x * 1e10) / 1e10
    return String(r).replace(".", ",")
  }
  function calc(a?: any, b?: any, op?: any): any {
    return op === "+" ? a + b : op === "−" ? a - b : op === "×" ? a * b : op === "÷" ? a / b : b
  }
  function press(k?: any): any {
    set(function (o?: any): any {
      var n: any = Object.assign({}, o)
      if (/^[0-9]$/.test(k)) {
        n.cur = o.fresh || o.cur === "0" ? k : o.cur.length < 12 ? o.cur + k : o.cur
        n.fresh = false
      } else if (k === ",") {
        if (o.fresh) {
          n.cur = "0,"
          n.fresh = false
        } else if (o.cur.indexOf(",") < 0) n.cur = o.cur + ","
      } else if (k === "C")
        return {
          cur: "0",
          acc: null,
          op: null,
          fresh: true,
          expr: "",
        }
      else if (k === "⌫") {
        n.cur = o.cur.length > 1 && !o.fresh ? o.cur.slice(0, -1) : "0"
      } else if (k === "%") {
        n.cur = out(num(o.cur) / 100)
      } else if (k === "=") {
        if (o.op) {
          n.cur = out(calc(o.acc, num(o.cur), o.op))
          n.expr = out(o.acc) + " " + o.op + " " + o.cur + " ="
          n.acc = null
          n.op = null
          n.fresh = true
        }
      } else {
        var a: any =
          o.op && !o.fresh ? calc(o.acc, num(o.cur), o.op) : o.acc != null && o.fresh ? o.acc : num(o.cur)
        n.acc = a
        n.op = k
        n.fresh = true
        n.cur = out(a)
        n.expr = out(a) + " " + k
      }
      return n
    })
  }
  useEffect(function (): any {
    if (!p.keyboard) return
    function f(e?: any): any {
      var m: any = {
        "/": "÷",
        "*": "×",
        "-": "−",
        "+": "+",
        Enter: "=",
        "=": "=",
        Escape: "C",
        Backspace: "⌫",
        ".": ",",
        ",": ",",
        "%": "%",
      }
      if (/^[0-9]$/.test(e.key)) press(e.key)
      else if (m[e.key]) {
        e.preventDefault()
        press(m[e.key])
      }
    }
    window.addEventListener("keydown", f)
    return function (): any {
      window.removeEventListener("keydown", f)
    }
  }, [])
  var round: any = p.variant === "round"
  var K: any = function (k?: any, o?: any): any {
    o = o || {}
    return (
      <Keycap
        key={k}
        tone={o.tone || (round ? "paper" : "paper")}
        w={o.w}
        h={o.h}
        aria-label={o.label || k}
        onClick={function (): any {
          press(k)
        }}
        className={round ? "frk-keycap--round" : undefined}
      >
        {k}
      </Keycap>
    )
  }
  return (
    <div className={cx("frk-calc", round && "frk-calc--round", p.className)}>
      <div className="frk-calc__display" aria-live="polite" aria-atomic={true}>
        <span className="frk-calc__expr">{st.expr || " "}</span>
        <output className="frk-calc__cur">{st.cur}</output>
      </div>
      <div className="frk-calc__keys">
        {K("C", {
          tone: "ink",
          label: "Borrar todo",
        })}
        {K("÷", {
          label: "Dividir",
        })}
        {K("×", {
          label: "Multiplicar",
        })}
        {K("−", {
          label: "Restar",
        })}
        {K("7")}
        {K("8")}
        {K("9")}
        {K("+", {
          h: 2,
          label: "Sumar",
        })}
        {K("4")}
        {K("5")}
        {K("6")}
        {K("1")}
        {K("2")}
        {K("3")}
        {K("=", {
          h: 2,
          tone: "rams",
          label: "Igual",
        })}
        {K("0", {
          w: 2,
        })}
        {K(",", {
          label: "Coma",
        })}
      </div>
    </div>
  )
}

/* ---------- PadGrid: pads de percusión ---------- */
