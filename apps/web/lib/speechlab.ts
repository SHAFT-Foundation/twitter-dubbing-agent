/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios'

const API_BASE_URL = 'https://translate-api.speechlab.ai'

// Language mapping for SpeechLab compatibility
const LANGUAGE_MAP: Record<string, string> = {
  'es': 'es_la',  // Spanish to Latin American Spanish
  'pt': 'pt_br',  // Portuguese to Brazilian Portuguese
  // Add more mappings as needed
}

interface LoginResponse {
  tokens: {
    accessToken: {
      jwtToken: string
    }
  }
}

interface CreateDubResponse {
  projectId: string
}

interface Project {
  id: string
  job: {
    name: string
    sourceLanguage: string
    targetLanguage: string
    status: 'PROCESSING' | 'COMPLETE' | 'FAILED'
  }
  translations?: Array<{
    language: string
    dub?: Array<{
      medias?: Array<{
        uri: string
        presignedURL?: string
        format: string
        operationType: string
      }>
    }>
  }>
}

class SpeechLabAPI {
  private client: AxiosInstance
  private token: string | null = null
  private tokenExpiry: number | null = null

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    })
  }

  private mapLanguageCode(code: string): string {
    return LANGUAGE_MAP[code] || code
  }

  async authenticate(): Promise<string> {
    // Check if we have a valid token
    if (this.token && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.token
    }

    try {
      const response = await this.client.post<LoginResponse>('/v1/auth/login', {
        email: process.env.SPEECHLAB_EMAIL,
        password: process.env.SPEECHLAB_PASSWORD,
      })

      const token = response.data?.tokens?.accessToken?.jwtToken
      if (!token) {
        throw new Error('No token received from SpeechLab')
      }

      this.token = token
      // Set token expiry to 55 minutes (tokens typically last 1 hour)
      this.tokenExpiry = Date.now() + 55 * 60 * 1000

      return token
    } catch (error) {
      console.error('SpeechLab authentication error:', error)
      throw new Error('Failed to authenticate with SpeechLab')
    }
  }

  async createDubbingProject(
    publicAudioUrl: string,
    projectName: string,
    targetLanguageCode: string,
    thirdPartyId: string,
    sourceLanguageCode = 'en'
  ): Promise<string> {
    const token = await this.authenticate()
    
    const mappedTargetLang = this.mapLanguageCode(targetLanguageCode)
    
    try {
      const response = await this.client.post<CreateDubResponse>(
        '/v1/projects/createProjectAndDub',
        {
          name: projectName.substring(0, 100),
          sourceLanguage: sourceLanguageCode,
          targetLanguage: mappedTargetLang,
          dubAccent: mappedTargetLang,
          unitType: 'whiteGlove',
          mediaFileURI: publicAudioUrl,
          voiceMatchingMode: 'source',
          thirdPartyID: thirdPartyId,
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      const projectId = response.data?.projectId
      if (!projectId) {
        throw new Error('No project ID received from SpeechLab')
      }

      return projectId
    } catch (error) {
      // Handle 401 errors by retrying with new token
      if ((error as any).response?.status === 401) {
        this.token = null
        this.tokenExpiry = null
        return this.createDubbingProject(
          publicAudioUrl,
          projectName,
          targetLanguageCode,
          thirdPartyId,
          sourceLanguageCode
        )
      }
      
      console.error('SpeechLab project creation error:', (error as any).response?.data || error)
      throw new Error('Failed to create dubbing project')
    }
  }

  async getProjectStatus(thirdPartyId: string): Promise<Project | null> {
    const token = await this.authenticate()
    
    const encodedId = encodeURIComponent(thirdPartyId)
    const url = `/v1/projects?thirdPartyIDs=${encodedId}&expand=true&limit=1`
    
    try {
      const response = await this.client.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.data?.results && response.data.results.length > 0) {
        return response.data.results[0]
      }

      return null
    } catch (error) {
      if ((error as any).response?.status === 401) {
        this.token = null
        this.tokenExpiry = null
        return this.getProjectStatus(thirdPartyId)
      }
      
      console.error('SpeechLab get project error:', (error as any).response?.data || error)
      return null
    }
  }

  async waitForCompletion(
    thirdPartyId: string,
    maxWaitMs = 60 * 60 * 1000, // 1 hour
    checkIntervalMs = 30000 // 30 seconds
  ): Promise<Project | null> {
    const startTime = Date.now()
    
    while (Date.now() - startTime < maxWaitMs) {
      const project = await this.getProjectStatus(thirdPartyId)
      
      if (!project) {
        console.log(`Project ${thirdPartyId} not found, waiting...`)
      } else if (project.job?.status === 'COMPLETE') {
        return project
      } else if (project.job?.status === 'FAILED') {
        throw new Error(`Project ${thirdPartyId} failed`)
      } else {
        const elapsed = Math.round((Date.now() - startTime) / 1000)
        console.log(`Project ${thirdPartyId} status: ${project.job?.status} (${elapsed}s elapsed)`)
      }
      
      await new Promise(resolve => setTimeout(resolve, checkIntervalMs))
    }
    
    throw new Error(`Project ${thirdPartyId} timed out after ${maxWaitMs}ms`)
  }

  getDubbedMediaUrls(project: Project): string[] {
    const urls: string[] = []
    
    if (project.translations) {
      for (const translation of project.translations) {
        if (translation.dub) {
          for (const dub of translation.dub) {
            if (dub.medias) {
              for (const media of dub.medias) {
                if (media.operationType === 'OUTPUT' && media.presignedURL) {
                  urls.push(media.presignedURL)
                }
              }
            }
          }
        }
      }
    }
    
    return urls
  }
}

// Export singleton instance
export const speechLabAPI = new SpeechLabAPI()