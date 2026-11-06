"use client"
/* Frekvens · Reveal — MIT © Cris Olmedo */

import * as React from "react"
import { cx } from "./lib"

import type { RevealProps } from "./types"
export type { RevealProps }

const R: any = React
const { useRef, useState, useEffect }: any = React

/* ---------- Reveal: transiciones de entrada ---------- */
export function Reveal(props: RevealProps): React.ReactElement
export function Reveal(p?: any): any {
  var ref: any = useRef(null),
    s: any = useState(!!p.immediate && false),
    inView: any = s[0],
    setIn: any = s[1]
  useEffect(function (): any {
    var el: any = ref.current
    if (!el) return
    if (!("IntersectionObserver" in window)) {
      setIn(true)
      return
    }
    var io: any = new IntersectionObserver(
      function (es?: any): any {
        es.forEach(function (e?: any): any {
          if (e.isIntersecting) {
            setIn(true)
            if (p.once !== false) io.disconnect()
          } else if (p.once === false) setIn(false)
        })
      },
      {
        threshold: p.threshold || 0.15,
      },
    )
    io.observe(el)
    return function (): any {
      io.disconnect()
    }
  }, [])
  var kids: any = R.Children.toArray(p.children),
    stg: any = p.stagger == null ? 50 : p.stagger,
    Tag: any = p.as || "div"
  return (
    <Tag
      ref={ref}
      className={cx("frk-reveal", "frk-reveal--" + (p.variant || "rise"), inView && "is-in", p.className)}
      style={p.style}
    >
      {kids.map(function (k?: any, i?: any): any {
        return (
          <div
            key={i}
            className="frk-reveal__item"
            style={{
              transitionDelay: (p.delay || 0) + i * stg + "ms",
            }}
          >
            {k}
          </div>
        )
      })}
    </Tag>
  )
}

/* ---------- Layout primitives (para composición generativa) ---------- */
