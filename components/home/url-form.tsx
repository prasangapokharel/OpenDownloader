"use client"

import { useState, useCallback, useRef, type FormEvent } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { LinkIcon, ClipboardPasteIcon, Cancel01Icon, DownloadIcon, FileDownloadIcon } from "@hugeicons/core-free-icons"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/toast"
import { PlatformIcon } from "./platform-icon"
import { detectPlatform } from "@/lib/parser"
import { isValidUrl } from "@/lib/validators"
import { useExtraction } from "@/lib/hooks/use-extraction"
import { ResultCard } from "./result-card"
import type { PlatformInfo } from "@/lib/types"

export function UrlForm() {
  const [url, setUrl] = useState("")
  const [platform, setPlatform] = useState<PlatformInfo | null>(null)
  const [inputError, setInputError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { submit, status, result, error, loading, reset } = useExtraction()

  const handleChange = useCallback((value: string) => {
    setUrl(value)
    setInputError(null)
    const trimmed = value.trim()
    if (trimmed) {
      const detected = detectPlatform(trimmed)
      setPlatform(detected)
    } else {
      setPlatform(null)
    }
  }, [])

  const handlePaste = useCallback(async () => {
    inputRef.current?.focus()
    try {
      const text = await navigator.clipboard.readText()
      if (text) {
        handleChange(text)
        if (inputRef.current) inputRef.current.value = text
        toast.add({ title: "Pasted", description: "URL pasted from clipboard" })
      }
    } catch {
      toast.add({ title: "Paste manually", description: "Press Ctrl+V to paste" })
    }
  }, [handleChange])

  const handleClear = useCallback(() => {
    setUrl("")
    setPlatform(null)
    setInputError(null)
    reset()
    if (inputRef.current) {
      inputRef.current.value = ""
      inputRef.current.focus()
    }
  }, [reset])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const trimmed = url.trim()
    if (!trimmed) return

    if (!isValidUrl(trimmed)) {
      setInputError("Please enter a valid URL")
      return
    }

    if (!platform) {
      setInputError("This platform is not supported yet")
      return
    }

    setInputError(null)
    await submit(trimmed)
  }

  const showResult = result && status === "completed"
  const showLoading = loading && !result
  const showEmpty = !result && !loading && !error && !inputError

  return (
    <div className="flex w-full max-w-2xl flex-col gap-6">
      <Card className="shadow-sm">
        <CardContent className="p-1.5">
          <form onSubmit={handleSubmit} className="flex items-center gap-0">
            <div className="relative flex flex-1 items-center">
              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <HugeiconsIcon icon={LinkIcon} strokeWidth={2} className="size-5" />
              </div>
              <Input
                ref={inputRef}
                placeholder="Paste a link from YouTube, TikTok, X, Instagram..."
                value={url}
                onChange={(e) => { reset(); handleChange(e.target.value) }}
                className="h-12 border-0 pl-10 pr-2 text-base shadow-none focus-visible:ring-0"
              />
              <div className="flex items-center gap-1 pr-1">
                {url && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="rounded p-1 text-muted-foreground hover:text-foreground"
                    aria-label="Clear"
                  >
                    <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="size-4" />
                  </button>
                )}
                {platform && (
                  <Badge variant="secondary" className="gap-1 px-2 py-0.5 text-xs">
                    <PlatformIcon name={platform.icon} className="size-3.5" />
                    {platform.name}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-0.5 pl-1.5">
              <Button type="button" variant="ghost" size="icon" className="size-10" onClick={handlePaste} title="Paste from clipboard">
                <HugeiconsIcon icon={ClipboardPasteIcon} strokeWidth={2} className="size-4" />
              </Button>
              <div className="h-8 w-px bg-border" />
              <Button type="submit" size="lg" className="h-10 rounded-md px-4" disabled={loading || !url.trim()}>
                {loading ? (
                  <>
                    <span className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Analyzing
                  </>
                ) : (
                  <>
                    <HugeiconsIcon icon={DownloadIcon} strokeWidth={2} className="size-4" />
                    Analyze
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {inputError && (
        <Alert variant="destructive">
          <AlertDescription>{inputError}</AlertDescription>
        </Alert>
      )}

      {error && !inputError && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {showLoading && (
        <div className="space-y-3" role="status" aria-label="Loading">
          <Skeleton className="h-48 w-full rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-24 rounded-md" />
            <Skeleton className="h-9 w-24 rounded-md" />
          </div>
        </div>
      )}

      {showResult && <ResultCard result={result} />}

      {showEmpty && (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <div className="rounded-full bg-muted p-4">
            <HugeiconsIcon icon={FileDownloadIcon} strokeWidth={2} className="size-8 text-muted-foreground/50" />
          </div>
          <p className="text-sm text-muted-foreground">Paste a link above to get started</p>
          <p className="text-xs text-muted-foreground/60">
            YouTube &middot; X &middot; Instagram &middot; TikTok &middot; Facebook &middot; Reddit &middot; Pinterest &middot; Google Drive &middot; MediaFire
          </p>
        </div>
      )}
    </div>
  )
}
