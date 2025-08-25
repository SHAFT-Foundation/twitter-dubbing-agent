import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    // Test environment variables
    const envCheck = {
      hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      url: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...',
    }

    // Test Supabase connection
    const supabase = await createServiceClient()
    
    // Try a simple query to test connection
    const { error, count } = await supabase
      .from('early_access')
      .select('*', { count: 'exact', head: true })
    
    if (error) {
      return NextResponse.json({
        envCheck,
        connection: 'failed',
        error: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      })
    }

    return NextResponse.json({
      envCheck,
      connection: 'success',
      recordCount: count,
      message: 'Supabase connection working!'
    })

  } catch (error: unknown) {
    return NextResponse.json({
      connection: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}