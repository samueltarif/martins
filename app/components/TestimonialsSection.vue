<template>
  <section id="testimonials" class="py-16 bg-[var(--bg-secondary)]">
    <div class="max-w-7xl mx-auto px-5">
      <h2 class="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">O Que Dizem Meus Clientes</h2>
      <p class="text-center text-[var(--text-secondary)] mb-6 text-lg">Depoimentos de parceiros satisfeitos</p>
      <div class="flex justify-center mb-6">
        <button class="px-5 py-2 rounded-full bg-[var(--accent-primary)] text-white hover:opacity-90" @click="openModal">Avaliar</button>
      </div>
      <div class="relative max-w-3xl mx-auto" @mouseenter="stop" @mouseleave="start" @touchstart="onTouchStart" @touchend="onTouchEnd">
        <div class="overflow-hidden rounded-2xl">
          <div class="flex transition-transform duration-500" :style="{ transform: `translateX(-${currentIndex*100}%)` }">
            <article v-for="(t,i) in testimonials" :key="i" class="min-w-full bg-[var(--bg-secondary)] p-10 rounded-2xl border border-black/10 shadow">
              <div class="text-center">
                <div class="flex items-center justify-center gap-1 mb-4">
                  <svg v-for="s in 5" :key="s" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" :class="s <= t.rating ? 'text-[var(--accent-primary)]' : 'text-black/20'" fill="currentColor">
                    <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.788 1.402 8.168L12 18.897l-7.336 3.87 1.402-8.168L.132 9.211l8.2-1.193z"/>
                  </svg>
                </div>
                <p class="text-lg text-[var(--text-primary)] italic mb-6">{{ t.text }}</p>
                <div class="flex flex-col items-center gap-3">
                  <div class="w-20 h-20 rounded-full overflow-hidden border-4 border-[var(--accent-primary)]"><img :src="t.avatar" :alt="t.name" class="w-full h-full object-cover"></div>
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
        <div class="bg-[var(--bg-secondary)] rounded-2xl border border-black/10 w-full max-w-lg p-6">
          <h3 class="text-xl font-semibold mb-4">Avaliar</h3>
          <form @submit.prevent="submitForm" class="space-y-4">
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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6" :class="s <= form.rating ? 'text-[var(--accent-primary)]' : 'text-black/20'" fill="currentColor">
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
                  <img :src="form.avatarPreview" alt="Preview" class="w-full h-full object-cover">
                </div>
                <input type="file" accept="image/*" @change="onFileChange">
              </div>
            </div>
            <div class="flex justify-end gap-3 pt-2">
              <button type="button" class="px-4 py-2 rounded-lg bg-gray-200" @click="closeModal">Cancelar</button>
              <button type="submit" class="px-4 py-2 rounded-lg bg-[var(--accent-primary)] text-white">Enviar</button>
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
  avatarBase64: ''
})

const openModal = () => { showModal.value = true; if (typeof document !== 'undefined') document.body.classList.add('modal-open') }
const closeModal = () => { showModal.value = false; if (typeof document !== 'undefined') document.body.classList.remove('modal-open') }
const onFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files && input.files[0]
  if (file) {
    form.value.avatarFile = file
    const reader = new FileReader()
    reader.onload = () => {
      form.value.avatarBase64 = reader.result as string
      form.value.avatarPreview = form.value.avatarBase64
    }
    reader.readAsDataURL(file)
  }
}

const submitForm = async () => {
  if (!form.value.name || !form.value.company || !form.value.text || form.value.rating < 1) return
  let avatar = '/images/filip.png'

  if (form.value.avatarFile) {
    const fd = new FormData()
    fd.append('file', form.value.avatarFile)
    fd.append('name', form.value.name)
    const r = await fetch('/api/upload-avatar', { method: 'POST', body: fd })
    const j = await r.json()
    if (j && j.url) avatar = j.url
  } else if (form.value.avatarPreview) {
    avatar = form.value.avatarPreview
  }
  const payload = {
    text: form.value.text,
    name: form.value.name,
    role: form.value.role,
    company: form.value.company,
    avatar,
    rating: form.value.rating
  }
  await fetch('/api/add-testimonial', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  testimonials.value.push(payload)
  currentIndex.value = testimonials.value.length - 1
  closeModal()
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
