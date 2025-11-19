import type { Config } from 'tailwindcss'

export default <Config>{
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['app/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        accent: {
          primary: '#d2d2d4',
          secondary: '#d2d2d4',
          highlight: '#10B981'
        }
      }
    }
  }
}
