import { defineEventHandler } from 'h3'
import { createClient } from '@supabase/supabase-js'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const supabase = createClient(config.public.supabaseUrl as string, config.supabaseServiceRole as string)
  const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false })
  if (!error && data && Array.isArray(data) && data.length) return data
  await supabase.storage.createBucket('data', { public: true }).catch(() => {})
  const list = await supabase.storage.from('data').list('testimonials')
  if (list.error || !list.data) return []
  const items = list.data
  const out: any[] = []
  for (const it of items) {
    const dl = await supabase.storage.from('data').download('testimonials/' + it.name)
    if (dl.data) {
      const txt = await dl.data.text()
      try { out.push(JSON.parse(txt)) } catch {}
    }
  }
  out.sort((a, b) => (b.created_at ?? 0) - (a.created_at ?? 0))
  return out
})