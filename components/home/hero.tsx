import { UrlForm } from "./url-form"
import { MobilePasteButton } from "./mobile-paste-button"

export function Hero() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 py-12 pt-20 pb-32 text-center md:py-16">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Download Media from Any Platform
      </h1>
      <p className="max-w-2xl text-muted-foreground">
        Paste a link from YouTube, TikTok, Instagram, X, and more. Extract videos, images, and audio instantly.
      </p>
      <div className="hidden md:block w-full">
        <UrlForm />
      </div>
      <MobilePasteButton />
    </section>
  )
}
