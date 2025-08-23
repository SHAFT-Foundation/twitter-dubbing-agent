/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { speechLabAPI } from '@/lib/speechlab'
import { s3Service } from '@/lib/s3'

interface ProjectWithRelations {
  id: string
  source_id: string
  project_id: string
  third_party_id: string
  status: string
  sources?: {
    id: string
    user_id: string
    source_type: string
    duration_seconds?: number
  }
  dubs?: Array<{
    id: string
    language: string
    status: string
  }>
}

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

    // Get processing SpeechLab projects
    const { data: projects, error: projectsError } = await supabase
      .from('speechlab_projects')
      .select(`
        *,
        sources(
          id,
          user_id,
          source_type,
          duration_seconds
        ),
        dubs(
          id,
          language,
          status
        )
      `)
      .eq('status', 'processing')
      .limit(20) // Check 20 at a time

    if (projectsError || !projects) {
      console.error('Error fetching projects:', projectsError)
      return NextResponse.json(
        { error: 'Failed to fetch projects' },
        { status: 500 }
      )
    }

    console.log(`Polling ${projects.length} SpeechLab projects`)

    const pollResults = []

    for (const project of projects as ProjectWithRelations[]) {
      try {
        // Check project status with SpeechLab
        const speechLabProject = await speechLabAPI.getProjectStatus(project.third_party_id)
        
        if (!speechLabProject) {
          console.log(`Project ${project.third_party_id} not found yet`)
          continue
        }

        const jobStatus = speechLabProject.job?.status
        
        if (jobStatus === 'COMPLETE') {
          console.log(`Project ${project.id} completed`)
          
          // Get dubbed media URLs
          const dubbedUrls = speechLabAPI.getDubbedMediaUrls(speechLabProject)
          
          // Update project status
          await (supabase as any)
            .from('speechlab_projects')
            .update({ 
              status: 'completed',
              completed_at: new Date().toISOString(),
            })
            .eq('id', project.id)

          // Update source status
          await (supabase as any)
            .from('sources')
            .update({ status: 'completed' })
            .eq('id', project.source_id)

          // Process each dubbed output
          for (const [index, dubUrl] of dubbedUrls.entries()) {
            const dub = project.dubs?.[index]
            if (!dub) continue

            // Generate S3 key for dubbed output
            const s3Key = s3Service.getDubbedOutputKey(
              project.sources?.user_id || 'unknown',
              project.source_id,
              dub.language,
              project.sources?.source_type as 'tweet' | 'space'
            )

            // Update dub record
            await (supabase as any)
              .from('dubs')
              .update({
                status: 'completed',
                output_url: dubUrl,
                output_s3_key: s3Key,
                completed_at: new Date().toISOString(),
              })
              .eq('id', dub.id)
          }

          // Calculate duration for billing (minimum 1 minute)
          const durationSeconds = project.sources?.duration_seconds || 60
          const durationMinutes = Math.ceil(durationSeconds / 60)
          
          // Record usage
          await (supabase as any)
            .from('usage_ledger')
            .insert({
              user_id: project.sources?.user_id,
              source_id: project.source_id,
              minutes_used: durationMinutes,
              languages_count: dubbedUrls.length,
            })

          pollResults.push({
            projectId: project.id,
            status: 'completed',
            dubsCompleted: dubbedUrls.length,
          })

        } else if (jobStatus === 'FAILED') {
          console.error(`Project ${project.id} failed`)
          
          // Update project status
          await (supabase as any)
            .from('speechlab_projects')
            .update({ 
              status: 'failed',
              error_message: 'SpeechLab job failed',
            })
            .eq('id', project.id)

          // Update source status
          await (supabase as any)
            .from('sources')
            .update({ 
              status: 'failed',
              error_message: 'Dubbing failed',
            })
            .eq('id', project.source_id)

          // Update dub records
          await (supabase as any)
            .from('dubs')
            .update({ status: 'failed' })
            .eq('speechlab_project_id', project.id)

          pollResults.push({
            projectId: project.id,
            status: 'failed',
          })

        } else {
          // Still processing
          console.log(`Project ${project.id} still processing: ${jobStatus}`)
          
          pollResults.push({
            projectId: project.id,
            status: 'processing',
            speechLabStatus: jobStatus,
          })
        }

      } catch (projectError) {
        console.error(`Error polling project ${project.id}:`, projectError)
        
        pollResults.push({
          projectId: project.id,
          status: 'error',
          error: (projectError as Error).message || 'Unknown error',
        })
      }
    }

    return NextResponse.json({
      success: true,
      projectsPolled: projects.length,
      results: pollResults,
    })

  } catch (error) {
    console.error('Poll error:', error)
    return NextResponse.json(
      { error: 'Failed to poll projects' },
      { status: 500 }
    )
  }
}

// Support GET for manual testing
export async function GET(req: NextRequest) {
  return POST(req)
}