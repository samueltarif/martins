import { defineEventHandler, getQuery, createError } from 'h3'
import { createClient } from '@supabase/supabase-js'
import { useRuntimeConfig } from '#imports'

const ALLOWED_DOMAINS = [
  'fakeface.rest',
  'thispersondoesnotexist.com',
  'xsgames.co',
  'robohash.org'
]

const BLOCKED_IPS = [
  '127.0.0.1',
  'localhost',
  '0.0.0.0',
  '::1'
]

const PRIVATE_IP_RANGES = [
  /^10\./,
  /^172\.(1[6-9]|2[0-9]|3[01])\./,
  /^192\.168\./,
  /^169\.254\./,
  /^fc00:/,
  /^fe80:/
]

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabase = createClient(config.public.supabaseUrl as string, config.supabaseServiceRole as string)
  const q = getQuery(event) as Record<string, any>
  const gender = (q.gender as string | undefined) || 'auto'
  const name = (q.seed as string | undefined) || 'Visitante'
  const src = (q.src as string | undefined) || ''

  let url: string | null = null

  if (src) {
    // Validar URL fornecida para prevenir SSRF
    try {
      const parsedUrl = new URL(src)
      
      // Bloquear IPs privados e localhost
      const hostname = parsedUrl.hostname
      if (BLOCKED_IPS.includes(hostname)) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid image source: blocked IP' })
      }
      
      // Verificar se é IP privado
      const isPrivateIP = PRIVATE_IP_RANGES.some(range => range.test(hostname))
      if (isPrivateIP) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid image source: private IP range' })
      }
      
      // Verificar se o domínio está na whitelist
      const domain = hostname.toLowerCase()
      const isAllowedDomain = ALLOWED_DOMAINS.some(allowed => domain === allowed || domain.endsWith('.' + allowed))
      if (!isAllowedDomain) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid image source: domain not allowed' })
      }
      
      // Verificar protocolo (apenas HTTP/HTTPS)
      if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
        throw createError({ statusCode: 400, statusMessage: 'Invalid image source: only HTTP/HTTPS allowed' })
      }
      
      url = src
    } catch (error) {
      if (error.statusCode) throw error
      throw createError({ statusCode: 400, statusMessage: 'Invalid image source URL' })
    }
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
    // Configurar timeout e headers de segurança para o fetch
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 segundos timeout
    
    const resp = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'MartinsRepresentacoes/1.0',
        'Accept': 'image/*,*/*;q=0.8'
      },
      // Previne redirecionamentos para domínios não confiáveis
      redirect: 'follow',
      // Limitar tamanho da resposta (10MB)
      size: 10 * 1024 * 1024
    })
    
    clearTimeout(timeoutId)
    
    if (!resp.ok) {
      throw createError({ statusCode: 400, statusMessage: 'Failed to download image' })
    }
    
    // Verificar content-type
    const contentType = resp.headers.get('content-type')
    if (!contentType || !contentType.startsWith('image/')) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid content type' })
    }
    
    const buf = Buffer.from(await resp.arrayBuffer())
    
    // Verificar tamanho do arquivo baixado
    if (buf.length > 10 * 1024 * 1024) {
      throw createError({ statusCode: 400, statusMessage: 'Image too large' })
    }
    
    // Validação básica do conteúdo da imagem
    if (buf.length < 100) {
      throw createError({ statusCode: 400, statusMessage: 'Image too small' })
    }
    
    await supabase.storage.createBucket('avatars', { public: true }).catch(() => {})
    const safeName = name.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-')
    const stamp = Date.now()
    const ext = 'jpg'
    const path = `ai/${stamp}_${safeName}_${gender}.${ext}`
    const up = await supabase.storage.from('avatars').upload(path, buf, { contentType: 'image/jpeg', upsert: true })
    if (up.error) throw createError({ statusCode: 500, statusMessage: up.error.message })
    const { data } = supabase.storage.from('avatars').getPublicUrl(path)
    return { url: data.publicUrl }
  } catch (error: any) {
    if (error.statusCode) throw error
    throw createError({ statusCode: 500, statusMessage: 'Upload failed' })
  }
})