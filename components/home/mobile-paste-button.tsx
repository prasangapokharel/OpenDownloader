"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ClipboardPasteIcon, DownloadIcon, CheckmarkCircle02Icon, Alert02Icon } from "@hugeicons/core-free-icons"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { detectPlatform } from "@/lib/parser"
import { isValidUrl } from "@/lib/validators"
import { useExtraction } from "@/lib/hooks/use-extraction"
import { labelFilename } from "@/lib/format"

export function MobilePasteButton() {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<"idle" | "pasting" | "processing" | "done" | "error">("idle")
  const [message, setMessage] = useState("")
  const processedRef = useRef(false)
  const { submit, result, loading } = useExtraction()

  useEffect(() => {
    if (!open) {
      setStatus("idle")
      setMessage("")
      processedRef.current = false
    }
  }, [open])

  useEffect(() => {
    if (!open || !isMobile || processedRef.current) return
    processedRef.current = true
    const run = async () => {
      setStatus("pasting")
      setMessage("Reading clipboard...")
      try {
        const text = await navigator.clipboard.readText()
        if (!text || !text.trim()) {
          setStatus("error")
          setMessage("No link found in clipboard. Copy a URL first.")
          return
        }
        const trimmed = text.trim()
        if (!isValidUrl(trimmed) || !detectPlatform(trimmed)) {
          setStatus("error")
          setMessage("Unsupported or invalid link.")
          return
        }
        setStatus("processing")
        setMessage("Downloading...")
        await submit(trimmed)
        setStatus("done")
        setMessage("Download started!")
        setTimeout(() => setOpen(false), 1200)
      } catch {
        setStatus("error")
        setMessage("Could not read clipboard. Paste manually.")
      }
    }
    run()
  }, [open, isMobile, submit])

  const downloadFirst = useCallback(() => {
    if (!result || !result.media.length) return
    const first = result.media[0]
    const a = document.createElement("a")
    a.href = first.url
    a.download = labelFilename(first.filename)
    a.click()
  }, [result])

  useEffect(() => {
    if (status === "done" && result) downloadFirst()
  }, [status, result, downloadFirst])

  if (!isMobile) return null

  return (
    <>
      <div className="flex justify-center md:hidden">
        <button onClick={() => setOpen(true)} aria-label="Paste and download">
          <img src="/ball/1.gif" alt="" className="size-48" />
        </button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xs rounded-2xl p-6 text-center">
          <DialogHeader>
            <DialogTitle className="text-base">
              {status === "idle" && "Paste & Download"}
              {status === "pasting" && "Reading clipboard..."}
              {status === "processing" && "Downloading..."}
              {status === "done" && "Done!"}
              {status === "error" && "Oops"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <div className={`flex size-16 items-center justify-center rounded-full ${
              status === "done" ? "bg-green-500/10" :
              status === "error" ? "bg-red-500/10" :
              "bg-muted"
            }`}>
              {status === "pasting" || status === "processing" || loading ? (
                <span className="inline-block size-7 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
              ) : status === "done" ? (
                <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} className="size-7 text-green-500" />
              ) : status === "error" ? (
                <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} className="size-7 text-red-500" />
              ) : (
                <HugeiconsIcon icon={DownloadIcon} strokeWidth={2} className="size-7 text-muted-foreground" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{message || "Tap to start"}</p>
            {status === "idle" && (
              <Button className="w-full rounded-full" onClick={() => {
                processedRef.current = false
                setOpen(false)
                setTimeout(() => setOpen(true), 50)
              }}>
                <HugeiconsIcon icon={ClipboardPasteIcon} strokeWidth={2} className="size-4" />
                Paste & Download
              </Button>
            )}
            {status === "error" && (
              <Button variant="outline" className="w-full rounded-full" onClick={() => setOpen(false)}>
                Close
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
