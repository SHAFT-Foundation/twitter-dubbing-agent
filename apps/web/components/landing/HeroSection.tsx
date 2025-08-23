"use client"

import { ArrowRight, Globe, Mic, Video, Sparkles, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  onGetStarted: () => void
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-black py-20 sm:py-32">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>
      
      {/* Floating orbs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Crypto badges */}
          <div className="mb-8 flex justify-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400 ring-1 ring-purple-500/20">
              <Sparkles className="h-3 w-3" />
              AI Powered
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 ring-1 ring-blue-500/20">
              <Zap className="h-3 w-3" />
              30 Languages
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400 ring-1 ring-green-500/20">
              <Globe className="h-3 w-3" />
              Global Reach
            </span>
          </div>
          
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            <span className="text-white">Dub your </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
              videos
            </span>
            <span className="text-white"> into </span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient animation-delay-2000">
              every language
            </span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Auto-dub your X videos and Spaces into 30 languages.
            <br />
            <span className="text-sm text-green-400">NEW: AI-powered Space summaries in every language!</span>
            <br />
            <span className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Go global. Stay degen. 🚀
            </span>
          </p>
          
          {/* Language flags floating */}
          <div className="mt-8 flex justify-center gap-2 text-2xl animate-bounce-slow">
            <span className="hover:scale-125 transition-transform cursor-pointer">🇯🇵</span>
            <span className="hover:scale-125 transition-transform cursor-pointer animation-delay-100">🇰🇷</span>
            <span className="hover:scale-125 transition-transform cursor-pointer animation-delay-200">🇨🇳</span>
            <span className="hover:scale-125 transition-transform cursor-pointer animation-delay-300">🇪🇸</span>
            <span className="hover:scale-125 transition-transform cursor-pointer animation-delay-400">🇫🇷</span>
            <span className="hover:scale-125 transition-transform cursor-pointer animation-delay-500">🇩🇪</span>
            <span className="hover:scale-125 transition-transform cursor-pointer animation-delay-600">🇧🇷</span>
            <span className="hover:scale-125 transition-transform cursor-pointer animation-delay-700">🇷🇺</span>
            <span className="hover:scale-125 transition-transform cursor-pointer animation-delay-800">🇮🇳</span>
            <span className="hover:scale-125 transition-transform cursor-pointer animation-delay-900">🇦🇪</span>
          </div>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={onGetStarted}
              className={cn(
                "group relative rounded-full px-8 py-4",
                "bg-gradient-to-r from-purple-600 to-pink-600",
                "text-base font-semibold text-white",
                "shadow-[0_0_40px_rgba(168,85,247,0.5)]",
                "hover:shadow-[0_0_60px_rgba(168,85,247,0.7)]",
                "hover:scale-105 transition-all duration-300",
                "flex items-center gap-2"
              )}
            >
              <Sparkles className="h-4 w-4" />
              Join the Allowlist
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="mt-8 flex justify-center gap-8 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-green-400">✓</span>
              3 free dubs/month
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-green-400">✓</span>
              No credit card
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-green-400">✓</span>
              2 min setup
            </div>
          </div>
          
          {/* Social proof */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-400">
              Trusted by 65 Crypto KOLs
            </p>
            <div className="mt-3 flex justify-center gap-4 opacity-50">
              <Video className="h-5 w-5 text-gray-500" />
              <Mic className="h-5 w-5 text-gray-500" />
              <Globe className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}