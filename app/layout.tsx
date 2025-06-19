import "./globals.css"
import { Montserrat } from "next/font/google"
import type { ReactNode } from "react"
import "react-phone-input-2/lib/style.css"


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300","400","500","600","700","900"],
  style: ["normal","italic"],
  display: "swap",           // <-- fuerza font-display: swap
})

export const metadata = {
  title: "AMAI",
  description: "Soluciones de IA …",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={montserrat.className}>
      <body>
        {children}
      </body>
    </html>
  )
}
