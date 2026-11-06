"use client"
/* Frekvens · Render — MIT © Cris Olmedo */

import * as React from "react"
import { cx, parseLang } from "./lib"
import { CATALOG } from "./catalog"

import type { RenderProps } from "./types"
export type { RenderProps }

const R: any = React

/* ---------- Render: UI generativa desde JSON ---------- */
export function Render(props: RenderProps): React.ReactElement
export function Render(p?: any): any {
  var actions: any = p.actions || {}
  function bind(props?: any): any {
    var out: any = {}
    for (var k in props) {
      var val: any = props[k]
      if (typeof val === "string" && val.indexOf("action:") === 0) {
        ;(function (name?: any): any {
          out[k] = function (x?: any): any {
            var f: any = actions[name]
            f ? f(x) : console.warn("[Frekvens.Render] acción sin definir: " + name)
          }
        })(val.slice(7))
      } else if (val && typeof val === "object" && !Array.isArray(val) && val.type && k !== "style")
        out[k] = node(val, k)
      else if (Array.isArray(val) && k === "tabs")
        out[k] = val.map(function (t?: any): any {
          return Object.assign({}, t, {
            content: t.content && typeof t.content === "object" ? node(t.content) : t.content,
          })
        })
      else if (Array.isArray(val) && k === "drawers")
        out[k] = val.map(function (t?: any): any {
          return Object.assign({}, t, {
            content: t.content && typeof t.content === "object" ? node(t.content) : t.content,
          })
        })
      else out[k] = val
    }
    return out
  }
  function node(n?: any, key?: any): any {
    if (n == null || n === false) return null
    if (typeof n === "string" || typeof n === "number") return n
    if (Array.isArray(n))
      return n.map(function (c?: any, i?: any): any {
        return node(c, i)
      })
    if (n.type === "__Pending") return <span key={key} className="frk-pending" aria-hidden={true} />
    var C: any = (p.components || CATALOG)[n.type]
    if (!C || n.type === "Render")
      return (
        <div key={key} className="frk-unknown" role="note">
          {"Componente desconocido: " + n.type}
        </div>
      )
    var kids: any =
      n.children == null
        ? undefined
        : Array.isArray(n.children)
          ? n.children.map(function (c?: any, i?: any): any {
              return node(c, i)
            })
          : node(n.children)
    var el: any = <C {...bind(n.props || {})}>{kids}</C>
    return key != null
      ? R.cloneElement(el, {
          key: key,
        })
      : el
  }
  var spec: any = p.lang != null ? parseLang(p.lang) : p.spec
  if (typeof spec === "string") {
    try {
      spec = JSON.parse(spec)
    } catch (e) {
      return (
        <div className="frk-unknown" role="alert">
          Spec JSON no válido
        </div>
      )
    }
  }
  return <div className={cx("frk-render", p.className)}>{node(spec, "root")}</div>
}

/* ================= Frekvens 4: medios, tickers, carrusel, agente, formularios, feedback, navegación ================= */
