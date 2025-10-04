"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "What is AI video dubbing?",
    answer: "AI video dubbing is an automated process that uses artificial intelligence to translate and recreate video audio in different languages while preserving the original speaker's voice characteristics, tone, and emotion. Our platform provides multilingual video dubbing with voice cloning technology for natural-sounding results."
  },
  {
    question: "How does voice cloning technology work?",
    answer: "Voice cloning technology analyzes your voice characteristics and creates a digital voice model that can speak in multiple languages while maintaining your unique tone, accent, and speaking style. This enables automatic video localization that sounds natural and authentic across all languages."
  },
  {
    question: "What is automatic video localization?",
    answer: "Automatic video localization is the process of adapting your video content for different languages and regions without manual intervention. Our global video dubbing tool handles translation, voice-over creation, and lip-sync dubbing automatically, making your content accessible to international audiences."
  },
  {
    question: "Who can benefit from video dubbing for influencers?",
    answer: "Content creators, social media influencers, crypto KOLs, educators, and businesses looking to expand their global reach benefit from our social media dubbing service. If you create video content and want to reach international audiences without creating separate videos for each language, AI video dubbing is perfect for you."
  },
  {
    question: "What is lip-sync dubbing?",
    answer: "Lip-sync dubbing is an advanced technique where the dubbed audio is synchronized with the speaker's mouth movements, creating a natural viewing experience. Our AI voice-over translation includes lip-sync capabilities to ensure your multilingual voice-over for social media looks and sounds professional."
  },
  {
    question: "How many languages does the platform support?",
    answer: "Our multilingual video dubbing platform supports 30+ languages including Japanese, Korean, Chinese, Spanish, French, German, Portuguese, Russian, Arabic, Hindi, and many more. You can dub your content into multiple languages simultaneously to maximize your global reach."
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Generate FAQ schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="py-16 sm:py-24 bg-black" id="faq">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-400 ring-1 ring-purple-500/20 mb-4">
              <HelpCircle className="h-4 w-4" />
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Everything About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">AI Video Dubbing</span>
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Learn more about our multilingual video dubbing platform and voice cloning technology
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm overflow-hidden transition-all hover:border-purple-500/50"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-900/80 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-white pr-8">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`h-5 w-5 text-purple-400 flex-shrink-0 transition-transform duration-200 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      openIndex === index ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <div className="px-6 pb-5 text-gray-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-400">
              Still have questions?{' '}
              <a href="mailto:argos@shaft.finance" className="text-purple-400 hover:text-purple-300 transition-colors">
                Contact our team
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
