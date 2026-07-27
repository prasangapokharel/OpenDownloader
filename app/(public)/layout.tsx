import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-6xl items-center px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image src="/logo/1.jpg" alt="OpenDownloader" width={24} height={24} className="size-6 rounded" />
            OpenDownloader
            <Badge variant="secondary" className="text-[10px] font-normal leading-none">
              Beta
            </Badge>
          </Link>
          <nav className="ml-auto flex gap-4 text-sm text-muted-foreground">
            <Link href="/terms-service">Terms</Link>
            <Link href="/privacy">Privacy</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <div className="mx-auto max-w-6xl px-4">
          &copy; {new Date().getFullYear()} OpenDownloader. All rights reserved.
        </div>
      </footer>
    </>
  )
}
