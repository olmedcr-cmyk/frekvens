import type { Metadata, Viewport } from "next"
import Link from "next/link"
import "./globals.css"
import { NavLinks } from "./nav-links"
import { Mark } from "./mark"

export const metadata: Metadata = {
  title: "Frekvens — componentes React para copiar y pegar",
  description: "114 componentes accesibles al estilo shadcn/ui: botoneras grandes, puntos, instrumentos, conversación e IA. Código abierto, MIT.",
}

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#ffffff" }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="light">
      <body>
        <div className="site">
          <header className="nav">
            <Link href="/" className="brand"><Mark />Frekvens</Link>
            <NavLinks />
          </header>
          <main>{children}</main>
          <footer className="foot">
            <span>Frekvens 0.1.0 · MIT · Cris Olmedo</span>
            <a href="https://github.com/olmedcr-cmyk/frekvens">github.com/olmedcr-cmyk/frekvens</a>
          </footer>
        </div>
      </body>
    </html>
  )
}
