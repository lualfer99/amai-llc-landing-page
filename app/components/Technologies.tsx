"use client"

import { Brain, Network, MessageSquare, Eye, BarChart3 } from "lucide-react"

const technologies = [
  {
    icon: <Brain className="w-10 h-10" />,
    name: "Trainable Models",
    description: "Algoritmos que aprenden y mejoran automáticamente con la experiencia",
  },
  {
    icon: <Network className="w-10 h-10" />,
    name: "Deep Learning",
    description: "Redes neuronales profundas para tareas complejas de reconocimiento",
  },
  {
    icon: <MessageSquare className="w-10 h-10" />,
    name: "NLP",
    description: "Procesamiento de lenguaje natural para entender y generar texto",
  },
  {
    icon: <Eye className="w-10 h-10" />,
    name: "Computer Vision",
    description: "Reconocimiento y procesamiento avanzado de imágenes y video",
  },
  {
    icon: <BarChart3 className="w-10 h-10" />,
    name: "Big Data",
    description: "Análisis de grandes volúmenes de datos para obtener insights valiosos",
  },
]

export default function Technologies() {
  return (
    <section
      className="technologies"
      id="technologies"
      style={{ position: "relative", zIndex: 20, backgroundColor: "#000000" }}
    >
      <div className="container">
        <div className="section-title">
          <h2>Tecnologías que Impulsan tu Futuro</h2>
          <p>
            <>
              Integramos tecnologías punteras para transformar procesos complejos
              <br />
              en soluciones reales
            </>
          </p>
        </div>
        <div className="tech-container">
          {technologies.map((tech, index) => (
            <div key={index} className="tech-item neon-glow-jade fade-in-up">
              <div className="tech-icon">{tech.icon}</div>
              <h4 className="tech-name">{tech.name}</h4>
              <p className="tech-description">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
