/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const supabase = createServiceClient()

    // Get the Twitter account
    const { data: account, error: accountError } = await supabase
      .from('twitter_accounts')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (accountError || !account) {
      return NextResponse.json(
        { error: 'Twitter account not found' },
        { status: 404 }
      )
    }

    // Note: Token revocation with Twitter API v2 is not directly supported
    // We'll just clear the tokens from our database

    // Update the account status to disconnected
    const { error: updateError } = await (supabase as any)
      .from('twitter_accounts')
      .update({
        status: 'disconnected',
        access_token_encrypted: null,
        refresh_token_encrypted: null,
      })
      .eq('id', (account as any).id)

    if (updateError) {
      console.error('Error updating account status:', updateError)
      return NextResponse.json(
        { error: 'Failed to disconnect account' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true,
      message: 'Twitter account disconnected successfully'
    })
    
  } catch (error) {
    console.error('Error disconnecting X account:', error)
    return NextResponse.json(
      { error: 'Failed to disconnect X account' },
      { status: 500 }
    )
  }
}