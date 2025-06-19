"use client"

import { useEffect } from "react"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Services from "./components/Services"
import About from "./components/Vision"
import Process from "./components/Process"
import Technologies from "./components/Technologies"
import SuccessCases from "./components/SuccessCases"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import "react-phone-input-2/lib/style.css"


export default function Home() {
  useEffect(() => {
    // Custom scroll animation using Intersection Observer
    const scrollElements = document.querySelectorAll(".fade-in-up")

    const isMobile = window.innerWidth <= 768

    const elementInView = (el: Element, percentageScroll = 100) => {
      const elementTop = el.getBoundingClientRect().top
      const threshold = isMobile ? 90 : 100 // More lenient threshold for mobile
      return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / threshold)
      )
    }

    const displayScrollElement = (element: Element) => {
      element.classList.add("active")
    }

    const hideScrollElement = (element: Element) => {
      if (!isMobile) {
        // Don't hide elements on mobile once they're shown
        element.classList.remove("active")
      }
    }

    const handleScrollAnimation = () => {
      scrollElements.forEach((el) => {
        if (elementInView(el, isMobile ? 70 : 80)) {
          displayScrollElement(el)
        } else {
          hideScrollElement(el)
        }
      })
    }

    // Use passive listeners for better mobile performance
    const options = { passive: true }
    window.addEventListener("scroll", handleScrollAnimation, options)
    handleScrollAnimation() // Initial check

    return () => window.removeEventListener("scroll", handleScrollAnimation)
  }, [])

  return (
    <main className="relative bg-black text-white overflow-x-hidden">
      <Header />
      <Hero />
      <Services />
      <About />
      <Process />
      <Technologies />
      <SuccessCases />
      <Contact />
      <Footer />
    </main>
  )
}
