/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  try {
    // TODO: Get user ID from authenticated session
    // For now, return mock data for testing
    const mockDubs = [
      {
        id: '1',
        source_id: 'source-1',
        language: 'es',
        status: 'completed',
        output_url: 'https://example.com/dubbed/es.mp3',
        completed_at: new Date().toISOString(),
        published_at: null,
        published_url: null,
        created_at: new Date(Date.now() - 86400000).toISOString(),
        sources: {
          source_type: 'tweet',
          source_url: 'https://twitter.com/example/status/123',
          source_id: '123'
        }
      },
      {
        id: '2',
        source_id: 'source-2',
        language: 'fr',
        status: 'processing',
        output_url: null,
        completed_at: null,
        published_at: null,
        published_url: null,
        created_at: new Date(Date.now() - 43200000).toISOString(),
        sources: {
          source_type: 'space',
          source_url: 'https://twitter.com/i/spaces/456',
          source_id: '456'
        }
      },
      {
        id: '3',
        source_id: 'source-1',
        language: 'de',
        status: 'completed',
        output_url: 'https://example.com/dubbed/de.mp3',
        completed_at: new Date(Date.now() - 3600000).toISOString(),
        published_at: new Date().toISOString(),
        published_url: 'https://twitter.com/example/status/789',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        sources: {
          source_type: 'tweet',
          source_url: 'https://twitter.com/example/status/123',
          source_id: '123'
        }
      }
    ]

    return NextResponse.json({
      dubs: mockDubs
    })

    // Uncomment when authentication is ready:
    /*
    const supabase = createServiceClient()
    
    // Get user from session
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user's dubs with source information
    const { data: dubs, error } = await (supabase as any)
      .from('dubs')
      .select(`
        *,
        sources!inner(
          source_id,
          source_type,
          source_url,
          user_id
        )
      `)
      .eq('sources.user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching dubs:', error)
      return NextResponse.json(
        { error: 'Failed to fetch dubs' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      dubs: dubs || []
    })
    */

  } catch (error) {
    console.error('Error in dubs API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}