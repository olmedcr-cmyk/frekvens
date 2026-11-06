"use client"
/* Frekvens · SlideToStart — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { clamp, cx } from "./lib"

import type { SlideToStartProps } from "./types"
export type { SlideToStartProps }

const { useRef, useState }: any = React

/* ---------- SlideToStart: deliberate start, drag or press ---------- */
export function SlideToStart(props: SlideToStartProps): React.ReactElement
export function SlideToStart(p?: any): any {
  var track: any = useRef(null),
    drag: any = useRef(null)
  var s: any = useState(0),
    x: any = s[0],
    setX: any = s[1]
  var d: any = useState(false),
    done: any = d[0],
    setDone: any = d[1]
  function max(): any {
    return track.current ? track.current.clientWidth - 64 - 8 : 200
  }
  function finish(): any {
    setX(max())
    setDone(true)
    p.onComplete && p.onComplete()
    if (p.resetAfter !== false)
      setTimeout(function (): any {
        setDone(false)
        setX(0)
      }, 1200)
  }
  function down(e?: any): any {
    if (done) return
    drag.current = {
      x: e.clientX - x,
    }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  function mv(e?: any): any {
    if (drag.current) setX(clamp(e.clientX - drag.current.x, 0, max()))
  }
  function up(): any {
    if (!drag.current) return
    drag.current = null
    if (x > max() * 0.82) finish()
    else setX(0)
  }
  return (
    <div
      ref={track}
      className={cx("frk-slide", "frk-tone--" + (p.tone || "surface"), done && "is-done", p.className)}
    >
      <span
        className="frk-slide__text"
        style={{
          opacity: 1 - (x / (max() || 1)) * 1.4,
        }}
      >
        {done ? p.doneLabel || "Vamos" : p.children || "Desliza para empezar"}
      </span>
      <button
        type="button"
        className={cx("frk-slide__knob", drag.current && "is-dragging")}
        style={{
          transform: "translateX(" + x + "px)",
        }}
        aria-label={p.label || "Empezar"}
        onPointerDown={down}
        onPointerMove={mv}
        onPointerUp={up}
        onPointerCancel={up}
        onKeyDown={function (e?: any): any {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            finish()
          }
        }}
      >
        <Icon name={done ? "check" : p.icon || "play"} size={24} />
      </button>
    </div>
  )
}

/* ---------- CardStack: overlapping coloured cards ---------- */
