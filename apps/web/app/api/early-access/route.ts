import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, utm_source, utm_campaign, utm_medium } = body

    // Basic validation
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Create Supabase client with service role for inserting data
    const supabase = await createServiceClient()

    // Insert email into early_access table
    const { error } = await supabase
      .from('early_access')
      .insert({
        email,
        utm_source: utm_source || null,
        utm_campaign: utm_campaign || null,
        utm_medium: utm_medium || null
      })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to add email to waitlist' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Successfully added to waitlist!',
      timestamp: new Date().toISOString()
    }, { status: 200 })
  } catch (error: unknown) {
    console.error('API error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: {
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined,
          name: error instanceof Error ? error.name : 'UnknownError'
        }
      },
      { status: 500 }
    )
  }
}