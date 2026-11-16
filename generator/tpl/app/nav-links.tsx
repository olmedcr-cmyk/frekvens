"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const es = [
  { href: "/componentes", label: "Componentes" },
  { href: "/ejemplos", label: "Ejemplos" },
  { href: "/instalar", label: "Instalar" },
]
const en = [
  { href: "/componentes", label: "Components" },
  { href: "/ejemplos", label: "Examples" },
  { href: "/en/install", label: "Install" },
]

export function NavLinks() {
  const path = usePathname()
  const isEn = path === "/en" || path.startsWith("/en/")
  const links = isEn ? en : es
  return (
    <nav className="nav__links" aria-label={isEn ? "Main" : "Principal"} lang={isEn ? "en" : undefined}>
      {links.map((l) => (
        <Link key={l.href} href={l.href} aria-current={path === l.href || path.startsWith(l.href + "/") ? "page" : undefined}>{l.label}</Link>
      ))}
      <a href="https://github.com/olmedcr-cmyk/frekvens">GitHub</a>
      {isEn
        ? <Link href="/" lang="es" hrefLang="es" title="Español">ES</Link>
        : <Link href="/en" lang="en" hrefLang="en" title="English">EN</Link>}
    </nav>
  )
}
