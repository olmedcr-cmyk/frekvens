"use client"
/* Frekvens · Board — MIT © Cris Olmedo */

import * as React from "react"
import { Avatar } from "./avatar"
import { Chip } from "./chip"
import { Icon } from "./icon"
import { StateMark } from "./state-mark"
import { clamp, cx } from "./lib"

import type { BoardProps } from "./types"
export type { BoardProps }

const { useState, useRef, useId }: any = React

/* ---------- Board / Sortable: arrastrar y soltar (puntero + teclado) ---------- */
export function Board(props: BoardProps): React.ReactElement
export function Board(p?: any): any {
  var cs: any = useState(p.columns || []),
    cols: any = cs[0],
    setCols: any = cs[1]
  var dg: any = useState(null),
    drag: any = dg[0],
    setDrag: any = dg[1] /* {id, from, x, y, ox, oy, w, to:{col, idx}} */
  var kb: any = useState(null),
    held: any = kb[0],
    setHeld: any = kb[1] /* {id} picked with keyboard */
  var msg: any = useState(""),
    say: any = msg[1],
    root: any = useRef(null),
    hid: any = useId() + "-help"
  function commit(n?: any): any {
    setCols(n)
    p.onChange && p.onChange(n)
  }
  function locate(id?: any): any {
    for (var c: any = 0; c < cols.length; c++)
      for (var i: any = 0; i < cols[c].items.length; i++) if (cols[c].items[i].id === id) return [c, i]
    return null
  }
  function moveTo(id?: any, col?: any, idx?: any): any {
    var loc: any = locate(id)
    if (!loc) return
    var n: any = cols.map(function (c?: any): any {
      return Object.assign({}, c, {
        items: c.items.slice(),
      })
    })
    var it: any = n[loc[0]].items.splice(loc[1], 1)[0]
    if (loc[0] === col && idx > loc[1]) idx--
    n[col].items.splice(clamp(idx, 0, n[col].items.length), 0, it)
    commit(n)
    return it
  }
  function target(x?: any, y?: any): any {
    var el: any = document.elementFromPoint(x, y),
      colEl: any = el && el.closest("[data-col]")
    if (!colEl || !root.current.contains(colEl)) return null
    var c: any = +colEl.getAttribute("data-col"),
      cards: any = colEl.querySelectorAll("[data-card]:not(.is-ghost)"),
      idx: any = cards.length
    for (var i: any = 0; i < cards.length; i++) {
      var r: any = cards[i].getBoundingClientRect()
      if (y < r.top + r.height / 2) {
        idx = i
        break
      }
    }
    return {
      col: c,
      idx: idx,
    }
  }
  function down(e?: any, id?: any, c?: any): any {
    if (e.button !== 0) return
    var r: any = e.currentTarget.getBoundingClientRect()
    var st: any = {
      id: id,
      from: c,
      sx: e.clientX,
      sy: e.clientY,
      x: e.clientX,
      y: e.clientY,
      ox: e.clientX - r.left,
      oy: e.clientY - r.top,
      w: r.width,
      moved: false,
      to: null,
    }
    function mv(ev?: any): any {
      st.x = ev.clientX
      st.y = ev.clientY
      if (!st.moved && Math.hypot(st.x - st.sx, st.y - st.sy) > 5) st.moved = true
      if (st.moved) {
        st.to = target(st.x, st.y)
        setDrag(Object.assign({}, st))
      }
    }
    function up(): any {
      window.removeEventListener("pointermove", mv)
      window.removeEventListener("pointerup", up)
      if (st.moved && st.to) {
        var it: any = moveTo(st.id, st.to.col, st.to.idx)
        it && say(it.title + " movida a " + cols[st.to.col].title)
      }
      setDrag(null)
    }
    window.addEventListener("pointermove", mv)
    window.addEventListener("pointerup", up)
  }
  function key(e?: any, id?: any): any {
    var loc: any = locate(id)
    if (!loc) return
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault()
      if (held && held.id === id) {
        setHeld(null)
        say("Soltada en " + cols[loc[0]].title + ", posición " + (loc[1] + 1))
      } else {
        setHeld({
          id: id,
        })
        say("Cogida. Flechas para mover, Espacio para soltar, Esc para cancelar.")
      }
      return
    }
    if (e.key === "Escape" && held) {
      setHeld(null)
      say("Cancelado")
      return
    }
    if (!held || held.id !== id) return
    var d: any = (
      {
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
      } as any
    )[e.key]
    if (!d) return
    e.preventDefault()
    var c: any = clamp(loc[0] + d[0], 0, cols.length - 1),
      i: any = d[0] ? Math.min(loc[1], cols[c].items.length) : loc[1] + d[1] + (d[1] > 0 ? 1 : 0)
    moveTo(id, c, i)
    setTimeout(function (): any {
      var el: any = root.current.querySelector('[data-card="' + id + '"]')
      el && el.focus()
    }, 0)
    say(cols[c].title + ", posición " + (Math.max(0, i - (d[1] > 0 ? 1 : 0)) + 1))
  }
  var single: any = p.variant === "list"
  var ghostItem: any =
    drag &&
    (function (): any {
      var l: any = locate(drag.id)
      return l && cols[l[0]].items[l[1]]
    })()
  function card(it?: any, c?: any): any {
    var isDrag: any = drag && drag.id === it.id,
      isHeld: any = held && held.id === it.id
    return (
      <div
        key={it.id}
        data-card={it.id}
        tabIndex={0}
        role="button"
        aria-roledescription="elemento arrastrable"
        aria-pressed={isHeld}
        aria-describedby={hid}
        className={cx(
          "frk-card-dnd",
          isDrag && "is-ghost",
          isHeld && "is-held",
          it.tone && "frk-tone--" + it.tone,
        )}
        onPointerDown={function (e?: any): any {
          down(e, it.id, c)
        }}
        onKeyDown={function (e?: any): any {
          key(e, it.id)
        }}
      >
        <span className="frk-card-dnd__grip" aria-hidden={true}>
          <Icon name="dots" size={16} />
        </span>
        <span className="frk-card-dnd__body">
          <span className="frk-card-dnd__title">{it.title}</span>
          {it.meta ? <span className="frk-card-dnd__meta">{it.meta}</span> : null}
        </span>
        {it.tag ? <Chip tone={it.tagTone || "well"}>{it.tag}</Chip> : null}
        {it.avatar ? <Avatar name={it.avatar} size={28} /> : null}
      </div>
    )
  }
  return (
    <div
      ref={root}
      className={cx("frk-board", single && "frk-board--list", drag && "is-dragging", p.className)}
    >
      <span id={hid} className="frk-sr">
        Espacio para coger o soltar; flechas para mover; Esc para cancelar.
      </span>
      <span className="frk-sr" aria-live="assertive">
        {msg[0]}
      </span>
      {cols.map(function (col?: any, c?: any): any {
        var showDrop: any = drag && drag.to && drag.to.col === c
        var items: any = col.items.map(function (it?: any): any {
          return card(it, c)
        })
        if (showDrop)
          items.splice(drag.to.idx, 0, <div key="__drop" className="frk-dropline" aria-hidden={true} />)
        return (
          <section
            key={col.id}
            data-col={c}
            className={cx("frk-col", showDrop && "is-over")}
            aria-label={col.title}
          >
            {single ? null : (
              <header className="frk-col__head">
                <StateMark
                  state={
                    (
                      {
                        running: "partial",
                        done: "full",
                        partial: "partial",
                        full: "full",
                      } as any
                    )[col.state] || "empty"
                  }
                  size={16}
                  label=""
                />
                <span className="frk-col__title">{col.title}</span>
                <span className="frk-col__count">{col.items.length}</span>
              </header>
            )}
            <div className="frk-col__list">
              {items}
              {!col.items.length && !showDrop ? <div className="frk-col__empty">Suelta aquí</div> : null}
            </div>
          </section>
        )
      })}
      {drag && ghostItem ? (
        <div
          className="frk-card-dnd is-floating"
          aria-hidden={true}
          style={{
            width: drag.w,
            transform:
              "translate(" +
              (drag.x - drag.ox) +
              "px," +
              (drag.y - drag.oy) +
              "px) rotate(1.5deg) scale(1.03)",
          }}
        >
          <span className="frk-card-dnd__grip">
            <Icon name="dots" size={16} />
          </span>
          <span className="frk-card-dnd__body">
            <span className="frk-card-dnd__title">{ghostItem.title}</span>
          </span>
        </div>
      ) : null}
    </div>
  )
}
