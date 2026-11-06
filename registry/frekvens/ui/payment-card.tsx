"use client"
/* Frekvens · PaymentCard — MIT © Cris Olmedo */

import * as React from "react"
import { LED } from "./led"
import { cx, range } from "./lib"

import type { PaymentCardProps } from "./types"
export type { PaymentCardProps }

/* ---------- PaymentCard ---------- */
export function PaymentCard(props: PaymentCardProps): React.ReactElement
export function PaymentCard(p?: any): any {
  var frozen: any = !!p.frozen
  return (
    <div
      className={cx("frk-card", "frk-tone--" + (p.tone || "klein"), frozen && "is-frozen", p.className)}
      role="img"
      aria-label={
        "Tarjeta " + (p.brand || "") + " terminada en " + (p.last4 || "0000") + (frozen ? ", congelada" : "")
      }
    >
      <div className="frk-card__top">
        <span className="frk-card__brand">{p.brand || "Frekvens"}</span>
        <svg width={34} height={26} viewBox="0 0 34 26" aria-hidden={true} className="frk-card__chip">
          {range(12).map(function (i?: any): any {
            return <circle key={i} cx={4 + (i % 4) * 9} cy={4 + Math.floor(i / 4) * 9} r={2.6} />
          })}
        </svg>
      </div>
      <div className="frk-card__num">{"•••• " + (p.last4 || "0000")}</div>
      <div className="frk-card__bottom">
        <span>{p.name || ""}</span>
        <span>{p.expiry || ""}</span>
      </div>
      {frozen ? (
        <div className="frk-card__frost" aria-hidden={true}>
          <LED tone="klein">Congelada</LED>
        </div>
      ) : null}
    </div>
  )
}

/* ---------- Recorder: grabadora ---------- */
