"use client"
/* Frekvens · Viewport3D — MIT © Cris Olmedo */

import * as React from "react"
import { Segmented } from "./segmented"
import { clamp, cx, range } from "./lib"

import type { Viewport3DProps } from "./types"
export type { Viewport3DProps }

const { useState, useRef, useEffect }: any = React

/* ---------- Viewport3D: visor 3D en CSS, órbita con arrastre ---------- */
export function Viewport3D(props: Viewport3DProps): React.ReactElement
export function Viewport3D(p?: any): any {
  var r: any = useState({
      x: p.pitch != null ? p.pitch : -24,
      y: p.yaw != null ? p.yaw : 36,
      z: 1,
    }),
    v: any = r[0],
    setV: any = r[1],
    drag: any = useRef(null),
    ref: any = useRef(null)
  var presets: any = {
    iso: {
      x: -24,
      y: 36,
    },
    front: {
      x: 0,
      y: 0,
    },
    top: {
      x: -88,
      y: 0,
    },
  }
  useEffect(function (): any {
    var el: any = ref.current
    if (!el) return
    function w(e?: any): any {
      e.preventDefault()
      setV(function (o?: any): any {
        return Object.assign({}, o, {
          z: clamp(o.z * (e.deltaY > 0 ? 0.92 : 1.08), 0.5, 2),
        })
      })
    }
    el.addEventListener("wheel", w, {
      passive: false,
    })
    return function (): any {
      el.removeEventListener("wheel", w)
    }
  }, [])
  var size: any = p.size || 120,
    s2: any = size / 2,
    tone: any = p.tone || "rams",
    shape: any = p.shape || "cube"
  function face(tf?: any, t?: any, k?: any): any {
    return (
      <span
        key={k}
        className={"frk-3d__face frk-tone--" + t}
        style={{
          width: size,
          height: size,
          transform: tf + " translateZ(" + s2 + "px)",
        }}
      />
    )
  }
  var obj: any =
    shape === "stack"
      ? range(3).map(function (i?: any): any {
          return (
            <span
              key={i}
              className="frk-3d__obj"
              style={{
                transform: "translateY(" + -i * size * 0.36 + "px) scale3d(1, .3, 1)",
              }}
            >
              {face("rotateY(0)", (["rams", "sol", "klein"] as any)[i], 1)}
              {face("rotateY(90deg)", (["rams", "sol", "klein"] as any)[i], 2)}
              {face("rotateY(180deg)", (["rams", "sol", "klein"] as any)[i], 3)}
              {face("rotateY(-90deg)", (["rams", "sol", "klein"] as any)[i], 4)}
              {face("rotateX(90deg)", "paper", 5)}
            </span>
          )
        })
      : [
          <span key="c" className="frk-3d__obj">
            {face("rotateY(0)", tone, 1)}
            {face("rotateY(90deg)", "ink", 2)}
            {face("rotateY(180deg)", tone, 3)}
            {face("rotateY(-90deg)", "ink", 4)}
            {face("rotateX(90deg)", "sol", 5)}
            {face("rotateX(-90deg)", "ink", 6)}
          </span>,
        ]
  return (
    <div className={cx("frk-3d", p.className)}>
      <div
        ref={ref}
        className="frk-3d__stage"
        role="img"
        tabIndex={0}
        aria-label={(p.label || "Modelo 3D") + ". Arrastra o usa las flechas para girar; + y − para acercar."}
        style={{
          height: p.height || 320,
        }}
        onPointerDown={function (e?: any): any {
          drag.current = {
            x: e.clientX,
            y: e.clientY,
            v: v,
          }
          e.currentTarget.setPointerCapture(e.pointerId)
        }}
        onPointerMove={function (e?: any): any {
          if (!drag.current) return
          var d: any = drag.current
          setV({
            x: clamp(d.v.x - (e.clientY - d.y) * 0.4, -89, 89),
            y: d.v.y + (e.clientX - d.x) * 0.4,
            z: d.v.z,
          })
        }}
        onPointerUp={function (): any {
          drag.current = null
        }}
        onKeyDown={function (e?: any): any {
          var k: any = e.key,
            dv: any = (
              {
                ArrowLeft: [0, -8],
                ArrowRight: [0, 8],
                ArrowUp: [8, 0],
                ArrowDown: [-8, 0],
              } as any
            )[k]
          if (dv) {
            e.preventDefault()
            setV(
              Object.assign({}, v, {
                x: clamp(v.x + dv[0], -89, 89),
                y: v.y + dv[1],
              }),
            )
          }
          if (k === "+" || k === "=")
            setV(
              Object.assign({}, v, {
                z: clamp(v.z * 1.1, 0.5, 2),
              }),
            )
          if (k === "-")
            setV(
              Object.assign({}, v, {
                z: clamp(v.z / 1.1, 0.5, 2),
              }),
            )
        }}
      >
        <div
          className="frk-3d__cam"
          style={{
            transform: "scale(" + v.z + ") rotateX(" + v.x + "deg) rotateY(" + v.y + "deg)",
          }}
        >
          <span className="frk-3d__floor" />
          {obj}
        </div>
        <div className="frk-3d__gizmo" aria-hidden={true}>
          <span
            style={{
              transform: "rotateX(" + v.x + "deg) rotateY(" + v.y + "deg)",
            }}
          >
            <i className="x" />
            <i className="y" />
            <i className="z" />
          </span>
        </div>
      </div>
      <div className="frk-3d__bar">
        <Segmented
          label="Vista"
          options={[
            {
              value: "iso",
              label: "Iso",
            },
            {
              value: "front",
              label: "Frente",
            },
            {
              value: "top",
              label: "Arriba",
            },
          ]}
          value={null}
          onChange={function (k?: any): any {
            setV(
              Object.assign({}, presets[k], {
                z: v.z,
              }),
            )
          }}
        />
        <span className="frk-3d__read">
          {"X " +
            Math.round(v.x) +
            "° · Y " +
            Math.round(((v.y % 360) + 360) % 360) +
            "° · " +
            Math.round(v.z * 100) +
            "%"}
        </span>
      </div>
    </div>
  )
}

/* ---------- NumPad: introducir importes ---------- */
