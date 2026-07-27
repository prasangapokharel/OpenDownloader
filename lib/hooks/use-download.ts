"use client"

import { useState, useCallback, useRef } from "react"
import { labelFilename } from "@/lib/format"

interface UseDownloadReturn {
  progress: number
  downloading: boolean
  start: (url: string, filename?: string) => Promise<void>
}

export function useDownload(): UseDownloadReturn {
  const [progress, setProgress] = useState(0)
  const [downloading, setDownloading] = useState(false)
  const frameRef = useRef(0)

  const start = useCallback(async (url: string, filename?: string) => {
    setDownloading(true)
    setProgress(0)

    const a = document.createElement("a")
    a.href = url
      a.download = labelFilename(filename)
    a.click()

    let p = 0
    const step = () => {
      p += 8
      if (p >= 100) {
        setProgress(100)
        setTimeout(() => { setDownloading(false); setProgress(0) }, 400)
        return
      }
      setProgress(p)
      frameRef.current = window.setTimeout(step, 60)
    }
    frameRef.current = window.setTimeout(step, 60)
  }, [])

  return { progress, downloading, start }
}
