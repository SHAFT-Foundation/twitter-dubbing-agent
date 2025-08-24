import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, utm_source, utm_campaign, utm_medium } = body

    // Debug: Check environment variables - return them in response for debugging
    const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
    const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY
    
    // TEMPORARY DEBUG - Remove after fixing
    if (!hasUrl || !hasServiceKey) {
      return NextResponse.json({
        error: 'Missing environment variables',
        debug: {
          hasUrl,
          hasServiceKey,
          url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'exists' : 'missing',
          serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'exists' : 'missing'
        }
      }, { status: 500 })
    }

    // Basic validation
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // DEPLOYMENT TEST: This should return immediately
    return NextResponse.json({
      message: 'DEPLOYMENT TEST WORKING v2.4',
      timestamp: new Date().toISOString(),
      receivedEmail: email,
      environmentOk: {
        url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        serviceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
      }
    }, { status: 200 })
  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: {
          message: error.message,
          stack: error.stack,
          name: error.name
        }
      },
      { status: 500 }
    )
  }
}