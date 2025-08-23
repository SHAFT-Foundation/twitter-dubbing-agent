"use client"

import { TrendingUp, Users, Clock, Shield, Globe2, Sparkles } from "lucide-react"

const benefits = [
  {
    title: "Expand Your Reach",
    description: "Tap into non-English speaking audiences and grow your global community.",
    icon: Globe2,
  },
  {
    title: "Boost Engagement",
    description: "See increased likes, shares, and comments from new international followers.",
    icon: TrendingUp,
  },
  {
    title: "Save Time",
    description: "Fully automated dubbing and posting. Set it once and forget it.",
    icon: Clock,
  },
  {
    title: "Keep Your Voice",
    description: "Advanced AI preserves your tone and style across all languages.",
    icon: Sparkles,
  },
  {
    title: "Build Communities",
    description: "Foster genuine connections with followers in their native languages.",
    icon: Users,
  },
  {
    title: "Enterprise Ready",
    description: "Secure, scalable, and compliant with data protection standards.",
    icon: Shield,
  },
]

export function BenefitsSection() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Creators Choose Claude Code
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to go global with your content
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-7xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div key={benefit.title} className="relative group">
                  <dt className="flex items-center gap-3 text-base font-semibold leading-7 text-gray-900">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 group-hover:scale-110 transition-transform">
                      <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    {benefit.title}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600 ml-13">
                    {benefit.description}
                  </dd>
                </div>
              )
            })}
          </dl>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 max-w-7xl">
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <p className="text-4xl font-bold">20+</p>
                <p className="mt-2 text-sm">Languages Supported</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold">5min</p>
                <p className="mt-2 text-sm">Average Dubbing Time</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold">3x</p>
                <p className="mt-2 text-sm">Engagement Increase</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}