import { Metadata } from "next"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "AI Video Dubbing Blog - Tips, Guides & Industry Insights | X Dub",
  description: "Learn about AI video dubbing, voice cloning technology, multilingual content creation, and video localization strategies. Expert guides for content creators and influencers.",
  keywords: "AI video dubbing blog, voice cloning guide, video localization tips, multilingual content strategy, lip-sync dubbing tutorial",
}

const blogPosts = [
  {
    slug: "what-is-ai-video-dubbing",
    title: "What is AI Video Dubbing? A Complete Guide for Content Creators",
    excerpt: "Discover how AI video dubbing is revolutionizing content creation. Learn the technology behind automated video localization and why major influencers are adopting it.",
    date: "2024-10-04",
    readTime: "8 min read",
    category: "Technology",
  },
  {
    slug: "voice-cloning-technology-explained",
    title: "Voice Cloning Technology Explained: How It Works & Why It Matters",
    excerpt: "Deep dive into voice cloning technology and its applications in multilingual content. Understand the AI models that preserve your authentic voice across 30+ languages.",
    date: "2024-10-04",
    readTime: "10 min read",
    category: "Technology",
  },
  {
    slug: "lip-sync-dubbing-guide",
    title: "Lip-Sync Dubbing: The Future of Authentic Video Localization",
    excerpt: "Learn how lip-sync dubbing creates natural viewing experiences. Case studies from Netflix, YouTube creators, and global brands using this technology.",
    date: "2024-10-04",
    readTime: "7 min read",
    category: "Best Practices",
  },
  {
    slug: "multilingual-content-strategy",
    title: "Building a Multilingual Content Strategy That Drives Growth",
    excerpt: "Proven strategies for expanding your audience with multilingual video content. Real data from creators who 3x their engagement with AI dubbing.",
    date: "2024-10-04",
    readTime: "12 min read",
    category: "Strategy",
  },
  {
    slug: "video-dubbing-roi-case-studies",
    title: "ROI of Video Dubbing: 5 Case Studies from Top Influencers",
    excerpt: "Analyze real ROI from AI video dubbing implementations. Learn how crypto KOLs, tech reviewers, and educators monetized global audiences.",
    date: "2024-10-04",
    readTime: "15 min read",
    category: "Case Studies",
  },
]

export default function BlogPage() {
  return (
    <main className="bg-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
            AI Video Dubbing <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Insights</span>
          </h1>
          <p className="text-lg text-gray-400">
            Expert guides on voice cloning, video localization, and multilingual content strategy
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6 transition-all hover:border-purple-500/50 hover:bg-gray-900/80 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
              >
                {/* Category Badge */}
                <div className="mb-4">
                  <span className="inline-flex items-center rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400 ring-1 ring-purple-500/20">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mx-auto max-w-4xl mt-16">
          <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-8 backdrop-blur-sm text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Go Global with AI Dubbing?
            </h3>
            <p className="text-gray-400 mb-6">
              Join 65+ influencers using X Dub to reach international audiences
            </p>
            <Link
              href="/#signup"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 text-base font-semibold text-white shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] hover:scale-105 transition-all duration-300"
            >
              Get Early Access
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
