import { defineEventHandler, readBody, createError, getHeader } from 'h3'
import { createClient } from '@supabase/supabase-js'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabase = createClient(config.public.supabaseUrl as string, config.supabaseServiceRole as string)

  // Verificar autenticação
  const authHeader = getHeader(event, 'authorization')
  if (!authHeader) {
    throw createError({ statusCode: 401, statusMessage: 'Authorization required' })
  }

  const { data: user, error: authError } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''))
  if (authError || !user.user) {
    throw createError({ statusCode: 403, statusMessage: 'Invalid or expired token' })
  }

  // Verificar permissão (exemplo: apenas usuários com email específico ou role)
  const ADMIN_EMAILS = ['admin@example.com', 'fellip@martinsrepresentacoes.com.br']
  if (!ADMIN_EMAILS.includes(user.user.email || '')) {
    throw createError({ statusCode: 403, statusMessage: 'Insufficient permissions' })
  }

  const body = await readBody(event)
  const id = body?.id as number | string | undefined
  const name = (body?.name as string | undefined)?.trim()
  const company = (body?.company as string | undefined)?.trim()
  const text = (body?.text as string | undefined)?.trim()

  if (!id && !name && !text && !company) return { error: 'invalid' }

  let tableDeleted = false
  if (id) {
    const del = await supabase.from('testimonials').delete().eq('id', id).select()
    if (!del.error && Array.isArray(del.data)) tableDeleted = del.data.length > 0
  } else {
    const q = supabase.from('testimonials').select('*').order('created_at', { ascending: false }).limit(20)
    const { data, error } = await q
    if (!error && Array.isArray(data)) {
      const match = data.find((r: any) => {
        const sameName = name ? (r.name?.toString().trim().toLowerCase() === name.toLowerCase()) : true
        const sameCompany = company ? (r.company?.toString().trim().toLowerCase() === company.toLowerCase()) : true
        const sameText = text ? (r.text?.toString().trim() === text) : true
        return sameName && sameCompany && sameText
      })
      if (match && match.id) {
        const del = await supabase.from('testimonials').delete().eq('id', match.id).select()
        if (!del.error && Array.isArray(del.data)) tableDeleted = del.data.length > 0
      }
    }
  }

  if (tableDeleted) return { ok: true }

  await supabase.storage.createBucket('data', { public: true }).catch(() => {})
  const safe = name ? name.toLowerCase().replace(/\s+/g, '-') : ''
  const list = await supabase.storage.from('data').list('testimonials')
  if (list.error || !list.data) return { error: 'not_found' }
  const candidates = list.data.filter(it => safe ? it.name.endsWith(`_${safe}.json`) : true)
  if (!candidates.length) return { error: 'not_found' }
  let target = candidates[0]
  for (const it of candidates) {
    const tsA = parseInt((target.name.split('_')[0] || '0'), 10)
    const tsB = parseInt((it.name.split('_')[0] || '0'), 10)
    if (tsB > tsA) target = it
  }
  const rm = await supabase.storage.from('data').remove([`testimonials/${target.name}`])
  if (rm.error) return { error: rm.error.message }
  return { ok: true }
})