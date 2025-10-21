"use client"

import { useEffect } from 'react'
import LogRocket from 'logrocket'

export function LogRocketInit() {
  useEffect(() => {
    // Initialize LogRocket only in browser and production environment
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      LogRocket.init('o1pgml/xdub')
    }
  }, [])

  return null
}
