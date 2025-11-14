import type { Config } from 'tailwindcss'

export default <Config>{
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['app/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        accent: {
          primary: '#6366F1',
          secondary: '#8B5CF6',
          highlight: '#10B981'
        }
      }
    }
  }
}
