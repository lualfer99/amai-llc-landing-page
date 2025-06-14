// app/components/Footer.tsx
"use client"

import { Facebook, Twitter, Linkedin, Instagram, ChevronRight, MapPin, Phone, Mail, Clock, Heart } from "lucide-react"

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
        <div className="footer-top grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6 lg:gap-x-8">
          {/* Bloque 1: logo + descripción + redes */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <a href="#" className="footer-logo inline-block mb-4">
              <img
                src="/images/amai-logo-transparent.png"
                alt="AMAI Logo"
                className="h-16 sm:h-20 lg:h-24 w-auto transition-all duration-300 hover:scale-105 filter brightness-100 drop-shadow-[0_0_8px_rgba(0,168,107,0.3)]"
              />
            </a>
            <p className="footer-description text-sm sm:text-base leading-relaxed opacity-75 text-center sm:text-left text-justify max-w-xs sm:max-w-sm lg:max-w-none">
              Agentes entrenados con IA que responden, califican y venden por ti. Lleva tu negocio al siguiente nivel
              con nuestras soluciones avanzadas de IA.
            </p>
            <div className="footer-social flex justify-center sm:justify-start mt-4 space-x-3 sm:space-x-4">
              <a
                href="#"
                className="social-link bg-white/10 rounded-full p-2 sm:p-3 hover:bg-jade hover:scale-110 transition-all duration-300 group"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-black transition-colors" />
              </a>
              <a
                href="#"
                className="social-link bg-white/10 rounded-full p-2 sm:p-3 hover:bg-jade hover:scale-110 transition-all duration-300 group"
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-black transition-colors" />
              </a>
              <a
                href="#"
                className="social-link bg-white/10 rounded-full p-2 sm:p-3 hover:bg-jade hover:scale-110 transition-all duration-300 group"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-black transition-colors" />
              </a>
              <a
                href="#"
                className="social-link bg-white/10 rounded-full p-2 sm:p-3 hover:bg-jade hover:scale-110 transition-all duration-300 group"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-black transition-colors" />
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
                <a href="#" className="flex items-center gap-1 hover:text-jade transition">
                  <ChevronRight className="w-4 h-4" /> Automatización
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-1 hover:text-jade transition">
                  <ChevronRight className="w-4 h-4" /> Chatbots Avanzados
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-1 hover:text-jade transition">
                  <ChevronRight className="w-4 h-4" /> Análisis Predictivo
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-1 hover:text-jade transition">
                  <ChevronRight className="w-4 h-4" /> IA Personalizada
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-1 hover:text-jade transition">
                  <ChevronRight className="w-4 h-4" /> Consultoría
                </a>
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
              <Phone className="w-5 h-5" /> +34 658 38 35 17
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
