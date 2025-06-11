"use client"

import { Search, PenTool, Code, TestTube, Headphones } from "lucide-react"
import dynamic from "next/dynamic"
const ParticleBackground = dynamic(() => import("./ParticleBackground"), { ssr: false })

const processSteps = [
  {
    icon: <Search className="w-8 h-8" />,
    title: "Análisis y Diagnóstico",
    description: "Evaluamos tu negocio para identificar oportunidades de mejora con IA",
  },
  {
    icon: <PenTool className="w-8 h-8" />,
    title: "Diseño de Solución",
    description: "Creamos una estrategia personalizada adaptada a tus necesidades",
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: "Implementación",
    description: "Construimos e integramos la solución en tus sistemas existentes",
  },
  {
    icon: <TestTube className="w-8 h-8" />,
    title: "Optimización",
    description: "Refinamos la solución para garantizar resultados óptimos",
  },
  {
    icon: <Headphones className="w-8 h-8" />,
    title: "Soporte Continuo",
    description: "Ofrecemos mantenimiento y mejoras constantes para evolucionar",
  },
]

export default function Process() {
  return (
    <section className="process md:bg-transparent" id="process">
     <ParticleBackground />
      <div className="container md:bg-transparent">
        <div className="section-title">
          <h2>Nuestro Proceso</h2>
          <p>Aplicamos un enfoque iterativo y orientado a objetivos
que acelera el diseño, prueba y despliegue</p>
        </div>
        <div className="timeline">
          {processSteps.map((step, index) => (
            <div key={index} className="timeline-item fade-in-up">
              <div className="timeline-icon">{step.icon}</div>
              <h4 className="timeline-title">{step.title}</h4>
              <p className="timeline-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
