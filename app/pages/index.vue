<template>
  <main id="main">
    <HeroSection />
    <section id="institutional-video" class="py-10 bg-[var(--bg-secondary)]">
      <div class="max-w-5xl mx-auto px-5">
        <h2 class="text-2xl md:text-3xl font-bold text-center mb-4 text-[var(--text-primary)]">Próximos destinos</h2>
        <div class="rounded-2xl overflow-hidden shadow">
          <video src="/images/MOSSORÓ.mp4" autoplay muted playsinline preload="metadata" class="w-full" aria-label="Vídeo institucional"></video>
        </div>
      </div>
    </section>
    <AboutSection />
    <PortfolioSection />
    <BenefitsSection />
    <CompaniesSection />
    <TestimonialsSection />
    <ContactForm />
  </main>
</template>
