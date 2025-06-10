"use client"

import dynamic from "next/dynamic"
import { useEffect, useState, useRef } from "react"

const stats = [
  { number: 150, suffix: "+", label: "Clientes Satisfechos", id: "clients-count" },
  { number: 300, suffix: "+", label: "Proyectos Completados", id: "projects-count" },
  { number: 89, suffix: "%", label: "Aumento de Eficiencia", id: "efficiency-count" },
]

// Importamos la red neuronal SIN SSR
const NeuralNetwork = dynamic(() => import("./NeuralNetwork"), { ssr: false })

export default function Vision() {
  const [counters, setCounters] = useState(stats.map(() => 0))
  const [hasAnimated, setHasAnimated] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Animación de los contadores
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const delay = window.innerWidth <= 768 ? 300 : 0
          setTimeout(() => {
            stats.forEach((stat, i) => {
              let curr = 0
              const inc = stat.number / (window.innerWidth <= 768 ? 60 : 100)
              const timer = setInterval(
                () => {
                  curr += inc
                  if (curr >= stat.number) {
                    clearInterval(timer)
                    curr = stat.number
                  }
                  setCounters((prev) => {
                    const copy = [...prev]
                    copy[i] = Math.floor(curr)
                    return copy
                  })
                },
                window.innerWidth <= 768 ? 35 : 25,
              )
            })
          }, delay)
        }
      },
      { threshold: window.innerWidth <= 768 ? 0.3 : 0.5 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [hasAnimated])

  return (
    <section className="about bg-black text-white py-16" id="about" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="section-title text-center mb-12">
          <h2 className="text-3xl font-bold">Nuestra Visión</h2>
          <p className="mt-2 text-lg opacity-80">
            Conectamos estrategia y tecnología para impulsar negocios con inteligencia artificial aplicada y resultados
            tangibles
          </p>
        </div>

        <div className="about-content flex flex-col lg:flex-row items-start gap-8">
          {/* Texto y contadores */}
          <div className="about-text flex-1 space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-2">
                Soluciones Inteligentes, <br /> para Desafíos Reales
              </h3>
              <p className="opacity-90">
                En AMAI, unimos talento humano y tecnología para crear soluciones de inteligencia artificial que
                transforman procesos, escalan negocios y aumentan la rentabilidad.
              </p>
              <p className="opacity-90">
                Con una visión centrada en el impacto real, ayudamos a compañías de todos los tamaños a incorporar IA de
                forma práctica, estratégica y alineada con sus objetivos.
              </p>
              <p className="opacity-90">
                Porque en el futuro, la diferencia no la marca la tecnología, sino cómo se aplica.
              </p>
            </div>

            <div className="about-stats grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="stat-item bg-gray-900 p-6 rounded-lg text-center">
                  <div className="stat-number text-4xl font-bold text-jade">
                    {counters[i]}
                    {stat.suffix}
                  </div>
                  <div className="stat-label mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contenedor de la red neuronal (solo en cliente) */}
          <div className="about-image flex-1">
            <NeuralNetwork />
          </div>
        </div>
      </div>
    </section>
  )
}
