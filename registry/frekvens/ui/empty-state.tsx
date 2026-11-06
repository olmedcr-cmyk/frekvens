"use client"
/* Frekvens · EmptyState — MIT © Cris Olmedo */

import * as React from "react"
import { DotMatrix } from "./dot-matrix"
import { KeyButton } from "./key-button"
import { cx } from "./lib"

import type { EmptyStateProps } from "./types"
export type { EmptyStateProps }

/* ---------- EmptyState ---------- */
export function EmptyState(props: EmptyStateProps): React.ReactElement
export function EmptyState(p?: any): any {
  return (
    <div className={cx("frk-empty", p.compact && "frk-empty--compact", p.className)}>
      <DotMatrix
        shape={p.shape || "ring"}
        grid={p.compact ? 9 : 13}
        dot={p.compact ? 4 : 6}
        pitch={p.compact ? 7 : 10}
        showOff={true}
        label=""
      />
      <div className="frk-empty__title">{p.title}</div>
      {p.text ? <p className="frk-empty__text">{p.text}</p> : null}
      {p.action ? (
        <KeyButton tone="ink" shape="pill" onClick={p.action.onClick}>
          {p.action.label}
        </KeyButton>
      ) : null}
    </div>
  )
}

/* ---------- Badge: contador sobre otro elemento ---------- */
