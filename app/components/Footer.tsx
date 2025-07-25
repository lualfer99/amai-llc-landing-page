// app/components/Footer.tsx
"use client"

import { Facebook, Twitter, Linkedin, Instagram, ChevronRight, MapPin, Phone, Mail, Clock, Heart } from "lucide-react"
import { FaTiktok } from "react-icons/fa"

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="footer bg-gray-dark text-white pt-8 pb-4">
      <div className="container mx-auto px-4">
        {/* 
          Con estas clases Tailwind hacemos:
            - móvil (≤639px): grid-cols-1  → 1 sola columna
            - sm (≥640px):    grid-cols-2  → 2 columnas
            - lg (≥1024px):   grid-cols-4  → 4 columnas
        */}
        <div className="footer-top grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6">
          {/* Bloque 1: logo + descripción + redes */}
          <div className="flex flex-col items-center lg:items-start text-justify">
            <a href="#" className="footer-logo inline-block mb-4 text-justify text-right text-left text-center">
              <img src="/images/amai-logo-transparent.png" alt="AMAI Logo" className="logo-image" />
            </a>
            <p className="footer-description text-sm leading-relaxed opacity-75 text-center shadow-xl italic text-justify text-center text-justify">
              Agentes entrenados con IA que responden, califican y
              venden por ti. Lleva tu negocio al siguiente nivel con
              nuestras soluciones avanzadas de IA
            </p>
            <div className="footer-social flex justify-center sm:justify-start mt-4 space-x-4">
              <a href="#" className="social-link bg-white/10 rounded-full p-2 hover:bg-white/20">
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a href="https://www.linkedin.com/in/amai-solutions/" className="social-link bg-white/10 rounded-full p-2 hover:bg-white/20">
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a href="https://www.tiktok.com/@amai.solutions" className="social-link bg-white/10 rounded-full p-2 hover:bg-white/20">
                <FaTiktok className="w-5 h-5 text-white" />
              </a>
              <a href="https://www.instagram.com/amai.solutions/" className="social-link bg-white/10 rounded-full p-2 hover:bg-white/20">
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Bloque 2: Enlaces rápidos */}
          <div>
            <h4 className="footer-title text-lg font-semibold mb-4">Enlaces rápidos</h4>
            <ul className="footer-links space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className="flex items-center gap-1 hover:text-jade transition"
                >
                  <ChevronRight className="w-4 h-4" /> Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="flex items-center gap-1 hover:text-jade transition"
                >
                  <ChevronRight className="w-4 h-4" /> Servicios
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="flex items-center gap-1 hover:text-jade transition"
                >
                  <ChevronRight className="w-4 h-4" /> Visión
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("process")}
                  className="flex items-center gap-1 hover:text-jade transition"
                >
                  <ChevronRight className="w-4 h-4" /> Proceso
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("technologies")}
                  className="flex items-center gap-1 hover:text-jade transition"
                >
                  <ChevronRight className="w-4 h-4" /> Tecnologías
                </button>
              </li>
            </ul>
          </div>

          {/* Bloque 3: Servicios */}
          <div>
            <h4 className="footer-title text-lg font-semibold mb-4">Servicios</h4>
             <ul className="footer-links space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="flex items-center gap-1 hover:text-jade transition"
                >
                  <ChevronRight className="w-4 h-4" /> Automatización
                </button>
              </li>

              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="flex items-center gap-1 hover:text-jade transition"
                >
                  <ChevronRight className="w-4 h-4" /> Agentes de IA Avanzados
                </button>
              </li>

              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="flex items-center gap-1 hover:text-jade transition"
                >
                  <ChevronRight className="w-4 h-4" /> Análisis Predictivo
                </button>
              </li>

              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="flex items-center gap-1 hover:text-jade transition"
                >
                  <ChevronRight className="w-4 h-4" /> IA Personalizada
                </button>
              </li>

              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="flex items-center gap-1 hover:text-jade transition"
                >
                  <ChevronRight className="w-4 h-4" /> Consultoria
                </button>
              </li>
            </ul>
          </div>

          {/* Bloque 4: Contacto */}
          <div className="footer-contact">
            <h4 className="footer-title text-lg font-semibold mb-4">Contacto</h4>
            <p className="flex items-center gap-2 text-sm opacity-75 mb-1">
              <MapPin className="w-5 h-5" /> Madrid, España
            </p>
            <p className="flex items-center gap-2 text-sm opacity-75 mb-1">
              <Phone className="w-5 h-5" /> +34 614 72 41 73
            </p>
            <p className="flex items-center gap-2 text-sm opacity-75 mb-1">
              <Mail className="w-5 h-5" /> info@amai.solutions
            </p>
            <p className="flex items-center gap-2 text-sm opacity-75">
              <Clock className="w-5 h-5" /> Lun–Vie: 9:00 – 18:00
            </p>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="footer-bottom mt-8 border-t border-gray-600 pt-4">
          <p className="flex flex-col sm:flex-row items-center justify-center text-center text-xs opacity-60 gap-1">
            <span>&copy; 2024 AMAI | Todos los derechos reservados |</span>
            <span className="flex items-center whitespace-nowrap">
              Desarrollado con
              <Heart className="w-4 h-4 text-jade mx-0.5 fill-current" />
              e&nbsp;IA
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
