"use client"
/* Frekvens · Pendulum — MIT © Cris Olmedo */

import * as React from "react"
import { Stepper } from "./stepper"
import { roundKey } from "./stopwatch"
import { cx, range, useValue } from "./lib"

import type { PendulumProps } from "./types"
export type { PendulumProps }

const { useState, useEffect }: any = React

/* ---------- Pendulum: metrónomo ---------- */
export function Pendulum(props: PendulumProps): React.ReactElement
export function Pendulum(p?: any): any {
  var st: any = useValue(
      {
        value: p.bpm,
        defaultValue: p.defaultBpm || 90,
        onChange: p.onBpmChange,
      },
      90,
    ),
    bpm: any = st[0]
  var r: any = useState(p.running != null ? p.running : true),
    run: any = p.running != null ? p.running : r[0]
  var b: any = useState(0),
    beat: any = b[0],
    setBeat: any = b[1],
    beats: any = p.beats || 4
  useEffect(
    function (): any {
      if (!run) return
      var i: any = 0
      setBeat(0)
      var t: any = setInterval(function (): any {
        i = (i + 1) % beats
        setBeat(i)
      }, 60000 / bpm)
      return function (): any {
        clearInterval(t)
      }
    },
    [run, bpm, beats],
  )
  var period: any = 120 / bpm
  return (
    <div className={cx("frk-pendulum", p.className)}>
      <div className="frk-pendulum__stage" aria-hidden={true}>
        <div
          className={cx("frk-pendulum__arm", run && "is-run")}
          style={{
            animationDuration: period + "s",
          }}
        >
          <span className="frk-pendulum__bob" />
        </div>
        <span className="frk-pendulum__pivot" />
      </div>
      <div className="frk-pendulum__beats" role="img" aria-label={"Compás " + beats + " tiempos"}>
        {range(beats).map(function (i?: any): any {
          return <span key={i} className={cx(i === beat && run && "is-on", i === 0 && "is-first")} />
        })}
      </div>
      <div className="frk-pendulum__ctrl">
        <Stepper
          label="BPM"
          value={bpm}
          min={30}
          max={220}
          step={p.step || 5}
          unit="bpm"
          onChange={function (v?: any): any {
            st[1](v)
          }}
        />
        {p.running == null
          ? roundKey(
              run ? "ink" : "rams",
              run ? "pause" : "play",
              run ? "Parar" : "Empezar",
              function (): any {
                r[1](!run)
              },
            )
          : null}
      </div>
    </div>
  )
}

/* ---------- Cabinet: archivero, cajones que se abren ---------- */
