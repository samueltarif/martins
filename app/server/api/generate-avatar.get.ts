import { defineEventHandler, getQuery } from 'h3'
import { createClient } from '@supabase/supabase-js'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabase = createClient(config.public.supabaseUrl as string, config.supabaseServiceRole as string)
  const q = getQuery(event) as Record<string, any>
  const gender = (q.gender as string | undefined) || 'auto'
  const name = (q.seed as string | undefined) || 'Visitante'
  const src = (q.src as string | undefined) || ''

  let url: string | null = null

  if (src) {
    url = src
  } else {
    try {
      const gParam = gender === 'male' ? 'male' : (gender === 'female' ? 'female' : '')
      const api = 'https://fakeface.rest/face/json' + (gParam ? `?gender=${gParam}` : '')
      const r = await fetch(api, { headers: { 'Accept': 'application/json' } })
      const j = await r.json().catch(() => null) as any
      if (j && j.image_url) url = j.image_url as string
    } catch {}
  }

  if (!url) {
    try {
      url = 'https://thispersondoesnotexist.com/image'
    } catch {}
  }

  if (!url) return { error: 'provider_unavailable' }

  try {
    const resp = await fetch(url)
    if (!resp.ok) return { error: 'download_failed' }
    const buf = Buffer.from(await resp.arrayBuffer())
    await supabase.storage.createBucket('avatars', { public: true }).catch(() => {})
    const safeName = name.trim().toLowerCase().replace(/\s+/g, '-')
    const stamp = Date.now()
    const ext = 'jpg'
    const path = `ai/${stamp}_${safeName}_${gender}.${ext}`
    const up = await supabase.storage.from('avatars').upload(path, buf, { contentType: 'image/jpeg', upsert: true })
    if (up.error) return { error: up.error.message }
    const { data } = supabase.storage.from('avatars').getPublicUrl(path)
    return { url: data.publicUrl }
  } catch (e: any) {
    return { error: 'upload_failed' }
  }
})