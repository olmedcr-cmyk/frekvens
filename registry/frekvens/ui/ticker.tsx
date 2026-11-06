"use client"
/* Frekvens · Ticker — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { cx } from "./lib"

import type { TickerProps } from "./types"
export type { TickerProps }

const { useState }: any = React

/* ---------- Ticker: cinta que corre (con pausa) ---------- */
export function Ticker(props: TickerProps): React.ReactElement
export function Ticker(p?: any): any {
  var items: any = p.items || [],
    s: any = useState(false),
    paused: any = s[0],
    setPaused: any = s[1]
  var row: any = function (hidden?: any): any {
    return (
      <div className="frk-ticker__row" aria-hidden={hidden || undefined}>
        {items.map(function (it?: any, i?: any): any {
          var o: any =
              typeof it === "string"
                ? {
                    label: it,
                  }
                : it,
            up: any = o.delta != null && String(o.delta).charAt(0) !== "-"
          return (
            <span key={i} className="frk-ticker__item">
              <span className="frk-ticker__label">{o.label}</span>
              {o.value != null ? <span className="frk-ticker__value">{o.value}</span> : null}
              {o.delta != null ? (
                <span className={cx("frk-ticker__delta", up ? "is-up" : "is-down")}>
                  {(up ? "▲ " : "▼ ") + String(o.delta).replace("-", "")}
                </span>
              ) : null}
              <span className="frk-ticker__sep" aria-hidden={true}>
                ●
              </span>
            </span>
          )
        })}
      </div>
    )
  }
  return (
    <div
      className={cx("frk-ticker", "frk-tone--" + (p.tone || "ink"), paused && "is-paused", p.className)}
      role="region"
      aria-label={p.label || "Cinta de noticias"}
    >
      <div className="frk-ticker__viewport">
        <div
          className="frk-ticker__track"
          style={{
            animationDuration: (p.speed || 30) + "s",
          }}
        >
          {row(false)}
          {row(true)}
        </div>
      </div>
      <button
        type="button"
        className="frk-ticker__pause"
        aria-label={paused ? "Reanudar cinta" : "Pausar cinta"}
        aria-pressed={paused}
        onClick={function (): any {
          setPaused(!paused)
        }}
      >
        <Icon name={paused ? "play" : "pause"} size={16} />
      </button>
    </div>
  )
}

/* ---------- SplitFlap: panel de paletas ---------- */
