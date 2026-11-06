"use client"
/* Frekvens · AudioTrack — MIT © Cris Olmedo */

import * as React from "react"
import { Chip } from "./chip"
import { Icon } from "./icon"
import { clamp, cx, fmtS, seeded, useMedia } from "./lib"

import type { AudioTrackProps } from "./types"
export type { AudioTrackProps }

const { useRef }: any = React

export function AudioTrack(props: AudioTrackProps): React.ReactElement
export function AudioTrack(p?: any): any {
  var ref: any = useRef(null),
    m: any = useMedia(p, ref),
    peaks: any = p.peaks || seeded(p.bars || 56, p.seed),
    wave: any = useRef(null),
    drag: any = useRef(false)
  function at(e?: any): any {
    var r: any = wave.current.getBoundingClientRect()
    m.seek(clamp((e.clientX - r.left) / r.width, 0, 1) * m.d)
  }
  var pr: any = m.d ? m.t / m.d : 0
  return (
    <div
      className={cx(
        "frk-audio",
        "frk-tone--" + (p.tone || "surface"),
        m.playing && "is-playing",
        p.className,
      )}
    >
      {p.src ? <audio ref={ref} src={p.src} preload="metadata" /> : null}
      <button
        type="button"
        className="frk-key frk-tone--ink frk-key--s frk-key--round"
        aria-label={m.playing ? "Pausa" : "Reproducir " + (p.title || "")}
        onClick={m.toggle}
      >
        <span className="frk-key__main">
          <Icon name={m.playing ? "pause" : "play"} size={22} />
        </span>
      </button>
      <div className="frk-audio__main">
        <div className="frk-audio__head">
          <span className="frk-audio__title">{p.title}</span>
          <span className="frk-audio__time">{fmtS(m.t) + " · " + fmtS(m.d)}</span>
        </div>
        <div
          ref={wave}
          className="frk-audio__wave"
          role="slider"
          tabIndex={0}
          aria-label={"Posición de " + (p.title || "audio")}
          aria-valuemin={0}
          aria-valuemax={Math.round(m.d)}
          aria-valuenow={Math.round(m.t)}
          aria-valuetext={fmtS(m.t)}
          onPointerDown={function (e?: any): any {
            drag.current = true
            e.currentTarget.setPointerCapture(e.pointerId)
            at(e)
          }}
          onPointerMove={function (e?: any): any {
            if (drag.current) at(e)
          }}
          onPointerUp={function (): any {
            drag.current = false
          }}
          onKeyDown={function (e?: any): any {
            if (e.key === "ArrowRight") {
              e.preventDefault()
              m.seek(m.t + 5)
            }
            if (e.key === "ArrowLeft") {
              e.preventDefault()
              m.seek(m.t - 5)
            }
            if (e.key === " ") {
              e.preventDefault()
              m.toggle()
            }
          }}
        >
          {peaks.map(function (v?: any, i?: any): any {
            return (
              <span
                key={i}
                className={cx(i / peaks.length < pr && "is-on")}
                style={{
                  height: Math.round(v * 100) + "%",
                }}
              />
            )
          })}
        </div>
      </div>
      {p.speed !== false ? (
        <Chip tone="well" square={true}>
          {(p.rate || "1") + "×"}
        </Chip>
      ) : null}
    </div>
  )
}

/* ---------- Ticker: cinta que corre (con pausa) ---------- */
