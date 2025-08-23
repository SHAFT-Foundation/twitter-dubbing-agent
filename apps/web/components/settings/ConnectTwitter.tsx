"use client"

import { useState } from 'react'
import { Twitter, Check, X, ExternalLink } from 'lucide-react'

interface ConnectTwitterProps {
  onChange: () => void
}

export function ConnectTwitter({ onChange }: ConnectTwitterProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)
    // TODO: Implement actual X OAuth flow
    // This will redirect to X OAuth and come back
    window.location.href = '/api/connect/x/start'
  }

  const handleDisconnect = async () => {
    // TODO: Implement disconnect
    setIsConnected(false)
    onChange()
  }

  if (isConnected) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg bg-green-500/10 border border-green-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <Check className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-white font-medium">@username</p>
              <p className="text-sm text-gray-400">Connected successfully</p>
            </div>
          </div>
          <button
            onClick={handleDisconnect}
            className="px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            Disconnect
          </button>
        </div>
        
        <div className="text-sm text-gray-500">
          <p>Permissions granted:</p>
          <ul className="mt-2 space-y-1">
            <li className="flex items-center gap-2">
              <Check className="w-3 h-3 text-green-400" />
              Read your posts and media
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3 h-3 text-green-400" />
              Post dubbed content
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3 h-3 text-green-400" />
              Access Space recordings
            </li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <button
        onClick={handleConnect}
        disabled={isConnecting}
        className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-medium transition-colors disabled:opacity-50"
      >
        <Twitter className="w-5 h-5" />
        {isConnecting ? 'Connecting...' : 'Connect X Account'}
        <ExternalLink className="w-4 h-4" />
      </button>
      
      <p className="text-xs text-gray-500 text-center">
        You&apos;ll be redirected to X to authorize X Dub. We only request necessary permissions.
      </p>
    </div>
  )
}