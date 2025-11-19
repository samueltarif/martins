<template>
  <article class="portfolio-card bg-[var(--bg-secondary)] rounded-2xl overflow-hidden shadow border border-black/10">
    <div class="portfolio-image relative h-52 overflow-hidden">
      <img v-if="currentSrc" :src="currentSrc" :alt="card.title" class="w-full h-full object-cover cursor-zoom-in" @error="onError" @click="openLightbox">
      <span class="absolute top-3 right-3 px-3 py-1 rounded-full text-white text-xs font-semibold bg-black">{{ card.category }}</span>
      <button v-if="hasMultiple" @click="prev" class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--bg-secondary)] border border-black/10 flex items-center justify-center">&lt;</button>
      <button v-if="hasMultiple" @click="next" class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--bg-secondary)] border border-black/10 flex items-center justify-center">&gt;</button>
    </div>
    <div class="portfolio-content p-6">
      <h3 class="text-xl font-semibold mb-2">{{ card.title }}</h3>
      <p class="text-sm text-[var(--text-secondary)] mb-3">{{ card.description }}</p>
      <a href="#contact" class="text-[var(--text-primary)] font-semibold text-sm inline-flex items-center gap-2">Saiba Mais
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>
    </div>

    <div v-if="lightboxOpen" class="fixed inset-0 z-[1200] bg-black/80 flex items-center justify-center" @click.self="closeLightbox">
      <img :src="currentSrc" alt="Imagem" class="max-w-[90vw] max-h-[90vh] object-contain">
      <button class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-xl" @click="closeLightbox">×</button>
      <button v-if="hasMultiple" @click="prev" class="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-xl">‹</button>
      <button v-if="hasMultiple" @click="next" class="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-xl">›</button>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed, ref, onUnmounted } from 'vue'

type Card = { title: string; description: string; category: string; image?: string; images?: string[] }
const props = defineProps<{ card: Card }>()

const idx = ref(0)
const imgs = computed(() => {
  const raw = props.card.images ?? (props.card.image ? [props.card.image] : [])
  return raw.filter(src => /^\/(images|docs-images)\//.test(src) || src.startsWith('data:') || src.startsWith('blob:'))
})
const hasMultiple = computed(() => imgs.value.length > 1)
const currentSrc = computed(() => imgs.value.length ? imgs.value[(idx.value + imgs.value.length) % imgs.value.length] : '')
const next = () => { if (!imgs.value.length) return; idx.value = (idx.value + 1) % imgs.value.length }
const prev = () => { if (!imgs.value.length) return; idx.value = (idx.value - 1 + imgs.value.length) % imgs.value.length }
const onError = () => { next() }

const lightboxOpen = ref(false)
const openLightbox = () => { lightboxOpen.value = true; if (typeof document !== 'undefined') document.body.classList.add('modal-open') }
const closeLightbox = () => { lightboxOpen.value = false; if (typeof document !== 'undefined') document.body.classList.remove('modal-open') }
onUnmounted(() => { if (typeof document !== 'undefined') document.body.classList.remove('modal-open') })
</script>