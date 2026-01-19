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
      
      <div class="company-marquee cursor-pointer" role="button" aria-label="Abrir imagem com todas as empresas" @click="openCompaniesModal" @keydown.enter="openCompaniesModal" tabindex="0">
        <div class="company-track">
          <img v-for="company in companies" :key="company.name" :src="company.image" :alt="`Logo da empresa ${company.name}`" class="company-item" loading="lazy" />
          <img v-for="company in companies" :key="`${company.name}-duplicate`" :src="company.image" :alt="`Logo da empresa ${company.name}`" class="company-item" loading="lazy" />
        </div>
      </div>
      
      <div v-if="showCompaniesModal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
        <div class="relative bg-white rounded-2xl p-3 shadow-xl max-w-[90vw] max-h-[85vh]">
          <button class="absolute top-2 right-2 px-3 py-1 rounded-md bg-black text-white" @click="closeCompaniesModal">Fechar</button>
          <img :src="companiesImg" alt="Todas as empresas representadas" class="block max-h-[80vh] w-auto object-contain" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Company {
  name: string
  image: string
}

const companies: Company[] = [
  {
    name: 'Enigma',
    image: '/images/enigma_fillip.png'
  },
  {
    name: 'Válvulas',
    image: '/images/valvulas_fillip.png'
  },
  {
    name: 'Carbinox',
    image: '/images/carbinox_fillip.png'
  },
  {
    name: 'Dinâmica',
    image: '/images/dinamica_fillip.png'
  },
  {
    name: 'Qualitec',
    image: '/images/qualitec_fillip.png'
  }
]

const companiesImg = '/images/GRUPOS.png'
const showCompaniesModal = ref(false)
const openCompaniesModal = () => { showCompaniesModal.value = true }
const closeCompaniesModal = () => { showCompaniesModal.value = false }
</script>

<style scoped>
.company-marquee {
  overflow: hidden;
  width: 100%;
}

.company-track {
  display: flex;
  align-items: center;
  gap: 3rem;
  animation: companyScroll 7.5s linear infinite;
}

.company-item {
  height: 204px;
  width: auto;
  filter: grayscale(20%) opacity(0.9);
  transition: all 0.3s ease;
  border-radius: 12px;
  background: white;
  padding: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  object-fit: contain;
  max-width: 510px;
}

.company-item:hover {
  filter: grayscale(0%) opacity(1);
  transform: scale(1.05);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

@keyframes companyScroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

/* Pausar animação no hover para melhor acessibilidade */
.company-marquee:hover .company-track {
  animation-play-state: paused;
}

/* Responsividade */
@media (max-width: 768px) {
  .company-item {
    height: 153px;
    max-width: 374px;
  }
  
  .company-track {
    gap: 2rem;
  }
}

@media (max-width: 480px) {
  .company-item {
    height: 119px;
    max-width: 306px;
  }
  
  .company-track {
    gap: 1.5rem;
  }
}
</style>
