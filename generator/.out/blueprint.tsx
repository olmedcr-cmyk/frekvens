"use client"
/* Frekvens · Blueprint — MIT © Cris Olmedo */

import * as React from "react"
import { Icon } from "./icon"
import { Segmented } from "./segmented"
import { clamp, cx } from "./lib"

import type { BlueprintProps } from "./types"
export type { BlueprintProps }

const { useState, useRef, useEffect }: any = React

/* ---------- Blueprint: lienzo de plano con rejilla de puntos ---------- */
export function Blueprint(props: BlueprintProps): React.ReactElement
export function Blueprint(p?: any): any {
  var g: any = p.grid || 10,
    major: any = g * (p.majorEvery || 5)
  var ns: any = useState(p.nodes || []),
    nodes: any = ns[0],
    setNodes: any = ns[1]
  var vw: any = useState({
      x: 40,
      y: 30,
      z: 1,
    }),
    view: any = vw[0],
    setView: any = vw[1]
  var sl: any = useState(p.nodes && p.nodes[0] ? p.nodes[0].id : null),
    sel: any = sl[0],
    setSel: any = sl[1]
  var cur: any = useState(null),
    cursor: any = cur[0],
    setCursor: any = cur[1]
  var tl: any = useState("select"),
    tool: any = tl[0],
    setTool: any = tl[1]
  var box: any = useRef(null),
    seq: any = useRef(100)
  function snap(v?: any): any {
    return p.snap === false ? v : Math.round(v / g) * g
  }
  function world(e?: any): any {
    var r: any = box.current.getBoundingClientRect()
    return {
      x: (e.clientX - r.left - 24 - view.x) / view.z,
      y: (e.clientY - r.top - 24 - view.y) / view.z,
    }
  }
  useEffect(function (): any {
    var el: any = box.current
    if (!el) return
    function w(e?: any): any {
      e.preventDefault()
      var r: any = el.getBoundingClientRect(),
        mx: any = e.clientX - r.left - 24,
        my: any = e.clientY - r.top - 24
      setView(function (v?: any): any {
        if (
          e.ctrlKey ||
          e.metaKey ||
          (!e.shiftKey && Math.abs(e.deltaY) > Math.abs(e.deltaX) && p.wheelZoom !== false)
        ) {
          var z: any = clamp(v.z * (e.deltaY > 0 ? 0.9 : 1.1), 0.3, 3)
          return {
            x: mx - ((mx - v.x) * z) / v.z,
            y: my - ((my - v.y) * z) / v.z,
            z: z,
          }
        }
        return {
          x: v.x - e.deltaX,
          y: v.y - e.deltaY,
          z: v.z,
        }
      })
    }
    el.addEventListener("wheel", w, {
      passive: false,
    })
    return function (): any {
      el.removeEventListener("wheel", w)
    }
  }, [])
  function bgDown(e?: any): any {
    if (e.target.closest(".frk-bp__node") || e.target.closest(".frk-bp__ui")) return
    if (tool === "note") {
      var wpt: any = world(e),
        id: any = "n" + seq.current++
      setNodes(
        nodes.concat([
          {
            id: id,
            x: snap(wpt.x - 60),
            y: snap(wpt.y - 30),
            w: 120,
            h: 60,
            title: "Nota",
            tone: "sol",
          },
        ]),
      )
      setSel(id)
      setTool("select")
      return
    }
    setSel(null)
    var s0: any = {
      x: e.clientX,
      y: e.clientY,
      v: view,
    }
    e.currentTarget.setPointerCapture(e.pointerId)
    function mv(ev?: any): any {
      setView({
        x: s0.v.x + ev.clientX - s0.x,
        y: s0.v.y + ev.clientY - s0.y,
        z: s0.v.z,
      })
    }
    function up(): any {
      window.removeEventListener("pointermove", mv)
      window.removeEventListener("pointerup", up)
    }
    window.addEventListener("pointermove", mv)
    window.addEventListener("pointerup", up)
  }
  function nodeDown(e?: any, n?: any): any {
    e.stopPropagation()
    setSel(n.id)
    var s0: any = {
      x: e.clientX,
      y: e.clientY,
      nx: n.x,
      ny: n.y,
    }
    function mv(ev?: any): any {
      var dx: any = (ev.clientX - s0.x) / view.z,
        dy: any = (ev.clientY - s0.y) / view.z
      setNodes(function (ns2?: any): any {
        return ns2.map(function (m?: any): any {
          return m.id === n.id
            ? Object.assign({}, m, {
                x: snap(s0.nx + dx),
                y: snap(s0.ny + dy),
              })
            : m
        })
      })
    }
    function up(): any {
      window.removeEventListener("pointermove", mv)
      window.removeEventListener("pointerup", up)
      p.onChange && p.onChange(nodes)
    }
    window.addEventListener("pointermove", mv)
    window.addEventListener("pointerup", up)
  }
  function nodeKey(e?: any, n?: any): any {
    var st: any = e.shiftKey ? major : g,
      d: any = (
        {
          ArrowLeft: [-st, 0],
          ArrowRight: [st, 0],
          ArrowUp: [0, -st],
          ArrowDown: [0, st],
        } as any
      )[e.key]
    if (d) {
      e.preventDefault()
      setNodes(
        nodes.map(function (m?: any): any {
          return m.id === n.id
            ? Object.assign({}, m, {
                x: m.x + d[0],
                y: m.y + d[1],
              })
            : m
        }),
      )
    }
    if (e.key === "Delete" || e.key === "Backspace") {
      setNodes(
        nodes.filter(function (m?: any): any {
          return m.id !== n.id
        }),
      )
      setSel(null)
    }
  }
  function zoom(f?: any): any {
    setView(function (v?: any): any {
      var r: any = box.current.getBoundingClientRect(),
        mx: any = (r.width - 24) / 2,
        my: any = (r.height - 24) / 2,
        z: any = clamp(f === 0 ? 1 : v.z * f, 0.3, 3)
      return {
        x: mx - ((mx - v.x) * z) / v.z,
        y: my - ((my - v.y) * z) / v.z,
        z: z,
      }
    })
  }
  var byId: any = {}
  nodes.forEach(function (n?: any): any {
    byId[n.id] = n
  })
  var edges: any = (p.edges || [])
    .filter(function (e?: any): any {
      return byId[e.from] && byId[e.to]
    })
    .map(function (e?: any, i?: any): any {
      var a: any = byId[e.from],
        b: any = byId[e.to],
        x1: any = a.x + a.w,
        y1: any = a.y + a.h / 2,
        x2: any = b.x,
        y2: any = b.y + b.h / 2
      if (x2 < x1) {
        x1 = a.x + a.w / 2
        y1 = a.y + a.h
        x2 = b.x + b.w / 2
        y2 = b.y
        var my: any = (y1 + y2) / 2
        return (
          <g key={i}>
            <path
              d={"M" + x1 + " " + y1 + " V" + my + " H" + x2 + " V" + y2}
              className="frk-bp__edge"
              markerEnd="url(#frk-bp-arrow)"
            />
            {e.label ? (
              <text x={(x1 + x2) / 2} y={my - 6} className="frk-bp__elabel" textAnchor="middle">
                {e.label}
              </text>
            ) : null}
          </g>
        )
      }
      var mx: any = snap((x1 + x2) / 2)
      return (
        <g key={i}>
          <path
            d={"M" + x1 + " " + y1 + " H" + mx + " V" + y2 + " H" + x2}
            className="frk-bp__edge"
            markerEnd="url(#frk-bp-arrow)"
          />
          {e.label ? (
            <text x={mx + 6} y={(y1 + y2) / 2} className="frk-bp__elabel">
              {e.label}
            </text>
          ) : null}
        </g>
      )
    })
  var S: any = byId[sel],
    u: any = p.unit || "mm",
    k: any = p.unitPerGrid || 1
  function U(v?: any): any {
    return Math.round((v / g) * k * 10) / 10
  }
  /* rulers */
  var Rw: any = 1600,
    step: any = g * view.z * (view.z < 0.6 ? 5 : 1),
    first: any = -Math.floor(view.x / step) * step,
    ticksX: any = [],
    ticksY: any = []
  for (var tx: any = (view.x % step) - step; tx < Rw; tx += step) {
    var wx: any = Math.round((tx - view.x) / view.z)
    ticksX.push(
      <g key={"x" + tx}>
        <line x1={tx} y1={Math.round(wx / g) % 5 === 0 ? 8 : 16} x2={tx} y2={24} />
        {Math.round(wx / g) % 5 === 0 ? (
          <text x={tx + 3} y={10}>
            {U(wx)}
          </text>
        ) : null}
      </g>,
    )
  }
  for (var ty: any = (view.y % step) - step; ty < 1200; ty += step) {
    var wy: any = Math.round((ty - view.y) / view.z)
    ticksY.push(
      <g key={"y" + ty}>
        <line y1={ty} x1={Math.round(wy / g) % 5 === 0 ? 8 : 16} y2={ty} x2={24} />
        {Math.round(wy / g) % 5 === 0 ? (
          <text y={ty - 3} x={3} transform={"rotate(-90 3 " + (ty - 3) + ")"}>
            {U(wy)}
          </text>
        ) : null}
      </g>,
    )
  }
  var gz: any = g * view.z,
    mz: any = major * view.z
  return (
    <div
      ref={box}
      className={cx("frk-bp", "is-" + tool, p.className)}
      style={{
        height: p.height || 520,
      }}
      role="application"
      aria-label={
        (p.label || "Plano") +
        ". Arrastra el fondo para moverte, rueda para acercar; los elementos se mueven con flechas (Mayús = paso grande)."
      }
      onPointerMove={function (e?: any): any {
        var w: any = world(e)
        setCursor({
          x: w.x,
          y: w.y,
        })
      }}
      onPointerLeave={function (): any {
        setCursor(null)
      }}
    >
      <div
        className="frk-bp__canvas"
        onPointerDown={bgDown}
        style={{
          backgroundSize: gz + "px " + gz + "px, " + mz + "px " + mz + "px, " + mz + "px " + mz + "px",
          backgroundPosition:
            view.x +
            "px " +
            view.y +
            "px, " +
            view.x +
            "px " +
            view.y +
            "px, " +
            view.x +
            "px " +
            view.y +
            "px",
        }}
      >
        <div
          className="frk-bp__world"
          style={{
            transform: "translate(" + view.x + "px," + view.y + "px) scale(" + view.z + ")",
          }}
        >
          <svg
            className="frk-bp__edges"
            width={1}
            height={1}
            style={{
              overflow: "visible",
            }}
            aria-hidden={true}
          >
            <defs>
              <marker
                id="frk-bp-arrow"
                viewBox="0 0 10 10"
                refX={9}
                refY={5}
                markerWidth={7}
                markerHeight={7}
                orient="auto-start-reverse"
              >
                <path d="M0 0 L10 5 L0 10 z" className="frk-bp__arrowhead" />
              </marker>
            </defs>
            {edges}
            {S ? (
              <g className="frk-bp__dims">
                <line x1={S.x} y1={S.y - 14} x2={S.x + S.w} y2={S.y - 14} />
                <line x1={S.x} y1={S.y - 19} x2={S.x} y2={S.y - 9} />
                <line x1={S.x + S.w} y1={S.y - 19} x2={S.x + S.w} y2={S.y - 9} />
                <text x={S.x + S.w / 2} y={S.y - 18} textAnchor="middle">
                  {U(S.w) + " " + u}
                </text>
                <line x1={S.x + S.w + 14} y1={S.y} x2={S.x + S.w + 14} y2={S.y + S.h} />
                <line x1={S.x + S.w + 9} y1={S.y} x2={S.x + S.w + 19} y2={S.y} />
                <line x1={S.x + S.w + 9} y1={S.y + S.h} x2={S.x + S.w + 19} y2={S.y + S.h} />
                <text x={S.x + S.w + 22} y={S.y + S.h / 2 + 4}>
                  {U(S.h) + " " + u}
                </text>
              </g>
            ) : null}
          </svg>
          {nodes.map(function (n?: any): any {
            return (
              <div
                key={n.id}
                tabIndex={0}
                role="button"
                aria-pressed={sel === n.id}
                aria-label={
                  n.title + ", " + U(n.w) + " por " + U(n.h) + " " + u + ", en " + U(n.x) + ", " + U(n.y)
                }
                className={cx(
                  "frk-bp__node",
                  "frk-tone--" + (n.tone || "surface"),
                  n.kind && "is-" + n.kind,
                  sel === n.id && "is-sel",
                )}
                style={{
                  left: n.x,
                  top: n.y,
                  width: n.w,
                  height: n.h,
                }}
                onPointerDown={function (e?: any): any {
                  nodeDown(e, n)
                }}
                onFocus={function (): any {
                  setSel(n.id)
                }}
                onKeyDown={function (e?: any): any {
                  nodeKey(e, n)
                }}
              >
                <span className="frk-bp__ntitle">{n.title}</span>
                {n.text ? <span className="frk-bp__ntext">{n.text}</span> : null}
                {sel === n.id
                  ? [0, 1, 2, 3].map(function (q?: any): any {
                      return (
                        <span key={q} className={"frk-bp__handle frk-bp__handle--" + q} aria-hidden={true} />
                      )
                    })
                  : null}
              </div>
            )
          })}
        </div>
      </div>
      <svg className="frk-bp__ruler frk-bp__ruler--x" aria-hidden={true}>
        {ticksX}
      </svg>
      <svg className="frk-bp__ruler frk-bp__ruler--y" aria-hidden={true}>
        {ticksY}
      </svg>
      <span className="frk-bp__corner" aria-hidden={true}>
        {u}
      </span>
      <div className="frk-bp__ui frk-bp__tools">
        <Segmented
          label="Herramienta"
          value={tool}
          onChange={setTool}
          options={[
            {
              value: "select",
              label: "Mover",
            },
            {
              value: "note",
              label: "+ Nota",
            },
          ]}
        />
      </div>
      <div className="frk-bp__ui frk-bp__zoom">
        <button
          type="button"
          aria-label="Alejar"
          onClick={function (): any {
            zoom(1 / 1.2)
          }}
        >
          <Icon name="minus" size={16} />
        </button>
        <button
          type="button"
          aria-label="Zoom al 100 %"
          className="frk-bp__pct"
          onClick={function (): any {
            zoom(0)
          }}
        >
          {Math.round(view.z * 100) + "%"}
        </button>
        <button
          type="button"
          aria-label="Acercar"
          onClick={function (): any {
            zoom(1.2)
          }}
        >
          <Icon name="plus" size={16} />
        </button>
      </div>
      <div className="frk-bp__ui frk-bp__hud" aria-live="off">
        {cursor
          ? "X " + U(cursor.x) + " · Y " + U(cursor.y) + " " + u
          : S
            ? S.title + " · " + U(S.x) + ", " + U(S.y) + " " + u
            : nodes.length + " elementos"}
      </div>
    </div>
  )
}

/* ---------- AreaChart: área en semitono ---------- */
