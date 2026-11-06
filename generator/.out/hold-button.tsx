"use client"
/* Frekvens · HoldButton — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { clamp, cx } from "./lib"

import type { HoldButtonProps } from "./types"
export type { HoldButtonProps }

const { useState, useRef }: any = React

/* ---------- HoldButton: mantener para confirmar ---------- */
export function HoldButton(props: HoldButtonProps): React.ReactElement
export function HoldButton(p?: any): any {
  var ms: any = p.duration || 1200,
    s: any = useState(0),
    prog: any = s[0],
    setProg: any = s[1],
    raf: any = useRef(null),
    t0: any = useRef(0),
    done: any = useRef(false)
  function start(): any {
    if (p.disabled) return
    done.current = false
    t0.current = performance.now()
    cancelAnimationFrame(raf.current)
    ;(function tick(): any {
      var k: any = clamp((performance.now() - t0.current) / ms, 0, 1)
      setProg(k)
      if (k >= 1) {
        done.current = true
        p.onComplete && p.onComplete()
        setTimeout(function (): any {
          setProg(0)
        }, 600)
        return
      }
      raf.current = requestAnimationFrame(tick)
    })()
  }
  function stop(): any {
    cancelAnimationFrame(raf.current)
    if (!done.current) setProg(0)
  }
  var size: any = p.size || 120,
    w: any = 6,
    r: any = (size - w) / 2,
    C: any = 2 * Math.PI * r
  return (
    <button
      type="button"
      className={cx(
        "frk-hold",
        "frk-tone--" + (p.tone || "ink"),
        prog > 0 && "is-holding",
        prog >= 1 && "is-done",
        p.className,
      )}
      style={{
        width: size,
        height: size,
      }}
      disabled={p.disabled}
      aria-label={p.label || "Mantén para confirmar"}
      onPointerDown={start}
      onPointerUp={stop}
      onPointerLeave={stop}
      onPointerCancel={stop}
      onKeyDown={function (e?: any): any {
        if ((e.key === " " || e.key === "Enter") && !e.repeat) {
          e.preventDefault()
          start()
        }
      }}
      onKeyUp={function (e?: any): any {
        if (e.key === " " || e.key === "Enter") stop()
      }}
    >
      <svg width={size} height={size} aria-hidden={true}>
        <circle cx={size / 2} cy={size / 2} r={r} className="frk-hold__track" strokeWidth={w} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          className="frk-hold__fill"
          strokeWidth={w}
          strokeDasharray={C}
          strokeDashoffset={C * (1 - prog)}
          transform={"rotate(-90 " + size / 2 + " " + size / 2 + ")"}
        />
      </svg>
      <span className="frk-hold__main">
        <Icon name={prog >= 1 ? "check" : p.icon || "stop"} size={32} />
        <span className="frk-hold__text">{prog >= 1 ? p.doneLabel || "Hecho" : p.children || "Mantén"}</span>
      </span>
    </button>
  )
}

/* ---------- Rocker: interruptores basculantes con piloto ---------- */
