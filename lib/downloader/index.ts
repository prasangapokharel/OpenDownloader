import type {
  TwitterResponse,
  YouTubeResponse,
  InstagramResponse,
  TikTokResponse,
  FacebookResponse,
  PinterestResponse,
  GoogleDriveResponse,
  MediaFireResponse,
  AioResponse,
} from "btch-downloader/Types"
import { twitter, youtube, igdl, ttdl, fbdown, pinterest, gdrive, mediafire, aio } from "btch-downloader"
import type { ExtractionResult, MediaItem } from "@/lib/types"

type PlatformHandler = (url: string) => Promise<ExtractionResult>

const PLATFORM_MAP: Record<string, PlatformHandler> = {
  youtube: handleYoutube,
  twitter: handleTwitter,
  x: handleTwitter,
  instagram: handleInstagram,
  tiktok: handleTiktok,
  facebook: handleFacebook,
  pinterest: handlePinterest,
  mediafire: handleMediafire,
  googledrive: handleGdrive,
  reddit: handleAio,
}

const NAME_TO_KEY: Record<string, string> = {
  "x(twitter)": "x",
  twitter: "twitter",
  youtube: "youtube",
  instagram: "instagram",
  tiktok: "tiktok",
  facebook: "facebook",
  pinterest: "pinterest",
  reddit: "reddit",
  mediafire: "mediafire",
  googledrive: "googledrive",
}

function normalizeKey(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "")
}

export async function extractMedia(url: string, platform?: string): Promise<ExtractionResult> {
  const rawKey = normalizeKey(platform ?? detectFromUrl(url))
  const key = NAME_TO_KEY[rawKey] ?? rawKey
  const handler = PLATFORM_MAP[key]
  if (handler) return handler(url)
  return handleAio(url)
}

function detectFromUrl(url: string): string {
  if (/youtube\.com|youtu\.be/i.test(url)) return "youtube"
  if (/x\.com|twitter\.com/i.test(url)) return "twitter"
  if (/instagram\.com/i.test(url)) return "instagram"
  if (/tiktok\.com|vm\.tiktok\.com/i.test(url)) return "tiktok"
  if (/facebook\.com|fb\.watch|fb\.com/i.test(url)) return "facebook"
  if (/pinterest\.com|pin\.it/i.test(url)) return "pinterest"
  if (/reddit\.com|redd\.it/i.test(url)) return "reddit"
  if (/mediafire\.com/i.test(url)) return "mediafire"
  if (/drive\.google\.com/i.test(url)) return "googledrive"
  return "unknown"
}

function baseResult(url: string, platform: string) {
  return {
    id: crypto.randomUUID(),
    status: "completed" as const,
    platform,
    url,
    createdAt: new Date().toISOString(),
    media: [] as MediaItem[],
  }
}

function isErr(res: { status?: boolean | string }): boolean {
  return res.status === false || res.status === "false"
}

async function handleTwitter(url: string): Promise<ExtractionResult> {
  const res: any = await twitter(url)
  if (isErr(res)) throw new Error(String(res.message ?? "Extraction failed"))
  const media: MediaItem[] = []
  const urlField = res.url
  if (Array.isArray(urlField)) {
    urlField.forEach((item: any, i: number) => {
      const hd = item.hd ?? item.HD
      const sd = item.sd ?? item.SD
      if (hd) media.push({ id: `media-${i}-hd`, type: "video", url: String(hd), resolution: "HD" })
      if (sd) media.push({ id: `media-${i}-sd`, type: "video", url: String(sd), resolution: "SD" })
    })
  } else if (typeof urlField === "string") {
    media.push({ id: "media-0", type: "video", url: urlField })
  }
  return { ...baseResult(url, "X (Twitter)"), title: String(res.title ?? ""), mediaCount: media.length, media }
}

async function handleYoutube(url: string): Promise<ExtractionResult> {
  const res: YouTubeResponse = await youtube(url)
  if (isErr(res)) throw new Error(String(res.message ?? "Extraction failed"))
  const media: MediaItem[] = []
  if (res.mp4) media.push({ id: "media-0", type: "video", url: res.mp4, thumbnail: res.thumbnail ?? "", resolution: "HD" })
  if (res.mp3) media.push({ id: "media-1", type: "audio", url: res.mp3, thumbnail: res.thumbnail ?? "" })
  return {
    ...baseResult(url, "YouTube"),
    title: res.title ?? "",
    author: res.author ?? "",
    thumbnail: res.thumbnail ?? "",
    mediaCount: media.length,
    media,
  }
}

