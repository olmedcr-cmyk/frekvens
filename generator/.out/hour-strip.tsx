"use client"
/* Frekvens · HourStrip — MIT © Cris Olmedo */

import * as React from "react"
import { cx, pad } from "./lib"

import type { HourStripProps } from "./types"
export type { HourStripProps }

/* ---------- HourStrip: precio por horas ---------- */
export function HourStrip(props: HourStripProps): React.ReactElement
export function HourStrip(p?: any): any {
  var prices: any = p.prices || [],
    now: any = p.now != null ? p.now : -1,
    mn: any = Math.min.apply(null, prices),
    mx: any = Math.max.apply(null, prices),
    sp: any = mx - mn || 1
  function band(v?: any): any {
    var k: any = (v - mn) / sp
    return k < 0.34 ? "verde" : k < 0.67 ? "sol" : "rams"
  }
  var cheap: any = prices
    .map(function (v?: any, i?: any): any {
      return [v, i]
    })
    .sort(function (a?: any, b?: any): any {
      return a[0] - b[0]
    })
    .slice(0, 3)
    .map(function (x?: any): any {
      return pad(x[1]) + "h"
    })
    .join(", ")
  return (
    <figure className={cx("frk-hours", p.className)}>
      {now >= 0 ? (
        <div className="frk-hours__now">
          <span className="frk-text--label">{"Ahora · " + pad(now) + ":00"}</span>
          <span className="frk-hours__price">
            {String(prices[now]).replace(".", ",")}
            <small>{" " + (p.unit || "€/kWh")}</small>
          </span>
        </div>
      ) : null}
      <div
        className="frk-hours__bars"
        role="img"
        aria-label={
          (p.label || "Precio por hora") +
          ". Más barato: " +
          cheap +
          ". Más caro: " +
          pad(prices.indexOf(mx)) +
          "h."
        }
      >
        {prices.map(function (v?: any, i?: any): any {
          return (
            <span
              key={i}
              className={cx(
                "frk-hours__bar",
                "frk-tone--" + band(v),
                i === now && "is-now",
                i < now && "is-past",
              )}
              style={{
                height: 24 + ((v - mn) / sp) * 76 + "%",
              }}
              title={pad(i) + "h · " + v}
            />
          )
        })}
      </div>
      <div className="frk-hours__axis" aria-hidden={true}>
        {["00", "06", "12", "18", "23"].map(function (t?: any): any {
          return <span key={t}>{t}</span>
        })}
      </div>
      <figcaption className="frk-hours__legend">
        <span>
          <i className="frk-tone--verde" />
          Barato
        </span>
        <span>
          <i className="frk-tone--sol" />
          Medio
        </span>
        <span>
          <i className="frk-tone--rams" />
          Caro
        </span>
      </figcaption>
    </figure>
  )
}

/* ---------- PaymentCard ---------- */
