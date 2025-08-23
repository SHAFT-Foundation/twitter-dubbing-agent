/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { TwitterMediaExtractor } from '@/lib/twitter-media'
import { s3Service } from '@/lib/s3'
import { speechLabAPI } from '@/lib/speechlab'
import { decrypt } from '@/lib/encryption'

export async function POST(req: NextRequest) {
  try {
    const { 
      sourceId, 
      sourceType, 
      sourceUrl,
      targetLanguages,
      userId 
    } = await req.json()

    if (!sourceId || !sourceType || !targetLanguages || !userId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const supabase = createServiceClient()

    // Get user's Twitter account
    const { data: twitterAccount, error: accountError } = await supabase
      .from('twitter_accounts')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single()

    if (accountError || !twitterAccount) {
      return NextResponse.json(
        { error: 'No active Twitter account found' },
        { status: 404 }
      )
    }

    // Check user's usage
    const { data: usage } = await supabase
      .from('usage_ledger')
      .select('minutes_used')
      .eq('user_id', userId)
      .gte('created_at', new Date(new Date().setDate(1)).toISOString()) // Current month

    const totalMinutesUsed = usage?.reduce((sum, record) => sum + ((record as any).minutes_used || 0), 0) || 0
    
    // Get user's subscription
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single()

    const freeMinutes = 10
    const paidMinutes = subscription ? 60 : 0
    const totalIncludedMinutes = freeMinutes + paidMinutes
    
    if (totalMinutesUsed >= totalIncludedMinutes && !(subscription as any)?.allow_overage) {
      return NextResponse.json(
        { error: 'Usage limit exceeded. Please upgrade your plan.' },
        { status: 403 }
      )
    }

    // Create source record
    const { data: source, error: sourceError } = await (supabase as any)
      .from('sources')
      .insert({
        user_id: userId,
        twitter_account_id: (twitterAccount as any).id,
        source_id: sourceId,
        source_type: sourceType,
        source_url: sourceUrl,
        status: 'processing',
      })
      .select()
      .single()

    if (sourceError || !source) {
      console.error('Error creating source:', sourceError)
      return NextResponse.json(
        { error: 'Failed to create source record' },
        { status: 500 }
      )
    }

    try {
      // Extract and download media
      const accessToken = decrypt((twitterAccount as any).access_token_encrypted)
      const extractor = new TwitterMediaExtractor(accessToken)
      
      const extractedMedia = await extractor.extractAndDownload(
        sourceId,
        sourceType as 'tweet' | 'space'
      )

      if (!extractedMedia) {
        throw new Error('No media found in source')
      }

      // Upload to S3
      const uploadResult = await s3Service.uploadMediaForDubbing(
        extractedMedia.localPath,
        userId,
        source.id,
        sourceType as 'tweet' | 'space'
      )

      // Clean up temp file
      await extractedMedia.cleanup()

      // Create SpeechLab project
      const projectName = `${sourceType}_${sourceId}_${Date.now()}`
      const thirdPartyId = `xdub_${source.id}`
      
      const projectId = await speechLabAPI.createDubbingProject(
        uploadResult.publicUrl,
        projectName,
        targetLanguages[0], // Start with first language
        thirdPartyId,
        'en'
      )

      // Store SpeechLab project
      const { data: speechlabProject, error: projectError } = await (supabase as any)
        .from('speechlab_projects')
        .insert({
          source_id: source.id,
          project_id: projectId,
          third_party_id: thirdPartyId,
          status: 'processing',
        })
        .select()
        .single()

      if (projectError) {
        console.error('Error creating SpeechLab project:', projectError)
      }

      // Create dub records for each language
      const dubRecords = targetLanguages.map((lang: string) => ({
        source_id: source.id,
        speechlab_project_id: speechlabProject?.id,
        language: lang,
        status: 'pending',
      }))

      const { error: dubsError } = await (supabase as any)
        .from('dubs')
        .insert(dubRecords)

      if (dubsError) {
        console.error('Error creating dub records:', dubsError)
      }

      // Update source with media URL
      await (supabase as any)
        .from('sources')
        .update({
          media_url: uploadResult.publicUrl,
          media_s3_key: uploadResult.key,
        })
        .eq('id', source.id)

      return NextResponse.json({
        success: true,
        sourceId: source.id,
        projectId,
        message: `Dubbing started for ${targetLanguages.length} languages`,
      })

    } catch (processingError) {
      // Update source status to failed
      await (supabase as any)
        .from('sources')
        .update({ 
          status: 'failed',
          error_message: (processingError as Error).message 
        })
        .eq('id', source.id)

      throw processingError
    }

  } catch (error) {
    console.error('Dubbing submission error:', error)
    return NextResponse.json(
      { error: (error as Error).message || 'Failed to submit dubbing job' },
      { status: 500 }
    )
  }
}