async function handleInstagram(url: string): Promise<ExtractionResult> {
  const res: InstagramResponse = await igdl(url)
  if (isErr(res)) throw new Error(String(res.message ?? "Extraction failed"))
  const items = Array.isArray(res.result) ? res.result : []
  if (items.length === 0) throw new Error("No media found")
  const media: MediaItem[] = items.map((item, i) => ({
    id: `media-${i}`,
    type: item.url?.includes(".mp4") ? "video" : "image",
    url: item.url ?? "",
    thumbnail: item.thumbnail ?? "",
  }))
  return {
    ...baseResult(url, "Instagram"),
    thumbnail: media[0]?.thumbnail,
    mediaCount: media.length,
    media,
  }
}

async function handleTiktok(url: string): Promise<ExtractionResult> {
  const res: TikTokResponse = await ttdl(url)
  if (isErr(res)) throw new Error(String(res.message ?? "Extraction failed"))
  const media: MediaItem[] = []
  const videos = Array.isArray(res.video) ? res.video : (res.video ? [res.video] : [])
  const audios = Array.isArray(res.audio) ? res.audio : (res.audio ? [res.audio] : [])
  videos.forEach((v, i) => media.push({ id: `media-v-${i}`, type: "video", url: v, thumbnail: res.thumbnail ?? "" }))
  audios.forEach((a, i) => media.push({ id: `media-a-${i}`, type: "audio", url: a, thumbnail: res.thumbnail ?? "" }))
  return {
    ...baseResult(url, "TikTok"),
    title: res.title ?? "",
    thumbnail: res.thumbnail ?? "",
    mediaCount: media.length,
    media,
  }
}

async function handleFacebook(url: string): Promise<ExtractionResult> {
  const res: FacebookResponse = await fbdown(url)
  if (isErr(res)) throw new Error(String(res.message ?? "Extraction failed"))
  const media: MediaItem[] = []
  if (res.HD) media.push({ id: "media-0", type: "video", url: res.HD, resolution: "HD" })
  if (res.Normal_video) media.push({ id: "media-1", type: "video", url: res.Normal_video, resolution: "SD" })
  return { ...baseResult(url, "Facebook"), mediaCount: media.length, media }
}

async function handlePinterest(url: string): Promise<ExtractionResult> {
  const res: any = await pinterest(url)
  if (isErr(res)) throw new Error(String(res.message ?? "Extraction failed"))
  const inner = res.result ?? res
  const media: MediaItem[] = []
  if (inner.image) {
    media.push({ id: "media-0", type: "image", url: String(inner.image) })
  }
  if (inner.images && typeof inner.images === "object") {
    const entries = Object.values(inner.images) as any[]
    entries.forEach((img: any, i: number) => {
      if (img?.url && !media.some(m => m.url === img.url)) {
        media.push({ id: `media-${i}`, type: "image", url: String(img.url), width: img.width, height: img.height })
      }
    })
  }
  return { ...baseResult(url, "Pinterest"), mediaCount: media.length, media }
}

async function handleMediafire(url: string): Promise<ExtractionResult> {
  const res: MediaFireResponse = await mediafire(url)
  if (isErr(res)) throw new Error(String(res.message ?? "Extraction failed"))
  const r = res.result ?? (res as any)
  const directUrl = String(r.url ?? r.link ?? r.direct_link ?? "")
  const filename = String(r.filename ?? r.name ?? "file")
  const ext = filename.split(".").pop()
  const media: MediaItem[] = [{
    id: "media-0",
    type: ext && /mp4|webm|mov/i.test(ext) ? "video" : ext && /mp3|wav|aac/i.test(ext) ? "audio" : "image",
    url: directUrl,
    filename,
    extension: ext,
  }]
  return { ...baseResult(url, "MediaFire"), title: filename, mediaCount: media.length, media }
}

async function handleGdrive(url: string): Promise<ExtractionResult> {
  const res: any = await gdrive(url)
  if (isErr(res)) throw new Error(String(res.message ?? "Extraction failed"))
  const data = res.result ?? res
  const directUrl = String(data.downloadUrl ?? data.url ?? data.link ?? "")
  const filename = String(data.filename ?? data.name ?? "file")
  const ext = filename.split(".").pop()
  const media: MediaItem[] = [{
    id: "media-0",
    type: ext && /mp4|webm|mov/i.test(ext) ? "video" : ext && /mp3|wav|aac/i.test(ext) ? "audio" : "image",
    url: directUrl,
    filename,
    extension: ext,
  }]
  return { ...baseResult(url, "Google Drive"), title: filename, mediaCount: media.length, media }
}

async function handleAio(url: string): Promise<ExtractionResult> {
  const res: any = await aio(url)
  if (isErr(res)) throw new Error(String(res.message ?? "Extraction failed"))
  const resultUrl = typeof res.url === "string" ? res.url : res.data?.url ?? res.result?.url ?? ""
  const media: MediaItem[] = resultUrl ? [{ id: "media-0", type: "video", url: resultUrl }] : []
  return { ...baseResult(url, "URL"), mediaCount: media.length, media }
}
