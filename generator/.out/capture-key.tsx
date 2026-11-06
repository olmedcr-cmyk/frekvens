"use client"
/* Frekvens · CaptureKey — MIT © Cris Olmedo */

import * as React from "react"
import { VoiceOrb } from "./voice-orb"
import { cx, fmt, useClock } from "./lib"

import type { CaptureKeyProps } from "./types"
export type { CaptureKeyProps }

const { useState, useRef }: any = React

/* ---------- CaptureKey: tecla de captura (toca: foto · mantén: voz) ---------- */
export function CaptureKey(props: CaptureKeyProps): React.ReactElement
export function CaptureKey(p?: any): any {
  var s: any = useState("idle"),
    st: any = s[0],
    setSt: any = s[1],
    t: any = useRef(null),
    c: any = useClock(st === "voice")
  function down(): any {
    t.current = setTimeout(function (): any {
      setSt("voice")
      p.onVoiceStart && p.onVoiceStart()
    }, 350)
  }
  function up(): any {
    clearTimeout(t.current)
    if (st === "voice") {
      setSt("saved")
      p.onCapture &&
        p.onCapture({
          kind: "voice",
          ms: c[0],
        })
    } else if (st === "idle") {
      setSt("flash")
      p.onCapture &&
        p.onCapture({
          kind: "photo",
        })
      setTimeout(function (): any {
        setSt("saved")
      }, 260)
    }
    setTimeout(function (): any {
      setSt("idle")
      c[1]()
    }, 1600)
  }
  var label: any = (
    {
      idle: p.hint || "Toca: captura · Mantén: voz",
      flash: "Capturado",
      voice: "Escuchando · " + fmt(c[0]),
      saved: "Guardado en tu espacio",
    } as any
  )[st]
  return (
    <div className={cx("frk-capture", "is-" + st, p.className)}>
      <button
        type="button"
        className="frk-capture__key"
        aria-label={p.label || "Capturar"}
        onPointerDown={down}
        onPointerUp={up}
        onPointerLeave={function (): any {
          if (st === "voice") up()
          else clearTimeout(t.current)
        }}
        onKeyDown={function (e?: any): any {
          if ((e.key === " " || e.key === "Enter") && !e.repeat) {
            e.preventDefault()
            down()
          }
        }}
        onKeyUp={function (e?: any): any {
          if (e.key === " " || e.key === "Enter") up()
        }}
      >
        {st === "voice" ? (
          <VoiceOrb state="listening" size={44} grid={7} tone="paper" caption={false} label="" />
        ) : (
          <span className="frk-capture__dot" />
        )}
      </button>
      <span className="frk-capture__label" aria-live="polite">
        {label}
      </span>
    </div>
  )
}

/* ---------- Viewfinder: cámara / escáner ---------- */
