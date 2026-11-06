"use client"
/* Frekvens · Sortable — MIT © Cris Olmedo */

import * as React from "react"
import { Board } from "./board"

import type { SortableProps } from "./types"
export type { SortableProps }

export function Sortable(props: SortableProps): React.ReactElement
export function Sortable(p?: any): any {
  return (
    <Board
      variant="list"
      columns={[
        {
          id: "list",
          title: p.label || "Lista",
          items: p.items || [],
        },
      ]}
      onChange={function (c?: any): any {
        p.onChange && p.onChange(c[0].items)
      }}
      className={p.className}
    />
  )
}

/* ---------- Blueprint: lienzo de plano con rejilla de puntos ---------- */
