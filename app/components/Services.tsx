"use client"

import { Bot, Cog, TrendingUp, Globe, CheckCircle} from "lucide-react"

const services = [
  {
    icon: <Cog className="w-8 h-8" />,
    title: "Automatización de Procesos Inteligentes",
    description:
      "Optimiza tus procesos mediante automatización inteligente integrada con tus operaciones actuales. Elimina tareas repetitivas, reduce costes operativos y libera tiempo estratégico real para escalar con foco en crecimiento sostenible y continuo.",
    features: [
      "Automatización operativa de alto impacto",
      "Integración sin fricción con tu ecosistema",
      "Análisis continuo para mejora operativa",
      "Reducción comprobada de carga y tiempos",
    ],
  },
  {
    icon: <Bot className="w-8 h-8" />,
    title: (
      <>
        Chatbots de
        <br />
        Interacción Avanzada
      </>
    ),
    description:
      "Implementa asistentes conversacionales que aprenden y evolucionan con cada interacción. Ofrecen respuestas naturales, personalizadas y en tiempo real, adaptadas fielmente a la identidad de tu marca y a los canales que utilizan tus clientes.",
    features: [
      "Aprendizaje activo 24/7 con IA adaptativa",
      "Comunicación alineada con tu identidad",
      "Integración multicanal fluida (web, apps, redes)",
      "Respuesta contextual basada en sentimiento",
    ],
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: (
      <>
        Diseño Web
        <br />
        Personalizado
      </>
    ),
    description:
      "Convierte tus datos en decisiones inteligentes. Modelos predictivos entrenados para anticipar comportamientos clave, descubrir patrones ocultos y ofrecer visualizaciones interactivas que facilitan una toma de decisiones más rápida y precisa.",
    features: [
      "Algoritmos personalizados para tu negocio",
      "Detección de oportunidades invisibles",
      "Visualización ejecutiva orientada a acción",
      "Insights clave sin sobrecarga de información",
    ],
  },
]

export default function Services() {
  return (
    <section
      className="services"
      id="services"
      style={{ position: "relative", zIndex: 20, backgroundColor: "#000000" }}
    >
      <div className="container">
        <div className="section-title">
          <h2>Nuestros Servicios</h2>
          <p>
            Soluciones de inteligencia artificial personalizadas para transformar tu negocio con tecnología de
            vanguardia.
          </p>
        </div>
        <div className="services-grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="service-card fade-in-up flex flex-col">
              <div className="service-icon neon-glow-jade">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description mb-6">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-jade mt-1 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-center items-center w-full mt-auto pt-4">
                <a href="#contact" className="btn btn-secondary mx-auto">
                  {index === 0 ? "Activar eficiencia" : index === 1 ? "Optimizar contacto" : "Ver oportunidades"}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
