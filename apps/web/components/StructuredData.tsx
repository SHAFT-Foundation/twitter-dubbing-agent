export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "X Dub",
    "applicationCategory": "MultimediaApplication",
    "description": "AI video dubbing platform for social media. Multilingual video dubbing service with voice cloning technology and automatic video localization for influencers.",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "10 free minutes per month"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "65"
    },
    "featureList": [
      "AI video dubbing",
      "Multilingual video dubbing",
      "Voice cloning technology",
      "Automatic video localization",
      "Lip-sync dubbing",
      "AI voice-over translation",
      "Social media dubbing service",
      "Video dubbing for influencers",
      "Multilingual voice-over for social media",
      "Global video dubbing tool"
    ],
    "screenshot": "https://xdub.app/og-image.png",
    "url": "https://xdub.app",
    "creator": {
      "@type": "Organization",
      "name": "SHAFT Foundation",
      "url": "https://shaft.finance"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
