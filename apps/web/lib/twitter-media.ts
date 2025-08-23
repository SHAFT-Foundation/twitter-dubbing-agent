import { TwitterApi } from 'twitter-api-v2'
import { spawn } from 'child_process'
import { promises as fs } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { randomBytes } from 'crypto'

interface MediaInfo {
  url: string
  type: 'video' | 'audio' | 'space'
  duration?: number
  format?: string
}

interface ExtractedMedia {
  localPath: string
  mediaInfo: MediaInfo
  cleanup: () => Promise<void>
}

export class TwitterMediaExtractor {
  private client: TwitterApi

  constructor(accessToken: string) {
    this.client = new TwitterApi(accessToken)
  }

  /**
   * Get media URLs from a tweet
   */
  async getMediaFromTweet(tweetId: string): Promise<MediaInfo[]> {
    try {
      const tweet = await this.client.v2.singleTweet(tweetId, {
        expansions: ['attachments.media_keys'],
        'media.fields': ['url', 'type', 'duration_ms', 'variants'],
      })

      const mediaItems: MediaInfo[] = []
      const media = tweet.includes?.media

      if (media) {
        for (const item of media) {
          if (item.type === 'video' || item.type === 'animated_gif') {
            // Get highest quality video variant
            const variants = (item as unknown as Record<string, unknown>).variants as Array<{content_type: string, bit_rate?: number, url: string}> || []
            const mp4Variants = variants
              .filter((v) => v.content_type === 'video/mp4')
              .sort((a, b) => (b.bit_rate || 0) - (a.bit_rate || 0))
            
            if (mp4Variants.length > 0) {
              mediaItems.push({
                url: mp4Variants[0].url,
                type: 'video',
                duration: item.duration_ms ? item.duration_ms / 1000 : undefined,
                format: 'mp4',
              })
            }
          }
        }
      }

      return mediaItems
    } catch (error) {
      console.error('Error getting media from tweet:', error)
      throw new Error('Failed to extract media from tweet')
    }
  }

  /**
   * Extract audio URL from a Twitter Space
   */
  async getSpaceAudioUrl(spaceId: string): Promise<MediaInfo | null> {
    try {
      // Get space metadata - validation call
      await this.client.v2.space(spaceId, {
        'space.fields': ['started_at', 'ended_at', 'is_ticketed', 'participant_count'],
      })
      
      // Spaces have M3U8 playlists that need to be constructed
      // The actual URL pattern for recorded spaces
      const audioSpaceUrl = `https://prod-fastly-us-west-1.video.pscp.tv/Transcoding/v1/hls/${spaceId}/non_transcode/us-west-1/periscope-replay-direct-prod-us-west-1-public/audio-space/master_playlist.m3u8`
      
      return {
        url: audioSpaceUrl,
        type: 'space',
        format: 'm3u8',
      }
    } catch (error) {
      console.error('Error getting space audio:', error)
      return null
    }
  }

  /**
   * Download media from URL using ffmpeg
   */
  async downloadMedia(mediaInfo: MediaInfo): Promise<ExtractedMedia> {
    const tempDir = tmpdir()
    const randomId = randomBytes(8).toString('hex')
    const outputFile = join(tempDir, `media_${randomId}.mp3`)

    return new Promise((resolve, reject) => {
      // Use ffmpeg to download and convert to mp3
      const args = [
        '-i', mediaInfo.url,
        '-vn', // No video
        '-acodec', 'libmp3lame',
        '-b:a', '192k',
        '-y', // Overwrite output
        outputFile,
      ]

      const ffmpeg = spawn('ffmpeg', args)
      
      let stderr = ''
      ffmpeg.stderr.on('data', (data) => {
        stderr += data.toString()
      })

      ffmpeg.on('error', (error) => {
        reject(new Error(`FFmpeg error: ${error.message}`))
      })

      ffmpeg.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`FFmpeg exited with code ${code}: ${stderr}`))
        } else {
          resolve({
            localPath: outputFile,
            mediaInfo,
            cleanup: async () => {
              try {
                await fs.unlink(outputFile)
              } catch (error) {
                console.error('Error cleaning up temp file:', error)
              }
            },
          })
        }
      })
    })
  }

  /**
   * Extract and download media from a tweet or space
   */
  async extractAndDownload(contentId: string, contentType: 'tweet' | 'space'): Promise<ExtractedMedia | null> {
    try {
      let mediaInfo: MediaInfo | null = null

      if (contentType === 'tweet') {
        const mediaItems = await this.getMediaFromTweet(contentId)
        if (mediaItems.length > 0) {
          mediaInfo = mediaItems[0] // Take first media item
        }
      } else if (contentType === 'space') {
        mediaInfo = await this.getSpaceAudioUrl(contentId)
      }

      if (!mediaInfo) {
        return null
      }

      return await this.downloadMedia(mediaInfo)
    } catch (error) {
      console.error('Error extracting and downloading media:', error)
      throw error
    }
  }
}