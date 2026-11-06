"use client"
/* Frekvens · Message — MIT © Cris Olmedo */

import * as React from "react"
import { DotLoader } from "./dot-loader"
import { Icon } from "./icon"
import { Render } from "./render"
import { StateMark } from "./state-mark"
import { cx } from "./lib"

import type { MessageProps } from "./types"
export type { MessageProps }

/* ---------- Message: turno de conversación ---------- */
export function Message(props: MessageProps): React.ReactElement
export function Message(p?: any): any {
  var role: any = p.role || "assistant"
  return (
    <div className={cx("frk-msg", "frk-msg--" + role, p.className)}>
      {role === "assistant" ? (
        <span className="frk-msg__avatar" aria-hidden={true}>
          <StateMark state={p.streaming ? "partial" : "full"} size={16} />
        </span>
      ) : null}
      <div className="frk-msg__body">
        {p.name ? <span className="frk-msg__name">{p.name}</span> : null}
        {p.thinking ? (
          <DotLoader label="Pensando" />
        ) : (
          <div className="frk-msg__text">
            {p.children}
            {p.streaming ? <span className="frk-msg__caret" aria-hidden={true} /> : null}
          </div>
        )}
        {p.ui ? (
          <div className="frk-msg__ui">
            <Render spec={p.ui} actions={p.actions} />
          </div>
        ) : null}
        {p.meta || p.onCopy || p.onRetry ? (
          <div className="frk-msg__meta">
            {p.meta ? <span>{p.meta}</span> : null}
            {p.onCopy ? (
              <button type="button" className="frk-msg__act" aria-label="Copiar" onClick={p.onCopy}>
                <Icon name="copy" size={16} />
              </button>
            ) : null}
            {p.onRetry ? (
              <button type="button" className="frk-msg__act" aria-label="Reintentar" onClick={p.onRetry}>
                <Icon name="refresh" size={16} />
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}

/* ---------- Suggestions: respuestas sugeridas ---------- */
