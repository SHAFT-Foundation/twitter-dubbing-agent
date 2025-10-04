"use client"

import Image from 'next/image'

interface PoweredBySpeechLabProps {
  variant?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
}

export function PoweredBySpeechLab({ variant = 'dark', size = 'md' }: PoweredBySpeechLabProps) {
  const textColor = variant === 'light' ? 'text-gray-700' : 'text-gray-400'
  const hoverColor = variant === 'light' ? 'hover:text-gray-900' : 'hover:text-white'

  const sizes = {
    sm: { text: 'text-xs', height: 16, width: 80 },
    md: { text: 'text-sm', height: 20, width: 100 },
    lg: { text: 'text-base', height: 24, width: 120 }
  }

  const currentSize = sizes[size]

  return (
    <a
      href="https://speechlab.ai"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 ${textColor} ${hoverColor} transition-colors`}
    >
      <span className={`${currentSize.text} font-medium`}>Powered by</span>
      <Image
        src="/speechlogowhit.png"
        alt="SpeechLab"
        width={currentSize.width}
        height={currentSize.height}
        className="object-contain"
      />
    </a>
  )
}
