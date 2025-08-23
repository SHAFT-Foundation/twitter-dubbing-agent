"use client"

import Link from 'next/link'
import { Video, ArrowRight } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export function Header() {
  const { ready, authenticated } = useAuth()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm border-b border-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Video className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">X Dub</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">
              How it Works
            </a>
            <a href="#features" className="text-gray-400 hover:text-white transition-colors">
              Features
            </a>
            <a href="#security" className="text-gray-400 hover:text-white transition-colors">
              Security
            </a>
            <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">
              Pricing
            </a>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-4">
            {ready && (
              authenticated ? (
                <Link href="/dashboard">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all">
                    Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              ) : (
                <Link href="/login">
                  <button className="px-4 py-2 text-white hover:text-purple-400 transition-colors">
                    Sign In
                  </button>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  )
}