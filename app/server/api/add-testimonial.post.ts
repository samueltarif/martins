import { defineEventHandler, readBody } from 'h3'
import { createClient } from '@supabase/supabase-js'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabase = createClient(config.public.supabaseUrl as string, config.supabaseServiceRole as string)
  const body = await readBody(event)
  if (!body || !body.name || !body.company || !body.text || !body.rating) return { error: 'invalid' }
  const { error } = await supabase.from('testimonials').insert([body])
  if (error) return { error: error.message }
  return { ok: true }
})