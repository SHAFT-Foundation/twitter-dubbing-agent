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

  // Use a valid-looking placeholder ID for build time
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || 'clcqv1p0j000008l73kxzgb5j'

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