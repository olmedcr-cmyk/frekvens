"use client"
/* Frekvens · Pager — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { clamp, cx, reduced } from "./lib"

import type { PagerProps } from "./types"
export type { PagerProps }

const R: any = React
const { useRef, useState }: any = React

/* ---------- Pager: carrusel con botones de scroll y puntos ---------- */
export function Pager(props: PagerProps): React.ReactElement
export function Pager(p?: any): any {
  var kids: any = R.Children.toArray(p.children),
    track: any = useRef(null)
  var s: any = useState(0),
    idx: any = s[0],
    setIdx: any = s[1]
  function onScroll(): any {
    var el: any = track.current
    if (!el || !el.firstChild) return
    var w: any = el.firstChild.offsetWidth + (p.gap || 8)
    setIdx(clamp(Math.round(el.scrollLeft / w), 0, kids.length - 1))
  }
  function go(i?: any): any {
    var el: any = track.current
    if (!el) return
    i = clamp(i, 0, kids.length - 1)
    var c: any = el.children[i]
    c &&
      el.scrollTo({
        left: c.offsetLeft - el.offsetLeft,
        behavior: reduced() ? "auto" : "smooth",
      })
  }
  return (
    <div
      className={cx("frk-pager", p.className)}
      role="region"
      aria-roledescription="carrusel"
      aria-label={p.label}
    >
      <div
        ref={track}
        className="frk-pager__track"
        style={{
          gap: p.gap || 8,
        }}
        onScroll={onScroll}
        tabIndex={0}
        onKeyDown={function (e?: any): any {
          if (e.key === "ArrowRight") {
            e.preventDefault()
            go(idx + 1)
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault()
            go(idx - 1)
          }
        }}
      >
        {kids.map(function (k?: any, i?: any): any {
          return (
            <div
              key={i}
              className="frk-pager__slide"
              style={{
                flexBasis: p.itemWidth || "85%",
              }}
              aria-roledescription="diapositiva"
              aria-label={i + 1 + " de " + kids.length}
            >
              {k}
            </div>
          )
        })}
      </div>
      <div className="frk-pager__bar">
        <div className="frk-pager__dots" aria-hidden={true}>
          {kids.map(function (_?: any, i?: any): any {
            return <span key={i} className={cx(i === idx && "is-on")} />
          })}
        </div>
        <div className="frk-pager__btns">
          <button
            type="button"
            className="frk-key frk-tone--well frk-key--s frk-key--round"
            aria-label="Anterior"
            disabled={idx === 0}
            onClick={function (): any {
              go(idx - 1)
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
            disabled={idx === kids.length - 1}
            onClick={function (): any {
              go(idx + 1)
            }}
          >
            <span className="frk-key__main">
              <Icon name="arrow-right" size={20} />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---------- Wheel: rueda selectora con scroll-snap ---------- */
