"use client"
/* Frekvens · DotLoader — MIT © Cris Olmedo */

import * as React from "react"
import { cx, range } from "./lib"

import type { DotLoaderProps } from "./types"
export type { DotLoaderProps }

/* ---------- DotLoader: pensando ---------- */
export function DotLoader(props: DotLoaderProps): React.ReactElement
export function DotLoader(p?: any): any {
  var v: any = p.variant || "row",
    n: any = v === "grid" ? 9 : 3
  return (
    <span className={cx("frk-loader", "frk-loader--" + v, p.className)} role="status">
      {range(n).map(function (i?: any): any {
        return (
          <span
            key={i}
            style={{
              animationDelay: (v === "grid" ? ((i % 3) + Math.floor(i / 3)) * 90 : i * 140) + "ms",
            }}
          />
        )
      })}
      <span className="frk-sr">{p.label || "Pensando"}</span>
    </span>
  )
}

/* ---------- VoiceOrb: orbe de puntos para voz ---------- */
