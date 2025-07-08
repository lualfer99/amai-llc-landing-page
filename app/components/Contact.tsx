// app/components/Contact.tsx
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { MapPin, Mail, Phone, Clock } from "lucide-react"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"


interface FormData {
  name: string
  email: string
  message: string
  phone: string
}

interface GeolocationResponse {
  country_code?: string
  country?: string
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    phone: "",
  })

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [country, setCountry] = useState<string>("us") // Default to US
  const [isLoadingCountry, setIsLoadingCountry] = useState(true)

  // Utility function to detect user's country via IP
  const detectUserCountry = async (): Promise<string> => {
    try {
      // Try multiple IP geolocation services for better reliability
      const services = [
        "https://ipapi.co/json/",
        "https://api.ipify.org?format=json", // Fallback service
      ]

      for (const serviceUrl of services) {
        try {
          const response = await fetch(serviceUrl)
          if (!response.ok) continue

          const data: GeolocationResponse = await response.json()

          if (data.country_code) {
            return data.country_code.toLowerCase()
          }
        } catch (error) {
          console.warn(`Failed to fetch from ${serviceUrl}:`, error)
          continue
        }
      }

      // If all services fail, try a different approach
      const fallbackResponse = await fetch("https://api.country.is/")
      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json()
        if (fallbackData.country) {
          return fallbackData.country.toLowerCase()
        }
      }
    } catch (error) {
      console.warn("Failed to detect user country:", error)
    }

    return "us" // Default fallback
  }

  // Effect to detect user's country on component mount
  useEffect(() => {
    const initializeCountry = async () => {
      setIsLoadingCountry(true)
      try {
        const detectedCountry = await detectUserCountry()
        setCountry(detectedCountry)
      } catch (error) {
        console.warn("Country detection failed, using default:", error)
        setCountry("us")
      } finally {
        setIsLoadingCountry(false)
      }
    }

    initializeCountry()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.phone) {
    setStatus("error")
    return
  }

    setStatus("sending")

    try {
      const res = await fetch("https://flows.amai.run/webhook/738f3d16-feac-4d64-857e-0c2842577495", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error(`Error ${res.status}`)

      // Reset form and show success
      setFormData({ name: "", email: "", message: "", phone: "" })
      setStatus("success")

      // Reset status after 3 seconds
      setTimeout(() => setStatus("idle"), 3000)
    } catch (err) {
      console.error(err)
      setStatus("error")

      // Reset status after 3 seconds
      setTimeout(() => setStatus("idle"), 3000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handlePhoneChange = (phone: string) => {
    setFormData((prev) => ({
      ...prev,
      phone: phone,
    }))
  }


  return (
    <section id="contact" className="contact relative z-20 bg-black py-16">
      <div className="container mx-auto px-4">
        <div className="section-title text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Contacto</h2>
          <p className="mt-2 text-lg text-gray-300">
            Haz de la innovación un estándar con inteligencia artificial al servicio de tu negocio
          </p>
        </div>

        <div className="contact-container flex flex-col lg:flex-row gap-8">
          {/* Formulario */}
          <div className="contact-form flex-1 bg-gray-900 p-8 rounded-lg shadow-lg">
            <h3 className="form-title text-2xl font-semibold text-white mb-6">Envíanos un mensaje</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  className="form-control w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-jade focus:ring-1 focus:ring-jade transition-colors"
                  placeholder="Nombre completo"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  className="form-control w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-jade focus:ring-1 focus:ring-jade transition-colors"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>


              {/* Enhanced Phone Input */}
              <div className="form-group">
                <PhoneInput
                  country={country}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  disabled={isLoadingCountry}
                  placeholder="Número de teléfono"
                  enableSearch={true}
                  disableCountryCode={false}
                  countryCodeEditable={false}
                  inputProps={{
                    name: "phone",
                    required: true,
                    // 1) lookahead que cuente sólo dígitos (9-15), 2) valores permitidos: +, dígitos y espacios
                  pattern: "^(?=(?:.*\\d){11,15}$)[+\\d ]+$",
                  title: "Introduce correctamente el número de teléfono",
                    
                    className:
                      "form-control w-full p-3 pl-16 rounded bg-gray-800 text-white border border-gray-700 focus:border-jade focus:ring-1 focus:ring-jade transition-colors",
                  }}
                  containerClass="w-full"
                  inputClass="w-full p-3 pl-16 rounded bg-gray-800 text-white border border-gray-700 focus:border-jade focus:ring-1 focus:ring-jade transition-colors"
                  buttonClass="bg-gray-800 border border-gray-700 rounded-l hover:bg-gray-700 transition-colors"
                  dropdownClass="bg-gray-800 border border-gray-700 text-white"
                  searchClass="bg-gray-700 text-white border-gray-600"
                  containerStyle={{
                    width: "100%",
                  }}
                  inputStyle={{
                    width: "100%",
                    height: "48px",
                    backgroundColor: "#1f2937",
                    color: "white",
                    border: "1px solid #374151",
                    borderRadius: "0.375rem",
                    paddingLeft: "60px",
                  }}
                  buttonStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "0.375rem 0 0 0.375rem",
                    height: "48px",
                  }}
                  dropdownStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    color: "white",
                  }}

                  required
                />
                {isLoadingCountry && <p className="text-sm text-gray-400 mt-1">Detectando ubicación...</p>}
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  className="form-control w-full p-3 rounded bg-gray-800 text-white h-32 resize-y border border-gray-700 focus:border-jade focus:ring-1 focus:ring-jade transition-colors"
                  placeholder="¿Qué desafío quieres transformar en oportunidad?"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn btn-primary mt-4 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Enviando..." : "Enviar mensaje"}
              </button>

              {status === "success" && (
                <p className="text-green-400 mt-2">
                  ¡Gracias por tu mensaje! Te contactaremos pronto.
                </p>
              )}
              {status === "error" && (
                <p className="text-red-500 mt-2">
                  Hubo un error al enviar. Por favor, inténtalo de nuevo.
                </p>
              )}

              
            </form>
          </div>

          {/* Información de contacto */}
          <div className="contact-info flex-1 space-y-6 text-gray-300">
            <div className="info-item flex items-center gap-4">
              <MapPin className="w-6 h-6 text-jade flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-white">Ubicación</h4>
                <p>Madrid, España</p>
              </div>
            </div>

            <div className="info-item flex items-center gap-4">
              <Mail className="w-6 h-6 text-jade flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-white">Email</h4>
                <p>info@amai.solutions</p>
              </div>
            </div>

            <div className="info-item flex items-center gap-4">
              <Phone className="w-6 h-6 text-jade flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-white">Teléfono</h4>
                <p>+34 614 72 41 73</p>
              </div>
            </div>

            <div className="info-item flex items-center gap-4">
              <Clock className="w-6 h-6 text-jade flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-white">Horario</h4>
                <p>Lun–Vie: 9:00 – 18:00</p>
              </div>
            </div>

            {/* Mapa */}
            <div className="map h-64 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12143.354760989787!2d-3.703510585754908!3d40.41673252595639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42287d6da3df9d%3A0x4054dfaddd2517a9!2sMadrid%2C%20Spain!5e0!3m2!1sen!2sus!4v1627384835684!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Madrid Location"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Custom styles for react-phone-input-2 dark theme */}
      <style jsx global>{`
        .react-tel-input .form-control:focus {
          border-color: #00a86b !important;
          box-shadow: 0 0 0 1px #00a86b !important;
        }
        
        .react-tel-input .flag-dropdown {
          background-color: #1f2937 !important;
          border: 1px solid #374151 !important;
        }
        
        .react-tel-input .flag-dropdown:hover {
          background-color: #374151 !important;
        }
        
        .react-tel-input .flag-dropdown.open {
          background-color: #374151 !important;
        }
        
        .react-tel-input .country-list {
          background-color: #1f2937 !important;
          border: 1px solid #374151 !important;
          color: white !important;
        }
        
        .react-tel-input .country-list .country:hover {
          background-color: #374151 !important;
        }
        
        .react-tel-input .country-list .country.highlight {
          background-color: #00a86b !important;
          color: black !important;
        }
        
        .react-tel-input .search-box {
          background-color: #374151 !important;
          color: white !important;
          border: 1px solid #4b5563 !important;
        }
        
        .react-tel-input .search-box:focus {
          border-color: #00a86b !important;
        }
      `}</style>
    </section>
  )
}
