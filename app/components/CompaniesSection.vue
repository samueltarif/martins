<template>
  <section id="companies" class="py-20 bg-[var(--bg-primary)]">
    <div class="max-w-7xl mx-auto px-5">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
          Empresas que Represento
        </h2>
        <p class="text-[var(--text-secondary)] text-xl max-w-2xl mx-auto">
          Parcerias sólidas com líderes de mercado em diversos setores
        </p>
        <div class="w-24 h-1 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] mx-auto mt-6 rounded-full"></div>
      </div>
      
      <div class="relative max-w-2xl mx-auto" @mouseenter="stop" @mouseleave="start" @touchstart="onTouchStart" @touchend="onTouchEnd">
        <div class="overflow-hidden rounded-2xl">
          <div class="flex transition-transform duration-500" :style="{ transform: `translateX(-${currentIndex*100}%)` }">
            <!-- Todas as empresas em slides individuais -->
            <div v-for="(company, index) in allCompanies" :key="index" class="min-w-full">
              <div class="p-8">
                <div class="company-card flex flex-col items-center gap-6 p-8 bg-[var(--bg-secondary)] rounded-2xl border border-black/10 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in"
                     @click="openCompanyModal(company)">
                  <div class="initials-gradient w-24 h-24 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center shadow-lg">
                    <span class="text-white font-bold text-2xl">{{ company.initials }}</span>
                  </div>
                  <div class="text-center space-y-2">
                    <h3 class="font-bold text-[var(--text-primary)] text-xl">{{ company.name }}</h3>
                    <p class="text-[var(--text-secondary)] font-medium">{{ company.sector }}</p>
                    <div class="mt-4 px-4 py-2 bg-[var(--accent-primary)]/10 rounded-full">
                      <span class="text-sm text-[var(--accent-primary)] font-semibold">{{ company.category }}</span>
                    </div>
                  </div>
                  <div class="mt-6 text-center">
                    <p class="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">
                      {{ company.description }}
                    </p>
                  </div>
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
    name: 'TechCorp Solutions', 
    sector: 'Software Empresarial', 
    initials: 'TS',
    category: 'Tecnologia',
    description: 'Líder em soluções empresariais com mais de 15 anos de mercado, oferecendo software de gestão integrada para empresas de todos os portes.'
  },
  { 
    name: 'InnovaLab Tecnologia', 
    sector: 'Automação Industrial', 
    initials: 'IT',
    category: 'Tecnologia',
    description: 'Especialista em automação industrial e IoT, transformando processos manuais em operações inteligentes e eficientes.'
  },
  { 
    name: 'SmartSystems', 
    sector: 'IoT & Conectividade', 
    initials: 'SS',
    category: 'Tecnologia',
    description: 'Conectando dispositivos e pessoas através de soluções inovadoras de Internet das Coisas para um mundo mais inteligente.'
  },
  { 
    name: 'DataFlow Analytics', 
    sector: 'Business Intelligence', 
    initials: 'DA',
    category: 'Tecnologia',
    description: 'Transformando dados em insights valiosos através de análises avançadas e dashboards interativos para tomada de decisão.'
  },
  { 
    name: 'Metalúrgica Silva', 
    sector: 'Componentes Metálicos', 
    initials: 'MS',
    category: 'Industrial',
    description: 'Tradição e qualidade na fabricação de componentes metálicos com precisão e durabilidade para diversos setores industriais.'
  },
  { 
    name: 'Química Brasil', 
    sector: 'Produtos Químicos', 
    initials: 'QB',
    category: 'Industrial',
    description: 'Soluções químicas inovadoras e sustentáveis para indústrias de transformação, com foco em eficiência e segurança.'
  },
  { 
    name: 'Construtora Lima', 
    sector: 'Materiais de Construção', 
    initials: 'CL',
    category: 'Industrial',
    description: 'Materiais de construção de alta qualidade que garantem resistência, beleza e valorização dos empreendimentos.'
  },
  { 
    name: 'Packaging Pro', 
    sector: 'Embalagens Industriais', 
    initials: 'PP',
    category: 'Industrial',
    description: 'Especializada em embalagens industriais personalizadas que protegem e valorizam produtos durante todo o ciclo de distribuição.'
  },
  { 
    name: 'Consultoria Max', 
    sector: 'Gestão Empresarial', 
    initials: 'CM',
    category: 'Serviços',
    description: 'Transformando negócios através de consultoria especializada em gestão, estratégia e processos empresariais.'
  },
  { 
    name: 'Logística Express', 
    sector: 'Transporte & Logística', 
    initials: 'LE',
    category: 'Serviços',
    description: 'Soluções logísticas completas que garantem agilidade, segurança e custo-benefício no transporte de mercadorias.'
  },
  { 
    name: 'Marketing Plus', 
    sector: 'Marketing Digital', 
    initials: 'MP',
    category: 'Serviços',
    description: 'Estratégias de marketing digital inovadoras que conectam marcas com seus públicos-alvo de forma eficaz e mensurável.'
  },
  { 
    name: 'RH Solutions', 
    sector: 'Recursos Humanos', 
    initials: 'RH',
    category: 'Serviços',
    description: 'Soluções completas em gestão de pessoas, desde recrutamento até desenvolvimento organizacional e retenção de talentos.'
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
const openCompanyModal = (company: any) => {
  // Por enquanto, vamos apenas mostrar um alerta com informações da empresa
  // Você pode substituir isso por um modal ou redirecionamento
  alert(`Empresa: ${company.name}\nSetor: ${company.sector}\n\nMais informações em breve!`)
  
  // Futuramente, você pode usar:
  // 1. Abrir um modal com detalhes da empresa
  // 2. Redirecionar para uma página de detalhes
  // 3. Abrir o site da empresa em uma nova aba
  // window.open(`https://www.${company.name.toLowerCase().replace(/\s+/g, '')}.com.br`, '_blank')
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
onUnmounted(() => { stop() })
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
  box-shadow: 0 0 20px rgba(124, 58, 237, 0.3);
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