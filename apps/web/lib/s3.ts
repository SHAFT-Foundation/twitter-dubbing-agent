import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { createReadStream } from 'fs'
import { stat } from 'fs/promises'
import { lookup } from 'mime-types'

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const BUCKET_NAME = process.env.AWS_S3_BUCKET || 'xdub-media'

export interface UploadResult {
  key: string
  url: string
  publicUrl: string
}

export class S3Service {
  /**
   * Upload a file to S3
   */
  async uploadFile(filePath: string, key: string): Promise<UploadResult> {
    try {
      // Get file stats
      const fileStats = await stat(filePath)
      const contentType = lookup(filePath) || 'application/octet-stream'

      // Create read stream
      const fileStream = createReadStream(filePath)

      // Upload to S3
      const uploadParams = {
        Bucket: BUCKET_NAME,
        Key: key,
        Body: fileStream,
        ContentType: contentType,
        ContentLength: fileStats.size,
      }

      await s3Client.send(new PutObjectCommand(uploadParams))

      // Generate signed URL for temporary access
      const signedUrl = await this.getSignedUrl(key, 24 * 60 * 60) // 24 hours
      
      // Public URL (if bucket is public)
      const publicUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`

      return {
        key,
        url: signedUrl,
        publicUrl,
      }
    } catch (error) {
      console.error('S3 upload error:', error)
      throw new Error('Failed to upload file to S3')
    }
  }

  /**
   * Generate a signed URL for temporary access
   */
  async getSignedUrl(key: string, expiresIn = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })

    return await getSignedUrl(s3Client, command, { expiresIn })
  }

  /**
   * Upload media for dubbing
   */
  async uploadMediaForDubbing(
    filePath: string,
    userId: string,
    sourceId: string,
    contentType: 'tweet' | 'space'
  ): Promise<UploadResult> {
    // Create organized key structure
    const timestamp = Date.now()
    const key = `${userId}/${contentType}/${sourceId}/original_${timestamp}.mp3`
    
    return await this.uploadFile(filePath, key)
  }

  /**
   * Generate a key for dubbed output
   */
  getDubbedOutputKey(
    userId: string,
    sourceId: string,
    language: string,
    contentType: 'tweet' | 'space'
  ): string {
    const timestamp = Date.now()
    return `${userId}/${contentType}/${sourceId}/dubbed/${language}_${timestamp}.mp3`
  }
}

export const s3Service = new S3Service()