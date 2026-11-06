"use client"
/* Frekvens · Tooltip — MIT © Cris Olmedo */

import * as React from "react"
import { cx } from "./lib"

import type { TooltipProps } from "./types"
export type { TooltipProps }

const R: any = React
const { useId, useState, useRef }: any = React

/* ---------- Tooltip ---------- */
export function Tooltip(props: TooltipProps): React.ReactElement
export function Tooltip(p?: any): any {
  var id: any = useId(),
    s: any = useState(false),
    open: any = s[0],
    setOpen: any = s[1],
    t: any = useRef(null)
  function show(): any {
    clearTimeout(t.current)
    t.current = setTimeout(
      function (): any {
        setOpen(true)
      },
      p.delay == null ? 400 : p.delay,
    )
  }
  function hide(): any {
    clearTimeout(t.current)
    setOpen(false)
  }
  var child: any = R.Children.only(p.children)
  return (
    <span
      className="frk-tip-wrap"
      onPointerEnter={show}
      onPointerLeave={hide}
      onFocus={show}
      onBlur={hide}
      onKeyDown={function (e?: any): any {
        if (e.key === "Escape") hide()
      }}
    >
      {R.cloneElement(child, {
        "aria-describedby": id,
      })}
      <span
        id={id}
        role="tooltip"
        className={cx("frk-tip", "frk-tip--" + (p.side || "top"), open && "is-in")}
      >
        {p.content}
      </span>
    </span>
  )
}

/* ---------- Avatar ---------- */
