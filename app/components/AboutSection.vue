<template>
  <section id="about" class="py-16" ref="sectionRef">
    <div class="max-w-7xl mx-auto px-5">
      <h2 class="text-4xl font-bold text-center mb-2 text-[var(--text-primary)]">Sobre Mim</h2>
      <p class="text-center text-[var(--text-secondary)] mb-12 text-lg">Especialista em vendas Industriais com foco em tecnologia, confiança e soluções corporativas</p>
      <div class="grid lg:grid-cols-3 gap-10 items-center">
        <div class="lg:col-span-1">
          <img :src="aboutImg" alt="Fellip Martins - Foto profissional" class="about-photo w-full rounded-2xl shadow-xl border-4" loading="lazy" />
        </div>
        <div class="lg:col-span-2">
          <h3 class="text-xl font-semibold mb-3">Experiência Comprovada em Vendas</h3>
          <p class="text-[var(--text-secondary)] mb-6 leading-relaxed">Com mais de 8 anos de experiência no mercado Industrial, atuo oferecendo soluções industriais completas, incluindo Tubos, Flanges, Conexões, Válvulas, Sistema de combate a Incêndio, serviços industriais e instrumentação. Sempre com foco em qualidade, confiança, certificação e alta performance.</p>
          <p class="text-[var(--text-secondary)] mb-8 leading-relaxed">Trabalho de forma consultiva, ajudando empresas a reduzir custos, otimizar processos e encontrar exatamente o que cada projeto exige. Minha trajetória é marcada por relacionamentos duradouros, suporte técnico especializado e resultados consistentes para clientes de diversos setores.</p>
          <h3 class="text-xl font-semibold mb-4">Especializações</h3>
          <div class="grid sm:grid-cols-2 gap-3 mb-8">
            <div class="flex items-center gap-2 p-3 bg-[var(--bg-secondary)] rounded-lg border-l-4 border-[var(--accent-primary)]"><span>Soluções Industriais</span></div>
            <div class="flex items-center gap-2 p-3 bg-[var(--bg-secondary)] rounded-lg border-l-4 border-[var(--accent-primary)]"><span>Negociação Estratégica</span></div>
            <div class="flex items-center gap-2 p-3 bg-[var(--bg-secondary)] rounded-lg border-l-4 border-[var(--accent-primary)]"><span>Suporte Técnico Especializado</span></div>
            <div class="flex items-center gap-2 p-3 bg-[var(--bg-secondary)] rounded-lg border-l-4 border-[var(--accent-primary)]"><span>Análise de Mercado</span></div>
          </div>
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <div class="stat-card text-center p-6 bg-[var(--bg-secondary)] rounded-2xl shadow">
              <span class="text-3xl font-extrabold text-[var(--text-primary)] block mb-2">{{ clientsDisplay }}</span>
              <span class="text-[var(--text-secondary)] text-sm font-medium">Clientes Ativos</span>
            </div>
        <div class="stat-card text-center p-6 bg-[var(--bg-secondary)] rounded-2xl shadow">
          <span class="text-3xl font-extrabold text-[var(--text-primary)] block mb-2">{{ yearsDisplay }}</span>
          <span class="text-[var(--text-secondary)] text-sm font-medium">Anos de Experiência</span>
        </div>
        <div class="stat-card text-center p-6 bg-[var(--bg-secondary)] rounded-2xl shadow">
          <span class="text-3xl font-extrabold text-[var(--text-primary)] block mb-2">{{ projectsDisplay }}</span>
          <span class="text-[var(--text-secondary)] text-sm font-medium">Projetos Concluídos</span>
        </div>
        <div class="stat-card text-center p-6 bg-[var(--bg-secondary)] rounded-2xl shadow">
          <span class="text-3xl font-extrabold text-[var(--text-primary)] block mb-2">{{ satisfactionDisplay }}%</span>
          <span class="text-[var(--text-secondary)] text-sm font-medium">Taxa de Satisfação</span>
        </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const sectionRef = ref<HTMLElement|null>(null)
const clientsTarget = 150
const yearsTarget = 8
const projectsTarget = 200
const satisfactionTarget = 100
const aboutImg = '/images/filipmartins.png'

const clientsDisplay = ref(0)
const yearsDisplay = ref(0)
const projectsDisplay = ref(0)
const satisfactionDisplay = ref(0)

let animated = false
const animate = (from: number, to: number, set: (v:number)=>void, duration = 1200) => {
  const start = performance.now()
  const step = (t: number) => {
    const p = Math.min((t - start) / duration, 1)
    set(Math.floor(from + (to - from) * p))
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}
const startCounters = () => {
  if (animated) return
  animated = true
  animate(0, clientsTarget, v => clientsDisplay.value = v)
  animate(0, yearsTarget, v => yearsDisplay.value = v)
  animate(0, projectsTarget, v => projectsDisplay.value = v)
  animate(0, satisfactionTarget, v => satisfactionDisplay.value = v)
}
let observer: IntersectionObserver | null = null
onMounted(() => {
  const el = sectionRef.value
  if (el) {
    const rect = el.getBoundingClientRect()
    const visible = rect.top < window.innerHeight && rect.bottom > 0
    if (visible) startCounters()
  }
  observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) startCounters() })
  }, { threshold: 0.1 })
  if (sectionRef.value) observer.observe(sectionRef.value)
})
onUnmounted(() => { if (observer && sectionRef.value) observer.unobserve(sectionRef.value) })
</script>
