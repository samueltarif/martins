<template>
  <section id="testimonials" class="py-16 bg-[var(--bg-secondary)]">
    <div class="max-w-7xl mx-auto px-5">
      <h2 class="text-4xl font-bold text-center mb-2 text-[var(--text-primary)]">O Que Dizem Meus Clientes</h2>
      <p class="text-center text-[var(--text-secondary)] mb-6 text-lg">Depoimentos de parceiros satisfeitos</p>
      <div class="flex justify-center gap-3 mb-6">
        <button class="px-5 py-2 rounded-full bg-black text-white hover:opacity-90" @click="openModal">Avaliar</button>
        <a href="https://www.google.com/search?sca_esv=f517df8b24517ced&hl=pt-BR&authuser=0&sxsrf=AE3TifPQ3dK1ubpPHnT6k8SaVaAgkaZAOg:1763570467278&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E5mwgLszE46KEAGL5RSqDm66mHU-pNv5Zjr_pJ1b2-oZ1ifpIG93pqec3A4iKhL1R5ZEnD2QxQh3GPFvEdn7OSQkjsXlxpftjN-CfxEqKAbqpUP1oQ%3D%3D&q=MARTINS+REPRESENTA%C3%87%C3%95ES+Coment%C3%A1rios&sa=X&ved=2ahUKEwiI-vP50_6QAxXUBbkGHdrLAeAQ0bkNegQIHxAE&biw=1358&bih=612&dpr=1#lrd=0x2fbe5172ff517b09:0xd15263809fb6faeb,3,,,," target="_blank" rel="noopener" class="px-5 py-2 rounded-full border border-black/10 bg-white text-black hover:bg-black hover:text-white">Me avalie no Google</a>
      </div>
      <div class="relative max-w-3xl mx-auto" @mouseenter="stop" @mouseleave="start" @touchstart="onTouchStart" @touchend="onTouchEnd">
        <div class="overflow-hidden rounded-2xl">
          <div class="flex transition-transform duration-500" :style="{ transform: `translateX(-${currentIndex*100}%)` }">
            <article v-for="(t,i) in testimonials" :key="i" class="min-w-full bg-[var(--bg-secondary)] p-10 rounded-2xl border border-black/10 shadow">
              <div class="text-center">
                <div class="flex items-center justify-center gap-1 mb-4">
                  <svg v-for="s in 5" :key="s" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" :class="s <= t.rating ? 'text-[#FFD700]' : 'text-black/20'" fill="currentColor">
                    <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.788 1.402 8.168L12 18.897l-7.336 3.87 1.402-8.168L.132 9.211l8.2-1.193z"/>
                  </svg>
                </div>
                <p class="text-lg text-[var(--text-primary)] italic mb-6">{{ t.text }}</p>
                <div class="flex flex-col items-center gap-3">
                  <div class="w-20 h-20 rounded-full overflow-hidden border-4 border-[var(--accent-primary)]"><img :src="t.avatar" :alt="t.name" class="w-full h-full object-cover" @error="onAvatarError(i)"></div>
                  <div class="text-center">
                    <h4 class="text-base font-semibold">{{ t.name }}</h4>
                    <p class="text-sm text-[var(--text-secondary)]">{{ t.role }} - {{ t.company }}</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div class="flex items-center justify-center gap-6 mt-6">
          <button class="w-11 h-11 rounded-full bg-[var(--bg-secondary)] border border-black/10 flex items-center justify-center" @click="prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><polyline points="15 18 9 12 15 6"/></svg></button>
          <div class="flex gap-2">
            <button v-for="(d,i) in testimonials.length" :key="i" class="w-3 h-3 rounded-full bg-black/10" :class="i===currentIndex ? 'w-8 rounded bg-[var(--accent-primary)]' : ''" @click="go(i)"></button>
          </div>
          <button class="w-11 h-11 rounded-full bg-[var(--bg-secondary)] border border-black/10 flex items-center justify-center" @click="next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><polyline points="9 18 15 12 9 6"/></svg></button>
        </div>
      </div>

      <div v-if="showModal" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
        <div class="bg-[var(--bg-secondary)] rounded-2xl border border-black/10 w-full max-w-lg p-6 max-h-[90vh] overflow-hidden">
          <h3 class="text-xl font-semibold mb-4">Avaliar</h3>
          <form @submit.prevent="submitForm" class="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm mb-1">Nome</label>
                <input v-model="form.name" type="text" class="w-full px-3 py-2 rounded-lg border border-black/10 bg-[var(--bg-primary)]" required>
              </div>
              <div>
                <label class="block text-sm mb-1">Cargo</label>
                <input v-model="form.role" type="text" class="w-full px-3 py-2 rounded-lg border border-black/10 bg-[var(--bg-primary)]">
              </div>
              <div class="sm:col-span-2">
                <label class="block text-sm mb-1">Empresa</label>
                <input v-model="form.company" type="text" class="w-full px-3 py-2 rounded-lg border border-black/10 bg-[var(--bg-primary)]" required>
              </div>
            </div>
            
            <div>
              <label class="block text-sm mb-2">Avaliação</label>
              <div class="flex items-center gap-2">
                <button v-for="s in 5" :key="s" type="button" @click="form.rating = s" class="p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6" :class="s <= form.rating ? 'text-[#FFD700]' : 'text-black/20'" fill="currentColor">
                    <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.788 1.402 8.168L12 18.897l-7.336 3.87 1.402-8.168L.132 9.211l8.2-1.193z"/>
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <label class="block text-sm mb-1">Comentário</label>
              <textarea v-model="form.text" rows="4" class="w-full px-3 py-2 rounded-lg border border-black/10 bg-[var(--bg-primary)]" required></textarea>
            </div>
            <div>
              <label class="block text-sm mb-2">Foto de perfil</label>
              <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--accent-primary)]" v-if="form.avatarPreview">
                  <img :src="form.avatarPreview" alt="Preview" class="w-full h-full object-cover" @error="onFormPreviewError">
                </div>
                <input type="file" accept="image/*" @change="onFileChange">
              </div>
              <p class="text-xs text-[var(--text-secondary)] mt-1">Se a foto não aparecer, usamos um avatar padrão automaticamente. Visualização disponível para JPG, PNG ou WEBP.</p>
              <p v-if="avatarError" class="text-red-600 text-xs mt-1">{{ avatarError }}</p>
            </div>
            <div class="mt-2">
              <button type="button" class="px-3 py-2 rounded-lg border border-black/10" @click="toggleAvatarPicker">Gerar personagens IA</button>
              <div v-if="showAvatarPicker" class="mt-3">
                <div class="flex items-center gap-3">
                  <label class="text-sm">Gênero</label>
                  <select v-model="form.avatarGender" class="px-3 py-2 rounded-lg border border-black/10 bg-[var(--bg-primary)]">
                    <option value="auto">Automático</option>
                    <option value="male">Masculino</option>
                    <option value="female">Feminino</option>
                  </select>
                  <button type="button" class="px-3 py-2 rounded-lg bg-black text-white" @click="generateAvatars">Gerar</button>
                </div>
                <p v-if="avatarError" class="text-red-600 text-sm mt-2">{{ avatarError }}</p>
                <div class="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-3 max-h-[24vh] overflow-y-auto pr-1">
                  <button v-for="url in generatedAvatars" :key="url" type="button" class="w-16 h-16 rounded-full overflow-hidden border border-black/10" @click="form.avatarPreview = url">
                    <img :src="url" alt="Avatar IA" class="w-full h-full object-cover">
                  </button>
                </div>
              </div>
            </div>
            <p v-if="submitError" class="text-red-600 text-sm">{{ submitError }}</p>
            <div class="sticky bottom-0 bg-[var(--bg-secondary)] pt-2 pb-1">
              <div class="flex justify-end gap-3">
              <button type="button" class="px-4 py-2 rounded-lg bg-gray-200" @click="closeModal">Cancelar</button>
              <button type="submit" class="px-4 py-2 rounded-lg bg-black text-white inline-flex items-center gap-2" :disabled="isSubmitting" :class="isSubmitting ? 'opacity-70 cursor-not-allowed' : ''">
                <svg v-if="isSubmitting" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5 animate-spin">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" class="opacity-25"/>
                  <path d="M4 12a8 8 0 018-8" fill="currentColor" class="opacity-75"/>
                </svg>
                <span>{{ isSubmitting ? 'Enviando...' : 'Enviar' }}</span>
              </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

