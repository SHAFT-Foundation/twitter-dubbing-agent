"use client"

import { useRequireAuth } from '@/hooks/useAuth'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { TopNav } from '@/components/dashboard/TopNav'
import { useEffect, useState } from 'react'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMounted, setIsMounted] = useState(false)
  const { ready, authenticated } = useRequireAuth()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Don't render auth-dependent content during SSR
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!ready) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!authenticated) {
    return null // Middleware will redirect
  }

  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopNav />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}