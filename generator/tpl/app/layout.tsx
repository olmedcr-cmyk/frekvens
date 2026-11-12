import type { Metadata, Viewport } from "next"
import Link from "next/link"
import "./globals.css"
import { NavLinks } from "./nav-links"
import { Mark } from "./mark"
import { ThemePicker } from "./theme-picker"

export const metadata: Metadata = {
  title: "Frekvens — componentes React para copiar y pegar",
  description: "114 componentes accesibles al estilo shadcn/ui: botoneras grandes, puntos, instrumentos, conversación e IA. Código abierto, MIT.",
}

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#ffffff" }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="blanco" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem("frk-theme");if(t==="light"||t==="dark"||t==="blanco")document.documentElement.setAttribute("data-theme",t)}catch(e){}` }} />
      </head>
      <body>
        <div className="site">
          <header className="nav">
            <Link href="/" className="brand"><Mark />Frekvens</Link>
            <div className="nav__right"><NavLinks /><ThemePicker /></div>
          </header>
          <main>{children}</main>
          <footer className="foot">
            <span>Frekvens 0.1.0 · MIT · Cris Olmedo</span>
            <span className="foot__links"><a href="/llms.txt">llms.txt</a><a href="https://github.com/olmedcr-cmyk/frekvens">github.com/olmedcr-cmyk/frekvens</a></span>
          </footer>
        </div>
      </body>
    </html>
  )
}
