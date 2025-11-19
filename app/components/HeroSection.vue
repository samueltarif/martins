<template>
  <section id="home" class="min-h-screen flex items-center justify-center pt-20 relative bg-[var(--gradient-hero)]">
    <div class="absolute inset-0 overflow-hidden">
      <div v-for="i in 12" :key="i" class="absolute w-1 h-1 rounded-full bg-[var(--accent-primary)] opacity-30" :style="particleStyle(i)"></div>
    </div>
    <div class="relative z-10 text-center max-w-3xl mx-auto px-5 animate-[fadeInUp_1s_ease]">
      <div class="hero-image w-52 h-52 rounded-full mx-auto mb-8 border-4 border-[var(--accent-primary)] shadow-[var(--shadow-lg)] overflow-hidden relative">
        <img :src="heroImg" alt="Fellip Martins - Foto de perfil profissional" class="w-full h-full object-cover" width="200" height="200" />
      </div>
      <h1 class="text-4xl font-extrabold mb-3">Fellip Martins</h1>
      <p class="text-lg text-[var(--text-secondary)] mb-4">Representante Comercial Especializado<br>Conectando empresas com soluções inovadoras há mais de 8 anos</p>
      <p class="text-sm text-[var(--text-secondary)] font-semibold tracking-wide mb-2">Certificações</p>
      <div class="cert-marquee mb-6" role="region" aria-label="Certificações">
        <div class="cert-track cursor-pointer" @click="openCert" @keydown.enter="openCert" tabindex="0" role="button" aria-label="Abrir imagem de certificações">
          <img src="/images/certificações/CRC.png" alt="CRC" class="cert-item" />
          <img src="/images/certificações/ISO 9001.png" alt="ISO 9001" class="cert-item" />
          <img src="/images/certificações/ex.png" alt="Ex" class="cert-item" />
          <img src="/images/certificações/fire.png" alt="Fire" class="cert-item" />
          <img src="/images/certificações/listed.png" alt="Listed" class="cert-item" />
          <img src="/images/certificações/CRC.png" alt="CRC" class="cert-item" />
          <img src="/images/certificações/ISO 9001.png" alt="ISO 9001" class="cert-item" />
          <img src="/images/certificações/ex.png" alt="Ex" class="cert-item" />
          <img src="/images/certificações/fire.png" alt="Fire" class="cert-item" />
          <img src="/images/certificações/listed.png" alt="Listed" class="cert-item" />
        </div>
      </div>
      <div class="flex flex-wrap gap-3 justify-center">
        <a href="#portfolio" class="px-8 py-3 rounded-xl font-semibold text-white bg-black shadow">
          Ver Portfólio
        </a>
        <a href="#contact" class="px-8 py-3 rounded-xl font-semibold border-2 border-[var(--accent-primary)]">
          Entre em Contato
        </a>
      </div>
      <div v-if="showCertModal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
        <div class="relative bg-white rounded-2xl p-3 shadow-xl max-w-[90vw] max-h-[85vh]">
          <button class="absolute top-2 right-2 px-3 py-1 rounded-md bg-black text-white" @click="closeCert">Fechar</button>
          <img :src="certImg" alt="Certificações" class="block max-h-[80vh] w-auto object-contain" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const heroImg = '/images/filip.png'
const certImg = '/images/certificações.png'
const showCertModal = ref(false)
const openCert = () => { showCertModal.value = true }
const closeCert = () => { showCertModal.value = false }
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
.cert-marquee{ overflow:hidden; width:100%; }
.cert-track{ display:flex; align-items:center; gap:2rem; animation: certScroll 30s linear infinite; }
.cert-item{ height:48px; width:auto; filter: saturate(1.2); }
@keyframes certScroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }
.modal-backdrop{ }
</style>
