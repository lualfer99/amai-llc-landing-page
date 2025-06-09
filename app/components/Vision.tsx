"use client"

import { useEffect, useState, useRef } from "react"

const stats = [
  { number: 150, suffix: "+", label: "Clientes Satisfechos", id: "clients-count" },
  { number: 300, suffix: "+", label: "Proyectos Completados", id: "projects-count" },
  { number: 89, suffix: "%", label: "Aumento de Eficiencia", id: "efficiency-count" },
]

const NODE_RADIUS = 25 // centro visual del nodo, usado para compensar

const nodes = [
  {
    id: "automatizacion",
    label: "Automatización",
    description: "Optimización de procesos para liberar potencial humano",
    x: 150,
    y: 50,
    satellites: [
      { label: "Eficiencia", x: -60, y: 20 },
      { label: "Velocidad", x: 100, y: 20 },
    ],
  },
  {
    id: "escalabilidad",
    label: "Escalabilidad",
    description: "Soluciones que crecen con tu negocio sin límites",
    x: 450,
    y: 50,
    satellites: [
      { label: "Crecimiento", x: -70, y: 50 },
      { label: "Adaptabilidad", x: 100, y: 20 },
    ],
  },
  {
    id: "ia-etica",
    label: "IA Ética",
    description: "Tecnología responsable centrada en valores humanos",
    x: 100,
    y: 280,
    satellites: [
      { label: "Transparencia", x: -40, y: 20 },
      { label: "Sostenibilidad", x: 80, y: 90 },
    ],
  },
  {
    id: "human-centric",
    label: "Human-Centric",
    description: "Diseño centrado en las personas y sus necesidades reales",
    x: 500,
    y: 280,
    satellites: [
      { label: "Empatía", x: -40, y: 100 },
      { label: "Inclusión", x: 90, y: 20 },
    ],
  },
  {
    id: "rentabilidad",
    label: "Rentabilidad",
    description: "Maximización del retorno de inversión tecnológica",
    x: 300,
    y: 400,
    satellites: [
      { label: "ROI", x: -50, y: 5 },
      { label: "Valor", x: 90, y: 20 },
    ],
  },
]

const connections = [
  // Rentabilidad connections
  { from: "rentabilidad", to: "ia-etica", strength: 0.9 },
  { from: "rentabilidad", to: "human-centric", strength: 0.9 },
  { from: "rentabilidad", to: "escalabilidad", strength: 0.8 },
  { from: "rentabilidad", to: "automatizacion", strength: 0.8 },

  // Human-Centric connections (excluding already defined)
  { from: "human-centric", to: "ia-etica", strength: 0.8 },
  { from: "human-centric", to: "escalabilidad", strength: 0.7 },

  // Escalabilidad connections (excluding already defined)
  { from: "escalabilidad", to: "automatizacion", strength: 0.8 },

  // Automatización connections (excluding already defined)
  { from: "automatizacion", to: "ia-etica", strength: 0.7 },
]

