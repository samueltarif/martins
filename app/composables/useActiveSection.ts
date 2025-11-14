import { onMounted, onUnmounted, ref } from 'vue'

export function useActiveSection(baseOffset = 200) {
  const currentSection = ref('home')
  const isActive = (id: string) => currentSection.value === id
  let sections: HTMLElement[] = []
  let headerOffset = 0
  let ticking = false

  const computeHeaderOffset = () => {
    if (typeof document !== 'undefined') {
      const h = document.querySelector('header') as HTMLElement | null
      headerOffset = (h?.offsetHeight || 0) + baseOffset
    }
  }
  
  const collectSections = () => {
    if (typeof document !== 'undefined') {
      sections = Array.from(document.querySelectorAll('section[id]')) as HTMLElement[]
    }
  }
  
  const run = () => {
    if (typeof window === 'undefined') return
    
    let cur = 'home'
    const y = window.scrollY
    for (let i = 0; i < sections.length; i++) {
      const top = sections[i].offsetTop
      if (y >= top - headerOffset) cur = sections[i].id
    }
    currentSection.value = cur
  }
  
  const onScroll = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => { run(); ticking = false })
  }
  
  const onResize = () => {
    computeHeaderOffset()
    run()
  }
  
  onMounted(() => {
    if (typeof window !== 'undefined') {
      computeHeaderOffset()
      collectSections()
      run()
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onResize)
    }
  })
  
  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  })
  
  return { currentSection, isActive }
}