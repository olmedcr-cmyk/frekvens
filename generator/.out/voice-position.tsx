"use client"
/* Frekvens · VoicePosition — MIT © Cris Olmedo */

import * as React from "react"
import { LED } from "./led"
import { VDEMO, VSIDES, VSTATE, clamp, cx, range, reduced } from "./lib"

import type { VoicePositionProps } from "./types"
export type { VoicePositionProps }

const { useState, useEffect }: any = React

export function VoicePosition(props: VoicePositionProps): React.ReactElement
export function VoicePosition(p?: any): any {
  var ds: any = useState(0),
    step: any = ds[0],
    setStep: any = ds[1],
    ts: any = useState(0),
    t: any = ts[0],
    setT: any = ts[1],
    rm: any = reduced()
  useEffect(
    function (): any {
      if (!p.demo) return
      var id: any = setTimeout(function (): any {
        setStep((step + 1) % VDEMO.length)
      }, VDEMO[step].ms)
      return function (): any {
        clearTimeout(id)
      }
    },
    [p.demo, step],
  )
  var d: any = p.demo
    ? VDEMO[step]
    : {
        state: p.state || (p.side || p.pan != null ? "listening" : "idle"),
        pan: p.pan,
        side: p.side,
        distance: p.distance || "near",
        pr: p.probabilities,
      }
  var side: any = d.side || (d.pan == null ? null : d.pan < -0.33 ? "left" : d.pan > 0.33 ? "right" : "ahead")
  var pan: any = d.pan != null ? clamp(d.pan, -1, 1) : side === "left" ? -0.8 : side === "right" ? 0.8 : 0,
    state: any = d.state,
    far: any = d.distance === "far"
  var pr: any =
    d.pr ||
    (side === "left"
      ? [0.8, 0.15, 0.05]
      : side === "right"
        ? [0.05, 0.15, 0.8]
        : side === "ahead"
          ? [0.1, 0.8, 0.1]
          : [0.34, 0.33, 0.33])
  var live: any = !rm && p.animate !== false
  useEffect(
    function (): any {
      if (!live) return
      var raf: any,
        t0: any = performance.now()
      function f(): any {
        setT((performance.now() - t0) / 1000)
        raf = requestAnimationFrame(f)
      }
      raf = requestAnimationFrame(f)
      return function (): any {
        cancelAnimationFrame(raf)
      }
    },
    [live],
  )
  var lvl: any =
    p.level != null
      ? clamp(p.level, 0, 1)
      : state === "idle"
        ? 0.05
        : state === "processing"
          ? 0.25
          : 0.45 + 0.35 * Math.abs(Math.sin(t * 5.3) * Math.sin(t * 2.1))
  var S: any = p.size || 220,
    W: any = Math.round(S * 1.6),
    c: any = S / 2 + 6,
    R: any = S * 0.3,
    N: any = 40,
    rings: any = p.rings || 3,
    hi: any = Math.floor(t * 18) % N
  var dots: any = []
  for (var k: any = 0; k < rings; k++) {
    var rr: any = R * (0.62 + 0.24 * k)
    for (var i: any = 0; i < N; i++) {
      var th: any = (i / N) * Math.PI * 2,
        wob: any = Math.sin(th * 3 + t * (state === "idle" ? 0.6 : 2.4) + k * 1.3)
      var lean: any = side ? 1 + 0.55 * pan * Math.cos(th) : 1 /* los puntos del lado de la voz crecen */
      var rad: any = rr * (1 + (lvl * 0.16 * wob * (k + 1)) / rings)
      var x: any = Math.cos(th) * rad,
        y: any = Math.sin(th) * rad,
        sz: any = Math.max(0.6, (1.5 + lvl * 2.2 * (0.5 + 0.5 * wob)) * lean * (1 - k * 0.12))
      dots.push(
        <circle
          key={k + "-" + i}
          cx={x.toFixed(1)}
          cy={y.toFixed(1)}
          r={sz.toFixed(2)}
          className={cx(
            "frk-vpos__dot",
            k === rings - 1 && "is-outer",
            state === "processing" &&
              k === rings - 1 &&
              (i === hi || i === (hi + 1) % N || i === (hi + 2) % N) &&
              "is-hi",
          )}
        />,
      )
    }
  }
  var label: any =
    state === "idle" || !side ? "Sin voz" : "Voz " + VSIDES[side] + ", " + (far ? "lejos" : "cerca")
  var cells: any = [
    ["left", "Izq."],
    ["ahead", "Delante"],
    ["right", "Der."],
  ]
  return (
    <div className={cx("frk-vpos", "frk-vpos--" + (p.tone || "klein"), "is-" + state, p.className)}>
      <div className="frk-vpos__stage">
        <svg
          viewBox={"0 0 " + W + " " + S}
          width="100%"
          role="img"
          aria-label={label + ". " + VSTATE[state] + "."}
        >
          <g
            className="frk-vpos__body"
            style={{
              transform:
                "translate(" +
                (W / 2 + (state === "idle" ? 0 : pan * W * 0.26)) +
                "px," +
                (c - 6) +
                "px) scale(" +
                (far ? 0.66 : 1) +
                ")",
            }}
          >
            {dots}
            <circle cx={0} cy={0} r={R * 0.34} className="frk-vpos__core" />
          </g>
        </svg>
      </div>
      <div className="frk-vpos__read">
        {cells.map(function (q?: any, i?: any): any {
          var on: any = side === q[0] && state !== "idle",
            f: any = Math.round(pr[i] * 5)
          return (
            <div key={q[0]} className={cx("frk-vpos__cell", on && "is-on")}>
              <span className="frk-vpos__bars" aria-hidden={true}>
                {range(5).map(function (j?: any): any {
                  return <span key={j} className={cx(j < f && "is-on")} />
                })}
              </span>
              <span className="frk-vpos__lbl">{q[1]}</span>
              <span className="frk-vpos__pct">{Math.round(pr[i] * 100) + "%"}</span>
            </div>
          )
        })}
        <div className={cx("frk-vpos__cell", "frk-vpos__dist", far && "is-far")}>
          <span className="frk-vpos__distmark" aria-hidden={true}>
            <span />
          </span>
          <span className="frk-vpos__lbl">Distancia</span>
          <span className="frk-vpos__pct">{far ? "Lejos" : "Cerca"}</span>
        </div>
      </div>
      <div className="frk-vpos__foot">
        <LED
          tone={state === "processing" ? "sol" : "klein"}
          on={state !== "idle"}
          blink={state === "processing"}
        >
          {VSTATE[state]}
        </LED>
        {p.caption ? <span className="frk-vpos__note">{p.caption}</span> : null}
      </div>
      <span className="frk-sr" aria-live="polite">
        {label}
      </span>
    </div>
  )
}

/* ---------- Beam: haz de puntos que recorre el borde mientras algo trabaja ---------- */