type Testimonial = {
  text: string
  name: string
  role: string
  company: string
  avatar: string
  rating: number
}

const testimonials = ref<Testimonial[]>([])
const submitError = ref('')
const isSubmitting = ref(false)
const avatarError = ref('')

const currentIndex = ref(0)
let timer: any
const total = computed(() => testimonials.value.length)
const update = (i: number) => { currentIndex.value = i }
const start = () => { if (timer) clearInterval(timer); timer = setInterval(() => { update((currentIndex.value + 1) % total.value) }, 5000) }
const stop = () => { if (timer) clearInterval(timer) }
const next = () => { stop(); update((currentIndex.value + 1) % total.value); start() }
const prev = () => { stop(); update((currentIndex.value - 1 + total.value) % total.value); start() }
const go = (i: number) => { stop(); update(i); start() }

let touchStartX = 0
let touchEndX = 0
const onTouchStart = (e: TouchEvent) => { touchStartX = e.changedTouches[0].screenX; stop() }
const onTouchEnd = (e: TouchEvent) => { touchEndX = e.changedTouches[0].screenX; if (touchStartX - touchEndX > 50) next(); else if (touchEndX - touchStartX > 50) prev(); start() }

const showModal = ref(false)
const form = ref({
  name: '',
  role: '',
  company: '',
  rating: 0,
  text: '',
  avatarFile: null as File | null,
  avatarPreview: '',
  avatarBase64: '',
  avatarGender: 'auto'
})
const showAvatarPicker = ref(false)
const generatedAvatars = ref<string[]>([])
const isFemaleByName = (name: string) => {
  const raw = (name || 'Visitante').trim().toLowerCase()
  const first = (raw.split(/\s+/)[0] || raw)
  const femaleList = ['ana','maria','juliana','carla','camila','patricia','gabriela','luisa','bianca','beatriz','fernanda','caroline','leticia','raquel','aline','monica','daniela','priscila','sabrina','mariana']
  return femaleList.includes(first) || (first.endsWith('a') && !['luca'].includes(first))
}
const avatarOptions = computed(() => {
  const g = form.value.avatarGender
  const isF = g === 'female' ? true : g === 'male' ? false : isFemaleByName(form.value.name)
  const base = isF ? 'https://xsgames.co/randomusers/assets/avatars/female/' : 'https://xsgames.co/randomusers/assets/avatars/male/'
  const ids = [1,3,5,7,9,11,13,15,17,19,21,23]
  return ids.map(i => `${base}${i}.jpg`)
})

