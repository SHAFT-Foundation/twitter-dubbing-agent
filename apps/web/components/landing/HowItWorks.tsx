"use client"

import { Link2, Languages, Zap, Rocket } from "lucide-react"

const steps = [
  {
    number: "1",
    title: "Connect Your X",
    description: "Link your X account with one click. We'll automatically detect your videos, clips, and Spaces ready for dubbing.",
    icon: Link2,
    color: "from-purple-500 to-pink-500",
    emoji: "🔗",
  },
  {
    number: "2",
    title: "Pick Your Languages",
    description: "Select from 20+ languages. Target specific crypto communities - Japanese DeFi, Chinese NFTs, Spanish traders.",
    icon: Languages,
    color: "from-blue-500 to-purple-500",
    emoji: "🌍",
  },
  {
    number: "3",
    title: "AI Does the Magic",
    description: "Our AI automatically dubs videos, generates Space summaries, and posts in multiple languages. Watch your engagement multiply.",
    icon: Zap,
    color: "from-pink-500 to-orange-500",
    emoji: "⚡",
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 bg-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-400 ring-1 ring-purple-500/20 mb-4">
            <Rocket className="h-4 w-4" />
            How It Works
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Three Steps to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Global Reach</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            From setup to worldwide engagement in minutes
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.number} className="relative group">
                  {/* Connection line (except for last item) */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 top-12 hidden h-0.5 w-full -translate-x-1/2 md:block md:left-full md:top-1/2 md:w-8 md:-translate-y-1/2">
                      <div className="h-full w-full bg-gradient-to-r from-purple-500/50 to-pink-500/50" />
                    </div>
                  )}

                  <div className="relative rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-8 transition-all hover:border-purple-500/50 hover:bg-gray-900/80 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                    {/* Step number badge */}
                    <div className={`absolute -top-4 left-8 rounded-full bg-gradient-to-r ${step.color} px-3 py-1 text-sm font-bold text-white shadow-lg`}>
                      Step {step.number}
                    </div>

                    {/* Emoji */}
                    <div className="text-4xl mb-4">{step.emoji}</div>

                    {/* Icon */}
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${step.color} shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Visual Example */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="rounded-2xl border border-gray-800 bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-8 backdrop-blur-sm">
            <div className="text-center">
              <p className="text-sm font-semibold text-purple-400 mb-6">Live Example</p>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-lg bg-gray-900/80 border border-gray-800 p-4 hover:border-purple-500/50 transition-all">
                  <p className="text-sm font-medium text-white">Your Original</p>
                  <p className="mt-2 text-xs text-gray-400">🇺🇸 English crypto analysis</p>
                  <div className="mt-3 text-2xl">📹</div>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="text-3xl text-purple-400 animate-pulse">→</div>
                </div>
                
                <div className="space-y-2">
                  <div className="rounded-lg bg-gray-900/80 border border-gray-800 p-3 hover:border-purple-500/50 transition-all group cursor-pointer">
                    <span className="text-xs group-hover:text-purple-400 transition-colors">🇯🇵 Japanese dub • 10K views</span>
                  </div>
                  <div className="rounded-lg bg-gray-900/80 border border-gray-800 p-3 hover:border-purple-500/50 transition-all group cursor-pointer">
                    <span className="text-xs group-hover:text-purple-400 transition-colors">🇰🇷 Korean dub • 8K views</span>
                  </div>
                  <div className="rounded-lg bg-gray-900/80 border border-gray-800 p-3 hover:border-purple-500/50 transition-all group cursor-pointer">
                    <span className="text-xs group-hover:text-purple-400 transition-colors">🇨🇳 Chinese dub • 15K views</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 inline-flex items-center gap-2 text-sm text-gray-400">
                <span className="text-green-400">↗</span>
                <span>3x engagement multiplier</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}