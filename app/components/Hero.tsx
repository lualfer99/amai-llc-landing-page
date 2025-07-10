// app/components/Hero.tsx
"use client"

import { useCallback } from "react"

export default function Hero() {
  const smoothScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault()
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: "smooth" })
    },
    []
  )

  return (
    <section className="hero hero-stable" id="home">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title neon-text">
            <>
              I'M NOT A TOOL,
              <br />
              I'M THE ORIGIN
            </>
          </h1>
          <p className="hero-subtitle">
            Transformamos el futuro con inteligencia artificial. Soluciones personalizadas que optimizan procesos y
            aumentan resultados.
          </p>
          <p className="hero-subtitle neon-text">I'm not a tool. I'm AMAI</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a
              href="#contact"
              onClick={(e) => smoothScroll(e, "contact")}
              className="btn btn-primary w-full sm:w-auto"
            >
              TRANSFORMA TU TIEMPO AHORA
            </a>
            <a
              href="#services"
              onClick={(e) => smoothScroll(e, "services")}
              className="btn btn-secondary w-full sm:w-auto"
            >
              Saber más
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