const ALLOWED_TYPES = ['image/jpeg','image/png','image/webp']
const setDefaultAvatar = (idx?: number) => {
  const name = typeof idx === 'number' ? (testimonials.value[idx]?.name || '') : (form.value.name || '')
  const isF = isFemaleByName(name)
  const base = isF ? 'https://xsgames.co/randomusers/assets/avatars/female/' : 'https://xsgames.co/randomusers/assets/avatars/male/'
  const ids = [1,3,5,7,9,11,13,15,17,19,21,23]
  const id = ids[Math.floor(Math.random() * ids.length)]
  if (typeof idx === 'number' && testimonials.value[idx]) {
    testimonials.value[idx].avatar = `${base}${id}.jpg`
  } else {
    form.value.avatarPreview = `${base}${id}.jpg`
  }
}
const onAvatarError = (idx: number) => { setDefaultAvatar(idx) }
const onFormPreviewError = () => { form.value.avatarPreview = ''; avatarError.value = 'Não foi possível mostrar sua foto. Usaremos um avatar padrão após o envio.' }

const openModal = () => { showModal.value = true; submitError.value = ''; if (typeof document !== 'undefined') document.body.classList.add('modal-open') }
const closeModal = () => { showModal.value = false; submitError.value = ''; if (typeof document !== 'undefined') document.body.classList.remove('modal-open') }
const onFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files && input.files[0]
  if (file) {
    form.value.avatarFile = file
    avatarError.value = ''
    const type = (file.type || '').toLowerCase()
    if (ALLOWED_TYPES.includes(type)) {
      const reader = new FileReader()
      reader.onload = () => {
        form.value.avatarBase64 = reader.result as string
        form.value.avatarPreview = form.value.avatarBase64
      }
      reader.readAsDataURL(file)
    } else {
      form.value.avatarBase64 = ''
      form.value.avatarPreview = ''
      if (type.includes('heic') || type.includes('heif')) {
        avatarError.value = 'Fotos HEIC/HEIF não são suportadas por navegadores. Vamos salvar sua foto, mas mostraremos um avatar padrão.'
      } else {
        avatarError.value = 'Formato não suportado para visualização. Use JPG, PNG ou WEBP para ver a prévia.'
      }
    }
  }
}

