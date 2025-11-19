import { defineEventHandler } from 'h3'
import { createClient } from '@supabase/supabase-js'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const supabase = createClient(config.public.supabaseUrl as string, config.supabaseServiceRole as string)
  const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false })
  if (error) return []
  if (Array.isArray(data)) return data
  return []
})