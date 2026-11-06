"use client"
/* Frekvens · AgentWidget — MIT © Cris Olmedo */

import * as React from "react"
import { Avatar } from "./avatar"
import { Composer } from "./composer"
import { EmptyState } from "./empty-state"
import { Icon } from "./icon"
import { LED } from "./led"
import { Message } from "./message"
import { Segmented } from "./segmented"
import { VoiceOrb } from "./voice-orb"
import { cx, usePresence } from "./lib"

import type { AgentWidgetProps } from "./types"
export type { AgentWidgetProps }

const { useState, useRef, useEffect }: any = React

/* ---------- AgentWidget: agente embebible (voz + chat) ---------- */
export function AgentWidget(props: AgentWidgetProps): React.ReactElement
export function AgentWidget(p?: any): any {
  var o: any = useState(!!p.defaultOpen),
    open: any = o[0],
    setOpen: any = o[1]
  var st: any = useState(p.defaultState || "idle"),
    state: any = p.state || st[0],
    setState: any = st[1]
  var md: any = useState(p.mode || "voice"),
    mode: any = md[0]
  var ms: any = useState(p.messages || []),
    msgs: any = p.messages || ms[0]
  var pres: any = usePresence(open, 200),
    panel: any = useRef(null),
    launcher: any = useRef(null)
  useEffect(
    function (): any {
      if (!p.demo || state === "idle") return
      var next: any = (
        {
          listening: "thinking",
          thinking: "speaking",
          speaking: "listening",
        } as any
      )[state]
      var t: any = setTimeout(
        function (): any {
          setState(next)
        },
        state === "thinking" ? 1400 : 2600,
      )
      return function (): any {
        clearTimeout(t)
      }
    },
    [state, p.demo],
  )
  var live: any = state !== "idle"
  function talk(): any {
    var n: any = live ? "idle" : "listening"
    setState(n)
    p.onStart && !live && p.onStart()
    p.onEnd && live && p.onEnd()
  }
  function close(): any {
    setOpen(false)
    setTimeout(function (): any {
      launcher.current && launcher.current.focus()
    }, 0)
  }
  var names: any = {
    idle: "Disponible",
    listening: "Escuchando",
    thinking: "Pensando",
    speaking: "Hablando",
  }
  return (
    <div
      className={cx("frk-agent", p.inline && "frk-agent--inline", p.className)}
      onKeyDown={function (e?: any): any {
        if (e.key === "Escape" && open) close()
      }}
    >
      {pres[0] ? (
        <div
          ref={panel}
          role="dialog"
          aria-label={p.name || "Asistente"}
          className={cx("frk-agent__panel", pres[1] && open && "is-in")}
        >
          <div className="frk-agent__head">
            <Avatar
              name={p.name || "Asistente"}
              size={40}
              status={live ? "live" : "online"}
              tone={p.tone || "rams"}
            />
            <div className="frk-agent__who">
              <span className="frk-agent__name">{p.name || "Asistente"}</span>
              <LED tone={live ? "rec" : "verde"} blink={state === "listening"}>
                {names[state]}
              </LED>
            </div>
            <Segmented
              label="Modo"
              options={[
                {
                  value: "voice",
                  icon: "mic",
                  ariaLabel: "Voz",
                },
                {
                  value: "chat",
                  icon: "copy",
                  ariaLabel: "Texto",
                },
              ]}
              value={mode}
              onChange={md[1]}
            />
            <button
              type="button"
              className="frk-key frk-tone--well frk-key--s frk-key--round"
              aria-label="Cerrar"
              onClick={close}
            >
              <span className="frk-key__main">
                <Icon name="close" size={20} />
              </span>
            </button>
          </div>
          {mode === "voice" ? (
            <div className="frk-agent__voice">
              <VoiceOrb
                state={state}
                size={180}
                tone={p.tone || "rams"}
                level={p.level != null ? p.level : 0.7}
              />
              {p.transcript ? <p className="frk-agent__transcript">{p.transcript}</p> : null}
              <div className="frk-agent__controls">
                <button
                  type="button"
                  className={cx(
                    "frk-key",
                    "frk-key--l",
                    "frk-key--round",
                    live ? "frk-tone--rec" : "frk-tone--ink",
                  )}
                  aria-label={live ? "Terminar conversación" : "Empezar a hablar"}
                  onClick={talk}
                >
                  <span className="frk-key__main">
                    <Icon name={live ? "close" : "mic"} size={36} />
                  </span>
                </button>
                <span className="frk-agent__hint">{live ? "Toca para colgar" : "Toca para hablar"}</span>
              </div>
            </div>
          ) : (
            <div className="frk-agent__chat">
              <div className="frk-agent__log" aria-live="polite">
                {msgs.length ? (
                  msgs.map(function (x?: any, i?: any): any {
                    return (
                      <Message
                        {...Object.assign(
                          {
                            key: i,
                          },
                          x,
                        )}
                      >
                        {x.text}
                      </Message>
                    )
                  })
                ) : (
                  <EmptyState
                    compact={true}
                    shape="ring"
                    title="Pregunta lo que quieras"
                    text="Reservas, horarios, tu progreso."
                  />
                )}
              </div>
              <Composer
                voice={false}
                suggestions={p.suggestions}
                onSend={function (v?: any): any {
                  var n: any = msgs.concat([
                    {
                      role: "user",
                      text: v,
                    },
                    {
                      role: "assistant",
                      thinking: true,
                    },
                  ])
                  ms[1](n)
                  p.onSend && p.onSend(v)
                }}
              />
            </div>
          )}
        </div>
      ) : null}
      <button
        ref={launcher}
        type="button"
        className={cx("frk-agent__launcher", open && "is-open", live && "is-live")}
        aria-label={open ? "Ocultar asistente" : "Abrir asistente " + (p.name || "")}
        aria-expanded={open}
        onClick={function (): any {
          setOpen(!open)
        }}
      >
        {open ? (
          <Icon name="chevron-down" size={28} />
        ) : (
          <VoiceOrb
            state={live ? state : "thinking"}
            size={40}
            grid={7}
            tone="paper"
            caption={false}
            label=""
          />
        )}
      </button>
    </div>
  )
}

/* ---------- Checkbox ---------- */
