import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, utm_source, utm_campaign, utm_medium } = body

    // Debug: Check environment variables
    const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
    const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY
    console.log('Environment check:', { hasUrl, hasServiceKey })

    // Basic validation
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Initialize Supabase client with service role (direct approach)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Check if email already exists
    const { data: existingEmail } = await supabase
      .from('early_access')
      .select('email')
      .eq('email', email)
      .single()

    if (existingEmail) {
      return NextResponse.json(
        { error: 'This email is already on the waitlist' },
        { status: 400 }
      )
    }

    // Insert new email
    const { data, error } = await supabase
      .from('early_access')
      .insert({
        email,
        utm_source: utm_source || null,
        utm_campaign: utm_campaign || null,
        utm_medium: utm_medium || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { 
          error: 'Failed to add email to waitlist',
          details: {
            message: error.message,
            code: error.code,
            hint: error.hint,
            details: error.details
          }
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Successfully added to waitlist', data },
      { status: 200 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}