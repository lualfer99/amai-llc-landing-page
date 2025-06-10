"use client"

import { useEffect, useRef, useState } from "react"

interface Node {
  id: string
  x: number
  y: number
  label: string
  description: string
  satellites: Array<{ label: string; angle: number }>
}

export default function NeuralNetwork() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 })
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const nodes: Node[] = [
    {
      id: "input",
      x: 15,
      y: 50,
      label: "Input Layer",
      description: "Datos de entrada procesados por algoritmos de IA",
      satellites: [
        { label: "Data", angle: 0 },
        { label: "Voice", angle: 120 },
        { label: "Text", angle: 240 },
      ],
    },
    {
      id: "hidden1",
      x: 35,
      y: 25,
      label: "Processing",
      description: "Análisis y procesamiento inteligente de información",
      satellites: [
        { label: "NLP", angle: 45 },
        { label: "ML", angle: 180 },
      ],
    },
    {
      id: "hidden2",
      x: 35,
      y: 75,
      label: "Learning",
      description: "Aprendizaje automático y mejora continua",
      satellites: [
        { label: "Train", angle: 90 },
        { label: "Adapt", angle: 270 },
      ],
    },
    {
      id: "output",
      x: 65,
      y: 35,
      label: "Solutions",
      description: "Soluciones inteligentes y automatizadas",
      satellites: [
        { label: "Auto", angle: 0 },
        { label: "Chat", angle: 90 },
        { label: "Predict", angle: 180 },
        { label: "Optimize", angle: 270 },
      ],
    },
    {
      id: "feedback",
      x: 85,
      y: 65,
      label: "Results",
      description: "Resultados medibles y mejora continua",
      satellites: [
        { label: "ROI", angle: 60 },
        { label: "KPI", angle: 300 },
      ],
    },
  ]

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({
          width: Math.max(300, rect.width),
          height: Math.max(250, Math.min(400, rect.width * 0.6)),
        })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  const getNodePosition = (node: Node) => ({
    x: (node.x / 100) * dimensions.width,
    y: (node.y / 100) * dimensions.height,
  })

  const getSatellitePosition = (node: Node, satellite: { angle: number }, radius = 30) => {
    const nodePos = getNodePosition(node)
    const angleRad = (satellite.angle * Math.PI) / 180
    return {
      x: nodePos.x + Math.cos(angleRad) * radius,
      y: nodePos.y + Math.sin(angleRad) * radius,
    }
  }

  return (
    <div className="neural-network-wrapper" ref={containerRef}>
      <svg
        className="neural-connections"
        width={dimensions.width}
        height={dimensions.height}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {/* Conexiones entre nodos principales */}
        {nodes.map((node, i) =>
          nodes.slice(i + 1).map((targetNode) => {
            const start = getNodePosition(node)
            const end = getNodePosition(targetNode)
            const distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2))

            if (distance < dimensions.width * 0.6) {
              return (
                <g key={`${node.id}-${targetNode.id}`}>
                  <line
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke="rgba(0, 168, 107, 0.3)"
                    strokeWidth="2"
                    className="connection-line"
                  />
                  {/* Partículas animadas en las conexiones */}
                  <circle r="3" fill="rgba(0, 168, 107, 0.8)" className="connection-particles">
                    <animateMotion
                      dur="4s"
                      repeatCount="indefinite"
                      path={`M${start.x},${start.y} L${end.x},${end.y}`}
                    />
                  </circle>
                </g>
              )
            }
            return null
          }),
        )}

        {/* Conexiones a satélites */}
        {nodes.map((node) =>
          node.satellites.map((satellite, i) => {
            const nodePos = getNodePosition(node)
            const satPos = getSatellitePosition(node, satellite)
            return (
              <line
                key={`${node.id}-sat-${i}`}
                x1={nodePos.x}
                y1={nodePos.y}
                x2={satPos.x}
                y2={satPos.y}
                stroke="rgba(0, 168, 107, 0.2)"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
            )
          }),
        )}
      </svg>

      <div className="neural-network" style={{ width: dimensions.width, height: dimensions.height }}>
        {/* Nodos principales */}
        {nodes.map((node) => {
          const position = getNodePosition(node)
          return (
            <div
              key={node.id}
              className={`neural-node ${hoveredNode === node.id ? "hovered" : ""}`}
              style={{
                left: position.x,
                top: position.y,
              }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <div className="node-circle">
                <div className="node-inner" />
                <div className="node-pulse" />
              </div>
              <div className="node-label">{node.label}</div>
              <div className="node-tooltip">
                <div className="tooltip-content">
                  <h4>{node.label}</h4>
                  <p>{node.description}</p>
                </div>
              </div>
            </div>
          )
        })}

        {/* Nodos satélite */}
        {nodes.map((node) =>
          node.satellites.map((satellite, i) => {
            const position = getSatellitePosition(node, satellite)
            return (
              <div
                key={`${node.id}-satellite-${i}`}
                className="satellite-node"
                style={{
                  left: position.x,
                  top: position.y,
                }}
              >
                <div className="satellite-circle" />
                <div className="satellite-label">{satellite.label}</div>
              </div>
            )
          }),
        )}
      </div>
    </div>
  )
}
