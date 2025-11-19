<template>
  <section id="companies" class="py-20 bg-[var(--bg-primary)]">
    <div class="max-w-7xl mx-auto px-5">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold mb-4 text-[var(--text-primary)]">
          Empresas que Represento
        </h2>
        <p class="text-[var(--text-secondary)] text-xl max-w-2xl mx-auto">
          Parcerias sólidas com líderes de mercado
        </p>
        <div class="w-24 h-1 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] mx-auto mt-6 rounded-full"></div>
      </div>
      
      <div class="relative max-w-2xl mx-auto" @mouseenter="stop" @mouseleave="start" @touchstart="onTouchStart" @touchend="onTouchEnd">
        <div class="overflow-hidden rounded-2xl">
          <div class="flex transition-transform duration-500" :style="{ transform: `translateX(-${currentIndex*100}%)` }">
            <!-- Todas as empresas em slides individuais -->
            <div v-for="(company, index) in allCompanies" :key="index" class="min-w-full">
              <div class="p-8">
                <div class="company-card flex flex-col items-center gap-6 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in bg-white rounded-2xl border border-black/10"
                     @click="openCompanyModal(company)">
                  <img src="/images/GRUPOS.png" alt="Empresas" class="mx-auto" loading="lazy">
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Client-side only content to prevent hydration mismatch -->
        <ClientOnly>
          <!-- Navigation Buttons -->
          <div class="flex items-center justify-center gap-6 mt-8">
            <button class="nav-button w-11 h-11 rounded-full bg-[var(--bg-secondary)] border border-black/10 flex items-center justify-center hover:bg-[var(--accent-primary)] hover:text-white transition-all duration-200" @click="prev">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <div class="flex gap-2">
              <button v-for="(slide, i) in totalSlides" :key="i" 
                      class="w-3 h-3 rounded-full transition-all duration-200" 
                      :class="i===currentIndex ? 'w-8 rounded bg-[var(--accent-primary)]' : 'bg-black/10 hover:bg-black/20'" 
                      @click="go(i)">
              </button>
            </div>
            <button class="nav-button w-11 h-11 rounded-full bg-[var(--bg-secondary)] border border-black/10 flex items-center justify-center hover:bg-[var(--accent-primary)] hover:text-white transition-all duration-200" @click="next">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
          
          <!-- Progress Indicator -->
          <div class="mt-6 text-center">
            <p class="text-sm text-[var(--text-secondary)] mb-2">
              {{ currentIndex + 1 }} de {{ totalSlides }} empresas
            </p>
            <div class="w-32 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
              <div class="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full transition-all duration-300" 
                   :style="{ width: `${((currentIndex + 1) / totalSlides) * 100}%` }">
              </div>
            </div>
          </div>
        </ClientOnly>
        <div v-if="showImageModal" class="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-sm flex items-center justify-center" @click="closeImageModal">
          <div class="relative max-w-5xl w-full px-5" @click.stop>
            <button class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center" aria-label="Fechar" @click="closeImageModal">×</button>
            <img :src="modalImageSrc" alt="Empresas" class="w-full h-auto rounded-2xl shadow"/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const currentIndex = ref(0)
let timer: any
const isClient = ref(false)

// Todas as empresas em uma única lista para slides individuais
const allCompanies = [
  {
    name: 'DataFlow Analytics',
    sector: 'Business Intelligence',
    initials: 'DA',
    category: 'Tecnologia',
    description: 'Transformando dados em insights valiosos através de análises avançadas e dashboards interativos para tomada de decisão.',
    image: '/images/GRUPOS.png'
  }
]

const totalSlides = allCompanies.length

const update = (i: number) => { currentIndex.value = i }
const start = () => { if (timer) clearInterval(timer); timer = setInterval(() => { update((currentIndex.value + 1) % totalSlides) }, 6000) }
const stop = () => { if (timer) clearInterval(timer) }
const next = () => { stop(); update((currentIndex.value + 1) % totalSlides); start() }
const prev = () => { stop(); update((currentIndex.value - 1 + totalSlides) % totalSlides); start() }
const go = (i: number) => { stop(); update(i); start() }

// Função para abrir modal ou redirecionar para mais informações sobre a empresa
const showImageModal = ref(false)
const modalImageSrc = ref('')
const openCompanyModal = (company: any) => {
  modalImageSrc.value = company?.image || '/images/GRUPOS.png'
  showImageModal.value = true
  if (typeof document !== 'undefined') document.body.style.overflow = 'hidden'
}
const closeImageModal = () => {
  showImageModal.value = false
  if (typeof document !== 'undefined') document.body.style.overflow = ''
}

let touchStartX = 0
let touchEndX = 0
const onTouchStart = (e: TouchEvent) => { touchStartX = e.changedTouches[0].screenX; stop() }
const onTouchEnd = (e: TouchEvent) => { 
  touchEndX = e.changedTouches[0].screenX; 
  if (touchStartX - touchEndX > 50) next(); 
  else if (touchEndX - touchStartX > 50) prev(); 
  start() 
}

onMounted(() => { 
  isClient.value = true
  nextTick(() => {
    start()
  })
})
onUnmounted(() => { stop(); if (typeof document !== 'undefined') document.body.style.overflow = '' })
</script>

<style scoped>
/* Smooth hover animations for company cards */
.company-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.company-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Gradient animation for initials */
.initials-gradient {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Button hover effects */
.nav-button:hover {
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(210, 210, 212, 0.3);
}

/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}

/* Fade in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}
</style>
