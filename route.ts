// app/api/contact/route.ts
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const payload = await request.json()

  // Llama al Webhook de n8n
  await fetch(
    "https://flows.amai.run/webhook/738f3d16-feac-4d64-857e-0c2842577495",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  )

  return NextResponse.json({ ok: true })
}
