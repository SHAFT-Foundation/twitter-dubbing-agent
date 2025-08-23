"use client"

import { useState } from 'react'
import { MessageCircle, Plus, Pause, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const publishModes = [
  {
    id: 'auto-reply',
    label: 'Auto-Reply',
    description: 'Automatically reply to original post with dubbed versions',
    icon: MessageCircle,
    recommended: true,
    example: '↳ 🇯🇵 Japanese version: [video link]'
  },
  {
    id: 'new-post',
    label: 'New Post',
    description: 'Create separate posts for each dubbed version',
    icon: Plus,
    recommended: false,
    example: 'NEW POST: [Dubbed video] via @originaluser'
  },
  {
    id: 'manual',
    label: 'Manual Review',
    description: 'Review and approve each dub before publishing',
    icon: Pause,
    recommended: false,
    example: 'Dubs ready for your review in dashboard'
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
              onClick={() => handleModeChange(mode.id)}
              className={cn(
                "w-full flex items-start gap-4 p-4 rounded-lg border transition-all text-left",
                isSelected
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
                  {mode.recommended && (
                    <span className="text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full">
                      Recommended
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
                  <div className="mt-2 p-2 rounded bg-gray-800/50">
                    <p className="text-xs text-gray-400">Example:</p>
                    <p className="text-xs text-purple-400 mt-1 font-mono">{mode.example}</p>
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
      <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
        <p className="text-sm text-blue-400">
          <strong>Pro tip:</strong> Start with Auto-Reply mode to maximize engagement. Your dubbed content will appear directly in the conversation thread.
        </p>
      </div>
    </div>
  )
}