<template>
  <header class="sticky top-0 left-0 right-0 w-full z-50 bg-[var(--gradient-hero)] shadow-sm backdrop-blur-sm" ref="headerRef">
    <div class="max-w-7xl mx-auto px-5">
      <nav class="grid grid-cols-1 lg:grid-cols-3 items-center py-4 relative" aria-label="Navegação principal">
        <!-- Desktop Navigation -->
        <ul class="hidden lg:flex items-center gap-6 font-medium">
          <li v-for="item in menuItems" :key="item.id">
            <a 
              :href="`#${item.href}`" 
              class="nav-link relative py-2 text-gray-800 dark:text-gray-200 hover:text-[var(--text-primary)] transition-all duration-200"
              :class="{ 
                'active': isActive(item.href)
              }"
              :aria-current="isActive(item.href) ? 'page' : undefined"
              @click="handleMenuClick(item.href)"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>

        <!-- Logo -->
        <a href="#home" class="justify-self-center z-10 inline-block">
          <img :src="logoSrc" alt="MR" style="width: 5cm; height: 5cm; object-fit: contain;" @error="onLogoError" />
        </a>

        <!-- Theme Toggle & Mobile Menu Button -->
        <div class="flex flex-col items-end gap-2 justify-self-end lg:flex-row lg:items-center lg:gap-3">
          <!-- Mobile Menu Button -->
          <button 
            class="lg:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center" 
            @click="toggleMobileMenu" 
            :aria-expanded="mobileMenuOpen.toString()" 
            aria-label="Abrir menu de navegação"
          >
            <span class="block w-6 h-0.5 bg-gray-800 dark:bg-gray-200 rounded transition-all duration-300" :class="mobileMenuOpen ? 'translate-y-1.5 rotate-45' : ''"></span>
            <span class="block w-6 h-0.5 bg-gray-800 dark:bg-gray-200 rounded transition-all duration-300" :class="mobileMenuOpen ? 'opacity-0' : ''"></span>
            <span class="block w-6 h-0.5 bg-gray-800 dark:bg-gray-200 rounded transition-all duration-300" :class="mobileMenuOpen ? '-translate-y-1.5 -rotate-45' : ''"></span>
          </button>

          <!-- Desktop Theme Toggle -->
          <button 
            class="hidden lg:flex w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" 
            @click="toggleTheme" 
            aria-label="Alternar tema claro/escuro"
          >
            <svg v-if="theme === 'light'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5 text-gray-700 dark:text-gray-300">
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 1v2M12 21v2M21 12h-2M5 12H3M18.364 5.636l-1.414 1.414M7.05 16.95l-1.414 1.414M18.364 18.364l-1.414-1.414M7.05 7.05L5.636 5.636"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5 text-gray-700 dark:text-gray-300">
              <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>
            </svg>
          </button>
        </div>
      </nav>
    </div>

    <!-- Mobile Navigation -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="mobileMenuOpen" class="lg:hidden mobile-menu bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 shadow-lg">
        <div class="max-w-7xl mx-auto px-5 py-4">
          <ul class="flex flex-col gap-2">
            <li v-for="item in menuItems" :key="item.id">
              <a 
                :href="`#${item.href}`" 
                class="mobile-menu-item block py-3 px-4 text-gray-800 dark:text-gray-200 hover:text-[var(--accent-primary)] transition-all duration-200"
                :class="{ 
                  'active': isActive(item.href)
                }"
                :aria-current="isActive(item.href) ? 'page' : undefined"
                @click="handleMenuClick(item.href)"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Transition>
  </header>

  <!-- Mobile Fixed Theme Toggle Button -->
  <button 
    class="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl" 
    @click="toggleTheme" 
    aria-label="Alternar tema claro/escuro"
  >
    <svg v-if="theme === 'light'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6 text-gray-700 dark:text-gray-300">
      <circle cx="12" cy="12" r="5"/>
      <path d="M12 1v2M12 21v2M21 12h-2M5 12H3M18.364 5.636l-1.414 1.414M7.05 16.95l-1.414 1.414M18.364 18.364l-1.414-1.414M7.05 7.05L5.636 5.636"/>
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6 text-gray-700 dark:text-gray-300">
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { useActiveSection } from '@/composables/useActiveSection'

const { toggle: toggleTheme, theme } = useTheme()
const { isActive } = useActiveSection()

const logoSrc = computed(() => theme.value === 'light' ? '/images/logo tema claro.png' : '/images/mr versão branca.png')
const onLogoError = (e: Event) => { (e.target as HTMLImageElement).src = '/images/logo tema claro.jpg' }

const headerRef = ref<HTMLElement>()
const headerHeight = ref(0)
const mobileMenuOpen = ref(false)
const isClient = ref(false)

const menuItems = [
  { id: 1, label: 'Início', href: 'home' },
  { id: 2, label: 'Sobre', href: 'about' },
  { id: 3, label: 'Portfólio', href: 'portfolio' },
  { id: 4, label: 'Serviços', href: 'benefits' },
  { id: 5, label: 'Contato', href: 'contact' }
]

const updateHeaderHeight = () => {
  if (typeof window !== 'undefined' && headerRef.value) {
    headerHeight.value = headerRef.value.offsetHeight
  }
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  document.body.style.overflow = mobileMenuOpen.value ? 'hidden' : ''
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  document.body.style.overflow = ''
}

const handleMenuClick = (href: string) => {
  closeMobileMenu()
  
  // Smooth scroll to section
  const element = document.getElementById(href)
  if (element) {
    const offset = headerHeight.value + 20 // 20px extra padding
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

// Update header height on mount and resize
onMounted(() => {
  isClient.value = true
  nextTick(() => {
    updateHeaderHeight()
  })
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', updateHeaderHeight)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateHeaderHeight)
  }
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* Custom scrollbar for mobile menu */
  @media (max-width: 1024px) {
    header::-webkit-scrollbar {
      width: 4px;
    }
    
    header::-webkit-scrollbar-track {
      background: transparent;
    }
    
    header::-webkit-scrollbar-thumb {
    background: rgba(210, 210, 212, 0.3);
      border-radius: 2px;
    }
  }

/* Smooth transitions for all interactive elements */
* {
  transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
}
</style>