"use client"
/* Frekvens · NoteEditor — MIT © Cris Olmedo */

import * as React from "react"
import { AudioTrack } from "./audio-track"
import { Icon } from "./icon"
import { StateMark } from "./state-mark"
import { BLOCKS, cx } from "./lib"

import type { NoteEditorProps } from "./types"
export type { NoteEditorProps }

const { useState, useRef, useEffect }: any = React

export function NoteEditor(props: NoteEditorProps): React.ReactElement
export function NoteEditor(p?: any): any {
  var b: any = useState(
      (
        p.defaultBlocks || [
          {
            type: "p",
            text: "",
          },
        ]
      ).map(function (x?: any, i?: any): any {
        return Object.assign(
          {
            id: "b" + i,
          },
          x,
        )
      }),
    ),
    blocks: any = b[0],
    setBlocks: any = b[1]
  var sl: any = useState(null),
    slash: any = sl[0],
    setSlash: any = sl[1],
    seq: any = useRef(blocks.length),
    refs: any = useRef({})
  var want: any = useRef(null)
  useEffect(function (): any {
    if (!want.current) return
    var w: any = want.current,
      el: any = refs.current[w.id]
    if (el) {
      el.focus()
      if (w.end && el.setSelectionRange) el.setSelectionRange(el.value.length, el.value.length)
      want.current = null
    }
  })
  function upd(n?: any): any {
    setBlocks(n)
    p.onChange && p.onChange(n)
  }
  function focus(id?: any, end?: any): any {
    want.current = {
      id: id,
      end: end,
    }
    var el: any = refs.current[id]
    if (el) {
      el.focus()
      if (end && el.setSelectionRange) el.setSelectionRange(el.value.length, el.value.length)
      want.current = null
    }
  }
  function set(i?: any, patch?: any): any {
    var n: any = blocks.slice()
    n[i] = Object.assign({}, n[i], patch)
    upd(n)
  }
  function key(e?: any, i?: any): any {
    var bl: any = blocks[i]
    if (e.key === "Enter" && !e.shiftKey && !slash) {
      e.preventDefault()
      var id: any = "b" + seq.current++,
        n: any = blocks.slice()
      n.splice(i + 1, 0, {
        id: id,
        type: bl.type === "todo" ? "todo" : "p",
        text: "",
      })
      upd(n)
      focus(id)
    } else if (e.key === "Backspace" && !bl.text && blocks.length > 1) {
      e.preventDefault()
      var prev: any = blocks[i - 1]
      upd(
        blocks.filter(function (_?: any, j?: any): any {
          return j !== i
        }),
      )
      prev && focus(prev.id, true)
    } else if (e.key === "ArrowUp" && blocks[i - 1] && !slash) {
      focus(blocks[i - 1].id, true)
    } else if (e.key === "ArrowDown" && blocks[i + 1] && !slash) {
      focus(blocks[i + 1].id)
    } else if (slash && slash.i === i) {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSlash({
          i: i,
          a: (slash.a + 1) % BLOCKS.length,
        })
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSlash({
          i: i,
          a: (slash.a - 1 + BLOCKS.length) % BLOCKS.length,
        })
      } else if (e.key === "Enter") {
        e.preventDefault()
        set(i, {
          type: BLOCKS[slash.a].type,
          text: "",
        })
        setSlash(null)
      } else if (e.key === "Escape") setSlash(null)
    }
  }
  return (
    <div className={cx("frk-note", p.className)}>
      {p.title != null ? (
        <input
          className="frk-note__title"
          aria-label="Título de la nota"
          defaultValue={p.title}
          placeholder="Sin título"
        />
      ) : null}
      {p.meta ? <div className="frk-note__meta">{p.meta}</div> : null}
      {blocks.map(function (bl?: any, i?: any): any {
        var common: any = {
          ref: function (el?: any): any {
            refs.current[bl.id] = el
          },
          value: bl.text || "",
          rows: 1,
          "aria-label": (
            BLOCKS.filter(function (x?: any): any {
              return x.type === bl.type
            })[0] || BLOCKS[0]
          ).label,
          placeholder:
            i === blocks.length - 1 && !bl.text ? p.placeholder || "Escribe, o / para insertar" : "",
          onChange: function (e?: any): any {
            var t: any = e.target.value
            set(i, {
              text: t,
            })
            setSlash(
              t === "/"
                ? {
                    i: i,
                    a: 0,
                  }
                : null,
            )
            e.target.style.height = "auto"
            e.target.style.height = e.target.scrollHeight + "px"
          },
          onKeyDown: function (e?: any): any {
            key(e, i)
          },
          className: "frk-note__input frk-note__input--" + bl.type,
        }
        return (
          <div key={bl.id} className={cx("frk-note__block", "is-" + bl.type, bl.done && "is-done")}>
            {bl.type === "todo" ? (
              <button
                type="button"
                role="checkbox"
                aria-checked={!!bl.done}
                aria-label="Hecha"
                className="frk-note__check"
                onClick={function (): any {
                  set(i, {
                    done: !bl.done,
                  })
                }}
              >
                <StateMark state={bl.done ? "full" : "empty"} size={20} label="" />
              </button>
            ) : null}
            {bl.type === "voice" ? (
              <AudioTrack
                title={bl.text || "Nota de voz"}
                duration={bl.duration || 24}
                seed={i + 2}
                speed={false}
                tone="well"
              />
            ) : (
              <textarea {...common} />
            )}
            {slash && slash.i === i ? (
              <div className="frk-pop frk-note__slash is-in" role="listbox" aria-label="Insertar bloque">
                {BLOCKS.map(function (x?: any, k?: any): any {
                  return (
                    <div
                      key={x.type}
                      role="option"
                      aria-selected={k === slash.a}
                      className={cx("frk-select__opt", k === slash.a && "is-active")}
                      onPointerDown={function (e?: any): any {
                        e.preventDefault()
                        set(i, {
                          type: x.type,
                          text: "",
                        })
                        setSlash(null)
                      }}
                    >
                      <Icon name={x.icon} size={18} />
                      <span>{x.label}</span>
                    </div>
                  )
                })}
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

/* ================= Frekvens 6: bloques SaaS + lenguaje generativo ================= */

/* ---------- Dialog: modal centrado ---------- */
