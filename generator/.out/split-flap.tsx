"use client"
/* Frekvens · SplitFlap — MIT © Cris Olmedo */

import * as React from "react"
import { FLAP, cx, reduced } from "./lib"

import type { SplitFlapProps } from "./types"
export type { SplitFlapProps }

const { useState, useEffect }: any = React

export function SplitFlap(props: SplitFlapProps): React.ReactElement
export function SplitFlap(p?: any): any {
  var cy: any = useState(0),
    ci: any = cy[0],
    ps: any = useState(false),
    paused: any = ps[0]
  useEffect(
    function (): any {
      if (!p.cycle || paused || reduced()) return
      var t: any = setTimeout(function (): any {
        cy[1]((ci + 1) % p.cycle.length)
      }, p.interval || 4000)
      return function (): any {
        clearTimeout(t)
      }
    },
    [ci, paused, p.cycle && p.cycle.length],
  )
  var val: any = p.cycle ? p.cycle[ci % p.cycle.length] : p.value
  var len: any =
      p.length ||
      (p.cycle
        ? Math.max.apply(
            null,
            p.cycle.map(function (x?: any): any {
              return String(x).length
            }),
          )
        : String(val || "").length),
    target: any = String(val || "")
      .toUpperCase()
      .padEnd(len, " ")
      .slice(0, len)
  var s: any = useState(target),
    shown: any = s[0],
    setShown: any = s[1]
  useEffect(
    function (): any {
      if (reduced()) {
        setShown(target)
        return
      }
      var step: any = 0,
        cur: any = shown.split(""),
        timer: any = setInterval(function (): any {
          step++
          var done: any = true
          cur = cur.map(function (ch?: any, i?: any): any {
            if (ch === target[i]) return ch
            if (step < i * 2) {
              done = false
              return ch
            }
            done = false
            var k: any = FLAP.indexOf(ch)
            return FLAP[(k + 1 + FLAP.length) % FLAP.length] === undefined
              ? target[i]
              : FLAP[(k + 1) % FLAP.length]
          })
          setShown(cur.join(""))
          if (done || step > 80) {
            clearInterval(timer)
            setShown(target)
          }
        }, p.speed || 45)
      return function (): any {
        clearInterval(timer)
      }
    },
    [target],
  )
  return (
    <div
      className={cx("frk-flap", "frk-flap--" + (p.size || "m"), p.tone && "frk-flap--" + p.tone, p.className)}
      onPointerEnter={
        p.cycle
          ? function (): any {
              ps[1](true)
            }
          : undefined
      }
      onPointerLeave={
        p.cycle
          ? function (): any {
              ps[1](false)
            }
          : undefined
      }
      onFocus={
        p.cycle
          ? function (): any {
              ps[1](true)
            }
          : undefined
      }
      onBlur={
        p.cycle
          ? function (): any {
              ps[1](false)
            }
          : undefined
      }
    >
      <span className="frk-sr" aria-live="polite">
        {target.trim()}
      </span>
      <div className="frk-flap__cells" aria-hidden={true}>
        {shown.split("").map(function (ch?: any, i?: any): any {
          return (
            <span key={i} className={cx("frk-flap__cell", ch !== target[i] && "is-flipping")}>
              {ch === " " ? " " : ch}
            </span>
          )
        })}
      </div>
    </div>
  )
}

/* ---------- Deck: carrusel de cartas apiladas, se lanza deslizando ---------- */
