import { onMounted, ref } from 'vue'

export function useTheme() {
  const theme = ref<'light'|'dark'>('light')
  
  const setTheme = (t: 'light'|'dark') => { 
    theme.value = t 
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', t) 
    }
  }
  
  const toggle = () => setTheme(theme.value === 'dark' ? 'light' : 'dark')
  
  onMounted(() => {
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
  })
  
  return { theme, toggle }
}
