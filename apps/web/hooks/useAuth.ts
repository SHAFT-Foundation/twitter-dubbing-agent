"use client"

import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function useAuth() {
  const { 
    ready, 
    authenticated, 
    user, 
    login, 
    logout,
    linkEmail,
    linkGoogle,
    linkTwitter,
    linkGithub,
  } = usePrivy()
  
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  const handleLogin = async () => {
    login()
  }

  return {
    ready,
    authenticated,
    user,
    login: handleLogin,
    logout: handleLogout,
    linkEmail,
    linkGoogle,
    linkTwitter,
    linkGithub,
  }
}

export function useRequireAuth() {
  const { ready, authenticated } = usePrivy()
  const router = useRouter()

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/login')
    }
  }, [ready, authenticated, router])

  return { ready, authenticated }
}