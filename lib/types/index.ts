export interface MediaItem {
  id: string
  type: "image" | "video" | "audio"
  url: string
  directUrl?: string
  thumbnail?: string
  resolution?: string
  width?: number
  height?: number
  size?: number
  duration?: number
  filename?: string
  extension?: string
  mimeType?: string
}

export interface ExtractionResult {
  id: string
  status: "pending" | "processing" | "completed" | "failed"
  platform: string
  url: string
  author?: string
  title?: string
  caption?: string
  thumbnail?: string
  duration?: number
  resolution?: string
  fileSize?: number
  mediaCount?: number
  media: MediaItem[]
  error?: string
  createdAt: string
}

export interface PlatformInfo {
  name: string
  icon: string
  color: string
}

export type JobStatus = "pending" | "processing" | "completed" | "failed"
