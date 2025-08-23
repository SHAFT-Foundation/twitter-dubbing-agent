"use client"

import { useState, useEffect } from 'react'
import { Video, Globe, Clock, CheckCircle, AlertCircle, Send, Download, RefreshCw, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Dub {
  id: string
  source_id: string
  language: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  output_url?: string
  completed_at?: string
  published_at?: string
  published_url?: string
  created_at: string
  sources?: {
    source_type: string
    source_url: string
    source_id: string
  }
}

const LANGUAGE_FLAGS: Record<string, string> = {
  'es': '🇪🇸',
  'fr': '🇫🇷',
  'de': '🇩🇪',
  'it': '🇮🇹',
  'pt': '🇵🇹',
  'ru': '🇷🇺',
  'ja': '🇯🇵',
  'ko': '🇰🇷',
  'zh': '🇨🇳',
  'ar': '🇸🇦',
  'hi': '🇮🇳',
  'tr': '🇹🇷',
  'pl': '🇵🇱',
  'nl': '🇳🇱',
  'sv': '🇸🇪',
  'da': '🇩🇰',
  'no': '🇳🇴',
  'fi': '🇫🇮',
  'he': '🇮🇱',
  'th': '🇹🇭',
}

const LANGUAGE_NAMES: Record<string, string> = {
  'es': 'Spanish',
  'fr': 'French',
  'de': 'German',
  'it': 'Italian',
  'pt': 'Portuguese',
  'ru': 'Russian',
  'ja': 'Japanese',
  'ko': 'Korean',
  'zh': 'Chinese',
  'ar': 'Arabic',
  'hi': 'Hindi',
  'tr': 'Turkish',
  'pl': 'Polish',
  'nl': 'Dutch',
  'sv': 'Swedish',
  'da': 'Danish',
  'no': 'Norwegian',
  'fi': 'Finnish',
  'he': 'Hebrew',
  'th': 'Thai',
}

export default function DubsPage() {
  const [dubs, setDubs] = useState<Dub[]>([])
  const [loading, setLoading] = useState(true)
  const [publishingId, setPublishingId] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'published'>('all')
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchDubs()
  }, [])

  const fetchDubs = async () => {
    try {
      setRefreshing(true)
      const response = await fetch('/api/dubs')
      if (response.ok) {
        const data = await response.json()
        setDubs(data.dubs || [])
      }
    } catch (error) {
      console.error('Error fetching dubs:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handlePublish = async (dubId: string) => {
    setPublishingId(dubId)
    try {
      const response = await fetch(`/api/dubs/${dubId}/publish`, {
        method: 'POST',
      })
      
      if (response.ok) {
        const result = await response.json()
        // Update the dub in the list
        setDubs(prev => prev.map(dub => 
          dub.id === dubId 
            ? { ...dub, published_at: new Date().toISOString(), published_url: result.url }
            : dub
        ))
      } else {
        console.error('Failed to publish dub')
      }
    } catch (error) {
      console.error('Error publishing dub:', error)
    } finally {
      setPublishingId(null)
    }
  }

  const getStatusBadge = (status: string, published_at?: string) => {
    if (published_at) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
          <CheckCircle className="w-3 h-3" />
          Published
        </span>
      )
    }

    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
            <CheckCircle className="w-3 h-3" />
            Ready
          </span>
        )
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
            <Clock className="w-3 h-3 animate-spin" />
            Processing
          </span>
        )
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400">
            <AlertCircle className="w-3 h-3" />
            Failed
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-400">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        )
    }
  }

  const filteredDubs = dubs.filter(dub => {
    if (filter === 'all') return true
    if (filter === 'published') return !!dub.published_at
    if (filter === 'completed') return dub.status === 'completed' && !dub.published_at
    if (filter === 'pending') return dub.status === 'pending' || dub.status === 'processing'
    return true
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-white">Your Dubs</h1>
          <button
            onClick={fetchDubs}
            disabled={refreshing}
            className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <RefreshCw className={cn("w-5 h-5", refreshing && "animate-spin")} />
          </button>
        </div>
        
        <p className="text-gray-400">
          Track and manage your dubbed content across all languages
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex gap-2">
          {(['all', 'pending', 'completed', 'published'] as const).map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={cn(
                "px-4 py-2 rounded-lg font-medium capitalize transition-all",
                filter === filterOption
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              )}
            >
              {filterOption}
            </button>
          ))}
        </div>
      </div>

      {/* Dubs List */}
      {filteredDubs.length === 0 ? (
        <div className="text-center py-12">
          <Video className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No dubs found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredDubs.map((dub) => (
            <div
              key={dub.id}
              className="rounded-xl border border-gray-800 bg-gray-900/50 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{LANGUAGE_FLAGS[dub.language] || '🌐'}</span>
                      <span className="font-semibold text-white">
                        {LANGUAGE_NAMES[dub.language] || dub.language}
                      </span>
                    </div>
                    {getStatusBadge(dub.status, dub.published_at)}
                  </div>
                  
                  {dub.sources && (
                    <div className="text-sm text-gray-400 mb-3">
                      <p>Source: {dub.sources.source_type === 'tweet' ? 'Tweet' : 'Space'}</p>
                      <a 
                        href={dub.sources.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 underline"
                      >
                        View original
                      </a>
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500">
                    Created {new Date(dub.created_at).toLocaleDateString()}
                    {dub.completed_at && ` • Completed ${new Date(dub.completed_at).toLocaleDateString()}`}
                    {dub.published_at && ` • Published ${new Date(dub.published_at).toLocaleDateString()}`}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {dub.status === 'completed' && dub.output_url && (
                    <>
                      <a
                        href={dub.output_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                        title="Download"
                      >
                        <Download className="w-5 h-5" />
                      </a>
                      
                      {!dub.published_at && (
                        <button
                          onClick={() => handlePublish(dub.id)}
                          disabled={publishingId === dub.id}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all disabled:opacity-50"
                        >
                          {publishingId === dub.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Send className="w-4 h-4" />
                          )}
                          Publish
                        </button>
                      )}
                    </>
                  )}
                  
                  {dub.published_url && (
                    <a
                      href={dub.published_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-500 transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      View Post
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}