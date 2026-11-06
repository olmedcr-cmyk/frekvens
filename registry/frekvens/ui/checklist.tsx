"use client"
/* Frekvens · Checklist — MIT © Cris Olmedo */

import * as React from "react"
import { DotGrid } from "./dot-grid"
import { Icon } from "./icon"
import { KeyButton } from "./key-button"
import { StateMark } from "./state-mark"
import { cx } from "./lib"

import type { ChecklistProps } from "./types"
export type { ChecklistProps }

const { useState }: any = React

/* ---------- Checklist: puesta en marcha ---------- */
export function Checklist(props: ChecklistProps): React.ReactElement
export function Checklist(p?: any): any {
  var items: any = p.items || [],
    s: any = useState(
      items.map(function (x?: any): any {
        return !!x.done
      }),
    ),
    done: any = s[0],
    setDone: any = s[1],
    o: any = useState(p.defaultOpen != null ? p.defaultOpen : done.indexOf(false)),
    open: any = o[0]
  var n: any = done.filter(Boolean).length
  return (
    <div className={cx("frk-checklist", p.className)}>
      <div className="frk-checklist__head">
        <span className="frk-checklist__title">{p.title || "Primeros pasos"}</span>
        <span className="frk-checklist__count">{n + " / " + items.length}</span>
      </div>
      <DotGrid
        total={items.length}
        filled={n}
        columns={items.length}
        size={12}
        gap={4}
        tone="ink"
        label={n + " de " + items.length + " completados"}
      />
      <ul>
        {items.map(function (it?: any, i?: any): any {
          var on: any = done[i],
            isOpen: any = open === i
          return (
            <li key={i} className={cx("frk-ck", on && "is-done", isOpen && "is-open")}>
              <button
                type="button"
                className="frk-ck__head"
                aria-expanded={isOpen}
                onClick={function (): any {
                  o[1](isOpen ? -1 : i)
                }}
              >
                <StateMark
                  state={on ? "full" : isOpen ? "partial" : "empty"}
                  size={22}
                  label={on ? "Hecho" : "Pendiente"}
                />
                <span className="frk-ck__title">{it.title}</span>
                <Icon name="chevron-down" size={18} className="frk-ck__chev" />
              </button>
              {isOpen ? (
                <div className="frk-ck__body">
                  {it.text ? <p>{it.text}</p> : null}
                  <KeyButton
                    tone={on ? "well" : "ink"}
                    shape="pill"
                    size="s"
                    onClick={function (): any {
                      var d: any = done.slice()
                      d[i] = !on
                      setDone(d)
                      if (!on) o[1](d.indexOf(false))
                      it.onAction && it.onAction()
                    }}
                  >
                    {on ? "Deshacer" : it.action || "Hecho"}
                  </KeyButton>
                </div>
              ) : null}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/* ---------- PromptBox: caja de prompt para IA ---------- */
