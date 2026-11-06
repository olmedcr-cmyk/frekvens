import type { Metadata } from "next"
import Link from "next/link"
import "./globals.css"
import { ThemeToggle } from "./theme-toggle"

export const metadata: Metadata = {
  title: "Frekvens — componentes React para copiar y pegar",
  description: "114 componentes accesibles al estilo shadcn/ui: botoneras grandes, puntos, instrumentos, conversación e IA. Código abierto, MIT.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('frk-theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.setAttribute('data-theme',t==='dark'||(t!=='light'&&d)?'dark':'light')}catch(e){}` }} />
      </head>
      <body>
        <div className="site">
          <nav className="site__nav" aria-label="Principal">
            <Link href="/">Frekvens</Link>
            <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
              <Link href="/componentes">Componentes</Link>
              <Link href="/instalar">Instalar</Link>
              <a href="https://github.com/olmedcr-cmyk/frekvens">GitHub</a>
              <ThemeToggle />
            </div>
          </nav>
          {children}
        </div>
      </body>
    </html>
  )
}
