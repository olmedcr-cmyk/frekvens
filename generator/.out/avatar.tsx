"use client"
/* Frekvens · Avatar — MIT © Cris Olmedo */

import * as React from "react"
import { AURA, cx } from "./lib"

import type { AvatarProps } from "./types"
export type { AvatarProps }

/* ---------- Avatar ---------- */
export function Avatar(props: AvatarProps): React.ReactElement
export function Avatar(p?: any): any {
  var s: any = p.size || 48,
    ini: any = String(p.name || "?")
      .split(/\s+/)
      .map(function (w?: any): any {
        return w.charAt(0)
      })
      .join("")
      .slice(0, 2)
      .toUpperCase()
  return (
    <span
      className={cx(
        "frk-avatar",
        "frk-tone--" + (p.tone || "ink"),
        p.status && p.status !== "offline" && "frk-aura frk-aura--" + (AURA[p.status] || "verde") + " is-on",
        p.status === "live" && "is-fast",
        p.status === "offline" && "is-offline",
        p.className,
      )}
      style={{
        width: s,
        height: s,
        fontSize: Math.round(s * 0.38),
      }}
      role="img"
      aria-label={
        p.name +
        (p.status
          ? " · " +
            ((
              {
                online: "disponible",
                live: "en directo",
                away: "ausente",
                busy: "ocupado",
                offline: "desconectado",
              } as any
            )[p.status] || p.status)
          : "")
      }
    >
      {p.src ? <img src={p.src} alt="" className="frk-avatar__img" /> : <span aria-hidden={true}>{ini}</span>}
      {null}
    </span>
  )
}

/* ---------- LineChart: línea con marcador de "ahora" ---------- */
