"use client"
/* Frekvens · Menu — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { cx, useOutside, usePresence } from "./lib"

import type { MenuProps } from "./types"
export type { MenuProps }

const { useId, useState, useRef, useEffect }: any = React

/* ---------- Menu: action popover, roving focus ---------- */
export function Menu(props: MenuProps): React.ReactElement
export function Menu(p?: any): any {
  var items: any = p.items || [],
    id: any = useId()
  var o: any = useState(!!p.defaultOpen),
    open: any = o[0],
    setOpen: any = o[1]
  var wrap: any = useRef(null),
    btn: any = useRef(null),
    list: any = useRef(null)
  var pres: any = usePresence(open, 150)
  useOutside(wrap, open, function (): any {
    setOpen(false)
  })
  useEffect(
    function (): any {
      if (open && pres[0] && list.current) {
        var f: any = list.current.querySelector("[role=menuitem]:not([aria-disabled])")
        f && f.focus()
      }
    },
    [open, pres[0]],
  )
  function close(back?: any): any {
    setOpen(false)
    if (back && btn.current) btn.current.focus()
  }
  function key(e?: any): any {
    var els: any = Array.prototype.slice.call(
        list.current.querySelectorAll("[role=menuitem]:not([aria-disabled])"),
      ),
      i: any = els.indexOf(document.activeElement)
    if (e.key === "ArrowDown") {
      e.preventDefault()
      els[(i + 1) % els.length].focus()
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      els[(i - 1 + els.length) % els.length].focus()
    } else if (e.key === "Home") {
      e.preventDefault()
      els[0].focus()
    } else if (e.key === "End") {
      e.preventDefault()
      els[els.length - 1].focus()
    } else if (e.key === "Escape") {
      e.preventDefault()
      close(true)
    } else if (e.key === "Tab") {
      close(false)
    }
  }
  return (
    <div ref={wrap} className={cx("frk-menu", "frk-menu--" + (p.align || "start"), p.className)}>
      <button
        ref={btn}
        type="button"
        className={cx(
          "frk-key",
          "frk-tone--" + (p.tone || "paper"),
          "frk-key--s",
          "frk-key--round",
          "frk-menu__trigger",
        )}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={id}
        aria-label={p.label || "Más opciones"}
        data-open={open ? "" : undefined}
        onClick={function (): any {
          setOpen(!open)
        }}
        onKeyDown={function (e?: any): any {
          if (e.key === "ArrowDown") {
            e.preventDefault()
            setOpen(true)
          }
        }}
      >
        <span className="frk-key__main">
          <Icon name={p.icon || "dots"} size={20} />
        </span>
      </button>
      {pres[0] ? (
        <div
          ref={list}
          id={id}
          role="menu"
          aria-label={p.label}
          onKeyDown={key}
          className={cx("frk-pop", "frk-menu__list", pres[1] && open && "is-in")}
        >
          {items.map(function (it?: any, i?: any): any {
            if (it.separator) return <div key={"s" + i} role="separator" className="frk-menu__sep" />
            return (
              <button
                key={i}
                type="button"
                role="menuitem"
                tabIndex={-1}
                aria-disabled={it.disabled || undefined}
                className={cx("frk-menu__item", it.danger && "is-danger")}
                style={{
                  transitionDelay: (pres[1] ? i * 25 : 0) + "ms",
                }}
                onClick={function (): any {
                  if (it.disabled) return
                  it.onSelect && it.onSelect()
                  close(true)
                }}
              >
                {it.icon ? <Icon name={it.icon} size={20} /> : <span className="frk-menu__noicon" />}
                <span>{it.label}</span>
                {it.shortcut ? <span className="frk-menu__kbd">{it.shortcut}</span> : null}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

/* ---------- Sheet: bottom sheet, modal, drag to dismiss ---------- */
