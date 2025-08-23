"use client"

import { useState } from 'react'
import { Check, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

const languages = [
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', region: 'Middle East' },
  { code: 'zh', name: 'Chinese (Mandarin)', flag: '🇨🇳', region: 'Asia' },
  { code: 'zh_tw', name: 'Chinese (Traditional)', flag: '🇹🇼', region: 'Asia' },
  { code: 'en', name: 'English', flag: '🇺🇸', region: 'Global' },
  { code: 'fr', name: 'French', flag: '🇫🇷', region: 'Europe' },
  { code: 'de', name: 'German', flag: '🇩🇪', region: 'Europe' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', region: 'Asia' },
  { code: 'id', name: 'Indonesian', flag: '🇮🇩', region: 'Asia' },
  { code: 'it', name: 'Italian', flag: '🇮🇹', region: 'Europe' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', region: 'Asia' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', region: 'Asia' },
  { code: 'ms', name: 'Malay', flag: '🇲🇾', region: 'Asia' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱', region: 'Europe' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱', region: 'Europe' },
  { code: 'pt_br', name: 'Portuguese (Brazil)', flag: '🇧🇷', region: 'South America' },
  { code: 'pt', name: 'Portuguese (Portugal)', flag: '🇵🇹', region: 'Europe' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺', region: 'Europe' },
  { code: 'es_es', name: 'Spanish (Spain)', flag: '🇪🇸', region: 'Europe' },
  { code: 'es_mx', name: 'Spanish (Mexico)', flag: '🇲🇽', region: 'North America' },
  { code: 'es_ar', name: 'Spanish (Argentina)', flag: '🇦🇷', region: 'South America' },
  { code: 'th', name: 'Thai', flag: '🇹🇭', region: 'Asia' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷', region: 'Middle East' },
  { code: 'uk', name: 'Ukrainian', flag: '🇺🇦', region: 'Europe' },
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳', region: 'Asia' },
  { code: 'sv', name: 'Swedish', flag: '🇸🇪', region: 'Europe' },
  { code: 'no', name: 'Norwegian', flag: '🇳🇴', region: 'Europe' },
  { code: 'da', name: 'Danish', flag: '🇩🇰', region: 'Europe' },
  { code: 'fi', name: 'Finnish', flag: '🇫🇮', region: 'Europe' },
  { code: 'el', name: 'Greek', flag: '🇬🇷', region: 'Europe' },
  { code: 'he', name: 'Hebrew', flag: '🇮🇱', region: 'Middle East' },
]

interface LanguageSelectorProps {
  onChange: () => void
}

export function LanguageSelector({ onChange }: LanguageSelectorProps) {
  const [selected, setSelected] = useState<string[]>([])
  const [search, setSearch] = useState('')

  const filteredLanguages = languages.filter(lang => 
    lang.name.toLowerCase().includes(search.toLowerCase()) ||
    lang.region.toLowerCase().includes(search.toLowerCase())
  )

  const toggleLanguage = (code: string) => {
    if (selected.includes(code)) {
      setSelected(selected.filter(c => c !== code))
    } else if (selected.length < 10) {
      setSelected([...selected, code])
    }
    onChange()
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search languages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
        />
      </div>

      {/* Selected count */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">
          {selected.length} of 10 languages selected
        </span>
        {selected.length > 0 && (
          <button
            onClick={() => {
              setSelected([])
              onChange()
            }}
            className="text-sm text-purple-400 hover:text-purple-300"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Language grid */}
      <div className="grid gap-2 max-h-96 overflow-y-auto">
        {filteredLanguages.map((lang) => {
          const isSelected = selected.includes(lang.code)
          const isDisabled = !isSelected && selected.length >= 10
          
          return (
            <button
              key={lang.code}
              onClick={() => toggleLanguage(lang.code)}
              disabled={isDisabled}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg border transition-all text-left",
                isSelected
                  ? "bg-purple-500/20 border-purple-500/50 text-white"
                  : isDisabled
                  ? "bg-gray-900/50 border-gray-800 text-gray-600 cursor-not-allowed"
                  : "bg-gray-900/50 border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white"
              )}
            >
              <span className="text-2xl">{lang.flag}</span>
              <div className="flex-1">
                <p className="font-medium">{lang.name}</p>
                <p className="text-xs opacity-60">{lang.region}</p>
              </div>
              {isSelected && (
                <Check className="w-5 h-5 text-purple-400" />
              )}
            </button>
          )
        })}
      </div>

      {/* Popular suggestions */}
      {selected.length === 0 && (
        <div className="pt-4 border-t border-gray-800">
          <p className="text-sm text-gray-400 mb-2">Popular for crypto:</p>
          <div className="flex flex-wrap gap-2">
            {['ja', 'ko', 'zh', 'es_mx', 'pt_br', 'ru'].map(code => {
              const lang = languages.find(l => l.code === code)
              if (!lang) return null
              return (
                <button
                  key={code}
                  onClick={() => toggleLanguage(code)}
                  className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors text-sm"
                >
                  {lang.flag} {lang.name}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}