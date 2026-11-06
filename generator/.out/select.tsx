"use client"
/* Frekvens · Select — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { cx, norm, useOutside, usePresence, useValue } from "./lib"

import type { SelectProps } from "./types"
export type { SelectProps }

const { useId, useState, useRef }: any = React

/* ---------- Select: listbox dropdown, focus stays on the trigger ---------- */
export function Select(props: SelectProps): React.ReactElement
export function Select(p?: any): any {
  var opts: any = norm(p.options),
    id: any = useId()
  var st: any = useValue(p, p.placeholder ? null : opts[0] && opts[0].value),
    v: any = st[0]
  var o: any = useState(!!p.defaultOpen),
    open: any = o[0],
    setOpen: any = o[1]
  var a: any = useState(0),
    act: any = a[0],
    setAct: any = a[1]
  var wrap: any = useRef(null),
    btn: any = useRef(null),
    typed: any = useRef({
      s: "",
      t: 0,
    })
  var pres: any = usePresence(open, 150)
  useOutside(wrap, open, function (): any {
    setOpen(false)
  })
  var cur: any = -1
  opts.forEach(function (x?: any, i?: any): any {
    if (x.value === v) cur = i
  })
  function show(): any {
    setAct(cur < 0 ? 0 : cur)
    setOpen(true)
  }
  function choose(i?: any): any {
    if (opts[i].disabled) return
    st[1](opts[i].value)
    setOpen(false)
    btn.current && btn.current.focus()
  }
  function move(d?: any): any {
    var n: any = act
    for (var k: any = 0; k < opts.length; k++) {
      n = (n + d + opts.length) % opts.length
      if (!opts[n].disabled) break
    }
    setAct(n)
  }
  function key(e?: any): any {
    var k: any = e.key
    if (!open) {
      if (k === "ArrowDown" || k === "ArrowUp" || k === "Enter" || k === " ") {
        e.preventDefault()
        show()
      }
      return
    }
    if (k === "ArrowDown") {
      e.preventDefault()
      move(1)
    } else if (k === "ArrowUp") {
      e.preventDefault()
      move(-1)
    } else if (k === "Home") {
      e.preventDefault()
      setAct(0)
    } else if (k === "End") {
      e.preventDefault()
      setAct(opts.length - 1)
    } else if (k === "Enter" || k === " ") {
      e.preventDefault()
      choose(act)
    } else if (k === "Escape") {
      e.preventDefault()
      setOpen(false)
    } else if (k === "Tab") {
      setOpen(false)
    } else if (k.length === 1) {
      var now: any = Date.now(),
        t: any = typed.current
      t.s = (now - t.t > 600 ? "" : t.s) + k.toLowerCase()
      t.t = now
      for (var i: any = 0; i < opts.length; i++)
        if (String(opts[i].label).toLowerCase().indexOf(t.s) === 0) {
          setAct(i)
          break
        }
    }
  }
  var sel: any = cur >= 0 ? opts[cur] : null
  return (
    <div ref={wrap} className={cx("frk-select", p.block && "frk-select--block", p.className)}>
      {p.label ? (
        <span className="frk-field__label" id={id + "-l"}>
          {p.label}
        </span>
      ) : null}
      <button
        ref={btn}
        type="button"
        role="combobox"
        className={cx("frk-select__trigger", open && "is-open")}
        disabled={p.disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={id + "-list"}
        aria-labelledby={p.label ? id + "-l " + id + "-v" : undefined}
        aria-activedescendant={open ? id + "-o" + act : undefined}
        data-open={open ? "" : undefined}
        onClick={function (): any {
          open ? setOpen(false) : show()
        }}
        onKeyDown={key}
      >
        <span id={id + "-v"} className={cx("frk-select__value", !sel && "is-placeholder")}>
          {sel ? sel.label : p.placeholder || ""}
        </span>
        <Icon name="chevron-down" size={20} className="frk-select__chev" />
      </button>
      {pres[0] ? (
        <ul
          id={id + "-list"}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={p.label ? id + "-l" : undefined}
          className={cx("frk-pop", "frk-select__list", pres[1] && open && "is-in")}
        >
          {opts.map(function (x?: any, i?: any): any {
            return (
              <li
                key={x.value}
                id={id + "-o" + i}
                role="option"
                aria-selected={x.value === v}
                aria-disabled={x.disabled || undefined}
                className={cx("frk-select__opt", i === act && "is-active", x.value === v && "is-selected")}
                style={{
                  transitionDelay: (pres[1] ? i * 25 : 0) + "ms",
                }}
                onPointerEnter={function (): any {
                  setAct(i)
                }}
                onPointerDown={function (e?: any): any {
                  e.preventDefault()
                }}
                onClick={function (): any {
                  choose(i)
                }}
              >
                <span>{x.label}</span>
                {x.meta ? <span className="frk-select__meta">{x.meta}</span> : null}
                {x.value === v ? <Icon name="check" size={18} /> : null}
              </li>
            )
          })}
        </ul>
      ) : null}
      {p.hint ? <span className="frk-field__hint">{p.hint}</span> : null}
    </div>
  )
}

/* ---------- Menu: action popover, roving focus ---------- */
