"use client"
/* Frekvens · Ruler — MIT © Cris Olmedo */

import * as React from "react"
import { clamp, cx, useValue } from "./lib"

import type { RulerProps } from "./types"
export type { RulerProps }

const { useRef, useState }: any = React

/* ---------- Ruler: regla de sintonía; se arrastra la escala bajo una aguja fija ---------- */
export function Ruler(props: RulerProps): React.ReactElement
export function Ruler(p?: any): any {
  var min: any = p.min == null ? 0 : p.min,
    max: any = p.max == null ? 100 : p.max,
    step: any = p.step || 1,
    major: any = p.major || 10,
    pitch: any = p.pitch || 10
  var st: any = useValue(p, min),
    v: any = clamp(st[0], min, max),
    set: any = st[1]
  var drag: any = useRef(null),
    ds: any = useState(false),
    dragging: any = ds[0],
    setDragging: any = ds[1]
  var fmt: any =
    p.format ||
    function (n?: any): any {
      return String(n)
    }
  var count: any = Math.round((max - min) / step),
    idx: any = clamp(Math.round((v - min) / step), 0, count)
  function at(i?: any): any {
    return Math.round((min + i * step) * 1e6) / 1e6
  }
  function to(i?: any): any {
    var nv: any = at(clamp(i, 0, count))
    if (nv !== v) set(nv)
  }
  function onKey(e?: any): any {
    var k: any = e.key,
      d: any
    if (k === "ArrowRight" || k === "ArrowUp") d = 1
    else if (k === "ArrowLeft" || k === "ArrowDown") d = -1
    else if (k === "PageUp") d = major
    else if (k === "PageDown") d = -major
    else if (k === "Home") d = -count
    else if (k === "End") d = count
    else return
    e.preventDefault()
    to(idx + d)
  }
  function down(e?: any): any {
    drag.current = {
      x: e.clientX,
      i: idx,
    }
    setDragging(true)
    if (e.currentTarget.setPointerCapture) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId)
      } catch (err) {}
    }
  }
  function move(e?: any): any {
    if (drag.current) to(drag.current.i - Math.round((e.clientX - drag.current.x) / pitch))
  }
  function up(): any {
    drag.current = null
    setDragging(false)
  }
  var ticks: any = []
  for (var i: any = Math.max(0, idx - 60); i <= Math.min(count, idx + 60); i++) {
    var M: any = i % major === 0
    ticks.push(
      <span
        key={i}
        className={cx("frk-ruler__tick", M && "is-major")}
        style={{
          left: i * pitch + "px",
        }}
      >
        {M ? <span className="frk-ruler__num">{fmt(at(i))}</span> : null}
      </span>,
    )
  }
  return (
    <div
      className={cx("frk-ruler", "frk-ruler--" + (p.tone || "rams"), dragging && "is-dragging", p.className)}
    >
      <div className="frk-ruler__read">
        <span className="frk-ruler__value">{fmt(v)}</span>
        {p.unit ? <span className="frk-ruler__unit">{p.unit}</span> : null}
      </div>
      <div
        className="frk-ruler__window"
        role="slider"
        tabIndex={0}
        aria-label={p.label || "Regla"}
        aria-orientation="horizontal"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={v}
        aria-valuetext={fmt(v) + (p.unit ? " " + p.unit : "")}
        onKeyDown={onKey}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
      >
        <div className="frk-ruler__clip">
          <div
            className="frk-ruler__scale"
            style={{
              transform: "translateX(" + -idx * pitch + "px)",
            }}
          >
            {ticks}
          </div>
        </div>
        <span className="frk-ruler__needle" />
      </div>
    </div>
  )
}

/* ---------- Onboarding: bienvenida por pasos (arte + tarjeta de texto + guiones + tecla redonda) ---------- */
