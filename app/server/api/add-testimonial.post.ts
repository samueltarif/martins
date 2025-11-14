import { defineEventHandler, readBody } from 'h3'
import { createClient } from '@supabase/supabase-js'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabase = createClient(config.public.supabaseUrl as string, config.supabaseServiceRole as string)
  const body = await readBody(event)
  if (!body || !body.name || !body.company || !body.text || !body.rating) return { error: 'invalid' }
  const { error } = await supabase.from('testimonials').insert([body])
  if (!error) return { ok: true }
  await supabase.storage.createBucket('data', { public: true }).catch(() => {})
  const name = body.name as string
  const safe = name.trim().toLowerCase().replace(/\s+/g, '-')
  const path = `testimonials/${Date.now()}_${safe}.json`
  const data = Buffer.from(JSON.stringify(body))
  const r = await supabase.storage.from('data').upload(path, data, { contentType: 'application/json', upsert: true })
  if (r.error) return { error: r.error.message }
  return { ok: true }
})