"use client"
/* Frekvens · Clock — MIT © Cris Olmedo */

import * as React from "react"
import { DotMatrix } from "./dot-matrix"
import { cx, pad, polar, range, useNow } from "./lib"

import type { ClockProps } from "./types"
export type { ClockProps }

/* ---------- Clock ---------- */
export function Clock(props: ClockProps): React.ReactElement
export function Clock(p?: any): any {
  var now: any = useNow(p.time == null, 1000),
    d: any
  if (p.time != null) {
    var m: any = String(p.time).split(":")
    d = new Date()
    d.setHours(+m[0], +m[1], +(m[2] || 0))
  } else d = new Date(now)
  var H: any = d.getHours(),
    M: any = d.getMinutes(),
    S: any = d.getSeconds(),
    size: any = p.size || 200,
    v: any = p.variant || "disc",
    c: any = size / 2
  var label: any = "Son las " + H + ":" + pad(M)
  if (v === "dot")
    return (
      <div className={cx("frk-clock", "frk-clock--dot", p.className)} role="img" aria-label={label}>
        <DotMatrix
          text={pad(H) + ":" + pad(M)}
          dot={size / 42}
          pitch={size / 30}
          tone={p.tone || "ink"}
          showOff={true}
          label={label}
        />
      </div>
    )
  var ha: any = ((H % 12) + M / 60) * 30,
    ma: any = (M + S / 60) * 6,
    sa: any = S * 6
  function hand(a?: any, len?: any, w?: any, cls?: any): any {
    var e: any = polar(c, c, len, a),
      b: any = polar(c, c, -len * 0.14, a)
    return <line x1={b[0]} y1={b[1]} x2={e[0]} y2={e[1]} strokeWidth={w} className={cls} />
  }
  var ticks: any =
    v === "ticks"
      ? range(60).map(function (i?: any): any {
          var q: any = polar(c, c, c - 10, i * 6)
          return <circle key={i} cx={q[0]} cy={q[1]} r={i % 5 ? 1.4 : 3} className="frk-clock__tick" />
        })
      : null
  return (
    <div className={cx("frk-clock", "frk-clock--" + v, p.className)}>
      <svg width={size} height={size} viewBox={"0 0 " + size + " " + size} role="img" aria-label={label}>
        <circle cx={c} cy={c} r={c - 1} className="frk-clock__face" />
        {ticks}
        {hand(ha, c * 0.5, size / 40, "frk-clock__hand")}
        {hand(ma, c * 0.78, size / 60, "frk-clock__hand")}
        {p.seconds !== false ? hand(sa, c * 0.84, size / 160 + 0.6, "frk-clock__sec") : null}
        <circle cx={c} cy={c} r={size / 50 + 2} className="frk-clock__pin" />
      </svg>
      {p.caption ? <span className="frk-clock__cap">{p.caption}</span> : null}
    </div>
  )
}

/* ---------- VUMeter: aguja analógica ---------- */
