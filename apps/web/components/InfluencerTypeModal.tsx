"use client"

import { useTheme } from '@/providers/ThemeProvider'
import { Coins, Briefcase, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function InfluencerTypeModal() {
  const { showModal, setInfluencerType, setShowModal } = useTheme()

  if (!showModal) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div 
        className="relative mx-4 w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        data-testid="influencer-type-modal"
      >
        <button
          onClick={() => setShowModal(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="text-center mb-8">
          <h2 id="modal-title" className="text-2xl font-bold text-white mb-2">
            Welcome to X Dub! 👋
          </h2>
          <p className="text-gray-400">
            Help us personalize your experience
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => setInfluencerType('crypto')}
            data-testid="crypto-influencer-button"
            className={cn(
              "w-full group relative rounded-xl border-2 border-purple-500/20 bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-6",
              "hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300",
              "text-left"
            )}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg group-hover:scale-110 transition-transform">
                <Coins className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  Crypto Influencer
                </h3>
                <p className="text-sm text-gray-400">
                  I create crypto, DeFi, NFT, or Web3 content
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setInfluencerType('professional')}
            data-testid="general-influencer-button"
            className={cn(
              "w-full group relative rounded-xl border-2 border-blue-500/20 bg-gradient-to-r from-blue-900/20 to-slate-900/20 p-6",
              "hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300",
              "text-left"
            )}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-slate-600 shadow-lg group-hover:scale-110 transition-transform">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  General Influencer
                </h3>
                <p className="text-sm text-gray-400">
                  I create lifestyle, business, or general content
                </p>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Don&apos;t worry, you can always change this later in settings
          </p>
        </div>
      </div>
    </div>
  )
}