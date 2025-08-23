"use client"

import { useState } from 'react'
import { Twitter, Globe, Video, Zap, AlertCircle } from 'lucide-react'
import { ConnectTwitter } from '@/components/settings/ConnectTwitter'
import { LanguageSelector } from '@/components/settings/LanguageSelector'
import { ContentTypeSelector } from '@/components/settings/ContentTypeSelector'
import { PublishingOptions } from '@/components/settings/PublishingOptions'

export default function SettingsPage() {
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // TODO: Save settings to database
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    setHasChanges(false)
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">
          Configure your X account connection and dubbing preferences
        </p>
      </div>

      {/* X Account Connection */}
      <div className="mb-8">
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
              <Twitter className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-white mb-1">X Account</h2>
              <p className="text-sm text-gray-400">
                Connect your X account to enable automatic dubbing
              </p>
            </div>
          </div>
          <ConnectTwitter onChange={() => setHasChanges(true)} />
        </div>
      </div>

      {/* Content Types */}
      <div className="mb-8">
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-white mb-1">Content Types</h2>
              <p className="text-sm text-gray-400">
                Select which types of content you want to dub
              </p>
            </div>
          </div>
          <ContentTypeSelector onChange={() => setHasChanges(true)} />
        </div>
      </div>

      {/* Languages */}
      <div className="mb-8">
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center flex-shrink-0">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-white mb-1">Target Languages</h2>
              <p className="text-sm text-gray-400">
                Choose languages for your dubbed content (up to 10)
              </p>
            </div>
          </div>
          <LanguageSelector onChange={() => setHasChanges(true)} />
        </div>
      </div>

      {/* Publishing Options */}
      <div className="mb-8">
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-white mb-1">Publishing Options</h2>
              <p className="text-sm text-gray-400">
                Configure how dubbed content is published
              </p>
            </div>
          </div>
          <PublishingOptions onChange={() => setHasChanges(true)} />
        </div>
      </div>

      {/* Save Button */}
      {hasChanges && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 shadow-xl flex items-center gap-4">
            <div className="flex items-center gap-2 text-yellow-400">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">You have unsaved changes</span>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}