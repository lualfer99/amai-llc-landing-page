// app/components/Contact.tsx
"use client"

import React, { useState } from "react"
import { MapPin, Mail, Phone, Clock } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
zzz
    try {
      const res = await fetch(
        "https://flows.amai.run/webhook/738f3d16-feac-4d64-857e-0c2842577495",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      )
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      setStatus("ok")
      setFormData({ name: "", email: "", company: "", message: "" })
    } catch {
      setStatus("error")
    }
  }
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))

  return (
    <section
      id="contact"
      className="contact relative z-20 bg-black py-16"
    >
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
                  className="form-control w-full p-3 rounded bg-gray-800 text-white"
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
                  className="form-control w-full p-3 rounded bg-gray-800 text-white"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="company"
                  className="form-control w-full p-3 rounded bg-gray-800 text-white"
                  placeholder="Empresa"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  className="form-control w-full p-3 rounded bg-gray-800 text-white h-32 resize-y"
                  placeholder="¿Qué desafío quieres transformar en oportunidad?"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-4"
              >
                Enviar mensaje
              </button>
            </form>
          </div>

          {/* Información de contacto */}
          <div className="contact-info flex-1 space-y-6 text-gray-300">
            <div className="info-item flex items-center gap-4">
              <MapPin className="w-6 h-6 text-jade" />
              <div>
                <h4 className="font-semibold text-white">Ubicación</h4>
                <p>Madrid, España</p>
              </div>
            </div>
            <div className="info-item flex items-center gap-4">
              <Mail className="w-6 h-6 text-jade" />
              <div>
                <h4 className="font-semibold text-white">Email</h4>
                <p>info@amai.solutions</p>
              </div>
            </div>
            <div className="info-item flex items-center gap-4">
              <Phone className="w-6 h-6 text-jade" />
              <div>
                <h4 className="font-semibold text-white">Teléfono</h4>
                <p>+34 614 72 41 73</p>
              </div>
            </div>
            <div className="info-item flex items-center gap-4">
              <Clock className="w-6 h-6 text-jade" />
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
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
