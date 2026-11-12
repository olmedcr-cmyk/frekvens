"use client"
/* Frekvens · Onboarding — MIT © Cris Olmedo */

import * as React from "react"
import { KeyButton } from "./key-button"
import { clamp, cx, useValue } from "./lib"

import type { OnboardingProps } from "./types"
export type { OnboardingProps }

/* ---------- Onboarding: bienvenida por pasos (arte + tarjeta de texto + guiones + tecla redonda) ---------- */
export function Onboarding(props: OnboardingProps): React.ReactElement
export function Onboarding(p?: any): any {
  var slides: any = p.slides || [],
    n: any = slides.length,
    st: any = useValue(p, 0),
    i: any = clamp(st[0], 0, Math.max(0, n - 1)),
    s: any = slides[i] || {},
    last: any = i === n - 1
  function go(k?: any): any {
    if (k >= n) {
      if (p.onDone) p.onDone()
      return
    }
    st[1](clamp(k, 0, n - 1))
  }
  return (
    <section
      className={cx("frk-onb", p.className)}
      aria-label={p.label || "Bienvenida"}
      onKeyDown={function (e?: any): any {
        if (e.key === "ArrowRight" && !last) go(i + 1)
        else if (e.key === "ArrowLeft" && i > 0) go(i - 1)
      }}
    >
      <div className="frk-onb__stage" aria-live="polite">
        <div className="frk-onb__slide" key={i}>
          <div className={cx("frk-onb__art", "frk-tone--" + (s.artTone || "surface"))}>{s.art}</div>
          <div className={cx("frk-onb__card", "frk-tone--" + (s.tone || "sol"))}>
            {s.eyebrow ? <p className="frk-onb__eyebrow">{s.eyebrow}</p> : null}
            <h2 className="frk-onb__title">{s.title}</h2>
            {s.text ? <p className="frk-onb__text">{s.text}</p> : null}
          </div>
        </div>
      </div>
      <div className="frk-onb__foot">
        {i > 0 ? (
          <button
            type="button"
            className="frk-onb__link"
            onClick={function (): any {
              go(i - 1)
            }}
          >
            {p.backLabel || "Atrás"}
          </button>
        ) : p.onSkip ? (
          <button type="button" className="frk-onb__link" onClick={p.onSkip}>
            {p.skipLabel || "Saltar"}
          </button>
        ) : (
          <span className="frk-onb__link" aria-hidden={true} />
        )}
        <div className="frk-onb__dashes" role="img" aria-label={"Paso " + (i + 1) + " de " + n}>
          {slides.map(function (_?: any, k?: any): any {
            return <span key={k} className={cx("frk-onb__dash", k === i && "is-on")} />
          })}
        </div>
        <KeyButton
          tone={last ? "klein" : "ink"}
          shape="round"
          size="s"
          icon={last ? "check" : "arrow-right"}
          aria-label={last ? p.doneLabel || "Empezar" : p.nextLabel || "Siguiente"}
          onClick={function (): any {
            go(i + 1)
          }}
        />
      </div>
    </section>
  )
}

/* ---------- Article: tarjeta partida, texto arriba y bloque de arte abajo ---------- */
