"use client"
/* Frekvens · Grille — MIT © Cris Olmedo */

import * as React from "react"
import { cx } from "./lib"

import type { GrilleProps } from "./types"
export type { GrilleProps }

const { useId }: any = React

/* ---------- Grille: speaker/lamp grille in a disc or dome ---------- */
export function Grille(props: GrilleProps): React.ReactElement
export function Grille(p?: any): any {
  var s: any = p.size || 160,
    variant: any = p.variant || "slots",
    dome: any = p.shape === "dome",
    H: any = dome ? s / 2 : s,
    id: any = useId(),
    parts: any = []
  if (variant === "slots") {
    for (var y: any = s * 0.2; y < s * 0.82; y += s * 0.085)
      parts.push(
        <rect
          key={y}
          x={s * 0.12}
          y={y}
          width={s * 0.76}
          height={s * 0.04}
          rx={s * 0.02}
          className="frk-grille__hole"
        />,
      )
  } else {
    var pt: any = p.pitch || s / 11
    for (var gy: any = pt / 2; gy < s; gy += pt)
      for (var gx: any = pt / 2; gx < s; gx += pt)
        if (Math.hypot(gx - s / 2, gy - s / 2) < s * 0.38)
          parts.push(
            <circle key={gx + "-" + gy} cx={gx} cy={gy} r={pt * 0.28} className="frk-grille__hole" />,
          )
  }
  return (
    <svg
      className={cx("frk-grille", "frk-grille--" + (p.tone || "verde"), p.className)}
      width={s}
      height={H}
      viewBox={"0 0 " + s + " " + H}
      role={p.label ? "img" : undefined}
      aria-label={p.label}
      aria-hidden={p.label ? undefined : true}
    >
      <defs>
        <clipPath id={id}>
          <circle cx={s / 2} cy={s / 2} r={s / 2} />
        </clipPath>
      </defs>
      <g clipPath={"url(#" + id + ")"}>
        <rect width={s} height={s} className="frk-grille__body" />
        {parts}
      </g>
    </svg>
  )
}

/* ================= Frekvens 3: tiempo, mecanismos, conversación, generativo ================= */
