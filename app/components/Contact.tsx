"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Mail, Phone, Clock } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="contact" id="contact" style={{ position: "relative", zIndex: 20, backgroundColor: "#000000" }}>
      <div className="container">
        <div className="section-title">
          <h2>Contacto</h2>
          <p>
            <>
              Haz de la innovación un estándar con inteligencia artificial
              <br />
              al servicio de tu negocio
            </>
          </p>
        </div>
        <div className="contact-container">
          <div className="contact-form">
            <h3 className="form-title">Envíanos un mensaje</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  className="form-control"
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
                  className="form-control"
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
                  className="form-control"
                  placeholder="Empresa"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  className="form-control"
                  placeholder="¿Qué desafío quieres transformar en oportunidad?"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Enviar mensaje
              </button>
            </form>
          </div>
          <div className="contact-info">
            <div className="info-item">
              <div className="info-icon">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="info-content">
                <h4>Ubicación</h4>
                <p>
                  Av. Innovación 1234, Distrito Tecnológico
                  <br />
                  Madrid, España
                </p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">
                <Mail className="w-5 h-5" />
              </div>
              <div className="info-content">
                <h4>Email</h4>
                <p>
                  info@amaitech.com
                  <br />
                  soporte@amaitech.com
                </p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">
                <Phone className="w-5 h-5" />
              </div>
              <div className="info-content">
                <h4>Teléfono</h4>
                <p>
                  +34 91 123 4567
                  <br />
                  +34 600 123 456
                </p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">
                <Clock className="w-5 h-5" />
              </div>
              <div className="info-content">
                <h4>Horario</h4>
                <p>Lun-Vie: 9:00 - 18:00</p>
              </div>
            </div>
            <div className="map">
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
