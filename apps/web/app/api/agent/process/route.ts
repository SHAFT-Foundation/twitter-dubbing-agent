/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

// Verify internal job secret
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

    // Get discovered sources that need processing
    const { data: sources, error: sourcesError } = await supabase
      .from('sources')
      .select(`
        *,
        twitter_accounts!inner(
          user_id,
          handle,
          access_token_encrypted,
          influencer_settings!inner(
            target_languages,
            auto_publish
          )
        )
      `)
      .eq('status', 'discovered')
      .order('created_at', { ascending: true })
      .limit(10) // Process 10 at a time

    if (sourcesError || !sources) {
      console.error('Error fetching sources:', sourcesError)
      return NextResponse.json(
        { error: 'Failed to fetch sources' },
        { status: 500 }
      )
    }

    console.log(`Processing ${sources.length} discovered sources`)

    const processResults = []

    for (const source of sources as any[]) {
      try {
        // Update status to processing
        await (supabase as any)
          .from('sources')
          .update({ status: 'queued' })
          .eq('id', source.id)

        // Get target languages from settings
        const targetLanguages = source.twitter_accounts?.influencer_settings?.target_languages || ['es']
        
        // Submit dubbing job
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/dubs/submit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sourceId: source.source_id,
            sourceType: source.source_type,
            sourceUrl: source.source_url,
            targetLanguages,
            userId: source.twitter_accounts?.user_id,
          }),
        })

        if (response.ok) {
          const result = await response.json()
          processResults.push({
            sourceId: source.id,
            status: 'submitted',
            projectId: result.projectId,
          })
          
          console.log(`Submitted source ${source.id} for dubbing`)
        } else {
          const error = await response.text()
          console.error(`Failed to submit source ${source.id}:`, error)
          
          // Update status to failed
          await (supabase as any)
            .from('sources')
            .update({ 
              status: 'failed',
              error_message: error,
            })
            .eq('id', source.id)

          processResults.push({
            sourceId: source.id,
            status: 'failed',
            error,
          })
        }

      } catch (sourceError) {
        console.error(`Error processing source ${source.id}:`, sourceError)
        
        await (supabase as any)
          .from('sources')
          .update({ 
            status: 'failed',
            error_message: (sourceError as Error).message,
          })
          .eq('id', source.id)

        processResults.push({
          sourceId: source.id,
          status: 'error',
          error: (sourceError as Error).message || 'Unknown error',
        })
      }
    }

    return NextResponse.json({
      success: true,
      sourcesProcessed: sources.length,
      results: processResults,
    })

  } catch (error) {
    console.error('Process error:', error)
    return NextResponse.json(
      { error: 'Failed to process sources' },
      { status: 500 }
    )
  }
}

// Support GET for manual testing
export async function GET(req: NextRequest) {
  return POST(req)
}