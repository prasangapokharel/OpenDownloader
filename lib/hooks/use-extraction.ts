"use client"

import { useState, useCallback } from "react"
import type { ExtractionResult, JobStatus } from "@/lib/types"

interface UseExtractionReturn {
  submit: (url: string) => Promise<string>
  status: JobStatus | null
  result: ExtractionResult | null
  error: string | null
  loading: boolean
  reset: () => void
}

export function useExtraction(): UseExtractionReturn {
  const [status, setStatus] = useState<JobStatus | null>(null)
  const [result, setResult] = useState<ExtractionResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const submit = useCallback(async (url: string): Promise<string> => {
    setLoading(true)
    setError(null)
    setStatus("pending")
    setResult(null)

    try {
      const res = await fetch("/api/v1/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error ?? "Failed to submit extraction")
      }

      const data = await res.json()

      if (data.result) {
        setResult(data.result)
        setStatus(data.result.status)
        setLoading(false)
        return data.messageId
      }

      setStatus("processing")
      pollResult(data.messageId)
      return data.messageId
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong"
      setError(msg)
      setStatus("failed")
      setLoading(false)
      throw e
    }
  }, [])

  const pollResult = useCallback(async (messageId: string) => {
    const maxAttempts = 30
    const interval = 2000

    for (let i = 0; i < maxAttempts; i++) {
      await new Promise((r) => setTimeout(r, interval))

      try {
        const res = await fetch(`/api/v1/result/${messageId}`)

        if (res.status === 404) continue

        if (!res.ok) {
          const body = await res.json()
          setError(body.error ?? "Extraction failed")
          setStatus("failed")
          setLoading(false)
          return
        }

        const data: ExtractionResult = await res.json()
        setResult(data)
        setStatus(data.status)
        setLoading(false)

        if (data.status === "completed" || data.status === "failed") {
          return
        }
      } catch {
        continue
      }
    }

    setError("Timed out waiting for result")
    setStatus("failed")
    setLoading(false)
  }, [])

  const reset = useCallback(() => {
    setStatus(null)
    setResult(null)
    setError(null)
    setLoading(false)
  }, [])

  return { submit, status, result, error, loading, reset }
}
