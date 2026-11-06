"use client"
/* Frekvens · Beam — MIT © Cris Olmedo */

import * as React from "react"
import { cx } from "./lib"

import type { BeamProps } from "./types"
export type { BeamProps }

const { useRef, useState, useEffect }: any = React

/* ---------- Beam: haz de puntos que recorre el borde mientras algo trabaja ---------- */
export function Beam(props: BeamProps): React.ReactElement
export function Beam(p?: any): any {
  var ref: any = useRef(null),
    sz: any = useState([0, 0]),
    wh: any = sz[0],
    setWh: any = sz[1],
    on: any = p.active !== false,
    r: any = p.radius == null ? 24 : p.radius
  useEffect(function (): any {
    var el: any = ref.current
    if (!el || !window.ResizeObserver) return
    var ro: any = new ResizeObserver(function (): any {
      setWh([el.offsetWidth, el.offsetHeight])
    })
    ro.observe(el)
    return function (): any {
      ro.disconnect()
    }
  }, [])
  var w: any = wh[0],
    hh: any = wh[1],
    rect: any = w
      ? {
          x: 1.5,
          y: 1.5,
          width: Math.max(0, w - 3),
          height: Math.max(0, hh - 3),
          rx: Math.min(r, hh / 2),
        }
      : null,
    per: any = rect ? 2 * (rect.width + rect.height) - (8 - 2 * Math.PI) * rect.rx : 0,
    dash: any = {
      strokeDasharray: "0 8 0 8 0 8 0 8 0 8 0 8 0 " + Math.max(1, per - 48).toFixed(1),
      "--per": per.toFixed(1),
    }
  return (
    <div
      ref={ref}
      className={cx("frk-beam", "frk-beam--" + (p.tone || "klein"), on && "is-on", p.className)}
      style={Object.assign(
        {
          borderRadius: r,
        },
        p.style,
      )}
      aria-busy={on || undefined}
    >
      {p.children}
      {rect ? (
        <svg className="frk-beam__svg" width={w} height={hh} aria-hidden={true}>
          <rect
            {...Object.assign(
              {
                className: "frk-beam__track",
              },
              rect,
            )}
          />
          {on ? (
            <rect
              {...Object.assign(
                {
                  className: "frk-beam__head",
                  style: dash,
                },
                rect,
              )}
            />
          ) : null}
          {on ? (
            <rect
              {...Object.assign(
                {
                  className: "frk-beam__tail",
                  style: dash,
                },
                rect,
              )}
            />
          ) : null}
        </svg>
      ) : null}
      {on && p.label ? (
        <span className="frk-sr" role="status">
          {p.label}
        </span>
      ) : null}
    </div>
  )
}
/* ---------- Aura: halo que respira (disponible, en directo, ausente) ---------- */
