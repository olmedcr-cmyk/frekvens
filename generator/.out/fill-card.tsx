"use client"
/* Frekvens · FillCard — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { clamp, cx } from "./lib"

import type { FillCardProps } from "./types"
export type { FillCardProps }

/* ================= Frekvens 6: relleno, gráficos de unidad, secuenciador, recorte, bandas, ojos ================= */

/* ---------- FillCard: tarjeta cuyo fondo se llena hasta el valor ---------- */
export function FillCard(props: FillCardProps): React.ReactElement
export function FillCard(p?: any): any {
  var max: any = p.max || 100,
    v: any = clamp(p.value || 0, 0, max),
    pct: any = (v / max) * 100,
    Tag: any = p.onClick ? "button" : "div"
  var txt: any = p.format ? p.format(v) : String(Math.round(v)),
    unit: any = p.unit == null ? "%" : p.unit,
    sty: any = {}
  sty["--fill"] = pct + "%"
  function body(hidden?: any): any {
    return (
      <span className="frk-fill__body" aria-hidden={hidden || undefined}>
        <span className="frk-fill__head">
          <span className="frk-fill__title">{p.title}</span>
          {p.icon ? <Icon name={p.icon} size={20} /> : null}
        </span>
        <span className="frk-fill__foot">
          {p.caption ? <span className="frk-fill__caption">{p.caption}</span> : <span />}
          <span className="frk-fill__value">
            {txt}
            {unit ? <span className="frk-fill__unit">{unit}</span> : null}
          </span>
        </span>
      </span>
    )
  }
  return (
    <Tag
      type={Tag === "button" ? "button" : undefined}
      onClick={p.onClick}
      className={cx("frk-fill", p.className)}
      style={sty}
    >
      {body(false)}
      <span className={cx("frk-fill__on", "frk-tone--" + (p.tone || "rams"))} aria-hidden={true}>
        {body(true)}
      </span>
    </Tag>
  )
}

/* ---------- ColumnChart: columnas con su cifra encima; una destacada ---------- */
