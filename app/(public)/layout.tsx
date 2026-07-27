import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="hidden md:block sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-6xl items-center px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image src="/logo/1.jpg" alt="OpenDownloader" width={24} height={24} className="size-6 rounded" />
            <span className="hidden md:inline">OpenDownloader</span>
            <Badge variant="secondary" className="text-[10px] font-normal leading-none">
              Beta
            </Badge>
          </Link>
          <nav className="ml-auto hidden items-center gap-4 text-sm text-muted-foreground md:flex">
            <Link href="/terms-service">Terms</Link>
            <Link href="/privacy">Privacy</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} OpenDownloader. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/prasangapokharel/OpenDownloader"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Open Source
            </Link>
            <Link
              href="https://github.com/prasangapokharel/OpenDownloader/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden transition-colors hover:text-foreground sm:inline"
            >
              Releases
            </Link>
            <Link href="/terms-service" className="hidden transition-colors hover:text-foreground sm:inline">
              Terms
            </Link>
            <Link href="/privacy" className="hidden transition-colors hover:text-foreground sm:inline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </>
  )
}
