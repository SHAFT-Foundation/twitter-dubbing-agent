/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { TwitterApi } from 'twitter-api-v2'
import { createServiceClient } from '@/lib/supabase/server'
import { decrypt } from '@/lib/encryption'

// Verify internal job secret for cron jobs
function verifyInternalSecret(req: NextRequest): boolean {
  const authHeader = req.headers.get('authorization')
  const expectedSecret = process.env.INTERNAL_JOB_SECRET
  
  if (!authHeader || !expectedSecret) return false
  
  const token = authHeader.replace('Bearer ', '')
  return token === expectedSecret
}

export async function POST(req: NextRequest) {
  // Verify this is an internal cron job
  if (!verifyInternalSecret(req)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const supabase = createServiceClient()

    // Get all active Twitter accounts with auto-dub enabled
    const { data: accounts, error: accountsError } = await supabase
      .from('twitter_accounts')
      .select(`
        *,
        influencer_settings!inner(
          auto_dub_enabled,
          content_types,
          target_languages
        )
      `)
      .eq('status', 'active')
      .eq('influencer_settings.auto_dub_enabled', true)

    if (accountsError || !accounts) {
      console.error('Error fetching accounts:', accountsError)
      return NextResponse.json(
        { error: 'Failed to fetch accounts' },
        { status: 500 }
      )
    }

    console.log(`Scanning ${accounts.length} accounts for new content`)

    const scanResults = []

    for (const account of accounts as any[]) {
      try {
        // Skip if no access token
        if (!account.access_token_encrypted) {
          continue
        }

        const accessToken = decrypt(account.access_token_encrypted)
        const client = new TwitterApi(accessToken)
        
        // Get user's recent tweets
        const tweets = await client.v2.userTimeline(account.twitter_user_id, {
          max_results: 10,
          exclude: ['retweets', 'replies'],
          expansions: ['attachments.media_keys'],
          'media.fields': ['type', 'duration_ms'],
          'tweet.fields': ['created_at', 'id'],
        })

        const settings = account.influencer_settings
        const contentTypes = settings?.content_types || ['videos']
        const targetLanguages = settings?.target_languages || ['es', 'fr', 'de']

        // Process each tweet
        for await (const tweet of tweets) {
          // Check if tweet has media
          const mediaKeys = tweet.attachments?.media_keys
          if (!mediaKeys || mediaKeys.length === 0) continue

          // Check if we've already processed this tweet
          const { data: existingSource } = await supabase
            .from('sources')
            .select('id')
            .eq('source_id', tweet.id)
            .single()

          if (existingSource) {
            console.log(`Tweet ${tweet.id} already processed`)
            continue
          }

          // Get media details
          const media = tweets.includes?.media?.filter(
            (m) => mediaKeys.includes((m as unknown as Record<string, unknown>).media_key as string)
          )

          // Check if media type matches settings
          const hasVideo = media?.some((m) => (m as unknown as Record<string, unknown>).type === 'video')
          const hasAudio = media?.some((m) => (m as unknown as Record<string, unknown>).type === 'audio')
          
          const shouldProcess = 
            (hasVideo && contentTypes.includes('videos')) ||
            (hasAudio && contentTypes.includes('clips'))

          if (!shouldProcess) continue

          // Create source record for processing
          const { data: source, error: sourceError } = await (supabase as any)
            .from('sources')
            .insert({
              user_id: account.user_id,
              twitter_account_id: account.id,
              source_id: tweet.id,
              source_type: 'tweet',
              source_url: `https://twitter.com/${account.handle}/status/${tweet.id}`,
              status: 'discovered',
              discovered_at: new Date().toISOString(),
            })
            .select()
            .single()

          if (!sourceError && source) {
            scanResults.push({
              accountId: account.id,
              sourceId: source.id,
              tweetId: tweet.id,
              languages: targetLanguages,
            })

            console.log(`Discovered new content: Tweet ${tweet.id} from @${account.handle}`)
          }
        }

        // Also check for recent Spaces if enabled
        if (contentTypes.includes('spaces')) {
          // Note: Twitter API for Spaces requires special access
          // This is a placeholder for when Space detection is available
          console.log(`Space scanning for @${account.handle} - requires enhanced API access`)
        }

      } catch (accountError) {
        console.error(`Error scanning account ${account.id}:`, accountError)
        
        // If token is invalid, update account status
        if ((accountError as any).code === 401) {
          await (supabase as any)
            .from('twitter_accounts')
            .update({ status: 'token_expired' })
            .eq('id', account.id)
        }
      }
    }

    return NextResponse.json({
      success: true,
      accountsScanned: accounts.length,
      newContent: scanResults.length,
      results: scanResults,
    })

  } catch (error) {
    console.error('Scan error:', error)
    return NextResponse.json(
      { error: 'Failed to scan for content' },
      { status: 500 }
    )
  }
}

// Support GET for manual testing
export async function GET(req: NextRequest) {
  return POST(req)
}