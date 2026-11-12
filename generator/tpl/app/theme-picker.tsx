"use client"
import { useEffect, useState } from "react"

// Tema de las piezas (no de la web, que es siempre blanca): un tema es solo un bloque de variables CSS.
const themes = [
  { id: "blanco", label: "Blanco" },
  { id: "light", label: "Papel" },
  { id: "dark", label: "Carbón" },
]

export function ThemePicker() {
  const [theme, setTheme] = useState("blanco")
  useEffect(() => { setTheme(document.documentElement.getAttribute("data-theme") || "blanco") }, [])
  const pick = (id: string) => {
    setTheme(id); document.documentElement.setAttribute("data-theme", id)
    try { localStorage.setItem("frk-theme", id) } catch {}
  }
  return (
    <div className="theme-picker" role="group" aria-label="Tema de las piezas">
      {themes.map((t) => <button key={t.id} type="button" aria-pressed={theme === t.id} onClick={() => pick(t.id)}>{t.label}</button>)}
    </div>
  )
}
