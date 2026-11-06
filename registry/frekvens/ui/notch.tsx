"use client"
/* Frekvens · Notch — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { VoiceOrb } from "./voice-orb"
import { clamp, cx } from "./lib"

import type { NotchProps } from "./types"
export type { NotchProps }

const { useState }: any = React

/* ---------- Notch: isla de IA en la parte superior ---------- */
export function Notch(props: NotchProps): React.ReactElement
export function Notch(p?: any): any {
  var x: any = useState(!!p.defaultExpanded),
    pinned: any = x[0],
    setPinned: any = x[1],
    hv: any = useState(false),
    hover: any = hv[0],
    setHover: any = hv[1]
  var state: any = p.state || "idle",
    exp: any = p.expanded != null ? p.expanded : pinned || hover,
    live: any = state !== "idle"
  var names: any = {
    idle: "Listo",
    listening: "Escuchando",
    thinking: "Pensando",
    speaking: "Hablando",
    done: "Hecho",
  }
  return (
    <div
      className={cx(
        "frk-notch",
        exp && "is-open",
        live && "is-live",
        p.inline && "frk-notch--inline",
        p.className,
      )}
      onPointerEnter={function (): any {
        setHover(true)
      }}
      onPointerLeave={function (): any {
        setHover(false)
      }}
    >
      <button
        type="button"
        className="frk-notch__pill"
        aria-expanded={exp}
        aria-label={(p.name || "Asistente") + ": " + names[state]}
        onClick={function (): any {
          setPinned(!pinned)
        }}
        onKeyDown={function (e?: any): any {
          if (e.key === "Escape") setPinned(false)
        }}
      >
        <VoiceOrb
          state={state === "done" ? "idle" : state}
          size={22}
          grid={5}
          tone={p.tone || "rams"}
          caption={false}
          label=""
        />
        <span className="frk-notch__peek">{p.peek || names[state]}</span>
        <span className={cx("frk-notch__led", "is-" + state)} />
      </button>
      <div className="frk-notch__body" aria-hidden={!exp}>
        <div className="frk-notch__row">
          <VoiceOrb
            state={state === "done" ? "idle" : state}
            size={64}
            grid={9}
            tone={p.tone || "rams"}
            caption={false}
            label={names[state]}
          />
          <div className="frk-notch__text">
            <span className="frk-notch__name">{(p.name || "Asistente") + " · " + names[state]}</span>
            <span className="frk-notch__line" aria-live="polite">
              {p.text}
            </span>
          </div>
        </div>
        {p.progress != null ? (
          <div className="frk-notch__prog">
            <span
              style={{
                width: clamp(p.progress, 0, 100) + "%",
              }}
            />
          </div>
        ) : null}
        {p.actions ? (
          <div className="frk-notch__actions">
            {p.actions.map(function (a?: any, i?: any): any {
              return (
                <button
                  key={i}
                  type="button"
                  className={cx("frk-notch__act", i === 0 && "is-main")}
                  tabIndex={exp ? 0 : -1}
                  onClick={a.onClick}
                >
                  {a.icon ? <Icon name={a.icon} size={16} /> : null}
                  {a.label}
                </button>
              )
            })}
          </div>
        ) : null}
      </div>
    </div>
  )
}

/* ---------- Viewport3D: visor 3D en CSS, órbita con arrastre ---------- */
