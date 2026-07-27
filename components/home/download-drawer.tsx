"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { DownloadIcon, VideoIcon, MusicNote01Icon, ImageIcon } from "@hugeicons/core-free-icons"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { formatSize, labelFilename } from "@/lib/format"
import { useDownload } from "@/lib/hooks/use-download"
import type { MediaItem } from "@/lib/types"

interface DownloadDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: MediaItem
}

export function DownloadDrawer({ open, onOpenChange, item }: DownloadDrawerProps) {
  const { progress, downloading, start } = useDownload()

  return (
    <Drawer open={open} onOpenChange={onOpenChange} showSwipeHandle>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{labelFilename(item.filename)}</DrawerTitle>
          <DrawerDescription>
            {item.resolution && <>{item.resolution} &middot; </>}
            {item.extension?.toUpperCase()}
            {item.size != null && <> &middot; {formatSize(item.size)}</>}
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col items-center gap-4 px-4 py-6">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
            <HugeiconsIcon icon={DownloadIcon} strokeWidth={2} className="size-8 text-primary" />
          </div>

          <div className="w-full space-y-1.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{!downloading ? "Ready" : progress < 100 ? "Downloading..." : "Complete"}</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <DrawerFooter>
          {!downloading && progress === 0 ? (
            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => start(item.url, labelFilename(item.filename))}>
                <HugeiconsIcon icon={DownloadIcon} strokeWidth={2} className="size-4" />
                Start Download
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
            </div>
          ) : progress >= 100 ? (
            <Button onClick={() => onOpenChange(false)}>
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 13l4 4L19 7" />
              </svg>
              Done
            </Button>
          ) : (
            <Button disabled>
              <span className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              {progress}%
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
