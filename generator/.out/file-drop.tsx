"use client"
/* Frekvens · FileDrop — MIT © Cris Olmedo */

import * as React from "react"
import { DotMatrix } from "./dot-matrix"
import { Icon } from "./icon"
import { cx, fmtSize } from "./lib"

import type { FileDropProps } from "./types"
export type { FileDropProps }

const { useState, useRef, useId, useEffect }: any = React

export function FileDrop(props: FileDropProps): React.ReactElement
export function FileDrop(p?: any): any {
  var s: any = useState(p.files || []),
    files: any = s[0],
    setFiles: any = s[1],
    d: any = useState(false),
    over: any = d[0],
    setOver: any = d[1],
    inp: any = useRef(null),
    id: any = useId()
  useEffect(
    function (): any {
      if (
        !files.some(function (f?: any): any {
          return f.progress < 100
        }) ||
        p.simulate === false
      )
        return
      var t: any = setInterval(function (): any {
        setFiles(function (fs?: any): any {
          return fs.map(function (f?: any): any {
            return f.progress < 100
              ? Object.assign({}, f, {
                  progress: Math.min(100, f.progress + 7 + Math.random() * 12),
                })
              : f
          })
        })
      }, 260)
      return function (): any {
        clearInterval(t)
      }
    },
    [
      files.some(function (f?: any): any {
        return f.progress < 100
      }),
    ],
  )
  function add(list?: any): any {
    var n: any = Array.prototype.map.call(list, function (f?: any): any {
      return {
        name: f.name,
        size: f.size,
        progress: 0,
      }
    })
    setFiles(files.concat(n))
    p.onFiles && p.onFiles(list)
  }
  var up: any = files.filter(function (f?: any): any {
      return f.progress < 100
    }),
    done: any = files.filter(function (f?: any): any {
      return f.progress >= 100
    })
  function row(f?: any, i?: any): any {
    var ok: any = f.progress >= 100
    return (
      <li key={f.name + i} className={cx("frk-file", ok && !f.error && "is-done", f.error && "is-error")}>
        <span className="frk-file__icon" aria-hidden={true}>
          <Icon name={f.error ? "close" : ok ? "check" : "copy"} size={18} />
        </span>
        <span className="frk-file__main">
          <span className="frk-file__name">{f.name}</span>
          <span className="frk-file__meta">
            {fmtSize(f.size || 0) + " · " + (f.error || (ok ? "Subido" : Math.round(f.progress) + " %"))}
          </span>
          {!ok && !f.error ? (
            <span
              className="frk-file__bar"
              role="progressbar"
              aria-label={"Subiendo " + f.name}
              aria-valuenow={Math.round(f.progress)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <span
                style={{
                  width: f.progress + "%",
                }}
              />
            </span>
          ) : null}
        </span>
        <button
          type="button"
          className="frk-file__x"
          aria-label={"Quitar " + f.name}
          onClick={function (): any {
            setFiles(
              files.filter(function (x?: any): any {
                return x !== f
              }),
            )
          }}
        >
          <Icon name="close" size={16} />
        </button>
      </li>
    )
  }
  return (
    <div className={cx("frk-drop-wrap", p.className)}>
      <label
        htmlFor={id}
        className={cx("frk-drop", over && "is-over")}
        onDragOver={function (e?: any): any {
          e.preventDefault()
          setOver(true)
        }}
        onDragLeave={function (): any {
          setOver(false)
        }}
        onDrop={function (e?: any): any {
          e.preventDefault()
          setOver(false)
          add(e.dataTransfer.files)
        }}
      >
        <DotMatrix shape={over ? "disc" : "ring"} grid={9} dot={5} pitch={8} showOff={true} label="" />
        <span className="frk-drop__title">
          {over ? "Suelta para subir" : p.title || "Arrastra archivos aquí"}
        </span>
        <span className="frk-drop__hint">{p.hint || "o toca para elegir · máx. 50 MB"}</span>
        <input
          id={id}
          ref={inp}
          type="file"
          multiple={p.multiple !== false}
          accept={p.accept}
          className="frk-sr"
          onChange={function (e?: any): any {
            add(e.target.files)
          }}
        />
      </label>
      {up.length ? (
        <div className="frk-file-sec">
          <span className="frk-field__label">{"Subiendo · " + up.length}</span>
          <ul>{up.map(row)}</ul>
        </div>
      ) : null}
      {done.length ? (
        <div className="frk-file-sec">
          <span className="frk-field__label">{"Listos · " + done.length}</span>
          <ul>{done.map(row)}</ul>
        </div>
      ) : null}
    </div>
  )
}

/* ---------- ChoiceCards: planes, paquetes, opciones grandes ---------- */
