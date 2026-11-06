"use client"
/* Frekvens · Suggestions — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { cx } from "./lib"

import type { SuggestionsProps } from "./types"
export type { SuggestionsProps }

/* ---------- Suggestions: respuestas sugeridas ---------- */
export function Suggestions(props: SuggestionsProps): React.ReactElement
export function Suggestions(p?: any): any {
  return (
    <div className={cx("frk-suggest", p.className)} role="group" aria-label={p.label || "Sugerencias"}>
      {(p.items || []).map(function (s?: any, i?: any): any {
        var o: any =
          typeof s === "string"
            ? {
                label: s,
              }
            : s
        return (
          <button
            key={i}
            type="button"
            className="frk-suggest__chip"
            style={{
              animationDelay: i * 50 + "ms",
            }}
            onClick={function (): any {
              p.onPick && p.onPick(o.value || o.label)
            }}
          >
            {o.icon ? <Icon name={o.icon} size={16} /> : null}
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

/* ---------- Composer: escribir o hablar ---------- */
