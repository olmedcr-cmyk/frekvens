"use client"
/* Frekvens · Eyes — MIT © Cris Olmedo */

import * as React from "react"
import { EYE_MOODS, cx } from "./lib"

import type { EyesProps } from "./types"
export type { EyesProps }

const { useId }: any = React

export function Eyes(props: EyesProps): React.ReactElement
export function Eyes(p?: any): any {
  var m: any = EYE_MOODS[p.mood] || EYE_MOODS.neutral,
    size: any = p.size || 160,
    id: any = useId().replace(/[^a-zA-Z0-9_-]/g, "")
  function eye(cx0?: any, flip?: any, key?: any): any {
    return (
      <g
        key={key}
        transform={"translate(" + cx0 + " 50)" + (flip ? " scale(-1 1)" : "")}
        className="frk-eyes__eye"
      >
        <g mask={m.lid ? "url(#" + id + ")" : undefined}>
          <ellipse rx={m.wide ? 24 : 22} ry={m.wide ? 30 : 26} className="frk-eyes__ball" />
          {m.pupil ? (
            <circle cx={m.pupil[0]} cy={m.pupil[1]} r={m.wide ? 6 : 9} className="frk-eyes__pupil" />
          ) : null}
        </g>
      </g>
    )
  }
  return (
    <svg
      className={cx("frk-eyes", "frk-eyes--" + (p.tone || "ink"), p.still && "is-still", p.className)}
      width={size}
      height={size * 0.625}
      viewBox="0 0 160 100"
      role="img"
      aria-label={p.label || m.name}
      focusable="false"
    >
      {m.lid ? (
        <defs>
          <mask id={id} maskUnits="userSpaceOnUse" x={-30} y={-40} width={60} height={80}>
            <rect x={-30} y={-40} width={60} height={80} fill="#fff" />
            <path d={m.lid} fill="#000" />
          </mask>
        </defs>
      ) : null}
      {eye(46, false, "l")}
      {eye(114, true, "r")}
    </svg>
  )
}

/* ---------- Swatch: un par de color, fondo y marca, en discos concéntricos ---------- */
