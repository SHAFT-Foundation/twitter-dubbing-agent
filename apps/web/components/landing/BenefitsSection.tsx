"use client"

import { TrendingUp, Users, Clock, Shield, Globe2, Sparkles, Coins, Rocket, FileText } from "lucide-react"

const benefits = [
  {
    title: "10x Your Reach",
    description: "Tap into Asian crypto markets, European DeFi communities, and LATAM NFT collectors instantly.",
    icon: Globe2,
    stat: "20+ Languages",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Boost Engagement",
    description: "Native language content gets 3x more likes, shares, and replies. Watch your metrics moon.",
    icon: TrendingUp,
    stat: "3x Engagement",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    title: "Space Summaries",
    description: "Auto-generate and post AI summaries of your X Spaces in multiple languages. Never miss key moments.",
    icon: FileText,
    stat: "AI Summaries",
    gradient: "from-green-500 to-teal-500",
    isNew: true,
  },
  {
    title: "Save Hours Daily",
    description: "Fully automated dubbing and posting. Set it once, focus on creating alpha content.",
    icon: Clock,
    stat: "100% Automated",
    gradient: "from-orange-500 to-yellow-500",
  },
  {
    title: "Keep Your Voice",
    description: "Advanced AI preserves your tone, style, and personality across all languages.",
    icon: Sparkles,
    stat: "Voice Cloning",
    gradient: "from-pink-500 to-red-500",
  },
  {
    title: "Build Global Communities",
    description: "Foster genuine connections with international crypto communities in their native languages.",
    icon: Users,
    stat: "Global Reach",
    gradient: "from-indigo-500 to-blue-500",
  },
]

const stats = [
  { value: "65", label: "Crypto KOLs", emoji: "🚀" },
  { value: "1M+", label: "Videos Dubbed", emoji: "🎬" },
  { value: "20+", label: "Languages", emoji: "🌍" },
  { value: "5min", label: "Avg Dub Time", emoji: "⚡" },
]

export function BenefitsSection() {
  return (
    <section className="bg-black py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-400 ring-1 ring-purple-500/20 mb-4">
            <Rocket className="h-4 w-4" />
            Why X Dub
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Crypto Creators</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Everything you need to dominate global crypto X
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-7xl">
          <dl className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div key={benefit.title} className="group relative rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6 transition-all hover:border-purple-500/50 hover:bg-gray-900/80 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                  {benefit.isNew && (
                    <div className="absolute -top-3 right-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-green-500 to-teal-500 px-2 py-1 text-xs font-bold text-white shadow-lg">
                        NEW
                      </span>
                    </div>
                  )}
                  <dt className="flex items-center gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${benefit.gradient} shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white">{benefit.title}</p>
                      <p className="text-xs text-purple-400 font-mono">{benefit.stat}</p>
                    </div>
                  </dt>
                  <dd className="mt-4 text-sm leading-7 text-gray-400">
                    {benefit.description}
                  </dd>
                </div>
              )
            })}
          </dl>
        </div>

        {/* Special Feature Callout */}
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="rounded-2xl border border-green-500/20 bg-gradient-to-r from-green-900/20 to-teal-900/20 p-8 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-teal-500 shadow-lg">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  🎉 NEW: X Space Summaries
                </h3>
                <p className="text-gray-400">
                  Automatically generate AI-powered summaries of your X Spaces and post them in multiple languages. 
                  Perfect for sharing key insights with your global audience who missed the live session.
                </p>
                <div className="mt-3 flex gap-4 text-sm">
                  <span className="text-green-400">✓ Auto-transcribe Spaces</span>
                  <span className="text-green-400">✓ AI summaries</span>
                  <span className="text-green-400">✓ Multi-language posts</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mx-auto mt-12 max-w-7xl">
          <div className="rounded-2xl border border-gray-800 bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-blue-900/20 p-8">
            <div className="grid gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center group cursor-pointer">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{stat.emoji}</div>
                  <p className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mx-auto mt-12 max-w-4xl">
          <p className="text-center text-sm text-gray-500 mb-6">Trusted by top crypto influencers</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-50">
            <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              <Coins className="h-8 w-8" />
            </div>
            <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              <Globe2 className="h-8 w-8" />
            </div>
            <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              <Shield className="h-8 w-8" />
            </div>
            <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              <Rocket className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}