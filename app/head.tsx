// app/head.tsx
export default function Head() {
  return (
    <>
      <meta charSet="utf-8" />
      {/* —————— Obligatorio para que Tailwind aplique breakpoints correctamente en móvil —————— */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>AMAI - Transformamos el Futuro</title>
      {/* Si quieres añadir favicon, theme-color, og:tags, etc., también van aquí */}
      <link rel="icon" href="/favicon.ico" />
      <meta name="theme-color" content="#00A86B" />
    </>
  );
}
