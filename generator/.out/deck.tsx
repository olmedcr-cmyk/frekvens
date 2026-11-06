"use client"
/* Frekvens · Deck — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { cx, pad, range, reduced } from "./lib"

import type { DeckProps } from "./types"
export type { DeckProps }

const R: any = React
const { useState, useRef }: any = React

/* ---------- Deck: carrusel de cartas apiladas, se lanza deslizando ---------- */
export function Deck(props: DeckProps): React.ReactElement
export function Deck(p?: any): any {
  var kids: any = R.Children.toArray(p.children),
    n: any = kids.length
  var s: any = useState(0),
    top: any = s[0],
    setTop: any = s[1],
    d: any = useState(0),
    dx: any = d[0],
    setDx: any = d[1],
    fly: any = useState(0),
    out: any = fly[0],
    setOut: any = fly[1],
    drag: any = useRef(null)
  function go(dir?: any): any {
    if (out) return
    setOut(dir)
    setTimeout(
      function (): any {
        setOut(0)
        setDx(0)
        setTop((top + (dir > 0 ? 1 : n - 1)) % n)
        p.onChange && p.onChange((top + (dir > 0 ? 1 : n - 1)) % n)
      },
      reduced() ? 0 : 320,
    )
  }
  function up(): any {
    if (!drag.current) return
    drag.current = null
    if (Math.abs(dx) > 90) go(dx < 0 ? 1 : -1)
    else setDx(0)
  }
  return (
    <div
      className={cx("frk-deck", p.className)}
      role="region"
      aria-roledescription="carrusel"
      aria-label={p.label}
      tabIndex={0}
      onKeyDown={function (e?: any): any {
        if (e.key === "ArrowRight") {
          e.preventDefault()
          go(1)
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault()
          go(-1)
        }
      }}
    >
      <div
        className="frk-deck__stack"
        style={{
          height: p.height || 280,
        }}
      >
        {range(Math.min(3, n))
          .reverse()
          .map(function (k?: any): any {
            var i: any = (top + k) % n,
              isTop: any = k === 0
            var tf: any
            if (!isTop) tf = "translateY(" + k * 14 + "px) scale(" + (1 - k * 0.05) + ")"
            else if (out) tf = "translateX(" + out * -130 + "%) rotate(" + out * -12 + "deg)"
            else tf = "translateX(" + dx + "px) rotate(" + dx / 20 + "deg)"
            return (
              <div
                key={i}
                className={cx("frk-deck__card", isTop && "is-top", isTop && drag.current && "is-dragging")}
                style={{
                  transform: tf,
                  zIndex: 10 - k,
                }}
                aria-hidden={!isTop}
                aria-label={i + 1 + " de " + n}
                onPointerDown={
                  isTop
                    ? function (e?: any): any {
                        drag.current = {
                          x: e.clientX,
                        }
                        e.currentTarget.setPointerCapture(e.pointerId)
                      }
                    : undefined
                }
                onPointerMove={
                  isTop
                    ? function (e?: any): any {
                        if (drag.current) setDx(e.clientX - drag.current.x)
                      }
                    : undefined
                }
                onPointerUp={isTop ? up : undefined}
                onPointerCancel={isTop ? up : undefined}
              >
                {kids[i]}
              </div>
            )
          })}
      </div>
      <div className="frk-pager__bar">
        <span className="frk-deck__count">{pad(top + 1) + " / " + pad(n)}</span>
        <div className="frk-pager__btns">
          <button
            type="button"
            className="frk-key frk-tone--well frk-key--s frk-key--round"
            aria-label="Anterior"
            onClick={function (): any {
              go(-1)
            }}
          >
            <span className="frk-key__main">
              <Icon name="arrow-left" size={20} />
            </span>
          </button>
          <button
            type="button"
            className="frk-key frk-tone--ink frk-key--s frk-key--round"
            aria-label="Siguiente"
            onClick={function (): any {
              go(1)
            }}
          >
            <span className="frk-key__main">
              <Icon name="arrow-right" size={20} />
            </span>
          </button>
        </div>
      </div>
      <span className="frk-sr" aria-live="polite">
        {"Carta " + (top + 1) + " de " + n}
      </span>
    </div>
  )
}

/* ---------- AgentWidget: agente embebible (voz + chat) ---------- */
