// app/components/Footer.tsx
"use client";

import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
} from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer bg-gray-dark text-white pt-8 pb-4">
      <div className="container mx-auto px-4">
        {/* Footer top */}
        <div className="footer-top grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6">
          
          {/* Bloque 1: logo + descripción + redes */}
          <div className="text-center sm:text-left">
            <a href="#" className="footer-logo inline-block mb-4">
              <img
                src="/images/amai-logo-transparent.png"
                alt="AMAI Logo"
                className="footer-logo-image h-16 mx-auto sm:mx-0"
              />
            </a>
            <p className="footer-description text-sm leading-relaxed opacity-75">
              Agentes entrenados con IA que responden, califican y<br />
              venden por ti. Lleva tu negocio al siguiente nivel con<br />
              nuestras soluciones avanzadas de IA
            </p>
            <div className="footer-social flex justify-center sm:justify-start mt-4 space-x-4">
              <a href="#" className="social-link bg-white/10 rounded-full p-2 hover:bg-white/20">
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="social-link bg-white/10 rounded-full p-2 hover:bg-white/20">
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="social-link bg-white/10 rounded-full p-2 hover:bg-white/20">
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="social-link bg-white/10 rounded-full p-2 hover:bg-white/20">
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Bloque 2: Enlaces rápidos */}
          <div>
            <h4 className="footer-title text-lg font-semibold mb-4">Enlaces rápidos</h4>
            <ul className="footer-links space-y-2 text-sm">
              {["home","services","about","process","technologies"].map((sec) => (
                <li key={sec}>
                  <button
                    onClick={() => scrollToSection(sec)}
                    className="flex items-center gap-1 hover:text-jade transition"
                  >
                    <ChevronRight className="w-4 h-4" />{" "}
                    {{
                      home: "Inicio",
                      services: "Servicios",
                      about: "Visión",
                      process: "Proceso",
                      technologies: "Tecnologías",
                    }[sec]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Bloque 3: Servicios */}
          <div>
            <h4 className="footer-title text-lg font-semibold mb-4">Servicios</h4>
            <ul className="footer-links space-y-2 text-sm">
              {[
                "Automatización",
                "Chatbots Avanzados",
                "Análisis Predictivo",
                "IA Personalizada",
                "Consultoría",
              ].map((srv) => (
                <li key={srv}>
                  <a href="#" className="flex items-center gap-1 hover:text-jade transition">
                    <ChevronRight className="w-4 h-4" /> {srv}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Bloque 4: Contacto */}
          <div className="footer-contact">
            <h4 className="footer-title text-lg font-semibold mb-4">Contacto</h4>
            <p className="flex items-center gap-2 text-sm opacity-75 mb-1">
              <MapPin className="w-5 h-5" /> Av. Innovación 1234, Madrid
            </p>
            <p className="flex items-center gap-2 text-sm opacity-75 mb-1">
              <Phone className="w-5 h-5" /> +34 91 123 4567
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
              e IA
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
