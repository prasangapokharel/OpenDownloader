export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">Terms of Service</h1>
      <div className="prose prose-sm max-w-none">
        <p>
          By using OpenDownloader, you agree to these terms. Our service allows you to download
          media from supported platforms for personal use only.
        </p>
        <h2 className="mt-6 text-xl font-semibold">Acceptable Use</h2>
        <p>
          You may not use this service to download copyrighted content without permission from the
          rights holder. You are responsible for complying with each platform&apos;s terms of service.
        </p>
        <h2 className="mt-6 text-xl font-semibold">Limitation of Liability</h2>
        <p>
          OpenDownloader is provided &quot;as is&quot; without warranties. We are not responsible for
          how you use downloaded content.
        </p>
        <h2 className="mt-6 text-xl font-semibold">Changes</h2>
        <p>We may update these terms at any time. Continued use constitutes acceptance.</p>
      </div>
    </div>
  )
}
