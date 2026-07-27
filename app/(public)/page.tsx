import { Hero } from "@/components/home/hero"
import { SupportedPlatforms } from "@/components/home/supported-platforms"
import { Faq } from "@/components/home/faq"

export default function HomePage() {
  return (
    <div className="mx-auto px-4">
      <Hero />
      <SupportedPlatforms />
      <Faq />
    </div>
  )
}
