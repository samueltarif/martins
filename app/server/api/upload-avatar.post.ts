import { defineEventHandler, readMultipartFormData, createError } from 'h3'
import { createClient } from '@supabase/supabase-js'
import { useRuntimeConfig } from '#imports'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabase = createClient(config.public.supabaseUrl as string, config.supabaseServiceRole as string)
  const parts = await readMultipartFormData(event)
  if (!parts) throw createError({ statusCode: 400, statusMessage: 'No data provided' })
  
  const file = parts.find(p => p.type && p.name === 'file')
  const namePart = parts.find(p => !p.type && p.name === 'name')
  
  if (!file) throw createError({ statusCode: 400, statusMessage: 'No file provided' })
  
  // Validação de tipo de arquivo
  if (!ALLOWED_TYPES.includes(file.type || '')) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid file type. Only JPEG, PNG and WebP are allowed.' })
  }
  
  // Validação de tamanho
  if (file.data.length > MAX_FILE_SIZE) {
    throw createError({ statusCode: 400, statusMessage: 'File too large. Maximum size is 5MB.' })
  }
  
  // Validação adicional do conteúdo (magic numbers)
  const buffer = Buffer.from(file.data)
  const isValidImage = validateImageBuffer(buffer)
  if (!isValidImage) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid image file content' })
  }
  
  const displayName = namePart ? Buffer.from(namePart.data).toString('utf-8') : 'user'
  
  // Sanitizar nome do arquivo
  const ext = (file.filename?.split('.').pop() || 'jpg').toLowerCase()
  const validExtensions = ['jpg', 'jpeg', 'png', 'webp']
  if (!validExtensions.includes(ext)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid file extension' })
  }
  
  const safeName = displayName.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-')
  const path = `profiles/${Date.now()}_${safeName}.${ext}`
  
  await supabase.storage.createBucket('avatars', { public: true }).catch(() => {})
  const { error } = await supabase.storage.from('avatars').upload(path, file.data, { 
    contentType: file.type, 
    upsert: false // Previne sobrescrita de arquivos existentes
  })
  
  if (error) throw createError({ statusCode: 500, statusMessage: error.message })
  
  const { data } = supabase.storage.from('avatars').getPublicUrl(path)
  return { url: data.publicUrl }
})

// Função auxiliar para validar magic numbers de imagens
function validateImageBuffer(buffer: Buffer): boolean {
  // Verifica os primeiros bytes para identificar o tipo de imagem
  if (buffer.length < 4) return false
  
  // JPEG: FF D8 FF
  if (buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) {
    return true
  }
  
  // PNG: 89 50 4E 47
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
    return true
  }
  
  // WebP: RIFF....WEBP
  if (buffer.length >= 12 && 
      buffer[0] === 0x52 && buffer[1] === 0x49 && 
      buffer[2] === 0x46 && buffer[3] === 0x46 &&
      buffer[8] === 0x57 && buffer[9] === 0x45 && 
      buffer[10] === 0x42 && buffer[11] === 0x50) {
    return true
  }
  
  return false
}