/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { TwitterApi } from 'twitter-api-v2'
import { createServiceClient } from '@/lib/supabase/server'
import { generateSecureToken } from '@/lib/encryption'

const CLIENT_ID = process.env.X_CLIENT_ID!
const CLIENT_SECRET = process.env.X_CLIENT_SECRET!
const CALLBACK_URL = `${process.env.NEXT_PUBLIC_APP_URL}/api/connect/x/callback`

export async function POST(req: NextRequest) {
  try {
    // Get user ID from request body (sent from frontend)
    const { userId } = await req.json()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Generate PKCE challenge
    const codeVerifier = generateSecureToken(64)
    const state = generateSecureToken(32)
    
    // Create OAuth 2.0 client
    const client = new TwitterApi({ 
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    })

    // Generate authorization URL with PKCE
    const { url, codeVerifier: verifier } = client.generateOAuth2AuthLink(
      CALLBACK_URL,
      { 
        scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'],
        state,
      }
    )

    // Store the code verifier and state in database for verification
    const supabase = createServiceClient()
    
    // Create a temporary oauth session record
    const { error: dbError } = await (supabase as any)
      .from('oauth_sessions')
      .insert({
        user_id: userId,
        state: state,
        code_verifier: codeVerifier || verifier,
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes
      })

    if (dbError) {
      console.error('Error storing OAuth session:', dbError)
      // Continue anyway, as we can fallback to cookies
    }

    // Return the authorization URL
    return NextResponse.json({ 
      authUrl: url,
      state,
    })
    
  } catch (error) {
    console.error('Error initiating X OAuth:', error)
    return NextResponse.json(
      { error: 'Failed to initiate X authentication' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // For GET requests, return method not allowed
  return NextResponse.json(
    { error: 'Method not allowed. Use POST.' },
    { status: 405 }
  )
}