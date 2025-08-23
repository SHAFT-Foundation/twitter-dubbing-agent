import crypto from 'crypto'

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'development-key-32-characters-xx'
const IV_LENGTH = 16 // For AES, this is always 16

// Ensure the key is exactly 32 characters
const key = Buffer.from(ENCRYPTION_KEY.padEnd(32, 'x').slice(0, 32))

/**
 * Encrypts text using AES-256-CBC
 */
export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
  
  let encrypted = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  
  return iv.toString('hex') + ':' + encrypted.toString('hex')
}

/**
 * Decrypts text encrypted with the encrypt function
 */
export function decrypt(text: string): string {
  const textParts = text.split(':')
  const iv = Buffer.from(textParts.shift()!, 'hex')
  const encryptedText = Buffer.from(textParts.join(':'), 'hex')
  
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
  
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  
  return decrypted.toString()
}

/**
 * Generates a secure random string for tokens
 */
export function generateSecureToken(length = 32): string {
  return crypto.randomBytes(length).toString('hex')
}

/**
 * Hashes a string using SHA-256
 */
export function hashString(text: string): string {
  return crypto.createHash('sha256').update(text).digest('hex')
}