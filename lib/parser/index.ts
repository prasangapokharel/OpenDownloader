import { parse } from "social-link-parser"
import type { PlatformInfo } from "@/lib/types"

const PLATFORM_INFO: Record<string, PlatformInfo> = {
  youtube: { name: "YouTube", icon: "Youtube", color: "text-red-500" },
  twitter: { name: "X (Twitter)", icon: "NewTwitter", color: "text-blue-400" },
  x: { name: "X (Twitter)", icon: "NewTwitter", color: "text-blue-400" },
  instagram: { name: "Instagram", icon: "Instagram", color: "text-pink-500" },
  tiktok: { name: "TikTok", icon: "Tiktok", color: "text-foreground" },
  facebook: { name: "Facebook", icon: "Facebook", color: "text-blue-600" },
  pinterest: { name: "Pinterest", icon: "Pinterest", color: "text-red-600" },
  reddit: { name: "Reddit", icon: "Reddit", color: "text-orange-500" },
  mediafire: { name: "MediaFire", icon: "CloudDownload", color: "text-blue-500" },
  googledrive: { name: "Google Drive", icon: "GoogleDrive", color: "text-green-500" },
}

const FALLBACK_PATTERNS: Array<{ regex: RegExp; key: string }> = [
  { regex: /youtube\.com|youtu\.be/i, key: "youtube" },
  { regex: /x\.com/i, key: "x" },
  { regex: /twitter\.com/i, key: "twitter" },
  { regex: /instagram\.com/i, key: "instagram" },
  { regex: /tiktok\.com|vm\.tiktok\.com/i, key: "tiktok" },
  { regex: /facebook\.com|fb\.watch|fb\.com/i, key: "facebook" },
  { regex: /pinterest\.com|pin\.it/i, key: "pinterest" },
  { regex: /reddit\.com|redd\.it/i, key: "reddit" },
  { regex: /mediafire\.com/i, key: "mediafire" },
  { regex: /drive\.google\.com/i, key: "googledrive" },
]

export function detectPlatform(url: string): PlatformInfo | null {
  try {
    const result = parse(url)
    if (result?.platform) {
      const key = result.platform.toLowerCase().replace(/\s+/g, "")
      if (PLATFORM_INFO[key]) return PLATFORM_INFO[key]
      return { name: result.platformName ?? result.platform, icon: "Link", color: "text-foreground" }
    }
  } catch {
    // fall through to fallback
  }

  for (const { regex, key } of FALLBACK_PATTERNS) {
    if (regex.test(url)) return PLATFORM_INFO[key] ?? null
  }

  return null
}

export function isSupportedUrl(url: string): boolean {
  return detectPlatform(url) !== null
}

export const SUPPORTED_PLATFORMS = Object.values(PLATFORM_INFO)
