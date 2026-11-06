"use client"
/* Frekvens · Recorder — MIT © Cris Olmedo */

import * as React from "react"
import { AudioTrack } from "./audio-track"
import { Keypad } from "./keypad"
import { LED } from "./led"
import { LevelBars } from "./level-bars"
import { cx, fmt, pad, useClock } from "./lib"

import type { RecorderProps } from "./types"
export type { RecorderProps }

const { useState, useRef, useEffect }: any = React

/* ---------- Recorder: grabadora ---------- */
export function Recorder(props: RecorderProps): React.ReactElement
export function Recorder(p?: any): any {
  var s: any = useState("idle"),
    state: any = s[0],
    setState: any = s[1],
    c: any = useClock(state === "rec"),
    lv: any = useState(0),
    level: any = lv[0],
    setLevel: any = lv[1]
  var tk: any = useState(p.takes || []),
    takes: any = tk[0],
    setTakes: any = tk[1],
    media: any = useRef(null)
  useEffect(
    function (): any {
      if (state !== "rec") return
      var raf: any,
        t0: any = performance.now(),
        an: any = media.current && media.current.analyser,
        buf: any = an ? new Uint8Array(an.fftSize) : null
      function tick(): any {
        if (an) {
          an.getByteTimeDomainData(buf)
          var m: any = 0
          for (var i: any = 0; i < buf.length; i++) m = Math.max(m, Math.abs(buf[i] - 128))
          setLevel(Math.min(100, m / 1.28))
        } else setLevel(35 + 30 * Math.abs(Math.sin((performance.now() - t0) / 230)) + 15 * Math.random())
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
      return function (): any {
        cancelAnimationFrame(raf)
      }
    },
    [state],
  )
  function start(): any {
    c[1]()
    if (p.real && navigator.mediaDevices && window.MediaRecorder) {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
        })
        .then(function (stream?: any): any {
          var rec: any = new MediaRecorder(stream),
            chunks: any = [],
            ctx: any = new (window.AudioContext || (window as any).webkitAudioContext)(),
            an: any = ctx.createAnalyser()
          ctx.createMediaStreamSource(stream).connect(an)
          rec.ondataavailable = function (e?: any): any {
            chunks.push(e.data)
          }
          rec.onstop = function (): any {
            var url: any = URL.createObjectURL(
              new Blob(chunks, {
                type: rec.mimeType,
              }),
            )
            stream.getTracks().forEach(function (t?: any): any {
              t.stop()
            })
            ctx.close()
            finish(url)
          }
          media.current = {
            rec: rec,
            analyser: an,
          }
          rec.start()
          setState("rec")
        })
        .catch(function (): any {
          media.current = null
          setState("rec")
        })
    } else {
      media.current = null
      setState("rec")
    }
  }
  var elapsed: any = useRef(0)
  elapsed.current = c[0]
  function finish(url?: any): any {
    var d: any = Math.round(elapsed.current / 1000),
      take: any = {
        title: "Nota " + pad(takes.length + 1),
        duration: Math.max(1, d),
        src: url,
        at: new Date().toTimeString().slice(0, 5),
      }
    setTakes(function (t?: any): any {
      return [take].concat(t)
    })
    p.onSave && p.onSave(take)
  }
  function stop(): any {
    setState("idle")
    setLevel(0)
    if (media.current && media.current.rec) media.current.rec.stop()
    else finish()
  }
  var rec: any = state === "rec"
  return (
    <div className={cx("frk-rec", rec && "is-rec", p.className)}>
      <div className="frk-rec__deck">
        <div className="frk-rec__reel" aria-hidden={true}>
          <span className="frk-rec__hub" />
          <span className="frk-rec__line" />
        </div>
        <div className="frk-rec__side">
          <span className="frk-rec__lcd">
            <LED tone="rec" on={rec} blink={rec}>
              {rec ? "REC" : "STBY"}
            </LED>
          </span>
          <span className="frk-rec__time" role="timer" aria-live="off">
            {fmt(c[0])}
          </span>
          <LevelBars value={rec ? level : 0} count={14} height={36} label="Nivel de entrada" />
        </div>
      </div>
      <Keypad
        label="Grabadora"
        height={96}
        keys={[
          rec
            ? {
                icon: "stop",
                ariaLabel: "Parar y guardar",
                tone: "ink",
                onClick: stop,
              }
            : {
                icon: "rec",
                ariaLabel: "Grabar",
                tone: "rec",
                onClick: start,
              },
          {
            label: "Marca",
            ariaLabel: "Añadir marca",
            onClick: function (): any {
              p.onMark && p.onMark(c[0])
            },
          },
          {
            label: p.real ? "Mic" : "Demo",
            ariaLabel: p.real ? "Micrófono real" : "Modo demostración",
          },
        ]}
      />
      {takes.length ? (
        <div className="frk-rec__takes">
          {takes.map(function (t?: any, i?: any): any {
            return (
              <AudioTrack
                key={i}
                title={t.title + " · " + t.at}
                src={t.src}
                duration={t.duration}
                seed={i + 3}
                tone="surface"
              />
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

/* ---------- CaptureKey: tecla de captura (toca: foto · mantén: voz) ---------- */
