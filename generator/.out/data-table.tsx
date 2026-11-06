"use client"
/* Frekvens · DataTable — MIT © Cris Olmedo */

import * as React from "react"
import { Avatar } from "./avatar"
import { Checkbox } from "./checkbox"
import { Chip } from "./chip"
import { EmptyState } from "./empty-state"
import { Icon } from "./icon"
import { Sparkline } from "./sparkline"
import { clamp, cx } from "./lib"

import type { DataTableProps } from "./types"
export type { DataTableProps }

const { useState }: any = React

/* ---------- DataTable ---------- */
export function DataTable(props: DataTableProps): React.ReactElement
export function DataTable(p?: any): any {
  var cols: any = p.columns || [],
    rows: any = p.rows || [],
    so: any = useState(p.defaultSort || null),
    sort: any = so[0],
    setSort: any = so[1]
  var se: any = useState({}),
    sel: any = se[0],
    setSel: any = se[1]
  var data: any = rows.slice()
  var pg: any = useState(0),
    page: any = pg[0],
    ps: any = p.pageSize || 0
  if (sort)
    data.sort(function (a?: any, b?: any): any {
      var x: any = a[sort.key],
        y: any = b[sort.key]
      var r: any = typeof x === "number" ? x - y : String(x).localeCompare(String(y), "es")
      return sort.dir === "desc" ? -r : r
    })
  var allOn: any =
    rows.length &&
    rows.every(function (r?: any, i?: any): any {
      return sel[r.id != null ? r.id : i]
    })
  function cell(c?: any, r?: any): any {
    var v: any = r[c.key]
    if (c.type === "status")
      return (
        <Chip tone={(c.tones && c.tones[v]) || "well"} dot={true}>
          {v}
        </Chip>
      )
    if (c.type === "spark") return <Sparkline data={v} width={72} height={22} label={c.label} />
    if (c.type === "bar")
      return (
        <span className="frk-table__bar">
          <span
            style={{
              width: clamp(v, 0, 100) + "%",
            }}
          />
        </span>
      )
    if (c.type === "avatar")
      return (
        <span className="frk-table__who">
          <Avatar name={v} size={28} />
          {v}
        </span>
      )
    return v
  }
  if (!rows.length)
    return <EmptyState compact={true} title={p.emptyTitle || "Sin resultados"} text={p.emptyText} />
  return (
    <div className={cx("frk-table-wrap", p.className)} role="region" aria-label={p.label} tabIndex={0}>
      <table className={cx("frk-table", p.dense && "is-dense")}>
        {p.caption ? <caption className="frk-sr">{p.caption}</caption> : null}
        <thead>
          <tr>
            {p.selectable ? (
              <th className="frk-table__check">
                <Checkbox
                  ariaLabel="Seleccionar todo"
                  label={<span className="frk-sr">Seleccionar todo</span>}
                  checked={!!allOn}
                  indeterminate={
                    !allOn &&
                    Object.keys(sel).some(function (k?: any): any {
                      return sel[k]
                    })
                  }
                  onChange={function (on?: any): any {
                    var n: any = {}
                    rows.forEach(function (r?: any, i?: any): any {
                      n[r.id != null ? r.id : i] = on
                    })
                    setSel(n)
                  }}
                />
              </th>
            ) : null}
            {cols.map(function (c?: any): any {
              var on: any = sort && sort.key === c.key
              return (
                <th
                  key={c.key}
                  scope="col"
                  className={cx(c.align === "end" && "is-end")}
                  aria-sort={
                    on ? (sort.dir === "asc" ? "ascending" : "descending") : c.sortable ? "none" : undefined
                  }
                >
                  {c.sortable ? (
                    <button
                      type="button"
                      className={cx("frk-table__sort", on && "is-on")}
                      onClick={function (): any {
                        setSort({
                          key: c.key,
                          dir: on && sort.dir === "asc" ? "desc" : "asc",
                        })
                      }}
                    >
                      {c.label}
                      <span className="frk-table__arrow" aria-hidden={true}>
                        {on ? (sort.dir === "asc" ? "▲" : "▼") : "△"}
                      </span>
                    </button>
                  ) : (
                    c.label
                  )}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {(function (): any {
            var view: any = ps ? data.slice(page * ps, page * ps + ps) : data,
              out: any = [],
              lastG: any
            view.forEach(function (r?: any, i?: any): any {
              if (p.groupBy && r[p.groupBy] !== lastG) {
                lastG = r[p.groupBy]
                out.push(
                  <tr key={"g" + lastG} className="frk-table__group">
                    <th scope="rowgroup" colSpan={cols.length + (p.selectable ? 1 : 0)}>
                      {lastG}
                    </th>
                  </tr>,
                )
              }
              out.push(row(r, i))
            })
            return out
          })()}
        </tbody>
      </table>
      {ps && data.length > ps ? (
        <div className="frk-table__pager">
          <span>{page * ps + 1 + "–" + Math.min(data.length, page * ps + ps) + " de " + data.length}</span>
          <div className="frk-pager__btns">
            <button
              type="button"
              className="frk-key frk-tone--well frk-key--s frk-key--round"
              aria-label="Página anterior"
              disabled={page === 0}
              onClick={function (): any {
                pg[1](page - 1)
              }}
            >
              <span className="frk-key__main">
                <Icon name="arrow-left" size={18} />
              </span>
            </button>
            <button
              type="button"
              className="frk-key frk-tone--well frk-key--s frk-key--round"
              aria-label="Página siguiente"
              disabled={(page + 1) * ps >= data.length}
              onClick={function (): any {
                pg[1](page + 1)
              }}
            >
              <span className="frk-key__main">
                <Icon name="arrow-right" size={18} />
              </span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
  function row(r?: any, i?: any): any {
    var id: any = r.id != null ? r.id : i
    return (
      <tr
        key={id}
        className={cx(sel[id] && "is-sel")}
        onClick={
          p.onRowClick
            ? function (): any {
                p.onRowClick(r)
              }
            : undefined
        }
      >
        {p.selectable ? (
          <td className="frk-table__check">
            <Checkbox
              ariaLabel={"Seleccionar fila " + r[cols[0].key]}
              label={<span className="frk-sr">{"Seleccionar fila " + r[cols[0].key]}</span>}
              checked={!!sel[id]}
              onChange={function (on?: any): any {
                var n: any = Object.assign({}, sel)
                n[id] = on
                setSel(n)
              }}
            />
          </td>
        ) : null}
        {cols.map(function (c?: any): any {
          return (
            <td key={c.key} className={cx(c.align === "end" && "is-end", c.mono && "is-mono")}>
              {cell(c, r)}
            </td>
          )
        })}
      </tr>
    )
  }
}

/* ---------- CommandBar: paleta ⌘K ---------- */
