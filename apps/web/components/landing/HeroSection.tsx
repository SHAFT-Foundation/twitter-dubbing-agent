"use client"

import { ArrowRight, Globe, Mic, Video } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  onGetStarted: () => void
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 flex justify-center gap-2">
            <Video className="h-8 w-8 text-blue-600" />
            <Globe className="h-8 w-8 text-purple-600" />
            <Mic className="h-8 w-8 text-indigo-600" />
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Turn every post into{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              every language
            </span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Auto-dub your Twitter videos and Spaces into 20+ languages. 
            Grow fans, engagement, and community — no extra work.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={onGetStarted}
              className={cn(
                "rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4",
                "text-base font-semibold text-white shadow-lg",
                "hover:from-blue-700 hover:to-purple-700",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                "focus-visible:outline-blue-600",
                "transition-all duration-200 hover:scale-105",
                "flex items-center gap-2"
              )}
            >
              Sign up for Early Access
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="mt-8 flex justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <span className="text-green-500">✓</span>
              3 free dubs/month
            </div>
            <div className="flex items-center gap-1">
              <span className="text-green-500">✓</span>
              No credit card required
            </div>
            <div className="flex items-center gap-1">
              <span className="text-green-500">✓</span>
              Setup in 2 minutes
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-200 to-purple-200 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </section>
  )
}