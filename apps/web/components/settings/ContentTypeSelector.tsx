"use client"

import { useState } from 'react'
import { Video, Film, Mic, Radio, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const contentTypes = [
  { 
    id: 'video', 
    label: 'Videos', 
    description: 'Regular video posts',
    icon: Video,
    recommended: true 
  },
  { 
    id: 'clip', 
    label: 'Clips', 
    description: 'Short clips and highlights',
    icon: Film,
    recommended: true 
  },
  { 
    id: 'space', 
    label: 'Recorded Spaces', 
    description: 'Audio from X Spaces',
    icon: Mic,
    recommended: true 
  },
  { 
    id: 'livestream', 
    label: 'Livestream VODs', 
    description: 'Recorded livestreams',
    icon: Radio,
    recommended: false 
  },
]

interface ContentTypeSelectorProps {
  onChange: () => void
}

export function ContentTypeSelector({ onChange }: ContentTypeSelectorProps) {
  const [selected, setSelected] = useState<string[]>(['video', 'clip', 'space'])

  const toggleType = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(t => t !== id))
    } else {
      setSelected([...selected, id])
    }
    onChange()
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3">
        {contentTypes.map((type) => {
          const Icon = type.icon
          const isSelected = selected.includes(type.id)
          
          return (
            <button
              key={type.id}
              onClick={() => toggleType(type.id)}
              className={cn(
                "flex items-start gap-4 p-4 rounded-lg border transition-all text-left",
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
                    {type.label}
                  </p>
                  {type.recommended && (
                    <span className="text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  )}
                </div>
                <p className={cn(
                  "text-sm mt-1",
                  isSelected ? "text-gray-300" : "text-gray-500"
                )}>
                  {type.description}
                </p>
              </div>
              
              <div className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                isSelected
                  ? "bg-purple-500 border-purple-500"
                  : "border-gray-600"
              )}>
                {isSelected && <Check className="w-3 h-3 text-white" />}
              </div>
            </button>
          )
        })}
      </div>
      
      <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
        <p className="text-sm text-blue-400">
          <strong>Note:</strong> X Dub will automatically detect and dub eligible content based on your selections. You can change these settings anytime.
        </p>
      </div>
    </div>
  )
}