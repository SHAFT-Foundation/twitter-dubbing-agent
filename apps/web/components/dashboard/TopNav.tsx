"use client"

import { useAuth } from '@/hooks/useAuth'
import { Bell, User, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export function TopNav() {
  const { user } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div className="h-16 border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm px-6 flex items-center justify-between">
      {/* Left side - can add breadcrumbs here */}
      <div className="flex items-center gap-4">
        <h2 className="text-white font-semibold">Dashboard</h2>
      </div>

      {/* Right side - user menu */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full"></span>
        </button>

        {/* User dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-white">
              {user?.email?.address || 'User'}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 rounded-lg bg-gray-900 border border-gray-800 shadow-xl z-50">
              <div className="p-3 border-b border-gray-800">
                <p className="text-sm text-white font-medium">
                  {user?.email?.address || 'User'}
                </p>
                <p className="text-xs text-gray-400 mt-1">Free Plan</p>
              </div>
              <div className="p-2">
                <a href="/dashboard/settings" className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                  Account Settings
                </a>
                <a href="/dashboard/billing" className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                  Billing & Plans
                </a>
                <hr className="my-2 border-gray-800" />
                <button className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors">
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}