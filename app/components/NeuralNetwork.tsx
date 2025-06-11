"use client";

import { useEffect, useRef, useState } from "react";

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  description: string;
  satellites: { label: string; x: number; y: number }[];
}

const nodes: Node[] = [
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
];

const connections = [
  { from: "rentabilidad", to: "ia-etica", strength: 0.9 },
  { from: "rentabilidad", to: "human-centric", strength: 0.9 },
  { from: "rentabilidad", to: "escalabilidad", strength: 0.8 },
  { from: "rentabilidad", to: "automatizacion", strength: 0.8 },

  { from: "human-centric", to: "ia-etica", strength: 0.8 },
  { from: "human-centric", to: "escalabilidad", strength: 0.7 },

  { from: "escalabilidad", to: "automatizacion", strength: 0.8 },
  { from: "automatizacion", to: "ia-etica", strength: 0.7 },
];

export default function NeuralNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dim, setDim] = useState({ width: 600, height: 400 });
  const [hovered, setHovered] = useState<string | null>(null);

  // Ajusta dimensiones en cada resize
  useEffect(() => {
    const onResize = () => {
      if (!containerRef.current) return;
      const { width } = containerRef.current.getBoundingClientRect();
      setDim({
        width,
        height: Math.max(250, Math.min(500, width * 0.6)),
      });
    };
    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const pos = (n: Node) => ({
    x: (n.x / 600) * dim.width,
    y: (n.y / 400) * dim.height,
  });

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[610px] mx-auto h-[305px] sm:h-[500px] overflow-visible relative pt-11"
    >
      {/* Conexiones SVG */}
      <svg
        width={dim.width}
        height={dim.height}
        className="absolute top-0 left-0 pointer-events-none pt-11 overflow-visible "
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

        {/* Líneas principales */}
        {connections.map((c, i) => {
          const a = nodes.find((n) => n.id === c.from)!;
          const b = nodes.find((n) => n.id === c.to)!;
          const pa = pos(a),
            pb = pos(b);
          return (
            <path
              key={i}
              d={`M${pa.x},${pa.y} Q${(pa.x + pb.x) / 2},${(pa.y + pb.y) / 2 - 50} ${pb.x},${pb.y}`}
              stroke={`rgba(0,168,107,${0.3 * c.strength})`}
              strokeWidth={1.5}
              fill="none"
              filter="url(#glow)"
            />
          );
        })}

        {/* Satélites pequeños */}
        {nodes.map((n) =>
          n.satellites.map((s, i) => {
            const p = pos(n);
            const sx = p.x + (s.x / 600) * dim.width;
            const sy = p.y + (s.y / 400) * dim.height;
            return (
              <g key={`${n.id}-sat-${i}`}>
                <circle cx={sx} cy={sy} r={5} fill="rgba(0,168,107,0.3)" />
                <text
                  x={sx + 8}
                  y={sy + 4}
                  className="text-[8px] fill-jade"
                  pointerEvents="none"
                >
                  {s.label}
                </text>
              </g>
            );
          })
        )}
      </svg>

      {/* Nodos */}
      <div
        className="neural-network relative"
        style={{ width: dim.width, height: dim.height }}
      >
        {nodes.map((n) => {
          const p = pos(n);
          return (
            <div
              key={n.id}
              className={`neural-node absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition`}
              style={{ left: p.x, top: p.y }}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="node-circle w-12 h-12 border-2 border-jade rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,168,107,0.5)] animate-[breathe_4s_infinite]">
                <div className="node-inner w-1/2 h-1/2 bg-[rgba(0,168,107,0.4)] rounded-full" />
              </div>
              <div className="node-label mt-2 text-sm bg-black/70 text-jade px-2 py-1 rounded">
                {n.label}
              </div>
              {hovered === n.id && (
                <div className="node-tooltip absolute -top-28 left-1/2 transform -translate-x-1/2 bg-black/90 border border-jade rounded p-2 text-xs w-44">
                  <h4 className="text-jade font-semibold mb-1">{n.label}</h4>
                  <p>{n.description}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
