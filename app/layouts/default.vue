<template>
  <div>
    <HeaderNav />
    <SocialSidebar />
    <NuxtPage />
    <AppFooter />
    <Analytics />
  </div>
</template>

<script setup>
import { Analytics } from '@vercel/analytics/vue'
</script>
