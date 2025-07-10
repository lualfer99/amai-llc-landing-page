import "./globals.css"
import { Montserrat } from "next/font/google"
import type { ReactNode } from "react"


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300","400","500","600","700","900"],
  display: "swap",           // <-- fuerza font-display: swap
})

export const metadata = {
  title: "AMAI",
  description: "Soluciones de IA …",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={montserrat.className} antialiased>
      <body>
        {children}
      </body>
    </html>
  )
}
