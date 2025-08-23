"use client"

import { useState } from 'react'
import { MessageCircle, Plus, Zap, Shield, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

const publishModes = [
  {
    id: 'auto-reply',
    label: 'Auto-Reply',
    description: 'Automatically reply to original post with dubbed versions (only replies, never new posts)',
    icon: MessageCircle,
    recommended: true,
    example: '↳ 🇯🇵 Japanese version: [video link]',
    security: 'Can only reply to your existing content'
  },
  {
    id: 'new-post',
    label: 'New Post (Disabled)',
    description: 'For security, we do not create new standalone posts',
    icon: Plus,
    recommended: false,
    disabled: true,
    example: 'Feature disabled for account security',
    security: 'Not available - protects your account'
  },
  {
    id: 'manual',
    label: 'Manual Review (Most Secure)',
    description: 'YOU control everything - review and approve each dub before publishing',
    icon: Shield,
    recommended: 'security',
    example: 'Dubs wait for your personal approval',
    security: 'Complete control - nothing posts without your click'
  },
]

interface PublishingOptionsProps {
  onChange: () => void
}

export function PublishingOptions({ onChange }: PublishingOptionsProps) {
  const [selectedMode, setSelectedMode] = useState('auto-reply')
  const [autoPublish, setAutoPublish] = useState(true)

  const handleModeChange = (modeId: string) => {
    setSelectedMode(modeId)
    if (modeId === 'manual') {
      setAutoPublish(false)
    }
    onChange()
  }

  return (
    <div className="space-y-6">
      {/* Publishing Mode */}
      <div className="space-y-3">
        {publishModes.map((mode) => {
          const Icon = mode.icon
          const isSelected = selectedMode === mode.id
          
          return (
            <button
              key={mode.id}
              onClick={() => !mode.disabled && handleModeChange(mode.id)}
              disabled={mode.disabled}
              className={cn(
                "w-full flex items-start gap-4 p-4 rounded-lg border transition-all text-left",
                mode.disabled
                  ? "bg-gray-900/30 border-gray-800 opacity-50 cursor-not-allowed"
                  : isSelected
                  ? "bg-purple-500/20 border-purple-500/50"
                  : "bg-gray-900/50 border-gray-800 hover:border-gray-700"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                isSelected
                  ? "bg-purple-500/30"
                  : "bg-gray-800"
              )}>
                <Icon className={cn(
                  "w-5 h-5",
                  isSelected ? "text-purple-400" : "text-gray-400"
                )} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className={cn(
                    "font-medium",
                    isSelected ? "text-white" : "text-gray-300"
                  )}>
                    {mode.label}
                  </p>
                  {mode.recommended === true && (
                    <span className="text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  )}
                  {mode.recommended === 'security' && (
                    <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Most Secure
                    </span>
                  )}
                </div>
                <p className={cn(
                  "text-sm mt-1",
                  isSelected ? "text-gray-300" : "text-gray-500"
                )}>
                  {mode.description}
                </p>
                {isSelected && (
                  <div className="mt-2 space-y-2">
                    <div className="p-2 rounded bg-gray-800/50">
                      <p className="text-xs text-gray-400">Example:</p>
                      <p className="text-xs text-purple-400 mt-1 font-mono">{mode.example}</p>
                    </div>
                    {mode.security && (
                      <div className="p-2 rounded bg-blue-500/10 border border-blue-500/30">
                        <p className="text-xs text-blue-400 flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          {mode.security}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className={cn(
                "w-4 h-4 rounded-full",
                isSelected ? "bg-purple-500" : "bg-gray-700"
              )} />
            </button>
          )
        })}
      </div>

      {/* Auto-publish toggle */}
      {selectedMode !== 'manual' && (
        <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">Auto-Publish</p>
                <p className="text-sm text-gray-400">Publish immediately when dubs are ready</p>
              </div>
            </div>
            <button
              onClick={() => {
                setAutoPublish(!autoPublish)
                onChange()
              }}
              className={cn(
                "relative w-14 h-7 rounded-full transition-colors",
                autoPublish ? "bg-purple-500" : "bg-gray-700"
              )}
            >
              <div className={cn(
                "absolute top-1 w-5 h-5 bg-white rounded-full transition-transform",
                autoPublish ? "translate-x-7" : "translate-x-1"
              )} />
            </button>
          </div>
        </div>
      )}

      {/* Info box */}
      <div className="space-y-3">
        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
          <p className="text-sm text-green-400">
            <strong>🔒 Security First:</strong> X Dub can only reply to your existing content. We cannot create new standalone posts. Choose Manual Review for complete control over what gets published.
          </p>
        </div>
        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
          <p className="text-sm text-blue-400">
            <strong>AI Monitoring:</strong> Our security AI agent monitors all platform activity 24/7 to ensure your account remains safe and secure.
          </p>
        </div>
      </div>
    </div>
  )
}