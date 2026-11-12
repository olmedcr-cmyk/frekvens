"use client"
/* Frekvens · Article — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { cx } from "./lib"

import type { ArticleProps } from "./types"
export type { ArticleProps }

/* ---------- Article: tarjeta partida, texto arriba y bloque de arte abajo ---------- */
export function Article(props: ArticleProps): React.ReactElement
export function Article(p?: any): any {
  var Tag: any = p.href ? "a" : p.onClick ? "button" : "article"
  return (
    <Tag
      href={p.href}
      type={Tag === "button" ? "button" : undefined}
      onClick={p.onClick}
      className={cx("frk-article", p.className)}
    >
      <span className="frk-article__body">
        {p.date || p.category ? (
          <span className="frk-article__meta">
            <span>{p.date}</span>
            <span>{p.category}</span>
          </span>
        ) : null}
        <span className="frk-article__title">{p.title}</span>
        {Tag !== "article" ? (
          <span className="frk-article__go" aria-hidden={true}>
            <Icon name="arrow-right" size={18} />
          </span>
        ) : null}
      </span>
      <span className={cx("frk-article__art", "frk-tone--" + (p.tone || "ink"))}>{p.children}</span>
    </Tag>
  )
}

/* ---------- Capsule: bloque en forma de estadio para abrir o cerrar una página ---------- */
