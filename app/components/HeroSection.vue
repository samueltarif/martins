<template>
  <section id="home" class="min-h-screen flex items-center justify-center pt-20 relative bg-gradient-to-br from-[rgba(99,102,241,0.1)] to-[rgba(139,92,246,0.1)]">
    <div class="absolute inset-0 overflow-hidden">
      <div v-for="i in 12" :key="i" class="absolute w-1 h-1 rounded-full bg-[var(--accent-primary)] opacity-30" :style="particleStyle(i)"></div>
    </div>
    <div class="relative z-10 text-center max-w-3xl mx-auto px-5 animate-[fadeInUp_1s_ease]">
      <div class="hero-image w-52 h-52 rounded-full mx-auto mb-8 border-4 border-[var(--accent-primary)] shadow-[0_0_40px_rgba(99,102,241,0.4)] overflow-hidden relative">
        <img :src="heroImg" alt="Fellip Martins - Foto de perfil profissional" class="w-full h-full object-cover" width="200" height="200" />
      </div>
      <h1 class="text-4xl font-extrabold mb-3">Fellip Martins</h1>
      <p class="text-lg text-[var(--text-secondary)] mb-8">Representante Comercial Especializado<br>Conectando empresas com soluções inovadoras há mais de 10 anos</p>
      <div class="flex flex-wrap gap-3 justify-center">
        <a href="#portfolio" class="px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] shadow">
          Ver Portfólio
        </a>
        <a href="#contact" class="px-8 py-3 rounded-xl font-semibold border-2 border-[var(--accent-primary)]">
          Entre em Contato
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const heroImg = '/images/filip.png'
const particleStyle = (i: number) => {
  const top = `${(i * 7) % 90 + 5}%`
  const left = `${(i * 13) % 90 + 5}%`
  const delay = `${-i * 1.2}s`
  return { top, left, animation: `float 20s infinite`, animationDelay: delay }
}
</script>

<style scoped>
@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px)} to { opacity: 1; transform: translateY(0)} }
@keyframes float {
  0%,100% { transform: translateY(0) translateX(0) }
  25% { transform: translateY(-20px) translateX(10px) }
  50% { transform: translateY(-40px) translateX(-10px) }
  75% { transform: translateY(-20px) translateX(10px) }
}
</style>
