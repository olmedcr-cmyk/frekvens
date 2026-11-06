"use client"
/* Frekvens · CommandBar — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { cx, usePresence } from "./lib"

import type { CommandBarProps } from "./types"
export type { CommandBarProps }

const { useState, useRef, useEffect }: any = React

/* ---------- CommandBar: paleta ⌘K ---------- */
export function CommandBar(props: CommandBarProps): React.ReactElement
export function CommandBar(p?: any): any {
  var o: any = useState(!!p.defaultOpen),
    open: any = p.open != null ? p.open : o[0]
  function setOpen(v?: any): any {
    if (p.open == null) o[1](v)
    if (!v && p.onClose) p.onClose()
  }
  var q: any = useState(""),
    query: any = q[0],
    a: any = useState(0),
    act: any = a[0],
    setAct: any = a[1],
    inp: any = useRef(null),
    back: any = useRef(null)
  var pres: any = usePresence(open, 150)
  useEffect(
    function (): any {
      if (!p.hotkey) return
      function f(e?: any): any {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
          e.preventDefault()
          setOpen(!open)
        }
      }
      window.addEventListener("keydown", f)
      return function (): any {
        window.removeEventListener("keydown", f)
      }
    },
    [open, p.hotkey],
  )
  useEffect(
    function (): any {
      if (open) {
        back.current = document.activeElement
        q[1]("")
        setAct(0)
        setTimeout(function (): any {
          inp.current && inp.current.focus()
        }, 20)
      } else if (back.current && back.current.focus) back.current.focus()
    },
    [open],
  )
  var list: any = (p.commands || []).filter(function (c?: any): any {
    return !query || (c.label + " " + (c.keywords || "")).toLowerCase().indexOf(query.toLowerCase()) >= 0
  })
  function run(c?: any): any {
    if (!c) return
    c.onRun && c.onRun()
    p.onRun && p.onRun(c.id)
    setOpen(false)
  }
  if (!pres[0]) return null
  var groups: any = []
  list.forEach(function (c?: any): any {
    var g: any = c.group || ""
    if (groups.indexOf(g) < 0) groups.push(g)
  })
  var id: any = "frk-cmd",
    idx: any = -1
  return (
    <div
      className={cx("frk-cmd", pres[1] && open && "is-in", p.inline && "frk-cmd--inline")}
      onKeyDown={function (e?: any): any {
        if (e.key === "Escape") {
          e.preventDefault()
          setOpen(false)
        }
      }}
    >
      <div
        className="frk-cmd__scrim"
        onClick={function (): any {
          setOpen(false)
        }}
      />
      <div className="frk-cmd__panel" role="dialog" aria-modal={true} aria-label={p.label || "Comandos"}>
        <div className="frk-cmd__search">
          <Icon name="arrow-right" size={20} />
          <input
            ref={inp}
            role="combobox"
            aria-expanded={true}
            aria-controls={id}
            aria-activedescendant={list[act] ? id + "-" + act : undefined}
            aria-autocomplete="list"
            placeholder={p.placeholder || "Busca una acción…"}
            value={query}
            className="frk-cmd__input"
            onChange={function (e?: any): any {
              q[1](e.target.value)
              setAct(0)
            }}
            onKeyDown={function (e?: any): any {
              if (e.key === "ArrowDown") {
                e.preventDefault()
                setAct(Math.min(list.length - 1, act + 1))
              } else if (e.key === "ArrowUp") {
                e.preventDefault()
                setAct(Math.max(0, act - 1))
              } else if (e.key === "Enter") {
                e.preventDefault()
                run(list[act])
              }
            }}
          />
          <span className="frk-cmd__kbd">ESC</span>
        </div>
        <div id={id} role="listbox" className="frk-cmd__list">
          {list.length ? (
            groups.map(function (g?: any): any {
              return (
                <div key={g} role="group" aria-label={g || undefined}>
                  {g ? <div className="frk-cmd__group">{g}</div> : null}
                  {list
                    .filter(function (c?: any): any {
                      return (c.group || "") === g
                    })
                    .map(function (c?: any): any {
                      idx = list.indexOf(c)
                      var i: any = idx
                      return (
                        <div
                          key={c.id}
                          id={id + "-" + i}
                          role="option"
                          aria-selected={i === act}
                          className={cx("frk-cmd__item", i === act && "is-active")}
                          onPointerEnter={function (): any {
                            setAct(i)
                          }}
                          onClick={function (): any {
                            run(c)
                          }}
                        >
                          <Icon name={c.icon || "dots"} size={18} />
                          <span>{c.label}</span>
                          {c.shortcut ? <span className="frk-cmd__kbd">{c.shortcut}</span> : null}
                        </div>
                      )
                    })}
                </div>
              )
            })
          ) : (
            <div className="frk-cmd__empty">{"Nada con «" + query + "»"}</div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ---------- Notch: isla de IA en la parte superior ---------- */
