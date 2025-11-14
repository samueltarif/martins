export type FormValues = {
  name: string
  email: string
  subject: string
  message: string
}

export function useFormValidation() {
  const isNotEmpty = (v: string) => v.trim().length > 0
  const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())

  const validateField = (type: 'text' | 'email' | 'select' | 'textarea', value: string) => {
    if (type === 'email') return isEmail(value)
    return isNotEmpty(value)
  }

  const validateForm = (values: FormValues) => {
    const name = isNotEmpty(values.name)
    const email = isEmail(values.email)
    const subject = isNotEmpty(values.subject)
    const message = isNotEmpty(values.message)
    const ok = !!(name && email && subject && message)
    return { ok, name, email, subject, message }
  }

  return { isNotEmpty, isEmail, validateField, validateForm }
}