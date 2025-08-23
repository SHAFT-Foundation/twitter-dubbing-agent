"use client"

import { useAuth } from '@/hooks/useAuth'
import { Globe, Video, Languages, TrendingUp, Twitter, Settings, CreditCard, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user } = useAuth()

  const stats = [
    { label: 'Minutes Used', value: '0', icon: Video, color: 'from-purple-500 to-pink-500' },
    { label: 'Languages Active', value: '0', icon: Languages, color: 'from-blue-500 to-purple-500' },
    { label: 'Total Views', value: '0', icon: TrendingUp, color: 'from-pink-500 to-orange-500' },
    { label: 'Minutes Remaining', value: '30', icon: Sparkles, color: 'from-green-500 to-teal-500' },
  ]

  return (
    <div className="p-6 lg:p-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back{user?.email?.address ? `, ${user.email.address.split('@')[0]}` : ''}! 👋
        </h1>
        <p className="text-gray-400">
          Let&apos;s get your content dubbing in multiple languages
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Setup</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {/* Connect X */}
          <Link href="/dashboard/settings">
            <div className="group relative rounded-xl border border-gray-800 bg-gray-900/50 p-6 hover:border-purple-500/50 hover:bg-gray-900/80 transition-all cursor-pointer">
              <div className="absolute top-0 right-0 p-2">
                <span className="text-xs bg-red-500/10 text-red-400 px-2 py-1 rounded-full">Required</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Twitter className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold">Connect X Account</h3>
                  <p className="text-sm text-gray-400">Link your X to start dubbing</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Select Languages */}
          <Link href="/dashboard/settings">
            <div className="group relative rounded-xl border border-gray-800 bg-gray-900/50 p-6 hover:border-purple-500/50 hover:bg-gray-900/80 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold">Choose Languages</h3>
                  <p className="text-sm text-gray-400">Select target languages</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Upgrade Plan */}
          <Link href="/dashboard/billing">
            <div className="group relative rounded-xl border border-gray-800 bg-gray-900/50 p-6 hover:border-purple-500/50 hover:bg-gray-900/80 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold">Upgrade Plan</h3>
                  <p className="text-sm text-gray-400">Get more dubs/month</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Your Stats</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                </div>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-8 text-center">
          <div className="text-gray-500 mb-4">
            <Video className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-gray-400">No dubs yet</p>
            <p className="text-sm text-gray-500 mt-2">
              Connect your X account and select languages to get started
            </p>
          </div>
          <Link href="/dashboard/settings">
            <button className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all">
              Complete Setup
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}