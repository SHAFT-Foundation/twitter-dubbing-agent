"use client"

import { Link2, Languages, Zap } from "lucide-react"

const steps = [
  {
    number: "1",
    title: "Connect X",
    description: "Link your Twitter/X account with one click. We'll automatically detect your videos, clips, and Spaces.",
    icon: Link2,
    color: "from-blue-500 to-blue-600",
  },
  {
    number: "2",
    title: "Pick Languages",
    description: "Choose from 20+ languages. Select multiple to reach global audiences instantly.",
    icon: Languages,
    color: "from-purple-500 to-purple-600",
  },
  {
    number: "3",
    title: "We Auto-Dub & Reply",
    description: "Sit back. We automatically dub your content and post replies with localized media.",
    icon: Zap,
    color: "from-indigo-500 to-indigo-600",
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Three simple steps to reach a global audience
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.number} className="relative">
                  {/* Connection line (except for last item) */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 top-12 hidden h-0.5 w-full -translate-x-1/2 bg-gradient-to-r from-gray-300 to-gray-300 md:block md:left-full md:top-1/2 md:w-8 md:-translate-y-1/2">
                      <div className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-gray-300" />
                    </div>
                  )}

                  <div className="group relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-lg">
                    {/* Step number */}
                    <div className={`absolute -top-4 left-8 rounded-full bg-gradient-to-r ${step.color} px-3 py-1 text-sm font-semibold text-white`}>
                      Step {step.number}
                    </div>

                    {/* Icon */}
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${step.color} bg-opacity-10`}>
                      <Icon className="h-6 w-6 text-gray-900" />
                    </div>

                    {/* Content */}
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Visual Example */}
        <div className="mx-auto mt-16 max-w-4xl rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 p-8">
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-900">Example</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <p className="text-sm font-medium text-gray-900">Original Post</p>
                <p className="mt-1 text-xs text-gray-500">English video about AI</p>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-2xl">→</span>
              </div>
              <div className="space-y-2">
                <div className="rounded-lg bg-white p-3 shadow-sm">
                  <p className="text-xs">🇪🇸 Spanish dub</p>
                </div>
                <div className="rounded-lg bg-white p-3 shadow-sm">
                  <p className="text-xs">🇫🇷 French dub</p>
                </div>
                <div className="rounded-lg bg-white p-3 shadow-sm">
                  <p className="text-xs">🇯🇵 Japanese dub</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}