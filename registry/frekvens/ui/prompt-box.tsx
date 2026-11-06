"use client"
/* Frekvens · PromptBox — MIT © Cris Olmedo */

import * as React from "react"
import { DotLoader } from "./dot-loader"
import { Icon } from "./icon"
import { Suggestions } from "./suggestions"
import { cx, useValue } from "./lib"

import type { PromptBoxProps } from "./types"
export type { PromptBoxProps }

const { useRef, useState, useEffect }: any = React

/* ---------- PromptBox: caja de prompt para IA ---------- */
export function PromptBox(props: PromptBoxProps): React.ReactElement
export function PromptBox(p?: any): any {
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
  var at: any = useState(p.attachments || []),
    att: any = at[0],
    setAtt: any = at[1],
    fi: any = useRef(null)
  var md: any = useState(p.model || (p.models && p.models[0])),
    model: any = md[0]
  useEffect(
    function (): any {
      var el: any = ta.current
      if (!el) return
      el.style.height = "auto"
      el.style.height = Math.min(el.scrollHeight, 220) + "px"
    },
    [v],
  )
  function send(): any {
    if (!v.trim() || p.busy) return
    p.onSend &&
      p.onSend({
        text: v.trim(),
        model: model,
        attachments: att,
      })
    st[1]("")
    setAtt([])
  }
  return (
    <div className={cx("frk-prompt", p.className)}>
      {p.title ? <div className="frk-prompt__title">{p.title}</div> : null}
      <div
        className="frk-prompt__box"
        onDragOver={function (e?: any): any {
          e.preventDefault()
        }}
        onDrop={function (e?: any): any {
          e.preventDefault()
          setAtt(
            att.concat(
              Array.prototype.map.call(e.dataTransfer.files, function (f?: any): any {
                return f.name
              }),
            ),
          )
        }}
      >
        {att.length ? (
          <div className="frk-prompt__att">
            {att.map(function (a?: any, i?: any): any {
              return (
                <span key={i} className="frk-prompt__file">
                  <Icon name="copy" size={14} />
                  {a}
                  <button
                    type="button"
                    aria-label={"Quitar " + a}
                    onClick={function (): any {
                      setAtt(
                        att.filter(function (_?: any, k?: any): any {
                          return k !== i
                        }),
                      )
                    }}
                  >
                    <Icon name="close" size={12} />
                  </button>
                </span>
              )
            })}
          </div>
        ) : null}
        <textarea
          ref={ta}
          rows={2}
          value={v}
          placeholder={p.placeholder || "¿En qué te ayudo?"}
          aria-label={p.label || "Mensaje para la IA"}
          className="frk-prompt__input"
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
        <div className="frk-prompt__bar">
          <button
            type="button"
            className="frk-prompt__tool"
            aria-label="Adjuntar archivo"
            onClick={function (): any {
              fi.current && fi.current.click()
            }}
          >
            <Icon name="plus" size={18} />
          </button>
          <input
            ref={fi}
            type="file"
            multiple={true}
            className="frk-sr"
            tabIndex={-1}
            aria-hidden={true}
            onChange={function (e?: any): any {
              setAtt(
                att.concat(
                  Array.prototype.map.call(e.target.files, function (f?: any): any {
                    return f.name
                  }),
                ),
              )
            }}
          />
          {p.models ? (
            <select
              className="frk-prompt__select"
              aria-label="Modelo"
              value={model}
              onChange={function (e?: any): any {
                md[1](e.target.value)
                p.onModel && p.onModel(e.target.value)
              }}
            >
              {p.models.map(function (m?: any): any {
                return (
                  <option key={m} value={m}>
                    {m}
                  </option>
                )
              })}
            </select>
          ) : null}
          {p.efforts ? (
            <select
              className="frk-prompt__select"
              aria-label="Esfuerzo"
              defaultValue={p.effort || p.efforts[0]}
            >
              {p.efforts.map(function (m?: any): any {
                return (
                  <option key={m} value={m}>
                    {m}
                  </option>
                )
              })}
            </select>
          ) : null}
          <span
            style={{
              flex: 1,
            }}
          />
          {p.voice !== false ? (
            <button type="button" className="frk-prompt__tool" aria-label="Dictar" onClick={p.onVoice}>
              <Icon name="mic" size={18} />
            </button>
          ) : null}
          <button
            type="button"
            className="frk-key frk-tone--klein frk-key--s frk-key--round frk-prompt__send"
            aria-label="Enviar"
            disabled={!v.trim() || p.busy}
            onClick={send}
          >
            <span className="frk-key__main">
              {p.busy ? <DotLoader label="Generando" /> : <Icon name="arrow-up" size={20} />}
            </span>
          </button>
        </div>
      </div>
      {p.suggestions ? (
        <Suggestions
          items={p.suggestions}
          onPick={function (s?: any): any {
            st[1](s)
            ta.current && ta.current.focus()
          }}
        />
      ) : null}
      {p.note ? <p className="frk-prompt__note">{p.note}</p> : null}
    </div>
  )
}

/* ---------- Frekvens Lang: UI generativa en líneas (streaming) ---------- */
/* id = Tipo({props}, [hijos])   ·   id = Tipo("texto")   ·   las referencias a ids aún no llegados se pintan como hueco */
