import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://xdub.app'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/_next/',
          '/admin/',
        ],
      },
      {
        userAgent: 'GPTBot', // ChatGPT crawler
        allow: '/',
      },
      {
        userAgent: 'Claude-Web', // Claude crawler
        allow: '/',
      },
      {
        userAgent: 'Perplexity', // Perplexity AI
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
