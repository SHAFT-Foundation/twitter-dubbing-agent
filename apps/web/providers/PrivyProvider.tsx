"use client"

import { PrivyProvider as Provider } from '@privy-io/react-auth'
import { useEffect, useState } from 'react'

export function PrivyProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Skip rendering during SSR to avoid build errors
  if (!isMounted) {
    return <>{children}</>
  }

  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID
  
  // If no valid Privy app ID is provided, just render children without Privy
  // This prevents console errors during development
  if (!appId || appId === 'test-privy-app-id' || appId.length < 20) {
    console.warn('Privy provider skipped: No valid NEXT_PUBLIC_PRIVY_APP_ID found')
    return <>{children}</>
  }

  return (
    <Provider
      appId={appId}
      config={{
        appearance: {
          theme: 'dark',
          accentColor: '#a855f7', // Purple to match our crypto theme
          logo: '/logo.png',
          showWalletLoginFirst: false,
        },
        loginMethods: ['email', 'google', 'github', 'twitter'],
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      {children}
    </Provider>
  )
}