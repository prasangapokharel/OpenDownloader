export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>
      <div className="prose prose-sm max-w-none">
        <p>We respect your privacy. This policy explains how we handle your data.</p>
        <h2 className="mt-6 text-xl font-semibold">Data We Collect</h2>
        <p>
          We process URLs you submit to extract media. We do not store your downloads or personal
          information. URLs are processed temporarily and discarded.
        </p>
        <h2 className="mt-6 text-xl font-semibold">Cookies</h2>
        <p>We use essential cookies for site functionality. No tracking or analytics cookies.</p>
        <h2 className="mt-6 text-xl font-semibold">Third Parties</h2>
        <p>
          We use Upstash QStash for background job processing. Your submitted URL is transmitted to
          QStash for processing.
        </p>
        <h2 className="mt-6 text-xl font-semibold">Contact</h2>
        <p>For privacy concerns, contact us through our GitHub repository.</p>
      </div>
    </div>
  )
}
