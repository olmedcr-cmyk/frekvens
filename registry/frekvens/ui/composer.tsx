"use client"
/* Frekvens · Composer — MIT © Cris Olmedo */

import * as React from "react"
import { DotLoader } from "./dot-loader"
import { Icon } from "./icon"
import { Suggestions } from "./suggestions"
import { VoiceOrb } from "./voice-orb"
import { cx, useValue } from "./lib"

import type { ComposerProps } from "./types"
export type { ComposerProps }

const { useRef, useState, useEffect }: any = React

/* ---------- Composer: escribir o hablar ---------- */
export function Composer(props: ComposerProps): React.ReactElement
export function Composer(p?: any): any {
  var st: any = useValue(
      {
        value: p.value,
        defaultValue: "",
        onChange: p.onChange,
      },
      "",
    ),
    v: any = st[0],
    ta: any = useRef(null)
  var l: any = useState(false),
    listening: any = p.listening != null ? p.listening : l[0]
  useEffect(
    function (): any {
      var el: any = ta.current
      if (!el) return
      el.style.height = "auto"
      el.style.height = Math.min(el.scrollHeight, 160) + "px"
    },
    [v],
  )
  function send(): any {
    if (!v.trim() || p.busy) return
    p.onSend && p.onSend(v.trim())
    st[1]("")
  }
  return (
    <div className={cx("frk-composer", listening && "is-listening", p.className)}>
      {p.suggestions ? (
        <Suggestions
          items={p.suggestions}
          onPick={function (s?: any): any {
            p.onSend ? p.onSend(s) : st[1](s)
          }}
        />
      ) : null}
      <div className="frk-composer__bar">
        {listening ? (
          <div className="frk-composer__listen">
            <VoiceOrb state="listening" size={40} grid={7} caption={false} level={p.level} />
            <span>{p.listeningText || "Te escucho…"}</span>
          </div>
        ) : (
          <textarea
            ref={ta}
            rows={1}
            value={v}
            placeholder={p.placeholder || "Escribe o habla"}
            aria-label={p.label || "Mensaje"}
            className="frk-composer__input"
            onChange={function (e?: any): any {
              st[1](e.target.value)
            }}
            onKeyDown={function (e?: any): any {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                send()
              }
            }}
          />
        )}
        {p.voice !== false ? (
          <button
            type="button"
            className={cx(
              "frk-key",
              "frk-key--s",
              "frk-key--round",
              listening ? "frk-tone--rec" : "frk-tone--well",
            )}
            aria-label={listening ? "Dejar de escuchar" : "Hablar"}
            aria-pressed={listening}
            onClick={function (): any {
              var n: any = !listening
              l[1](n)
              p.onListen && p.onListen(n)
            }}
          >
            <span className="frk-key__main">
              <Icon name={listening ? "stop" : "mic"} size={20} />
            </span>
          </button>
        ) : null}
        {listening ? null : (
          <button
            type="button"
            className="frk-key frk-key--s frk-key--round frk-tone--klein"
            aria-label="Enviar"
            disabled={!v.trim() || p.busy}
            onClick={send}
          >
            <span className="frk-key__main">
              {p.busy ? <DotLoader label="Enviando" /> : <Icon name="arrow-up" size={20} />}
            </span>
          </button>
        )}
      </div>
    </div>
  )
}

/* ---------- Render: UI generativa desde JSON ---------- */
