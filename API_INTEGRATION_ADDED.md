# ✅ API Integration Examples Added to Documentation

## What Was Added

The CLAUDE.md file now includes comprehensive API integration examples based on the reference implementation in `exampleONLY/speechlab-twitter-spaces-translator/`. These examples show exactly how to:

### 1. Download Twitter Media
```javascript
// Using ffmpeg to download M3U8 streams
const ffmpegArgs = [
    '-protocol_whitelist', 'file,http,https,tcp,tls,crypto',
    '-i', m3u8Url,                // Input M3U8 URL
    '-c', 'copy',                  // Copy codec
    '-bsf:a', 'aac_adtstoasc',    // Audio bitstream filter
    '-y',                          // Overwrite output
    outputFilePath
];
```

### 2. Upload to S3 for Public Access
- Upload downloaded media to S3
- Generate public URLs for SpeechLab access
- Content type: `audio/aac`

### 3. SpeechLab API Integration

#### Authentication
- POST to `/v1/auth/login` with email/password
- Receive JWT token in `response.data.tokens.accessToken.jwtToken`
- Cache token and handle 401 errors with retry

#### Create Dubbing Project
- POST to `/v1/projects/createProjectAndDub`
- Include Bearer token in headers
- Key parameters:
  - `sourceLanguage`: "en"
  - `targetLanguage`: "es_la" (mapped from "es")
  - `unitType`: "whiteGlove"
  - `voiceMatchingMode`: "source"
  - `thirdPartyID`: unique tracking identifier

#### Monitor Progress
- Poll using `GET /v1/projects?thirdPartyIDs=${id}`
- Check every 30 seconds
- Status values: PROCESSING, COMPLETE, FAILED
- Typical completion: 5-30 minutes

#### Retrieve Dubbed Content
- Extract from `project.translations[0].dub[0].medias`
- Each media object contains:
  - `uri`: Final dubbed file URL
  - `presignedURL`: Temporary download URL
  - `format`: Output format (mp3)

### 4. Complete Pipeline Flow

1. **Extract** - Get M3U8 URL from Twitter
2. **Download** - Use ffmpeg to download audio
3. **Upload** - Store in S3 for public access
4. **Submit** - Create SpeechLab dubbing project
5. **Monitor** - Poll for completion status
6. **Retrieve** - Get dubbed media URLs
7. **Publish** - Post back to Twitter as replies

### 5. Important Implementation Notes

#### Language Mapping
- Twitter uses ISO codes (e.g., "es")
- SpeechLab needs specific variants (e.g., "es_la")
- Implement mapping layer for compatibility

#### Error Handling
- Exponential backoff for retries
- 401 handling with token refresh
- Comprehensive logging for debugging

#### Security
- OAuth only (no password storage)
- Encrypt tokens at rest
- Use presigned URLs for temporary access
- Request signing for webhooks

## Key Files Referenced (Not in Git)

The implementation examples are based on code in:
- `exampleONLY/speechlab-twitter-spaces-translator/src/services/speechlabApiService.ts`
- `exampleONLY/speechlab-twitter-spaces-translator/src/services/audioService.ts`

These files are excluded from the repository via .gitignore but provide working examples of the integration.

## Next Steps for Implementation

1. **Phase 3: Agent & Dub Pipeline**
   - Implement the media download service
   - Create SpeechLab API client
   - Build job queue for processing
   - Add status tracking

2. **Phase 4: Auto-Publishing**
   - Implement Twitter reply posting
   - Add manual review workflow
   - Create publishing templates

## Environment Variables Needed

```bash
# SpeechLab API
SPEECHLAB_EMAIL=your-email
SPEECHLAB_PASSWORD=your-password
SPEECHLAB_API_URL=https://translate-api.speechlab.ai

# AWS S3 (for media storage)
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
```

## Security Reminders

1. **Never commit credentials** - Use environment variables
2. **Encrypt sensitive data** - OAuth tokens, API keys
3. **Validate webhooks** - Verify signatures
4. **Rate limit API calls** - Respect service limits
5. **Log but don't expose** - Sanitize logs of sensitive data

---

The documentation now provides a complete blueprint for implementing the Twitter-to-SpeechLab dubbing pipeline while keeping the actual implementation code separate and secure.