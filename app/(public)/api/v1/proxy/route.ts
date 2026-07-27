import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")
  if (!url) return Response.json({ error: "Missing url param" }, { status: 400 })

  try {
    const resp = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
    })
    if (!resp.ok) return Response.json({ error: "Failed to fetch media" }, { status: 502 })

    const contentType = resp.headers.get("content-type") || "application/octet-stream"
    const contentLength = resp.headers.get("content-length")
    const buffer = await resp.arrayBuffer()

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        ...(contentLength ? { "Content-Length": contentLength } : {}),
        "Cache-Control": "public, max-age=86400",
        "Access-Control-Allow-Origin": "*",
      },
    })
  } catch {
    return Response.json({ error: "Proxy fetch failed" }, { status: 502 })
  }
}
