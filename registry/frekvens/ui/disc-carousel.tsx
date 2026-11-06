"use client"
/* Frekvens · DiscCarousel — MIT © Cris Olmedo */

import * as React from "react"
import { cx, useValue } from "./lib"

import type { DiscCarouselProps } from "./types"
export type { DiscCarouselProps }

/* ---------- DiscCarousel: discos para elegir ---------- */
export function DiscCarousel(props: DiscCarouselProps): React.ReactElement
export function DiscCarousel(p?: any): any {
  var items: any = p.items || [],
    st: any = useValue(p, 0),
    v: any = st[0],
    n: any = items.length,
    size: any = p.size || 220
  function go(i?: any): any {
    st[1]((i + n) % n)
  }
  return (
    <div className={cx("frk-discs-wrap", p.className)}>
      <div
        className="frk-discs"
        role="listbox"
        aria-label={p.label || "Discos"}
        tabIndex={0}
        aria-activedescendant={"frk-disc-" + v}
        style={{
          height: size + 20,
        }}
        onKeyDown={function (e?: any): any {
          if (e.key === "ArrowRight") {
            e.preventDefault()
            go(v + 1)
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault()
            go(v - 1)
          }
          if (e.key === "Enter") p.onPlay && p.onPlay(v)
        }}
      >
        {items.map(function (it?: any, i?: any): any {
          var d: any = i - v
          if (d > n / 2) d -= n
          if (d < -n / 2) d += n
          var ad: any = Math.abs(d)
          if (ad > 2) return null
          return (
            <div
              key={i}
              id={"frk-disc-" + i}
              role="option"
              aria-selected={d === 0}
              aria-label={it.title + (it.subtitle ? ", " + it.subtitle : "")}
              className={cx("frk-disc", d === 0 && "is-on", d === 0 && p.playing && "is-spinning")}
              style={{
                width: size,
                height: size,
                transform: "translateX(" + d * size * 0.62 + "px) scale(" + (1 - ad * 0.22) + ")",
                zIndex: 10 - ad,
                opacity: ad === 2 ? 0.5 : 1,
              }}
              onClick={function (): any {
                d === 0 ? p.onPlay && p.onPlay(i) : go(i)
              }}
            >
              <span className="frk-disc__vinyl">
                <span className={cx("frk-disc__label", "frk-tone--" + (it.tone || "rams"))}>
                  {it.src ? (
                    <img src={it.src} alt="" />
                  ) : (
                    <span className="frk-disc__letter">{it.badge || it.title.charAt(0)}</span>
                  )}
                </span>
              </span>
            </div>
          )
        })}
      </div>
      {items[v] ? (
        <div className="frk-discs__meta" aria-live="polite">
          <span className="frk-discs__title">{items[v].title}</span>
          {items[v].subtitle ? <span className="frk-discs__sub">{items[v].subtitle}</span> : null}
        </div>
      ) : null}
    </div>
  )
}

/* ---------- Sidebar: navegación de escritorio/iPad ---------- */
