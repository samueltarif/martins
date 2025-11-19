<template>
  <section id="contact" class="py-16">
    <div class="max-w-3xl mx-auto px-5">
      <h2 class="text-4xl font-bold text-center mb-2 text-[var(--text-primary)]">Entre em Contato</h2>
      <p class="text-center text-[var(--text-primary)] mb-10 text-lg">Vamos conversar sobre como posso ajudar seu negócio</p>
      <form class="contact-form" @submit.prevent="onSubmit" novalidate>
        <input type="text" name="website" v-model="honeypot" class="absolute -left-[9999px] opacity-0 pointer-events-none" tabindex="-1" autocomplete="off">
        <div class="form-group" :class="stateClass(nameValid)">
          <label for="name" class="block mb-2 text-sm font-semibold">Nome Completo *</label>
          <input id="name" v-model.trim="name" @blur="onBlur('name')" @input="onInput('name')" type="text" required class="w-full px-4 py-3 rounded-lg outline-none">
          <span v-if="nameValid===false" class="text-xs text-red-500 mt-1 block">Por favor, informe seu nome completo</span>
        </div>
        <div class="form-group" :class="stateClass(emailValid)">
          <label for="email" class="block mb-2 text-sm font-semibold">E-mail *</label>
          <input id="email" v-model.trim="email" @blur="onBlur('email')" @input="onInput('email')" type="email" required class="w-full px-4 py-3 rounded-lg outline-none">
          <span v-if="emailValid===false" class="text-xs text-red-500 mt-1 block">Por favor, informe um e-mail válido</span>
        </div>
        <div class="form-group">
          <label for="phone" class="block mb-2 text-sm font-semibold">Telefone</label>
          <input id="phone" :value="phone" @input="onPhoneInput" type="tel" placeholder="(00) 00000-0000" class="w-full px-4 py-3 rounded-lg outline-none">
        </div>
        <div class="form-group" :class="stateClass(subjectValid)">
          <label for="subject" class="block mb-2 text-sm font-semibold">Assunto *</label>
          <select id="subject" v-model="subject" @blur="onBlur('subject')" @change="onBlur('subject')" required class="w-full px-4 py-3 rounded-lg outline-none">
            <option value="">Selecione um assunto</option>
            <option value="orcamento">Solicitar Orçamento</option>
            <option value="produtos">Informações sobre Produtos</option>
            <option value="parcerias">Parcerias Comerciais</option>
            <option value="suporte">Suporte Técnico</option>
            <option value="outros">Outros Assuntos</option>
          </select>
          <span v-if="subjectValid===false" class="text-xs text-red-500 mt-1 block">Por favor, selecione um assunto</span>
        </div>
        <div class="form-group" :class="stateClass(messageValid)">
          <label for="message" class="block mb-2 text-sm font-semibold">Mensagem *</label>
          <textarea id="message" v-model.trim="message" @blur="onBlur('message')" @input="onInput('message')" rows="5" required class="w-full px-4 py-3 rounded-lg outline-none"></textarea>
          <span v-if="messageValid===false" class="text-xs text-red-500 mt-1 block">Por favor, escreva sua mensagem</span>
        </div>
        <button type="submit" :disabled="loading" class="w-full px-4 py-4 rounded-xl font-semibold text-white bg-black" :class="loading ? 'opacity-60 cursor-not-allowed' : ''">
          {{ loading ? 'Enviando...' : 'Enviar Mensagem' }}
        </button>
        <div v-if="submitted && success" class="mt-4 p-4 rounded bg-green-100 text-green-600 border border-green-400 text-center">Mensagem enviada com sucesso! Entrarei em contato em breve.</div>
        <div v-if="submitted && !success" class="mt-4 p-4 rounded bg-red-100 text-red-600 border border-red-400 text-center">Por favor, corrija os erros no formulário.</div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePhoneMask } from '@/composables/usePhoneMask'
import { useFormValidation } from '@/composables/useFormValidation'
import { useContactService } from '@/composables/useContactService'

const name = ref('')
const email = ref('')
const phone = ref('')
const subject = ref('')
const message = ref('')
const honeypot = ref('')
const submitted = ref(false)
const success = ref(false)
const loading = ref(false)

const nameValid = ref<boolean|null>(null)
const emailValid = ref<boolean|null>(null)
const subjectValid = ref<boolean|null>(null)
const messageValid = ref<boolean|null>(null)

const { format } = usePhoneMask()
const onPhoneInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  phone.value = format(target.value)
}

const { isNotEmpty, isEmail, validateForm } = useFormValidation()
const stateClass = (state: boolean|null) => state===false ? 'error' : state ? 'success' : ''

type FieldKey = 'name' | 'email' | 'subject' | 'message'
const onBlur = (key: FieldKey) => {
  if (key === 'name') nameValid.value = isNotEmpty(name.value)
  if (key === 'email') emailValid.value = isEmail(email.value)
  if (key === 'subject') subjectValid.value = isNotEmpty(subject.value)
  if (key === 'message') messageValid.value = isNotEmpty(message.value)
}

const onInput = (key: FieldKey) => {
  const map: Record<FieldKey, typeof nameValid> = {
    name: nameValid,
    email: emailValid,
    subject: subjectValid,
    message: messageValid
  }
  if (map[key].value === false) onBlur(key)
}

const { sendContact } = useContactService()

const onSubmit = async () => {
  submitted.value = true
  if (honeypot.value) { success.value = false; return }
  const result = validateForm({ name: name.value, email: email.value, subject: subject.value, message: message.value })
  nameValid.value = result.name
  emailValid.value = result.email
  subjectValid.value = result.subject
  messageValid.value = result.message
  if (!result.ok) { success.value = false; return }
  success.value = false
  loading.value = true
  const resp = await sendContact({ name: name.value, email: email.value, phone: phone.value, subject: subject.value, message: message.value })
  loading.value = false
  if (resp.ok) {
    success.value = true
    name.value = ''
    email.value = ''
    phone.value = ''
    subject.value = ''
    message.value = ''
    nameValid.value = null
    emailValid.value = null
    subjectValid.value = null
    messageValid.value = null
  } else {
    success.value = false
  }
}
</script>
