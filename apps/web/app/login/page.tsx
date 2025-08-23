"use client"

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Sparkles, Globe, Video } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const { ready, authenticated, login } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (ready && authenticated) {
      router.push('/dashboard')
    }
  }, [ready, authenticated, router])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-8">
          {/* Logo and title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
              <Video className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Welcome to X Dub
            </h1>
            <p className="text-gray-400">
              Sign in to start dubbing your content globally
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white">Reach 30 languages instantly</p>
                <p className="text-xs text-gray-500">Auto-dub videos and Spaces</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white">AI-powered dubbing</p>
                <p className="text-xs text-gray-500">Natural voice synthesis</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center">
                <span className="text-pink-400">🚀</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-white">3 free dubs per month</p>
                <p className="text-xs text-gray-500">No credit card required</p>
              </div>
            </div>
          </div>

          {/* Login button */}
          <button
            onClick={login}
            disabled={!ready}
            className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {ready ? 'Sign In / Sign Up' : 'Loading...'}
          </button>

          {/* Footer links */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-400 transition-colors">
              Back to home
            </Link>
            <span className="mx-2">·</span>
            <Link href="/terms" className="hover:text-gray-400 transition-colors">
              Terms
            </Link>
            <span className="mx-2">·</span>
            <Link href="/privacy" className="hover:text-gray-400 transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}