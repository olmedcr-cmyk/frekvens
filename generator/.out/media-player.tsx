"use client"
/* Frekvens · MediaPlayer — MIT © Cris Olmedo */

import * as React from "react"
import { Chip } from "./chip"
import { DotMatrix } from "./dot-matrix"
import { Icon } from "./icon"
import { Scrub, cx, fmtS, useMedia } from "./lib"

import type { MediaPlayerProps } from "./types"
export type { MediaPlayerProps }

const { useRef, useState, useEffect }: any = React

/* ---------- MediaPlayer: vídeo ---------- */
export function MediaPlayer(props: MediaPlayerProps): React.ReactElement
export function MediaPlayer(p?: any): any {
  var ref: any = useRef(null),
    box: any = useRef(null),
    m: any = useMedia(p, ref)
  var cc: any = useState(!!p.captionsOn),
    ccOn: any = cc[0]
  useEffect(
    function (): any {
      var v: any = ref.current
      if (v && v.textTracks && v.textTracks[0]) v.textTracks[0].mode = ccOn ? "showing" : "hidden"
    },
    [ccOn],
  )
  function key(e?: any): any {
    if (e.target !== box.current) return
    var k: any = e.key.toLowerCase()
    if (k === " " || k === "k") {
      e.preventDefault()
      m.toggle()
    } else if (k === "arrowright") {
      e.preventDefault()
      m.seek(m.t + 5)
    } else if (k === "arrowleft") {
      e.preventDefault()
      m.seek(m.t - 5)
    } else if (k === "m") m.mute()
    else if (k === "f") full()
    else if (k === "c") cc[1](!ccOn)
  }
  function full(): any {
    var el: any = box.current
    if (!document.fullscreenElement && el.requestFullscreen) el.requestFullscreen()
    else if (document.exitFullscreen) document.exitFullscreen()
  }
  return (
    <div
      ref={box}
      className={cx("frk-media", m.playing && "is-playing", p.className)}
      tabIndex={0}
      role="group"
      aria-roledescription="reproductor de vídeo"
      aria-label={p.title || "Vídeo"}
      onKeyDown={key}
      style={{
        aspectRatio: p.ratio || "16 / 9",
      }}
    >
      {p.src ? (
        <video
          ref={ref}
          src={p.src}
          poster={p.poster}
          playsInline={true}
          loop={p.loop}
          muted={p.muted}
          autoPlay={p.autoPlay}
          className="frk-media__video"
          onClick={m.toggle}
        >
          {p.captions ? (
            <track
              kind="captions"
              src={p.captions}
              srcLang={p.captionsLang || "es"}
              label="Español"
              default={!!p.captionsOn}
            />
          ) : null}
        </video>
      ) : (
        <div className="frk-media__video frk-media__sim" onClick={m.toggle}>
          {p.children || (
            <DotMatrix
              shape="disc"
              grid={13}
              dot={10}
              pitch={16}
              tone="paper"
              showOff={true}
              label="Vista previa"
            />
          )}
        </div>
      )}
      <div className="frk-media__top">
        {p.title ? <span className="frk-media__title">{p.title}</span> : null}
        {p.badge ? <Chip tone="sol">{p.badge}</Chip> : null}
      </div>
      {!m.playing ? (
        <button
          type="button"
          className="frk-key frk-tone--rams frk-key--l frk-key--round frk-media__big"
          aria-label="Reproducir"
          onClick={m.toggle}
        >
          <span className="frk-key__main">
            <Icon name="play" size={40} />
          </span>
        </button>
      ) : null}
      <div className="frk-media__bar">
        <button
          type="button"
          className="frk-media__btn"
          aria-label={m.playing ? "Pausa" : "Reproducir"}
          onClick={m.toggle}
        >
          <Icon name={m.playing ? "pause" : "play"} size={22} />
        </button>
        <Scrub t={m.t} d={m.d} onSeek={m.seek} marks={p.chapters} label="Posición del vídeo" />
        <span className="frk-media__time">{fmtS(m.t) + " / " + fmtS(m.d)}</span>
        <button
          type="button"
          className="frk-media__btn"
          aria-label={m.muted ? "Activar sonido" : "Silenciar"}
          aria-pressed={m.muted}
          onClick={m.mute}
        >
          <Icon name={m.muted ? "volume-off" : "volume"} size={22} />
        </button>
        {p.captions || !p.src ? (
          <button
            type="button"
            className={cx("frk-media__btn", "frk-media__cc", ccOn && "is-on")}
            aria-label="Subtítulos"
            aria-pressed={ccOn}
            onClick={function (): any {
              cc[1](!ccOn)
            }}
          >
            CC
          </button>
        ) : null}
        <button type="button" className="frk-media__btn" aria-label="Pantalla completa" onClick={full}>
          <Icon name="expand" size={22} />
        </button>
      </div>
    </div>
  )
}

/* ---------- AudioTrack: onda de barras ---------- */
