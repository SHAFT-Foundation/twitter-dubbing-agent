"use client"

import Link from "next/link"
import { BookOpen, TrendingUp, Lightbulb, Target, DollarSign } from "lucide-react"

const blogPosts = [
  {
    slug: "what-is-ai-video-dubbing",
    title: "What is AI Video Dubbing?",
    description: "Complete guide to AI video dubbing technology with real examples from Netflix and MrBeast.",
    icon: Lightbulb,
    readTime: "8 min read",
  },
  {
    slug: "multilingual-content-strategy",
    title: "Multilingual Content Strategy",
    description: "How creators 3x their audience growth with proven multilingual strategies.",
    icon: Target,
    readTime: "12 min read",
  },
  {
    slug: "video-dubbing-roi-case-studies",
    title: "ROI Case Studies",
    description: "5 real case studies showing 1,800%+ average ROI from video dubbing.",
    icon: DollarSign,
    readTime: "15 min read",
  },
]

export function BlogSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-black via-purple-950/10 to-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-400 ring-1 ring-purple-500/20 mb-4">
            <BookOpen className="h-4 w-4" />
            Learn More
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
            Master Multilingual Video Dubbing
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Industry insights, proven strategies, and real case studies from creators who scaled globally with AI dubbing.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => {
            const Icon = post.icon
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900/50 to-black p-8 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-full bg-purple-500/10 p-3 group-hover:bg-purple-500/20 transition-colors">
                    <Icon className="h-6 w-6 text-purple-400" />
                  </div>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {post.description}
                </p>
                <div className="mt-4 flex items-center text-sm text-purple-400 group-hover:text-purple-300">
                  Read more →
                </div>
              </Link>
            )
          })}
        </div>

        {/* View All Blog Link */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors font-medium"
          >
            <TrendingUp className="h-4 w-4" />
            View all resources
            <span className="text-gray-500">→</span>
          </Link>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>
    </section>
  )
}
