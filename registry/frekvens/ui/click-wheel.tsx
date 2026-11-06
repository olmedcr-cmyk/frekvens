"use client"
/* Frekvens · ClickWheel — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { cx } from "./lib"

import type { ClickWheelProps } from "./types"
export type { ClickWheelProps }

const { useRef, useState }: any = React

/* ---------- ClickWheel: rueda táctil tipo reproductor de bolsillo ---------- */
export function ClickWheel(props: ClickWheelProps): React.ReactElement
export function ClickWheel(p?: any): any {
  var size: any = p.size || 220,
    ref: any = useRef(null),
    last: any = useRef(null),
    acc: any = useRef(0)
  var s: any = useState(0),
    spin: any = s[0],
    setSpin: any = s[1]
  function ang(e?: any): any {
    var r: any = ref.current.getBoundingClientRect()
    return (
      (Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180) / Math.PI
    )
  }
  function step(d?: any): any {
    p.onStep && p.onStep(d)
    setSpin(function (x?: any): any {
      return x + d * 15
    })
    if (navigator.vibrate)
      try {
        navigator.vibrate(4)
      } catch (e) {}
  }
  function down(e?: any): any {
    last.current = ang(e)
    acc.current = 0
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  function mv(e?: any): any {
    if (last.current == null) return
    var a: any = ang(e),
      d: any = a - last.current
    if (d > 180) d -= 360
    if (d < -180) d += 360
    last.current = a
    acc.current += d
    while (Math.abs(acc.current) >= (p.detent || 24)) {
      var dir: any = acc.current > 0 ? 1 : -1
      step(dir)
      acc.current -= dir * (p.detent || 24)
    }
  }
  function key(e?: any): any {
    var m: any = (
      {
        ArrowDown: 1,
        ArrowRight: 1,
        ArrowUp: -1,
        ArrowLeft: -1,
      } as any
    )[e.key]
    if (m) {
      e.preventDefault()
      step(m)
    } else if (e.key === "Enter") {
      e.preventDefault()
      p.onSelect && p.onSelect()
    } else if (e.key === " ") {
      e.preventDefault()
      p.onPlay && p.onPlay()
    } else if (e.key === "m" || e.key === "M") {
      p.onMenu && p.onMenu()
    }
  }
  var lb: any = p.labels || {}
  function btn(pos?: any, label?: any, icon?: any, fn?: any): any {
    return (
      <button
        type="button"
        className={"frk-wheelpad__btn frk-wheelpad__btn--" + pos}
        aria-label={label}
        tabIndex={-1}
        onClick={fn}
      >
        {icon ? <Icon name={icon} size={18} /> : <span>{label}</span>}
      </button>
    )
  }
  return (
    <div
      ref={ref}
      className={cx("frk-wheelpad", "frk-tone--" + (p.tone || "surface"), p.className)}
      style={{
        width: size,
        height: size,
      }}
    >
      <div
        className="frk-wheelpad__ring"
        role="slider"
        tabIndex={0}
        aria-label={
          (p.label || "Rueda") +
          ". Flechas para girar, Enter para elegir, Espacio para reproducir, M para menú"
        }
        aria-valuetext={p.valueText}
        aria-orientation="vertical"
        onPointerDown={down}
        onPointerMove={mv}
        onPointerUp={function (): any {
          last.current = null
        }}
        onKeyDown={key}
      />
      <span
        className="frk-wheelpad__ticks"
        style={{
          transform: "rotate(" + spin + "deg)",
        }}
        aria-hidden={true}
      />
      {btn("top", lb.top || "MENÚ", null, p.onMenu)}
      {btn("right", "Siguiente", "arrow-right", function (): any {
        step(1)
      })}
      {btn("left", "Anterior", "arrow-left", function (): any {
        step(-1)
      })}
      {btn("bottom", p.playing ? "Pausa" : "Reproducir", p.playing ? "pause" : "play", p.onPlay)}
      <button
        type="button"
        className="frk-wheelpad__center"
        aria-label={p.centerLabel || "Elegir"}
        tabIndex={-1}
        onClick={p.onSelect}
      />
    </div>
  )
}

/* ---------- DiscCarousel: discos para elegir ---------- */
