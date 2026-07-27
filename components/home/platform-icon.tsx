import { HugeiconsIcon } from "@hugeicons/react"
import {
  YoutubeIcon,
  NewTwitterIcon,
  InstagramIcon,
  TiktokIcon,
  FacebookIcon,
  RedditIcon,
  PinterestIcon,
  GoogleDriveIcon,
  CloudDownloadIcon,
  LinkIcon,
  ImageIcon,
  VideoIcon,
  MusicNote01Icon,
  DownloadIcon,
  ExternalLinkIcon,
  Copy01Icon,
} from "@hugeicons/core-free-icons"

const ICON_MAP: Record<string, typeof YoutubeIcon> = {
  Youtube: YoutubeIcon,
  NewTwitter: NewTwitterIcon,
  Instagram: InstagramIcon,
  Tiktok: TiktokIcon,
  Facebook: FacebookIcon,
  Reddit: RedditIcon,
  Pinterest: PinterestIcon,
  GoogleDrive: GoogleDriveIcon,
  CloudDownload: CloudDownloadIcon,
  Link: LinkIcon,
  Image: ImageIcon,
  Video: VideoIcon,
  Music: MusicNote01Icon,
  Download: DownloadIcon,
  ExternalLink: ExternalLinkIcon,
  Copy: Copy01Icon,
}

export function PlatformIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Icon = ICON_MAP[name] ?? LinkIcon
  return <HugeiconsIcon icon={Icon} strokeWidth={2} className={className} />
}
