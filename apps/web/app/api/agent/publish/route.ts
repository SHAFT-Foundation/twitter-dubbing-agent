/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { TwitterApi } from 'twitter-api-v2'
import { createServiceClient } from '@/lib/supabase/server'
import { decrypt } from '@/lib/encryption'

// Verify internal job secret
function verifyInternalSecret(req: NextRequest): boolean {
  const authHeader = req.headers.get('authorization')
  const expectedSecret = process.env.INTERNAL_JOB_SECRET
  
  if (!authHeader || !expectedSecret) return false
  
  const token = authHeader.replace('Bearer ', '')
  return token === expectedSecret
}

// Language names for reply text
const LANGUAGE_NAMES: Record<string, string> = {
  'es': 'Spanish',
  'fr': 'French',
  'de': 'German',
  'it': 'Italian',
  'pt': 'Portuguese',
  'ru': 'Russian',
  'ja': 'Japanese',
  'ko': 'Korean',
  'zh': 'Chinese',
  'ar': 'Arabic',
  'hi': 'Hindi',
  'tr': 'Turkish',
  'pl': 'Polish',
  'nl': 'Dutch',
  'sv': 'Swedish',
  'da': 'Danish',
  'no': 'Norwegian',
  'fi': 'Finnish',
  'he': 'Hebrew',
  'th': 'Thai',
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

    // Get completed dubs ready for auto-publishing
    const { data: dubs, error: dubsError } = await supabase
      .from('dubs')
      .select(`
        *,
        sources!inner(
          id,
          source_id,
          source_type,
          source_url,
          twitter_accounts!inner(
            id,
            handle,
            access_token_encrypted,
            influencer_settings!inner(
              auto_publish,
              publish_behavior,
              reply_template
            )
          )
        )
      `)
      .eq('status', 'completed')
      .is('published_at', null)
      .eq('sources.twitter_accounts.influencer_settings.auto_publish', true)
      .limit(10) // Publish 10 at a time

    if (dubsError || !dubs) {
      console.error('Error fetching dubs:', dubsError)
      return NextResponse.json(
        { error: 'Failed to fetch dubs' },
        { status: 500 }
      )
    }

    console.log(`Auto-publishing ${dubs.length} completed dubs`)

    const publishResults = []

    for (const dub of dubs as any[]) {
      try {
        const account = dub.sources?.twitter_accounts
        const settings = account?.influencer_settings
        
        if (!account?.access_token_encrypted) {
          console.error(`No access token for dub ${dub.id}`)
          continue
        }

        const accessToken = decrypt(account.access_token_encrypted)
        const client = new TwitterApi(accessToken)

        // Prepare reply text
        const languageName = LANGUAGE_NAMES[dub.language] || dub.language
        let replyText = settings?.reply_template || 
          `🎬 Here's the ${languageName} version of this video! 🌍\n\n`
        
        // Add dubbed media URL
        replyText += `\n${dub.output_url}`
        
        // Add hashtags
        replyText += `\n\n#${languageName} #XDub #AITranslation`

        let publishedTweetId = null

        if (settings?.publish_behavior === 'reply' && dub.sources?.source_type === 'tweet') {
          // Reply to original tweet
          const reply = await client.v2.reply(
            replyText,
            dub.sources.source_id
          )
          
          publishedTweetId = reply.data.id
          console.log(`Published reply ${publishedTweetId} for dub ${dub.id}`)
          
        } else if (settings?.publish_behavior === 'new_post') {
          // Create new post with reference to original
          const postText = `${replyText}\n\nOriginal: ${dub.sources?.source_url}`
          
          const tweet = await client.v2.tweet(postText)
          publishedTweetId = tweet.data.id
          console.log(`Published new post ${publishedTweetId} for dub ${dub.id}`)
        }

        if (publishedTweetId) {
          // Update dub record with publish info
          await (supabase as any)
            .from('dubs')
            .update({
              published_at: new Date().toISOString(),
              published_tweet_id: publishedTweetId,
              published_url: `https://twitter.com/${account.handle}/status/${publishedTweetId}`,
            })
            .eq('id', dub.id)

          publishResults.push({
            dubId: dub.id,
            status: 'published',
            tweetId: publishedTweetId,
          })
        }

      } catch (publishError) {
        console.error(`Error publishing dub ${dub.id}:`, publishError)
        
        // If rate limited, stop processing
        if ((publishError as any).code === 429) {
          console.log('Rate limited, stopping auto-publish')
          break
        }

        publishResults.push({
          dubId: dub.id,
          status: 'failed',
          error: (publishError as Error).message || 'Unknown error',
        })
      }
    }

    return NextResponse.json({
      success: true,
      dubsProcessed: dubs.length,
      results: publishResults,
    })

  } catch (error) {
    console.error('Publish error:', error)
    return NextResponse.json(
      { error: 'Failed to publish dubs' },
      { status: 500 }
    )
  }
}

// Support GET for manual testing
export async function GET(req: NextRequest) {
  return POST(req)
}