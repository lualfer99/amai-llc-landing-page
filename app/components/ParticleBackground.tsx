// ParticleBackground.tsx
"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: -9999, y: -9999 }); 
  // ^–– Este (-9999,-9999) solo es para que, hasta que no haya un "tap" o movimiento de ratón, 
  //    no se dibujen líneas al (0,0). No afecta al desplazamiento del canvas.

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const isMobile = width <= 768;

    // ——————————————————————————————  
    // 1) Función para crear las partículas  
    // ——————————————————————————————
    const createParticles = () => {
      // Calculamos cuántas partículas mostrar (menos en móvil, pero un mínimo/­máximo)
      const baseCount = Math.floor((width * height) / (isMobile ? 34000 : 35000));
      const count = Math.max(isMobile ? 28 : 30, Math.min(baseCount, isMobile ? 40 : 45));

      const arr: Particle[] = [];
      for (let i = 0; i < count; i++) {
        arr.push({
          x: Math.random() * width,
          y: Math.random() * height,
          // ←► Aquí puedes “subir” la velocidad en móvil. 
          // Antes teníamos (isMobile ? 0.3 : 0.4). Si quieres que vaya más rápido, por ejemplo:
           
          // Eso haría que en móvil la velocidad fuera 0.4 en lugar de 0.3. Prueba a subir de 0.3 → 0.35 o 0.4.
          vx: (Math.random() - 0.5) * (isMobile ? 0.5 : 0.5),
          vy: (Math.random() - 0.5) * (isMobile ? 0.5 : 0.5),
          size: Math.random() * (isMobile ? 1.5 : 2) + 0.5,
          opacity: Math.random() * 0.4 + (isMobile ? 0.2 : 0.4),
        });
      }
      particlesRef.current = arr;
    };

    // ——————————————————————————————  
    // 2) Función que dibuja cada frame  
    // ——————————————————————————————
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const particles = particlesRef.current;
      const len = particles.length;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // 2A) Dibujo de cada partícula individual
      for (let i = 0; i < len; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Si no es móvil, añadimos halo difuso
        if (!isMobile) {
          const gradRadius = p.size * 5;
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, gradRadius);
          grad.addColorStop(0, `rgba(0, 168, 107, ${Math.min(p.opacity * 1.2, 1)})`);
          grad.addColorStop(1, "rgba(0, 168, 107, 0)");
          ctx.beginPath();
          ctx.fillStyle = grad;
          ctx.arc(p.x, p.y, gradRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Dibujo del punto central
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 168, 107, ${Math.min(p.opacity * (isMobile ? 0.8 : 1.2), 1)})`;
        ctx.fill();
      }

      // 2B) Conexiones ENTRE partículas
      const maxDistPart = isMobile ? 150 : 200;
      for (let i = 0; i < len; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < len; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < maxDistPart * maxDistPart) {
            const dist = Math.sqrt(dist2);
            const alpha = Math.max((1 - dist / maxDistPart) * (isMobile ? 0.5 : 0.7), 0.1);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 168, 107, ${alpha})`;
            ctx.lineWidth = isMobile ? 1 : 1.5;
            ctx.stroke();
          }
        }
      }

      // 2C) Conexiones PARTÍCULA ↔ PUNTERO (ratón o dedo) en TODOS los dispositivos
      const maxDistPointer = isMobile ? 200 : 300;
      for (let i = 0; i < len; i++) {
        const p = particles[i];
        if (mx >= 0 && my >= 0) {
          const dxm = p.x - mx;
          const dym = p.y - my;
          const md2 = dxm * dxm + dym * dym;
          if (md2 < maxDistPointer * maxDistPointer) {
            const md = Math.sqrt(md2);
            const alpha = Math.max((1 - md / maxDistPointer) * (isMobile ? 0.5 : 0.8), 0.1);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = `rgba(0, 168, 107, ${alpha})`;
            ctx.lineWidth = isMobile ? 1 : 1.4;
            ctx.stroke();
          }
        }
      }
    };

    // ——————————————————————————————  
    // 3) Bucle de animación con throttling  
    // ——————————————————————————————
    let lastTime = 0;
    const targetFPS = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;
    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= frameInterval) {
        draw();
        lastTime = currentTime;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    // ——————————————————————————————  
    // 4) EVENTOS PARA ACTUALIZAR la posición del puntero  
    // ——————————————————————————————
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    // -- ¡IMPORTANTE! Ya NO ponemos ningún listener de touchmove:
    // const handleTouchMove = (e: TouchEvent) => {
    //   if (e.touches.length > 0) {
    //     mouseRef.current.x = e.touches[0].clientX;
    //     mouseRef.current.y = e.touches[0].clientY;
    //   }
    // };

    // Registramos SOLO mousemove (desktop)
    window.addEventListener("mousemove", handleMouseMove);
    // window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // ——————————————————————————————  
    // 5) Si cambian las dimensiones, redimensionamos y recreamos partículas  
    // ——————————————————————————————
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
   
    };
    window.addEventListener("resize", resizeCanvas);

    // ——————————————————————————————  
    // 6) Iniciar todo  
    // ——————————————————————————————
    resizeCanvas();
    createParticles();
    animate(0);

    // ——————————————————————————————  
    // 7) Cleanup al desmontar  
    // ——————————————————————————————
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      // window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{
        background: "transparent",
        // Si quieres que en móvil vaya siempre detrás de todo: zIndex = 0
        zIndex: 0,
        touchAction: "none",
      }}
    />
  );
}
