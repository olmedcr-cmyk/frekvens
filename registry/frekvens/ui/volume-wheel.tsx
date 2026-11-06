"use client"
/* Frekvens · VolumeWheel — MIT © Cris Olmedo */

import * as React from "react"
import { clamp, cx, range, useValue } from "./lib"

import type { VolumeWheelProps } from "./types"
export type { VolumeWheelProps }

const { useRef, useEffect }: any = React

/* ---------- VolumeWheel: rueda lateral estriada (tipo Rabbit) ---------- */
export function VolumeWheel(props: VolumeWheelProps): React.ReactElement
export function VolumeWheel(p?: any): any {
  var step: any = p.step || 5,
    segs: any = p.segments || 16,
    H: any = p.height || 240
  var st: any = useValue(p, 50),
    v: any = st[0],
    drag: any = useRef(null)
  function set(n?: any): any {
    n = clamp(Math.round(n), 0, 100)
    if (n !== v) st[1](n)
  }
  function wheel(e?: any): any {
    e.preventDefault()
    set(v + (e.deltaY < 0 ? step : -step))
  }
  var ref: any = useRef(null)
  useEffect(function (): any {
    var n: any = ref.current
    if (!n) return
    n.addEventListener("wheel", wheel, {
      passive: false,
    })
    return function (): any {
      n.removeEventListener("wheel", wheel)
    }
  })
  function down(e?: any): any {
    drag.current = {
      y: e.clientY,
      v: v,
    }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  function mv(e?: any): any {
    if (drag.current) set(drag.current.v + (drag.current.y - e.clientY) / 2)
  }
  function key(e?: any): any {
    var k: any = e.key
    if (k === "ArrowUp" || k === "ArrowRight") {
      e.preventDefault()
      set(v + step)
    } else if (k === "ArrowDown" || k === "ArrowLeft") {
      e.preventDefault()
      set(v - step)
    } else if (k === "Home") set(0)
    else if (k === "End") set(100)
  }
  var on: any = Math.round((v / 100) * segs),
    shift: any = (v * 1.6) % 12
  return (
    <div
      className={cx("frk-volume", "frk-volume--" + (p.tone || "rams"), p.className)}
      style={{
        height: H,
      }}
    >
      <div className="frk-volume__level" aria-hidden={true}>
        {range(segs).map(function (i?: any): any {
          return <span key={i} className={cx(segs - 1 - i < on && "is-on")} />
        })}
      </div>
      <div
        ref={ref}
        className="frk-volume__wheel"
        role="slider"
        tabIndex={0}
        aria-orientation="vertical"
        aria-label={p.label || "Volumen"}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={v}
        aria-valuetext={v + "%"}
        onPointerDown={down}
        onPointerMove={mv}
        onPointerUp={function (): any {
          drag.current = null
        }}
        onPointerCancel={function (): any {
          drag.current = null
        }}
        onKeyDown={key}
      >
        <div
          className="frk-volume__ridges"
          style={{
            transform: "translateY(" + -shift + "px)",
          }}
        />
      </div>
      <div className="frk-volume__read">
        <span className="frk-volume__num">{v}</span>
        <span className="frk-volume__unit">{p.unitLabel || "VOL"}</span>
      </div>
    </div>
  )
}

/* ---------- HoldButton: mantener para confirmar ---------- */
