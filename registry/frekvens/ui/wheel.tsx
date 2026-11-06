"use client"
/* Frekvens · Wheel — MIT © Cris Olmedo */

import * as React from "react"
import { clamp, cx, norm, pad, range, reduced, useValue } from "./lib"

import type { WheelProps } from "./types"
export type { WheelProps }

const { useRef, useState, useEffect }: any = React

/* ---------- Wheel: rueda selectora con scroll-snap ---------- */
export function Wheel(props: WheelProps): React.ReactElement
export function Wheel(p?: any): any {
  var items: any = norm(
      p.items ||
        range(60).map(function (i?: any): any {
          return pad(i)
        }),
    ),
    row: any = p.rowHeight || 48,
    vis: any = p.visible || 5
  var st: any = useValue(p, items[0] && items[0].value),
    v: any = st[0],
    el: any = useRef(null),
    timer: any = useRef(null),
    live: any = useRef(false)
  var idx: any = 0
  items.forEach(function (x?: any, i?: any): any {
    if (x.value === v) idx = i
  })
  var sc: any = useState(idx * row),
    top: any = sc[0],
    setTop: any = sc[1]
  useEffect(
    function (): any {
      if (el.current && !live.current) {
        el.current.scrollTop = idx * row
        setTop(idx * row)
      }
    },
    [idx],
  )
  function onScroll(): any {
    live.current = true
    var t: any = el.current.scrollTop
    setTop(t)
    clearTimeout(timer.current)
    timer.current = setTimeout(function (): any {
      live.current = false
      var i: any = clamp(Math.round(t / row), 0, items.length - 1)
      if (items[i].value !== v) st[1](items[i].value)
    }, 90)
  }
  function key(e?: any): any {
    var d: any =
      e.key === "ArrowDown"
        ? 1
        : e.key === "ArrowUp"
          ? -1
          : e.key === "PageDown"
            ? 5
            : e.key === "PageUp"
              ? -5
              : 0
    if (!d) return
    e.preventDefault()
    var i: any = clamp(idx + d, 0, items.length - 1)
    st[1](items[i].value)
    el.current.scrollTo({
      top: i * row,
      behavior: reduced() ? "auto" : "smooth",
    })
  }
  var padH: any = ((vis - 1) / 2) * row
  return (
    <div
      className={cx("frk-wheel", p.className)}
      style={{
        height: vis * row,
        width: p.width,
      }}
    >
      <div
        className="frk-wheel__window"
        style={{
          top: padH,
          height: row,
        }}
        aria-hidden={true}
      />
      <div
        ref={el}
        className="frk-wheel__scroll"
        onScroll={onScroll}
        onKeyDown={key}
        tabIndex={0}
        role="spinbutton"
        aria-label={p.label}
        aria-valuenow={idx}
        aria-valuetext={items[idx] && String(items[idx].label)}
        aria-valuemin={0}
        aria-valuemax={items.length - 1}
        style={{
          scrollPaddingTop: padH,
        }}
      >
        <div
          style={{
            height: padH,
          }}
        />
        {items.map(function (x?: any, i?: any): any {
          var d: any = Math.abs(i * row - top) / row,
            o: any = clamp(1 - d * 0.28, 0.15, 1),
            s: any = clamp(1 - d * 0.12, 0.6, 1)
          return (
            <div
              key={x.value}
              className={cx("frk-wheel__item", i === idx && "is-on")}
              style={{
                height: row,
                opacity: o,
                transform: "scale(" + s + ")",
              }}
              onClick={function (): any {
                el.current.scrollTo({
                  top: i * row,
                  behavior: "smooth",
                })
              }}
            >
              {x.label}
            </div>
          )
        })}
        <div
          style={{
            height: padH,
          }}
        />
      </div>
      {p.unit ? (
        <span
          className="frk-wheel__unit"
          style={{
            top: padH,
          }}
          aria-hidden={true}
        >
          {p.unit}
        </span>
      ) : null}
    </div>
  )
}

/* ---------- VolumeWheel: rueda lateral estriada (tipo Rabbit) ---------- */
