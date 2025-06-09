"use client"

import { Star, Building, Landmark, Stethoscope, Store, GraduationCap, Factory } from "lucide-react"

const testimonials = [
  {
    text: (
  <>
    Implementamos el chatbot de AMAI y aumentamos nuestras conversiones en un 45%. El ROI superó todas nuestras expectativas en solo 3 meses.
    <div style={{ height: "1.8em" }} />
  </>
),
    name: "Miguel Navarro",
    position: "Director, GCM",
    rating: 5,
  },
  {
    text: "La automatización de procesos que implementó AMAI redujo nuestros costos operativos en un 32% y mejoró la satisfacción de nuestros empleados al eliminar tareas repetitivas.",
    name: "Carlos Méndez",
    position: "CEO, Innovatech",
    rating: 5,
  },
  {
    text: "El análisis predictivo de AMAI nos permitió anticipar tendencias de mercado y ajustar nuestra estrategia, lo que resultó en un aumento del 28% en ingresos anuales.",
    name: "Laura Torres",
    position: "Directora Comercial, Grupo Stellar",
    rating: 4.5,
  },
]

const companies = [
  { icon: <Building className="w-10 h-10" />, name: "TechCorp" },
  { icon: <Landmark className="w-10 h-10" />, name: "BankPlus" },
  { icon: <Stethoscope className="w-10 h-10" />, name: "HealthCare" },
  { icon: <Store className="w-10 h-10" />, name: "RetailMax" },
  { icon: <GraduationCap className="w-10 h-10" />, name: "EduTech" },
  { icon: <Factory className="w-10 h-10" />, name: "Industry" },
]

export default function SuccessCases() {
  return (
    <section className="case-studies" id="case-studies">
      <div className="container">
        <div className="section-title">
          <h2>Casos de Éxito</h2>
          <p> <>
        Historias reales de clientes que han transformado sus negocios
        <br />
        con nuestras soluciones de IA
      </> </p>
        </div>
        <div className="testimonials">
          <div className="testimonial-container">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial fade-in-up">
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="client-info">
                  <div className="client-image">
                    <div className="w-12 h-12 bg-jade rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-lg">{testimonial.name.charAt(0)}</span>
                    </div>
                  </div>
                  <div className="client-details">
                    <h4 className="client-name">{testimonial.name}</h4>
                    <p className="client-position">{testimonial.position}</p>
                    <div className="client-rating">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(testimonial.rating)
                              ? "text-jade fill-current"
                              : i < testimonial.rating
                                ? "text-jade fill-current opacity-50"
                                : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="logos">
          <h4 className="logos-title">Empresas que confían en nosotros</h4>
          <div className="logos-container">
            {companies.map((company, index) => (
              <div key={index} className="logo-item">
                <div style={{ color: "var(--jade)" }}>{company.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
