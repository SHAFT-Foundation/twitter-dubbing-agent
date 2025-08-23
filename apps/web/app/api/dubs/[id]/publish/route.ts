/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { TwitterApi } from 'twitter-api-v2'
import { createServiceClient } from '@/lib/supabase/server'
import { decrypt } from '@/lib/encryption'

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

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: dubId } = await context.params
    
    const supabase = createServiceClient()

    // Get the dub with source and account information
    const { data: dub, error: dubError } = await (supabase as any)
      .from('dubs')
      .select(`
        *,
        sources(
          source_id,
          source_type,
          source_url,
          twitter_accounts(
            id,
            handle,
            access_token_encrypted,
            influencer_settings(
              publish_behavior,
              reply_template
            )
          )
        )
      `)
      .eq('id', dubId)
      .single()

    if (dubError || !dub) {
      return NextResponse.json(
        { error: 'Dub not found' },
        { status: 404 }
      )
    }

    // Check if already published
    if (dub.published_at) {
      return NextResponse.json(
        { error: 'Dub already published' },
        { status: 400 }
      )
    }

    // Check if dub is ready
    if (dub.status !== 'completed' || !dub.output_url) {
      return NextResponse.json(
        { error: 'Dub not ready for publishing' },
        { status: 400 }
      )
    }

    const account = dub.sources?.twitter_accounts
    const settings = account?.influencer_settings

    if (!account?.access_token_encrypted) {
      return NextResponse.json(
        { error: 'Twitter account not connected' },
        { status: 400 }
      )
    }

    // Decrypt access token and create Twitter client
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
    let publishedUrl = null

    try {
      if (settings?.publish_behavior === 'reply' && dub.sources?.source_type === 'tweet') {
        // Reply to original tweet
        const reply = await client.v2.reply(
          replyText,
          dub.sources.source_id
        )
        
        publishedTweetId = reply.data.id
        publishedUrl = `https://twitter.com/${account.handle}/status/${publishedTweetId}`
        
      } else {
        // Create new post with reference to original
        const postText = `${replyText}\n\nOriginal: ${dub.sources?.source_url}`
        
        const tweet = await client.v2.tweet(postText)
        publishedTweetId = tweet.data.id
        publishedUrl = `https://twitter.com/${account.handle}/status/${publishedTweetId}`
      }

      // Update dub record with publish info
      await (supabase as any)
        .from('dubs')
        .update({
          published_at: new Date().toISOString(),
          published_tweet_id: publishedTweetId,
          published_url: publishedUrl,
        })
        .eq('id', dubId)

      return NextResponse.json({
        success: true,
        url: publishedUrl,
        tweetId: publishedTweetId,
      })

    } catch (publishError: any) {
      console.error('Error publishing to Twitter:', publishError)
      
      if (publishError.code === 429) {
        return NextResponse.json(
          { error: 'Rate limited. Please try again later.' },
          { status: 429 }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to publish to Twitter' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Error in publish API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}