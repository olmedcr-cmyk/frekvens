"use client"
/* Frekvens · Banner — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { BANNER, cx } from "./lib"

import type { BannerProps } from "./types"
export type { BannerProps }

const { useState }: any = React

export function Banner(props: BannerProps): React.ReactElement
export function Banner(p?: any): any {
  var t: any = BANNER[p.tone || "info"],
    s: any = useState(true)
  if (!s[0]) return null
  return (
    <div
      role={p.tone === "error" ? "alert" : "status"}
      className={cx("frk-banner", "frk-tone--" + t[0], p.className)}
    >
      <span className="frk-banner__icon">
        <Icon name={p.icon || t[1]} size={20} />
      </span>
      <div className="frk-banner__text">
        {p.title ? <strong>{p.title}</strong> : null}
        {p.children ? <span>{p.children}</span> : null}
      </div>
      {p.action ? (
        <button type="button" className="frk-banner__action" onClick={p.action.onClick}>
          {p.action.label}
        </button>
      ) : null}
      {p.dismissible ? (
        <button
          type="button"
          className="frk-toast__close"
          aria-label="Descartar aviso"
          onClick={function (): any {
            s[1](false)
            p.onDismiss && p.onDismiss()
          }}
        >
          <Icon name="close" size={18} />
        </button>
      ) : null}
    </div>
  )
}

/* ---------- Skeleton: carga de puntos ---------- */
