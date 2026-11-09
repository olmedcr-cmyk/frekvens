"use client"
import { useEffect, useRef } from "react"

// La vista previa crece con su contenido: nada queda recortado dentro del marco.
export function PreviewFrame({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLIFrameElement>(null)
  useEffect(() => {
    const frame = ref.current
    if (!frame) return
    let ro: ResizeObserver | undefined
    const fit = () => {
      const doc = frame.contentDocument
      if (!doc?.body) return
      const h = Math.ceil(doc.body.getBoundingClientRect().height)
      if (h > 0) frame.style.height = Math.min(Math.max(h, 200), 1600) + "px"
    }
    const onLoad = () => {
      fit()
      const doc = frame.contentDocument
      if (doc?.body && "ResizeObserver" in window) { ro?.disconnect(); ro = new ResizeObserver(fit); ro.observe(doc.body) }
    }
    frame.addEventListener("load", onLoad)
    if (frame.contentDocument?.readyState === "complete") onLoad()
    return () => { frame.removeEventListener("load", onLoad); ro?.disconnect() }
  }, [])
  return <iframe ref={ref} title={title} src={src} style={{ height: 320 }} />
}
