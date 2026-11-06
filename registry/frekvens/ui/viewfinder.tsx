"use client"
/* Frekvens · Viewfinder — MIT © Cris Olmedo */

import * as React from "react"
import { Chip } from "./chip"
import { DotMatrix } from "./dot-matrix"
import { Icon } from "./icon"
import { LED } from "./led"
import { Segmented } from "./segmented"
import { cx, useValue } from "./lib"

import type { ViewfinderProps } from "./types"
export type { ViewfinderProps }

const { useRef, useState, useEffect }: any = React

/* ---------- Viewfinder: cámara / escáner ---------- */
export function Viewfinder(props: ViewfinderProps): React.ReactElement
export function Viewfinder(p?: any): any {
  var md: any = useValue(
      {
        value: p.mode,
        defaultValue: p.defaultMode || "foto",
        onChange: p.onModeChange,
      },
      "foto",
    ),
    mode: any = md[0]
  var vid: any = useRef(null),
    f: any = useState(false),
    flash: any = f[0],
    setFlash: any = f[1],
    sh: any = useState(p.shots || 0),
    shots: any = sh[0]
  useEffect(
    function (): any {
      if (!p.live || !navigator.mediaDevices) return
      var stream: any
      navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: "environment",
          },
        })
        .then(function (s?: any): any {
          stream = s
          if (vid.current) vid.current.srcObject = s
        })
        .catch(function (): any {})
      return function (): any {
        stream &&
          stream.getTracks().forEach(function (t?: any): any {
            t.stop()
          })
      }
    },
    [p.live],
  )
  function shoot(): any {
    setFlash(true)
    setTimeout(function (): any {
      setFlash(false)
    }, 180)
    sh[1](shots + 1)
    p.onShoot && p.onShoot(mode)
  }
  return (
    <div
      className={cx("frk-cam", "is-" + mode, p.className)}
      style={{
        aspectRatio: p.ratio || "3 / 4",
      }}
    >
      <div className="frk-cam__view">
        {p.live ? (
          <video ref={vid} autoPlay={true} playsInline={true} muted={true} className="frk-cam__video" />
        ) : (
          p.children || (
            <DotMatrix
              shape="sun"
              grid={17}
              dot={9}
              pitch={14}
              tone="paper"
              showOff={true}
              label="Vista previa de cámara"
            />
          )
        )}
        <span className="frk-cam__grid" aria-hidden={true} />
        {mode === "escanear" ? (
          <span className="frk-cam__brackets" aria-hidden={true}>
            <i />
            <i />
            <i />
            <i />
          </span>
        ) : null}
        <span className={cx("frk-cam__flash", flash && "is-on")} aria-hidden={true} />
        <span className="frk-cam__hud">
          {mode === "vídeo" ? (
            <LED tone="rec">REC 00:00</LED>
          ) : mode === "escanear" ? (
            <Chip tone="sol">Apunta al código</Chip>
          ) : (
            <Chip tone="well" square={true}>
              1×
            </Chip>
          )}
        </span>
      </div>
      <div className="frk-cam__bar">
        <span className="frk-cam__thumb" aria-label={shots + " capturas"} role="img">
          {shots ? <b>{shots}</b> : null}
        </span>
        <button
          type="button"
          className={cx("frk-cam__shutter", mode === "vídeo" && "is-video")}
          aria-label={mode === "vídeo" ? "Grabar vídeo" : mode === "escanear" ? "Escanear" : "Hacer foto"}
          onClick={shoot}
        />
        <button
          type="button"
          className="frk-key frk-tone--well frk-key--s frk-key--round"
          aria-label="Cambiar de cámara"
        >
          <span className="frk-key__main">
            <Icon name="refresh" size={20} />
          </span>
        </button>
      </div>
      <div className="frk-cam__modes">
        <Segmented
          label="Modo"
          options={["foto", "vídeo", "escanear"].map(function (m?: any): any {
            return {
              value: m,
              label: m.charAt(0).toUpperCase() + m.slice(1),
            }
          })}
          value={mode}
          onChange={md[1]}
        />
      </div>
    </div>
  )
}

/* ---------- NoteEditor: bloques tipo cuaderno ---------- */
