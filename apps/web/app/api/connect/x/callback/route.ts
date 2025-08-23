/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { TwitterApi } from 'twitter-api-v2'
import { createServiceClient } from '@/lib/supabase/server'
import { encrypt } from '@/lib/encryption'

const CLIENT_ID = process.env.X_CLIENT_ID!
const CLIENT_SECRET = process.env.X_CLIENT_SECRET!
const CALLBACK_URL = `${process.env.NEXT_PUBLIC_APP_URL}/api/connect/x/callback`

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const error = searchParams.get('error')

    // Handle OAuth errors
    if (error) {
      console.error('X OAuth error:', error)
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?error=auth_failed`
      )
    }

    if (!code || !state) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?error=missing_params`
      )
    }

    const supabase = createServiceClient()

    // Retrieve the OAuth session from database
    const { data: session, error: sessionError } = await supabase
      .from('oauth_sessions')
      .select('*')
      .eq('state', state)
      .single()

    if (sessionError || !session) {
      console.error('OAuth session not found:', sessionError)
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?error=invalid_session`
      )
    }

    // Create OAuth 2.0 client
    const client = new TwitterApi({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    })

    try {
      // Exchange code for access token
      const { client: loggedClient, accessToken, refreshToken } = 
        await client.loginWithOAuth2({
          code,
          codeVerifier: (session as any).code_verifier,
          redirectUri: CALLBACK_URL,
        })

      // Get user info
      const { data: userData } = await loggedClient.v2.me()

      // Encrypt tokens before storing
      const encryptedAccessToken = encrypt(accessToken)
      const encryptedRefreshToken = refreshToken ? encrypt(refreshToken) : null

      // Store or update Twitter account
      const { data: existingAccount } = await supabase
        .from('twitter_accounts')
        .select('id')
        .eq('user_id', (session as any).user_id)
        .single()

      if (existingAccount) {
        // Update existing account
        await (supabase as any)
          .from('twitter_accounts')
          .update({
            handle: userData.username,
            twitter_user_id: userData.id,
            access_token_encrypted: encryptedAccessToken,
            refresh_token_encrypted: encryptedRefreshToken,
            scopes: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'],
            status: 'active',
            connected_at: new Date().toISOString(),
          })
          .eq('id', (existingAccount as any).id)
      } else {
        // Create new account
        await (supabase as any)
          .from('twitter_accounts')
          .insert({
            user_id: (session as any).user_id,
            handle: userData.username,
            twitter_user_id: userData.id,
            access_token_encrypted: encryptedAccessToken,
            refresh_token_encrypted: encryptedRefreshToken,
            scopes: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'],
            status: 'active',
            connected_at: new Date().toISOString(),
          })
      }

      // Clean up OAuth session
      await (supabase as any)
        .from('oauth_sessions')
        .delete()
        .eq('state', state)

      // Redirect to settings with success
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?success=connected`
      )
      
    } catch (tokenError) {
      console.error('Error exchanging code for token:', tokenError)
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?error=token_exchange_failed`
      )
    }
    
  } catch (error) {
    console.error('Error in X OAuth callback:', error)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?error=callback_failed`
    )
  }
}