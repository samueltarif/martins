import { defineEventHandler, readMultipartFormData } from 'h3'
import { createClient } from '@supabase/supabase-js'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabase = createClient(config.public.supabaseUrl as string, config.supabaseServiceRole as string)
  const parts = await readMultipartFormData(event)
  if (!parts) return { error: 'no_data' }
  const file = parts.find(p => p.type && p.name === 'file')
  const namePart = parts.find(p => !p.type && p.name === 'name')
  if (!file) return { error: 'no_file' }
  const displayName = namePart ? Buffer.from(namePart.data).toString('utf-8') : 'user'
  const ext = (file.filename?.split('.').pop() || 'jpg').toLowerCase()
  const safeName = displayName.trim().toLowerCase().replace(/\s+/g, '-')
  const path = `profiles/${Date.now()}_${safeName}.${ext}`
  await supabase.storage.createBucket('avatars', { public: true }).catch(() => {})
  const { error } = await supabase.storage.from('avatars').upload(path, file.data, { contentType: file.type, upsert: true })
  if (error) return { error: error.message }
  const { data } = supabase.storage.from('avatars').getPublicUrl(path)
  return { url: data.publicUrl }
})