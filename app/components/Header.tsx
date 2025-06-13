"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={`header fixed top-0 left-0 w-full ${isScrolled ? "scrolled" : ""}`}
      style={{ background: "#000",  zIndex: 999}}
    >
      <div className="container">
        <div className="flex justify-between items-center">
          <a href="#" className="logo">

            <img src="/images/amai-logo-transparent.png" alt="AMAI Logo" className="logo-image mx-auto" />
      
          </a>
          <nav>
            <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
              <li>
                <button onClick={() => scrollToSection("home")}>Inicio</button>
              </li>
              <li>
                <button onClick={() => scrollToSection("services")}>Servicios</button>
              </li>
              <li>
                <button onClick={() => scrollToSection("about")}>Visión</button>
              </li>
              <li>
                <button onClick={() => scrollToSection("process")}>Proceso</button>
              </li>
              <li>
                <button onClick={() => scrollToSection("technologies")}>Tecnologías</button>
              </li>
              <li>
                <button onClick={() => scrollToSection("case-studies")}>Casos de Éxito</button>
              </li>
              <li>
                <button onClick={() => scrollToSection("contact")}>Contacto</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