export default function Vision() {
  const [counters, setCounters] = useState(stats.map(() => 0))
  const [hasAnimated, setHasAnimated] = useState(false)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const networkRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const animationRef = useRef<number>()
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 500 })

  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number }>>(
    [],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          // Add a small delay for mobile to ensure smooth animation
          const delay = window.innerWidth <= 768 ? 300 : 0

          setTimeout(() => {
            stats.forEach((stat, index) => {
              let current = 0
              const increment = stat.number / (window.innerWidth <= 768 ? 60 : 100) // Faster on mobile
              const timer = setInterval(
                () => {
                  current += increment
                  if (current >= stat.number) {
                    current = stat.number
                    clearInterval(timer)
                  }
                  setCounters((prev) => {
                    const newCounters = [...prev]
                    newCounters[index] = Math.floor(current)
                    return newCounters
                  })
                },
                window.innerWidth <= 768 ? 35 : 25,
              ) // Slightly slower interval on mobile
            })
          }, delay)
        }
      },
      { threshold: window.innerWidth <= 768 ? 0.3 : 0.5 }, // Lower threshold for mobile
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    return () => observer.disconnect()
  }, [hasAnimated])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      if (canvas && networkRef.current) {
        const width = networkRef.current.clientWidth
        const height = networkRef.current.clientHeight
        canvas.width = width
        canvas.height = height
        setCanvasSize({ width, height })
      }
    }

    const initParticles = () => {
      const particles = []
      const particleCount = 50
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        })
      }
      particlesRef.current = particles
    }

    const drawParticles = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 168, 107, ${particle.opacity})`
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(drawParticles)
    }

    resizeCanvas()
    initParticles()
    drawParticles()

    window.addEventListener("resize", resizeCanvas)
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  const getNodeById = (id: string) => nodes.find((node) => node.id === id)

  const getConnectionPath = (fromNode, toNode) => {
    const x1 = fromNode.x
    const y1 = fromNode.y - 50
    const x2 = toNode.x
    const y2 = toNode.y - 50
    const controlX = (x1 + x2) / 2
    const controlY = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.2
    return `M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`
  }

  return (
    <section
      className="about"
      id="about"
      ref={sectionRef}
      style={{ background: "#000", position: "relative", zIndex: 20 }}
    >
      <div className="container">
        <div className="section-title">
          <h2>Nuestra Visión</h2>
          <p>
            Conectamos estrategia y tecnología para impulsar negocios con inteligencia artificial aplicada y resultados
            tangibles
          </p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <h3 className="about-title">
              Soluciones Inteligentes,
              <br />
              para Desafíos Reales
            </h3>
            <p className="about-description">
              En AMAI, unimos talento humano y tecnología para crear soluciones de inteligencia artificial que
              transforman procesos, escalan negocios y aumentan la rentabilidad.
            </p>
            <p className="about-description">
              Con una visión centrada en el impacto real, ayudamos a compañías de todos los tamaños a incorporar IA de
              forma práctica, estratégica y alineada con sus objetivos.
            </p>
            <p className="about-description">
              Porque en el futuro, la diferencia no la marca la tecnología, sino cómo se aplica.
            </p>

            <div className="about-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">
                    {counters[index]}
                    {stat.suffix}
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-image hidden md:block">
            <div
              className="neural-network-wrapper w-full max-w-none h-[275px] sm:h-[500px] overflow-hidden relative hidden md:block"
              ref={networkRef}
              style={{
                maxWidth: window.innerWidth <= 768 ? "100%" : "610px",
                margin: window.innerWidth <= 768 ? "0 auto" : "0 auto 0 -20px",
                position: "relative",
                overflow: "visible",
                height: window.innerWidth <= 768 ? "300px" : "500px",
              }}
            >
              <canvas ref={canvasRef} className="neural-network-canvas" />
              <div className="neural-network">
                <svg
                  className="neural-connections"
                  viewBox={`0 0 ${canvasSize.width} ${canvasSize.height}`}
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                  }}
                >
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <g className="connections">
                    {connections.map((conn, index) => {
                      const from = getNodeById(conn.from)
                      const to = getNodeById(conn.to)
                      if (!from || !to) return null
                      const path = getConnectionPath(from, to)
                      const isHighlighted = hoveredNode === from.id || hoveredNode === to.id
                      return (
                        <g key={index}>
                          <path
                            d={path}
                            stroke={`rgba(0, 168, 107, ${isHighlighted ? 0.8 : 0.3 * conn.strength})`}
                            strokeWidth={isHighlighted ? 2.5 : 1.5}
                            fill="none"
                            filter={isHighlighted ? "url(#glow)" : ""}
                          />
                        </g>
                      )
                    })}
                  </g>
                </svg>

                {nodes.map((node) => (
                  <div
                    key={node.id}
                    className={`neural-node ${hoveredNode === node.id ? "hovered" : ""}`}
                    style={{ top: `${node.y}px`, left: `${node.x}px` }}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    {node.satellites.map((sat, idx) => (
                      <div key={idx} className="satellite-node" style={{ top: sat.y, left: sat.x }}>
                        <div className="satellite-circle" />
                        <div className="satellite-label">{sat.label}</div>
                      </div>
                    ))}
                    <div className="node-circle">
                      <div className="node-pulse" />
                      <div className="node-inner" />
                    </div>
                    <div className="node-label">{node.label}</div>
                    <div className="node-tooltip">
                      <div className="tooltip-content">
                        <h4>{node.label}</h4>
                        <p>{node.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .neural-network {
          height: 500px;
          width: 100%;
          position: relative;
        }
        .neural-network-wrapper {
          border-radius: 20px;
          background: #000;
          box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </section>
  )
}
