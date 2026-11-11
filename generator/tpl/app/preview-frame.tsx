"use client"
import { useEffect, useRef } from "react"

// La vista previa crece con su contenido: nada queda recortado dentro del marco.
export function PreviewFrame({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLIFrameElement>(null)
  useEffect(() => {
    const frame = ref.current
    if (!frame) return
    let ro: ResizeObserver | undefined
    let mo: MutationObserver | undefined
    const fit = () => {
      const doc = frame.contentDocument
      if (!doc?.body) return
      // El alto es el del contenido o el de lo que sobresale (un menú abierto), lo que sea mayor.
      let h = doc.body.getBoundingClientRect().height
      const root = doc.getElementById("root")
      const pad = (root && parseFloat(doc.defaultView?.getComputedStyle(root).paddingBottom || "0")) || 0
      for (const el of doc.querySelectorAll("#root *")) { const r = el.getBoundingClientRect(); if (r.width && r.height && r.bottom + pad > h) h = r.bottom + pad }
      if (h > 0) frame.style.height = Math.min(Math.max(Math.ceil(h), 200), 1600) + "px"
    }
    let raf = 0
    const later = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(fit) }
    const onLoad = () => {
      fit()
      const doc = frame.contentDocument
      if (!doc?.body) return
      if ("ResizeObserver" in window) { ro?.disconnect(); ro = new ResizeObserver(later); ro.observe(doc.body) }
      mo?.disconnect(); mo = new MutationObserver(later); mo.observe(doc.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "hidden", "open", "aria-expanded"] })
    }
    frame.addEventListener("load", onLoad)
    if (frame.contentDocument?.readyState === "complete") onLoad()
    return () => { frame.removeEventListener("load", onLoad); ro?.disconnect(); mo?.disconnect(); cancelAnimationFrame(raf) }
  }, [])
  return <iframe ref={ref} title={title} src={src} style={{ height: 320 }} />
}
