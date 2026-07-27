import { Card, CardContent } from "@/components/ui/card"
import { PlatformIcon } from "./platform-icon"

const platforms = [
  { name: "YouTube", icon: "Youtube" },
  { name: "X (Twitter)", icon: "NewTwitter" },
  { name: "Instagram", icon: "Instagram" },
  { name: "TikTok", icon: "Tiktok" },
  { name: "Facebook", icon: "Facebook" },
  { name: "Reddit", icon: "Reddit" },
  { name: "Pinterest", icon: "Pinterest" },
  { name: "Google Drive", icon: "GoogleDrive" },
  { name: "MediaFire", icon: "CloudDownload" },
]

export function SupportedPlatforms() {
  return (
    <section className="mx-auto max-w-6xl py-16">
      <h2 className="mb-8 text-center text-2xl font-bold">Supported Platforms</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {platforms.map((p) => (
          <Card
            key={p.name}
            className="transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
          >
            <CardContent className="flex items-center gap-3 p-4">
              <PlatformIcon name={p.icon} className="size-6 shrink-0" />
              <span className="text-sm font-medium">{p.name}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
