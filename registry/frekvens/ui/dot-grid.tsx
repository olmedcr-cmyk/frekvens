"use client"
/* Frekvens · DotGrid — MIT © Cris Olmedo */

import * as React from "react"
import { clamp, cx, range, useValue } from "./lib"

import type { DotGridProps } from "./types"
export type { DotGridProps }

const { useState, useRef }: any = React

/* ---------- DotGrid: n of m discs ---------- */
export function DotGrid(props: DotGridProps): React.ReactElement
export function DotGrid(p?: any): any {
  var total: any = p.total || 20,
    cols: any = p.columns || 4,
    mode: any = p.select,
    size: any = p.size || (mode ? 56 : 48),
    gap: any = p.gap == null ? (mode ? 10 : 8) : p.gap
  var sel: any = useValue(p, mode === "many" ? [] : null),
    v: any = sel[0],
    hv: any = useState(-1),
    hover: any = hv[0],
    fc: any = useState(0),
    foc: any = fc[0],
    refs: any = useRef([])
  if (!mode) {
    var filled: any = clamp(p.filled || 0, 0, total)
    return (
      <div
        className={cx("frk-dotgrid", "frk-dotgrid--" + (p.tone || "rams"), p.className)}
        role="img"
        aria-label={p.label || filled + " de " + total}
        style={{
          gridTemplateColumns: "repeat(" + cols + "," + size + "px)",
          gap: gap,
        }}
      >
        {range(total).map(function (i?: any): any {
          return (
            <span
              key={i}
              className={cx("frk-dotgrid__dot", i < filled && "is-on")}
              style={{
                width: size,
                height: size,
              }}
            />
          )
        })}
      </div>
    )
  }
  var taken: any = p.disabled || [],
    labels: any = p.labels || []
  function isOn(i?: any): any {
    return mode === "many" ? (v || []).indexOf(i) >= 0 : v === i
  }
  function toggle(i?: any): any {
    if (taken.indexOf(i) >= 0) return
    var n: any =
      mode === "many"
        ? isOn(i)
          ? v.filter(function (x?: any): any {
              return x !== i
            })
          : (v || []).concat([i]).slice(-(p.max || total))
        : v === i && p.deselect !== false
          ? null
          : i
    sel[1](n)
    if (navigator.vibrate)
      try {
        navigator.vibrate(8)
      } catch (e) {}
  }
  function move(i?: any): any {
    i = clamp(i, 0, total - 1)
    fc[1](i)
    var el: any = refs.current[i]
    el && el.focus()
  }
  function dist(i?: any): any {
    if (hover < 0) return 9
    var a: any = [i % cols, Math.floor(i / cols)],
      b: any = [hover % cols, Math.floor(hover / cols)]
    return Math.max(Math.abs(a[0] - b[0]), Math.abs(a[1] - b[1]))
  }
  var count: any = mode === "many" ? (v || []).length : v == null ? 0 : 1
  return (
    <div
      className={cx("frk-dotgrid", "frk-dotgrid--pick", "frk-dotgrid--" + (p.tone || "klein"), p.className)}
    >
      <div
        role="group"
        aria-label={p.label || "Elige"}
        className="frk-dotgrid__grid"
        style={{
          gridTemplateColumns: "repeat(" + cols + "," + size + "px)",
          gap: gap,
        }}
        onPointerLeave={function (): any {
          hv[1](-1)
        }}
      >
        {range(total).map(function (i?: any): any {
          var off: any = taken.indexOf(i) >= 0,
            on: any = isOn(i),
            d: any = dist(i),
            l: any = labels[i]
          return (
            <button
              key={i}
              type="button"
              ref={function (el?: any): any {
                refs.current[i] = el
              }}
              tabIndex={i === foc ? 0 : -1}
              aria-pressed={on}
              aria-disabled={off || undefined}
              aria-label={(l != null ? String(l) : "Plaza " + (i + 1)) + (off ? ", ocupada" : "")}
              className={cx(
                "frk-dotgrid__dot",
                on && "is-on",
                off && "is-taken",
                d === 0 && !off && "is-hover",
                d === 1 && "is-near",
              )}
              style={{
                width: size,
                height: size,
              }}
              onPointerEnter={function (): any {
                hv[1](i)
              }}
              onClick={function (): any {
                fc[1](i)
                toggle(i)
              }}
              onKeyDown={function (e?: any): any {
                var k: any = (
                  {
                    ArrowRight: 1,
                    ArrowLeft: -1,
                    ArrowDown: cols,
                    ArrowUp: -cols,
                  } as any
                )[e.key]
                if (k) {
                  e.preventDefault()
                  move(i + k)
                }
                if (e.key === "Home") {
                  e.preventDefault()
                  move(0)
                }
                if (e.key === "End") {
                  e.preventDefault()
                  move(total - 1)
                }
              }}
            >
              {p.showLabels && l != null ? <span className="frk-dotgrid__lbl">{l}</span> : null}
            </button>
          )
        })}
      </div>
      {p.caption !== false ? (
        <div className="frk-dotgrid__cap" aria-live="polite">
          {p.caption || (count ? count + (count === 1 ? " elegida" : " elegidas") : "Toca para elegir")}
        </div>
      ) : null}
    </div>
  )
}

/* ---------- StateMark: ring · dots · disc ---------- */
