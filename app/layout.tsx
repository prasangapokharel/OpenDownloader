import { Geist, Geist_Mono, Inter } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toast"
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "OpenDownloader – Free Media Downloader for YouTube, TikTok, Instagram, X & More",
  description:
    "Download videos, images, and audio from YouTube, X (Twitter), Instagram, TikTok, Facebook, Pinterest, Reddit, Google Drive, and MediaFire. Fast, free, no sign-up required.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  keywords: [
    "video downloader",
    "media downloader",
    "YouTube downloader",
    "TikTok downloader",
    "Instagram downloader",
    "Twitter video downloader",
    "Facebook video downloader",
    "Pinterest downloader",
    "Reddit video downloader",
    "Google Drive downloader",
    "MediaFire downloader",
    "free online downloader",
    "OpenDownloader",
  ],
  openGraph: {
    title: "OpenDownloader – Free Media Downloader",
    description:
      "Download videos, images, and audio from YouTube, TikTok, Instagram, X, Facebook, and more. Fast and free.",
    type: "website",
    siteName: "OpenDownloader",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenDownloader – Free Media Downloader",
    description:
      "Download videos, images, and audio from YouTube, TikTok, Instagram, X, Facebook, and more.",
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
