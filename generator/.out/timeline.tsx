"use client"
/* Frekvens · Timeline — MIT © Cris Olmedo */

import * as React from "react"
import { Avatar } from "./avatar"
import { StateMark } from "./state-mark"
import { cx } from "./lib"

import type { TimelineProps } from "./types"
export type { TimelineProps }

/* ---------- Timeline: actividad, despliegues, historia ---------- */
export function Timeline(props: TimelineProps): React.ReactElement
export function Timeline(p?: any): any {
  return (
    <ol className={cx("frk-timeline", p.className)} aria-label={p.label}>
      {(p.items || []).map(function (it?: any, i?: any): any {
        var st: any = it.state || "done"
        return (
          <li key={i} className={cx("frk-tl", "is-" + st)}>
            <span className="frk-tl__mark">
              {it.avatar ? (
                <Avatar name={it.avatar} size={28} />
              ) : (
                <StateMark
                  state={
                    st === "done" ? "full" : st === "running" ? "partial" : st === "error" ? "full" : "empty"
                  }
                  size={20}
                  label={
                    (
                      {
                        done: "Hecho",
                        running: "En curso",
                        upcoming: "Pendiente",
                        error: "Error",
                      } as any
                    )[st]
                  }
                />
              )}
            </span>
            <span className="frk-tl__body">
              <span className="frk-tl__title">{it.title}</span>
              {it.text ? <span className="frk-tl__text">{it.text}</span> : null}
            </span>
            {it.time ? <time className="frk-tl__time">{it.time}</time> : null}
          </li>
        )
      })}
    </ol>
  )
}

/* ---------- Checklist: puesta en marcha ---------- */
