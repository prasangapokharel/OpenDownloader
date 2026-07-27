import { MediaCard } from "./media-card"
import type { MediaItem } from "@/lib/types"

interface MediaGridProps {
  media: MediaItem[]
  autoOpenFirst?: boolean
}

export function MediaGrid({ media, autoOpenFirst }: MediaGridProps) {
  if (media.length === 0) return null
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {media.map((item, i) => (
        <MediaCard key={item.id} item={item} autoOpen={autoOpenFirst && i === 0} />
      ))}
    </div>
  )
}
