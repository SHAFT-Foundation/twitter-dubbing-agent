"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type InfluencerType = 'crypto' | 'professional'

interface ThemeContextType {
  influencerType: InfluencerType | null
  setInfluencerType: (type: InfluencerType) => void
  showModal: boolean
  setShowModal: (show: boolean) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [influencerType, setInfluencerTypeState] = useState<InfluencerType | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      console.log('ThemeProvider: Mounting and checking localStorage...')
      setMounted(true)
      
      // Safely check localStorage
      let stored: InfluencerType | null = null
      try {
        stored = localStorage.getItem('influencerType') as InfluencerType | null
      } catch (e) {
        console.warn('ThemeProvider: localStorage access failed:', e)
      }
      
      console.log('ThemeProvider: Stored influencer type:', stored)
      if (stored && (stored === 'crypto' || stored === 'professional')) {
        console.log('ThemeProvider: Using stored type:', stored)
        setInfluencerTypeState(stored)
      } else {
        console.log('ThemeProvider: No valid stored type, showing modal')
        setShowModal(true)
      }
    } catch (error) {
      console.error('ThemeProvider: Error during initialization:', error)
      // Fallback: show modal on any error
      setMounted(true)
      setShowModal(true)
    }
  }, [])

  // Don't render the modal until after hydration
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{
        influencerType: null,
        setInfluencerType: () => {},
        showModal: false,
        setShowModal: () => {}
      }}>
        {children}
      </ThemeContext.Provider>
    )
  }

  const setInfluencerType = (type: InfluencerType) => {
    setInfluencerTypeState(type)
    localStorage.setItem('influencerType', type)
    setShowModal(false)
  }

  return (
    <ThemeContext.Provider value={{
      influencerType,
      setInfluencerType,
      showModal,
      setShowModal
    }}>
      {children}
    </ThemeContext.Provider>
  )
}