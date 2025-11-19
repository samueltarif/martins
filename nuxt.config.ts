import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  srcDir: 'app',
  serverDir: 'app/server',
  modules: ['@nuxtjs/tailwindcss'],
  css: ['@/assets/css/tailwind.css', '@/assets/css/theme.css', '@/assets/css/base.css', '@/assets/css/components.css'],
  compatibilityDate: '2025-11-12',
  devtools: { enabled: true },
  devServer: {
    port: 3005,
    host: 'localhost'
  },
  runtimeConfig: {
    supabaseServiceRole: process.env.NUXT_SUPABASE_SERVICE_ROLE,
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY
    }
    ,
    smtpUser: process.env.NUXT_SMTP_USER,
    smtpPass: process.env.NUXT_SMTP_PASS
  },
  vite: {
    server: {
      hmr: false
    }
  },
  nitro: {
    publicAssets: [
      { dir: 'public' },
      { dir: 'docs-images', baseURL: '/docs-images' }
    ]
  },
  app: {
    head: {
      title: 'Fellip Martins — MR - Representante Comercial Especializado',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Fellip Martins — MR - Representante Comercial Especializado com experiência em vendas B2B, automação industrial e soluções corporativas.' },
        { name: 'keywords', content: 'representante comercial, vendas B2B, soluções empresariais, automação industrial, consultoria' },
        { name: 'theme-color', content: '#f5f5f5' },
        { property: 'og:title', content: 'Fellip Martins — MR - Representante Comercial Especializado' },
        { property: 'og:description', content: 'Conectando empresas com soluções inovadoras' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/images/filip.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Fellip Martins — MR - Representante Comercial Especializado' },
        { name: 'twitter:description', content: 'Conectando empresas com soluções inovadoras' }
      ],
      link: [
        { rel: 'icon', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💼</text></svg>' }
      ],
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Fellip Martins — MR',
            jobTitle: 'Representante Comercial Especializado',
            description: 'Especialista em vendas B2B com foco em tecnologia e soluções corporativas',
            url: 'https://joaosilva.com',
            email: 'fellip.martins@gmail.com',
            telephone: '+55-11-94229-0168',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'São Paulo',
              addressRegion: 'SP',
              addressCountry: 'BR'
            }
          })
        },
        {
          type: 'text/javascript',
          children: "(function(){try{var html=document.documentElement;var m=window.matchMedia('(prefers-color-scheme: dark)');var apply=function(){html.setAttribute('data-theme',m.matches?'dark':'light')};apply();m.addEventListener('change',apply)}catch(e){}})();"
        }
      ]
    }
  },
  tailwindcss: {
    viewer: false
  }
})
