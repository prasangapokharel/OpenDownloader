import type { ExtractionResult } from "@/lib/types"

const results = new Map<string, ExtractionResult>()

export function setResult(id: string, data: ExtractionResult) {
  results.set(id, data)
}

export function getResult(id: string): ExtractionResult | undefined {
  return results.get(id)
}
