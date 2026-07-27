import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    q: "Which platforms are supported?",
    a: "We support YouTube, X (Twitter), Instagram, TikTok, Facebook, Pinterest, Reddit, MediaFire, Google Drive, and many more.",
  },
  {
    q: "Is the service free?",
    a: "Yes, the service is completely free to use.",
  },
  {
    q: "How long does extraction take?",
    a: "Extraction usually completes within a few seconds. Larger media may take longer.",
  },
  {
    q: "Are there any limits?",
    a: "We don't impose strict limits, but fair use applies. Excessive requests may be rate-limited.",
  },
  {
    q: "Is my data safe?",
    a: "Yes. URLs are processed temporarily and not stored. We do not keep any logs of your downloads.",
  },
]

export function Faq() {
  return (
    <section className="py-12">
      <h2 className="mb-6 text-center text-2xl font-bold">Frequently Asked Questions</h2>
      <Accordion className="mx-auto max-w-2xl">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger>{faq.q}</AccordionTrigger>
            <AccordionContent>{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