const submitForm = async () => {
  if (!form.value.name || !form.value.company || !form.value.text || form.value.rating < 1) { submitError.value = 'Preencha nome, empresa, comentário e selecione a nota.'; return }
  isSubmitting.value = true
  submitError.value = ''
  let avatar = form.value.avatarPreview
  try {
    if (form.value.avatarFile) {
      const fd = new FormData()
      fd.append('file', form.value.avatarFile)
      fd.append('name', form.value.name)
      const r = await fetch('/api/upload-avatar', { method: 'POST', body: fd })
      const j = await r.json()
      if (j && j.url) avatar = j.url
    } else if (avatar && !avatar.includes('/storage/v1/object/public/avatars/')) {
      const g = form.value.avatarGender
      const gender = g === 'male' ? 'male' : (g === 'female' ? 'female' : 'auto')
      const rwrap = await fetch(`/api/generate-avatar?gender=${gender}&seed=${encodeURIComponent(form.value.name || 'Visitante')}&src=${encodeURIComponent(avatar)}`)
      const jwrap = await rwrap.json().catch(() => ({}))
      if (jwrap && jwrap.url) avatar = jwrap.url
    }
    if (!avatar) {
      const g = form.value.avatarGender
      const gender = g === 'male' ? 'male' : (g === 'female' ? 'female' : 'auto')
      const rgen = await fetch(`/api/generate-avatar?gender=${gender}&seed=${encodeURIComponent(form.value.name || 'Visitante')}`)
      const jgen = await rgen.json().catch(() => ({}))
      if (jgen && jgen.url) avatar = jgen.url
    }
    const payload = {
      text: form.value.text,
      name: form.value.name,
      role: form.value.role,
      company: form.value.company,
      avatar,
      rating: form.value.rating
    }
    const resp = await fetch('/api/add-testimonial', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const result = await resp.json().catch(() => ({}))
    if (!result || result.error) { submitError.value = (result && result.error) ? result.error : 'Falha ao enviar avaliação'; return }
    testimonials.value.push(payload)
    currentIndex.value = testimonials.value.length - 1
    closeModal()
  } catch {
    submitError.value = 'Falha ao enviar avaliação'
  } finally {
    isSubmitting.value = false
  }
}

const generateAvatars = async () => {
  const g = form.value.avatarGender
  const gender = g === 'male' ? 'male' : (g === 'female' ? 'female' : 'auto')
  avatarError.value = ''
  generatedAvatars.value = []
  const tasks = Array.from({ length: 8 }).map(async () => {
    const r = await fetch(`/api/generate-avatar?gender=${gender}&seed=${encodeURIComponent(form.value.name || 'Visitante')}`)
    const j = await r.json().catch(() => ({}))
    if (j && j.url) generatedAvatars.value.push(j.url)
  })
  await Promise.allSettled(tasks)
  if (!generatedAvatars.value.length) {
    avatarError.value = 'Não foi possível gerar imagens agora. Mostrando opções alternativas.'
    generatedAvatars.value = avatarOptions.value
  }
}

const toggleAvatarPicker = async () => {
  showAvatarPicker.value = !showAvatarPicker.value
  if (showAvatarPicker.value) await generateAvatars()
}

const loadTestimonials = async () => {
  try {
    const r = await fetch('/api/testimonials')
    const j = await r.json()
    if (Array.isArray(j) && j.length) {
      testimonials.value = j
      currentIndex.value = 0
    }
  } catch {}
}

onMounted(() => { loadTestimonials().finally(() => start()) })
onUnmounted(() => { stop(); if (typeof document !== 'undefined') document.body.classList.remove('modal-open') })
</script>
