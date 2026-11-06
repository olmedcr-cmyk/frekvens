"use client"
/* Frekvens · TopBar — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { Text } from "./text"
import { cx } from "./lib"

import type { TopBarProps } from "./types"
export type { TopBarProps }

const h: any = React.createElement

/* ---------- TopBar ---------- */
export function TopBar(props: TopBarProps): React.ReactElement
export function TopBar(p?: any): any {
  return h(
    p.as || "div",
    {
      className: cx("frk-topbar", p.large && "frk-topbar--large", p.className),
    },
    <div className="frk-topbar__row">
      {p.onBack ? (
        <button
          type="button"
          className="frk-key frk-tone--well frk-key--s frk-key--round"
          aria-label={p.backLabel || "Atrás"}
          onClick={p.onBack}
        >
          <span className="frk-key__main">
            <Icon name="arrow-left" size={20} />
          </span>
        </button>
      ) : (
        <span className="frk-topbar__spacer" />
      )}
      {p.large ? <span className="frk-topbar__spacer" /> : <h1 className="frk-topbar__title">{p.title}</h1>}
      <div className="frk-topbar__actions">{p.actions}</div>
    </div>,
    p.large ? (
      <Text variant="display-xl" sub={p.subtitle} as="h1">
        {p.title}
      </Text>
    ) : null,
  )
}

/* ---------- Steps: progreso por pasos ---------- */
