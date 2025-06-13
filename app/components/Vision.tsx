"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const NeuralNetwork = dynamic(
  () => import("./NeuralNetwork"),
  { ssr: false }
);

const stats = [
  { number: 150, suffix: "+", label: "Clientes Satisfechos" },
  { number: 300, suffix: "+", label: "Proyectos Completados" },
  { number: 89,  suffix: "%", label: "Aumento de Eficiencia" },
];

export default function Vision() {
  const [counters, setCounters] = useState<number[]>(() => stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const delay = window.innerWidth <= 768 ? 300 : 0;
          setTimeout(() => {
            stats.forEach((stat, i) => {
              let curr = 0;
              const inc = stat.number / (window.innerWidth <= 768 ? 60 : 100);
              const timer = setInterval(() => {
                curr += inc;
                if (curr >= stat.number) {
                  curr = stat.number;
                  clearInterval(timer);
                }
                setCounters((arr) => {
                  const copy = [...arr];
                  copy[i] = Math.floor(curr);
                  return copy;
                });
              }, window.innerWidth <= 768 ? 35 : 25);
            });
          }, delay);
        }
      },
      { threshold: window.innerWidth <= 768 ? 0.3 : 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [hasAnimated]);

  return (
    <section
     className="about  "
      id="about"
      ref={ref}
      style={{ background: "#000", position: "relative", zIndex: 20}}
    >
      <div className="container">
        <div className="section-title">
          <h2>Nuestra Visión</h2>
          <p>
            Conectamos estrategia y tecnología para impulsar negocios con inteligencia artificial aplicada y resultados tangibles
          </p>
        </div>

        <div className="about-content flex flex-col lg:flex-row gap-8">
          {/* — Texto y contadores — */}
          <div className="about-text flex-1 space-y-6">
            <h3 className="about-title">
              Soluciones Inteligentes,<br/>para Desafíos Reales
            </h3>
            <div className="space-y-3">
              <p className="about-description">
                En AMAI, unimos talento humano y tecnología para crear soluciones de IA que transforman procesos.
              </p>
              <p className="about-description">
                Con visión práctica y estratégica, ayudamos a compañías de todos los tamaños a incorporar IA alineada con sus objetivos.
              </p>
              <p className="about-description">
                Porque en el futuro, la diferencia no la marca la tecnología, sino cómo se aplica.
              </p>
            </div>
            <div className="about-stats grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
              {stats.map((stat, i) => (
                <div key={i} className="stat-item bg-gray-900 p-6 rounded-lg text-center">
                  <div className="stat-number text-4xl font-bold text-jade">
                    {counters[i]}{stat.suffix}
                  </div>
                  <div className="stat-label mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>


          {/* Neural: **solo desktop**, no ocupa nada en móvil */}
          <div className="flex-1 hidden md:block">
            <NeuralNetwork />
          </div>
        </div>
      </div>
    </section>
  );
}
