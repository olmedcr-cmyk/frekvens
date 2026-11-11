"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/componentes", label: "Componentes" },
  { href: "/ejemplos", label: "Ejemplos" },
  { href: "/instalar", label: "Instalar" },
]

export function NavLinks() {
  const path = usePathname()
  return (
    <nav className="nav__links" aria-label="Principal">
      {links.map((l) => (
        <Link key={l.href} href={l.href} aria-current={path === l.href || path.startsWith(l.href + "/") ? "page" : undefined}>{l.label}</Link>
      ))}
      <a href="https://github.com/olmedcr-cmyk/frekvens">GitHub</a>
    </nav>
  )
}
