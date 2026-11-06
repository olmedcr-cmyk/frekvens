"use client"
/* Frekvens · Slider — MIT © Cris Olmedo */

import * as React from "react"
import { cx, useValue } from "./lib"

import type { SliderProps } from "./types"
export type { SliderProps }

/* ---------- Slider: track + rams dot ---------- */
export function Slider(props: SliderProps): React.ReactElement
export function Slider(p?: any): any {
  var min: any = p.min || 0,
    max: any = p.max == null ? 100 : p.max,
    step: any = p.step || 1,
    stops: any = p.stops
  var st: any = useValue(p, min),
    v: any = st[0],
    pct: any = ((v - min) / (max - min || 1)) * 100
  return (
    <div className={cx("frk-slider", p.className)}>
      {p.label ? <div className="frk-slider__label">{p.label}</div> : null}
      <div className="frk-slider__track">
        <span className="frk-slider__end frk-slider__end--a" />
        <span className="frk-slider__end frk-slider__end--b" />
        <span
          className="frk-slider__thumb"
          style={{
            left: "calc(16px + (100% - 32px) * " + pct / 100 + ")",
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={v}
          aria-label={p.label || "Valor"}
          aria-valuetext={p.format ? p.format(v) : undefined}
          onChange={function (e?: any): any {
            st[1](Number(e.target.value))
          }}
        />
      </div>
      {stops ? (
        <div className="frk-slider__stops">
          {stops.map(function (s?: any, i?: any): any {
            return <span key={i}>{s}</span>
          })}
        </div>
      ) : null}
    </div>
  )
}

/* ---------- Switch ---------- */
/* ---------- useFollow: muelle que se pega a un rectángulo y conserva el impulso al cambiar de destino
   (de Follow, stageshow/benjitaylor: k 0.25, amortiguación 2·√k·0.95, paso fijo de 60 Hz). Una transición CSS
   vuelve a arrancar desde parado en cada cambio; esto reengancha desde la posición y velocidad actuales. ---------- */
