import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'NEW API ENDPOINT WORKING',
    timestamp: new Date().toISOString(),
    version: 'v1.0',
    message: 'This is a brand new endpoint created to test Vercel deployments'
  })
}