"use client"

import { useState, useCallback, useEffect } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  DownloadIcon,
  Copy01Icon,
  ImageIcon,
  MusicNote01Icon,
  VideoIcon,
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "@/components/ui/toast"
import { formatDuration, formatSize, formatShortDuration, labelFilename } from "@/lib/format"
import { useDownload } from "@/lib/hooks/use-download"
import { DownloadDrawer } from "./download-drawer"
import type { MediaItem } from "@/lib/types"

interface MediaCardProps {
  item: MediaItem
  autoOpen?: boolean
}

export function MediaCard({ item, autoOpen }: MediaCardProps) {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { start } = useDownload()

  useEffect(() => {
    if (autoOpen) setDrawerOpen(true)
  }, [autoOpen])

  const quickDownload = useCallback(() => {
    const a = document.createElement("a")
    a.href = item.url
    a.download = labelFilename(item.filename)
    a.click()
    toast.add({ title: "Downloading", description: `${labelFilename(item.filename)} download started` })
  }, [item])

  const copyUrl = useCallback(async () => {
    await navigator.clipboard.writeText(item.url)
    toast.add({ title: "Copied", description: "Media URL copied to clipboard" })
  }, [item.url])

  const resBadge = item.resolution?.toLowerCase()
  const isHd = resBadge === "hd" || resBadge === "fhd" || resBadge === "4k" || resBadge === "2k"

  return (
    <>
      <div className="overflow-hidden rounded-lg border bg-card shadow-sm transition-all duration-150 hover:shadow-md">
        <div className="relative bg-muted group">
          {item.type === "video" ? (
            <div className="relative aspect-video">
              <video
                src={item.url}
                poster="/placeholder/1.jpg"
                controls
                className="h-full w-full"
                preload="metadata"
                onError={(e) => { (e.currentTarget as HTMLVideoElement).poster = "/placeholder/1.jpg" }}
              >
                <track kind="captions" />
              </video>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                <div className="rounded-full bg-black/60 p-3">
                  <svg className="size-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              {item.duration != null && (
                <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white">
                  {formatShortDuration(item.duration)}
                </span>
              )}
              {item.resolution && (
                <span
                  className="absolute left-2 top-2 rounded px-1.5 py-0.5 text-xs text-white"
                  style={{ backgroundColor: isHd ? "hsl(142, 76%, 36%)" : "rgba(0,0,0,0.6)" }}
                >
                  {item.resolution}
                </span>
              )}
              <button
                onClick={quickDownload}
                className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-black/70 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-150 hover:bg-black/80 group-hover:opacity-100"
                aria-label="Quick download"
              >
                <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Save
              </button>
            </div>
          ) : item.type === "audio" ? (
            <div className="flex aspect-square flex-col items-center justify-center gap-2 p-6">
              <HugeiconsIcon icon={MusicNote01Icon} strokeWidth={2} className="size-10 text-muted-foreground" />
              <audio src={item.url} controls className="w-full" />
            </div>
          ) : (
            <div className="relative aspect-video">
              <img
                src={item.thumbnail ?? item.url}
                alt={item.filename ?? "Media"}
                className="h-full w-full object-cover transition-transform duration-150 hover:scale-105"
                loading="lazy"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder/1.jpg" }}
              />
              <button
                onClick={quickDownload}
                className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-black/70 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-150 hover:bg-black/80 group-hover:opacity-100"
                aria-label="Quick download"
              >
                <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Save
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 border-t px-3 py-2 text-xs text-muted-foreground">
          {item.resolution && (
            <span className={`rounded px-1.5 py-0.5 font-medium ${isHd ? "bg-primary/10 text-primary" : "bg-muted"}`}>
              {item.resolution}
            </span>
          )}
          {item.width && item.height && (
            <span className="rounded bg-muted px-1.5 py-0.5">
              {item.width}&times;{item.height}
            </span>
          )}
          {item.extension && (
            <span className="rounded bg-muted px-1.5 py-0.5 uppercase">{item.extension}</span>
          )}
          {item.type && (
            <span className="rounded bg-muted px-1.5 py-0.5 capitalize">{item.type}</span>
          )}
          {item.duration != null && (
            <span className="rounded bg-muted px-1.5 py-0.5">{formatDuration(item.duration)}</span>
          )}
          {item.size != null && (
            <span className="rounded bg-muted px-1.5 py-0.5">{formatSize(item.size)}</span>
          )}
        </div>

        <div className="flex items-center gap-2 border-t px-3 py-3">
          <Button size="lg" className="flex-1" onClick={() => setDrawerOpen(true)}>
            <HugeiconsIcon icon={DownloadIcon} strokeWidth={2} className="size-5" />
            Download
          </Button>
          {item.type === "image" && (
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
              <DialogTrigger render={<Button variant="outline" />}>
                <HugeiconsIcon icon={ImageIcon} strokeWidth={2} className="size-4" />
                Preview
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Preview</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center gap-3">
                  <img
                    src={item.url}
                    alt="Preview"
                    className="max-h-[70vh] w-full rounded-lg object-contain"
                  />
                  {item.width && item.height && (
                    <p className="text-sm text-muted-foreground">
                      {item.width} &times; {item.height}
                      {item.extension && <span> &middot; {item.extension.toUpperCase()}</span>}
                      {item.size != null && <span> &middot; {formatSize(item.size)}</span>}
                    </p>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          )}
          <Tooltip>
            <TooltipTrigger render={<Button variant="outline" size="icon" />} onClick={copyUrl} aria-label="Copy URL">
              <HugeiconsIcon icon={Copy01Icon} strokeWidth={2} className="size-4" />
            </TooltipTrigger>
            <TooltipContent>Copy URL</TooltipContent>
          </Tooltip>
        </div>
      </div>
      <DownloadDrawer open={drawerOpen} onOpenChange={setDrawerOpen} item={item} />
    </>
  )
}
