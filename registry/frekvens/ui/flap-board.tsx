"use client"
/* Frekvens · FlapBoard — MIT © Cris Olmedo */

import * as React from "react"
import { SplitFlap } from "./split-flap"
import { cx } from "./lib"

import type { FlapBoardProps } from "./types"
export type { FlapBoardProps }

/* ---------- FlapBoard: panel de salidas con paletas ---------- */
export function FlapBoard(props: FlapBoardProps): React.ReactElement
export function FlapBoard(p?: any): any {
  var cols: any = p.columns || [
    {
      key: "time",
      label: "Hora",
      length: 5,
    },
    {
      key: "text",
      label: "Destino",
      length: 12,
    },
    {
      key: "status",
      label: "Estado",
      length: 9,
    },
  ]
  return (
    <div className={cx("frk-flapboard", p.className)} role="table" aria-label={p.label || "Panel"}>
      {p.title ? (
        <div className="frk-flapboard__title">
          <span>{p.title}</span>
          {p.meta ? <span>{p.meta}</span> : null}
        </div>
      ) : null}
      <div
        className="frk-flapboard__grid"
        style={{
          gridTemplateColumns: "repeat(" + cols.length + ", max-content)",
        }}
      >
        <div role="row" className="frk-flapboard__head">
          {cols.map(function (c?: any): any {
            return (
              <span key={c.key} role="columnheader">
                {c.label}
              </span>
            )
          })}
        </div>
        {(p.rows || []).map(function (r?: any, i?: any): any {
          return (
            <div key={r.id || i} role="row" className="frk-flapboard__row">
              {cols.map(function (c?: any): any {
                return (
                  <div key={c.key} role="cell">
                    <SplitFlap
                      value={r[c.key] == null ? "" : String(r[c.key])}
                      length={c.length}
                      size={p.size || "s"}
                      tone={c.key === "status" && r.tone ? r.tone : undefined}
                    />
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
/* ---------- Shape: forma geométrica plana (arte de tile, póster, portada) ---------- */
