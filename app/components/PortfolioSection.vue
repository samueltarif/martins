<template>
  <section id="portfolio" class="py-16 bg-[var(--bg-secondary)]">
    <div class="max-w-7xl mx-auto px-5">
      <h2 class="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">Portfólio de Soluções</h2>
      <p class="text-center text-[var(--text-secondary)] mb-10 text-lg">Produtos e serviços de alta qualidade para transformar seu negócio</p>
      <div class="flex flex-wrap justify-center gap-3 mb-10">
        <button v-for="cat in categories" :key="cat.key" @click="setFilter(cat.key)" class="px-6 py-2 rounded-full border border-black/10 bg-[var(--bg-secondary)] font-medium" :class="filter===cat.key ? 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white border-transparent' : ''">{{ cat.label }}</button>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <component v-for="card in visibleCards" :is="card.category === 'Tubos' ? PortfolioTubosCard : PortfolioCard" :key="card.title" :card="card" />
      </div>
    </div>
  </section>
  
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import PortfolioCard from '@/components/PortfolioCard.vue'
import PortfolioTubosCard from '@/components/PortfolioTubosCard.vue'

type Card = { title: string; description: string; category: string; image?: string; images?: string[] }

const cards: Card[] = [
  { title: 'Válvulas para Processos Industriais', description: 'Linha completa de válvulas para controle e isolamento de fluidos. Consultoria especializada para ajudar na escolha do modelo adequado conforme pressão, temperatura e tipo de aplicação.', category: 'Válvulas', images: [
    '/images/val1.png',
    '/images/valv2.png',
    '/images/valv3.png',
    '/images/valv4.png'
  ] },
  { title: 'Tubos Industriais', description: 'Tubos com e sem costura em Aço Carbono, Inox, Liga, Duplex e Super Duplex, desenvolvidos para condução e aplicações industriais de alta performance.', category: 'Tubos', image: '/images/tubos.png' },
  { title: 'Flanges e Conexões Industriais', description: 'Flanges e Conexões em Aço Carbono, Inox, Liga, Duplex e Super Duplex para linhas de condução, pressão e aplicações de alta performance.', category: 'Flanges e Conexões', image: '/images/conexões.png' },
  { title: 'Linha de Instrumentação', description: 'Manômetros, transmissores, selos diafragma, manifolds e termopoços.', category: 'Instrumentação', images: [
    '/images/reg.png',
    '/images/manometro.png'
  ] },
  { title: 'Serviços industriais', description: 'Manutenção de trocadores de calor, montagem e manutenção industrial, jato e pintura, solda, fabricação de estruturas metálicas, usinagem e tratamento de metais.', category: 'Serviços', images: [
    '/images/metalmecanica.jpg',
    '/images/home-empresa.jpg'
  ] },
  { title: 'Sistemas de Combate a Incêndio', description: 'Soluções completas para sistemas de combate a incêndio, incluindo conexões ranhuradas, acoplamentos, mangueiras, sprinklers e acessórios.', category: 'Linha de Incêndio', images: [
    '/images/linha.png',
    '/images/linha2.png',
    '/images/sprinker.png'
  ] }
]

const categories = [
  { key: 'all', label: 'Todos' },
  { key: 'Válvulas', label: 'Válvulas' },
  { key: 'Tubos', label: 'Tubos' },
  { key: 'Flanges e Conexões', label: 'Flanges e Conexões' },
  { key: 'Instrumentação', label: 'Instrumentação' },
  { key: 'Linha de Incêndio', label: 'Linha de Incêndio' }
]

const filter = ref('all')
const setFilter = (f: string) => { filter.value = f }
const visibleCards = computed(() => filter.value === 'all' ? cards : cards.filter(c => c.category === filter.value))

 
</script>
