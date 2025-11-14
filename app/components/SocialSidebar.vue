<template>
  <teleport to="body">
    <aside class="social-sidebar fixed bottom-4 right-4 z-[1100] flex gap-3 lg:flex-col lg:right-8 lg:top-1/2 lg:-translate-y-1/2 lg:bottom-auto">
      <a href="https://linkedin.com/in/fellip-martins-administrativo" target="_blank" rel="noopener noreferrer" class="social-link linkedin" aria-label="Visite o LinkedIn de Fellip Martins">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 fill-[var(--text-primary)]"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
      </a>
      <a @click.prevent="openWhatsApp" href="#" class="social-link whatsapp" aria-label="Envie uma mensagem pré-definida no WhatsApp" title="Clique para enviar mensagem no WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 fill-[var(--text-primary)]"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
      </a>
      <a href="mailto:fellip.martins@gmail.com" class="social-link email" aria-label="Envie um e-mail">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 stroke-[var(--text-primary)]" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
      </a>
    </aside>
  </teleport>
</template>

<script setup lang="ts">
const openWhatsApp = () => {
  const message = `Olá, Fellip!

Vi seu perfil no site e gostaria de conversar sobre seus serviços.
Você teria um minuto para conversarmos?`

  const encodedMessage = encodeURIComponent(message)
  const phoneNumber = '5511942290168'
  
  // Detecta mobile e usa deep link, senão usa web
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  
  if (isMobile) {
    // Deep link para app nativo
    window.location.href = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`
    // Fallback após 2s se o app não abrir
    setTimeout(() => {
      window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank')
    }, 2000)
  } else {
    // Web/Desktop
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank')
  }
}
</script>
