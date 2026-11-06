"use client"
import { useEffect, useState } from "react"
import { Switch } from "@/registry/frekvens/ui/switch"

export function ThemeToggle() {
  const [dark, setDark] = useState(false)
  useEffect(() => { setDark(document.documentElement.getAttribute("data-theme") === "dark") }, [])
  return (
    <Switch label="Modo oscuro" checked={dark} onText="ON" offText="OFF" onChange={(on) => {
      setDark(on); document.documentElement.setAttribute("data-theme", on ? "dark" : "light")
      try { localStorage.setItem("frk-theme", on ? "dark" : "light") } catch {}
    }} />
  )
}
