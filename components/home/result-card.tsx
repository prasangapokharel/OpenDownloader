"use client"

import { useState, useEffect, useCallback } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  VideoIcon,
  MusicNote01Icon,
  ImageIcon,
  DownloadIcon,
} from "@hugeicons/core-free-icons"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/toast"
import { PlatformIcon } from "./platform-icon"
import { MediaGrid } from "./media-grid"
import { formatDuration, formatSize } from "@/lib/format"
import type { ExtractionResult } from "@/lib/types"

interface ResultCardProps {
  result: ExtractionResult
}

export function ResultCard({ result }: ResultCardProps) {
  const [freshId, setFreshId] = useState<string | null>(null)

  useEffect(() => {
    if (result.id) {
      setFreshId(result.id)
      const t = setTimeout(() => setFreshId(null), 1000)
      return () => clearTimeout(t)
    }
  }, [result.id])
  const handleDownloadAll = useCallback(() => {
    result.media.forEach((item) => {
      const a = document.createElement("a")
      a.href = item.url
      a.download = item.filename ?? `download-${item.id}`
      a.click()
    })
    toast.add({ title: "Downloading", description: `Downloading ${result.media.length} file(s)` })
  }, [result.media])

  return (
    <Card className="overflow-hidden shadow-sm">
      {result.thumbnail && (
        <a
          href={result.thumbnail}
          target="_blank"
          rel="noopener noreferrer"
          className="block aspect-video w-full overflow-hidden bg-muted"
        >
          <img
            src={result.thumbnail}
            alt={result.title ?? "Preview"}
            className="h-full w-full object-cover transition-transform duration-150 hover:scale-105"
            loading="lazy"
          />
        </a>
      )}
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-1">
            {result.title && (
              <h3 className="truncate text-lg font-semibold leading-tight">{result.title}</h3>
            )}
            {result.author && (
              <p className="text-sm text-muted-foreground">{result.author}</p>
            )}
            {result.caption && (
              <p className="line-clamp-2 text-sm text-muted-foreground">{result.caption}</p>
            )}
          </div>
          <Badge variant="outline" className="flex shrink-0 items-center gap-1.5">
            <PlatformIcon name={platformIconName(result.platform)} className="size-3.5" />
            {result.platform}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
          {result.duration != null && (
            <span className="flex items-center gap-1.5">
              <HugeiconsIcon icon={VideoIcon} strokeWidth={2} className="size-4" />
              {formatDuration(result.duration)}
            </span>
          )}
          {result.resolution && <span className="capitalize">{result.resolution}</span>}
          {result.fileSize != null && <span>{formatSize(result.fileSize)}</span>}
          {result.mediaCount != null && (
            <span className="flex items-center gap-1.5">
              <HugeiconsIcon
                icon={result.mediaCount === 1 && result.media[0]?.type === "video" ? VideoIcon : result.media[0]?.type === "audio" ? MusicNote01Icon : ImageIcon}
                strokeWidth={2}
                className="size-4"
              />
              {result.mediaCount} file{result.mediaCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        <Separator />

        {result.media.length > 0 && (
          <>
            <MediaGrid media={result.media} autoOpenFirst={result.id === freshId} />
            {result.media.length > 1 && (
              <>
                <Separator />
                <Button size="sm" onClick={handleDownloadAll}>
                  <HugeiconsIcon icon={DownloadIcon} strokeWidth={2} className="size-4" />
                  Download All
                </Button>
              </>
            )}
          </>
        )}

        {result.media.length === 0 && !result.thumbnail && (
          <p className="py-4 text-center text-sm text-muted-foreground">
            No media found for this URL.
          </p>
        )}
      </CardContent>
    </Card>
  )
}

function platformIconName(platform: string): string {
  const map: Record<string, string> = {
    youtube: "Youtube",
    twitter: "NewTwitter",
    x: "NewTwitter",
    instagram: "Instagram",
    tiktok: "Tiktok",
    facebook: "Facebook",
    reddit: "Reddit",
    pinterest: "Pinterest",
    googledrive: "GoogleDrive",
    mediafire: "CloudDownload",
  }
  return map[platform.toLowerCase()] ?? "Link"
}
