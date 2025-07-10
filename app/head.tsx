// app/head.tsx
export default function Head() {
  return (
    <>
      <meta charSet="utf-8" />
      {/* —————— Obligatorio para que Tailwind aplique breakpoints correctamente en móvil —————— */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>AMAI - Transformamos el Futuro</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="theme-color" content="#00A86B" />

      {/* —————— Google Fonts Montserrat —————— */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;900&display=swap"
        rel="stylesheet"
      />
    </>
  );
}
