import { NextRequest } from "next/server"
import { isValidUrl, sanitizeUrl } from "@/lib/validators"
import { detectPlatform } from "@/lib/parser"
import { extractMedia } from "@/lib/downloader"
import { setResult } from "@/lib/store"

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url || !isValidUrl(url)) {
      return Response.json({ error: "Invalid URL provided" }, { status: 400 })
    }

    const cleanUrl = sanitizeUrl(url)
    const platform = detectPlatform(cleanUrl)

    if (!platform) {
      return Response.json({ error: "Unsupported platform" }, { status: 400 })
    }

    const result = await extractMedia(cleanUrl, platform.name)
    const origin = new URL(request.url).origin
    for (const m of result.media) {
      if (m.url.startsWith("http")) {
        m.directUrl = m.url
        if (/video\.twimg|twitter|ssl\.cf|cdn\.discord/i.test(m.url)) {
          m.url = `${origin}/api/v1/proxy?url=${encodeURIComponent(m.url)}`
        }
      }
    }
    setResult(result.id, result)

    return Response.json({ messageId: result.id, platform, result }, { status: 200 })
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Internal server error"
    console.error("[/api/v1/extract]", msg)
    return Response.json({ error: msg }, { status: 500 })
  }
}
