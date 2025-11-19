export type ContactPayload = {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export function useContactService() {
  const sendContact = async (payload: ContactPayload) => {
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const j = await r.json().catch(() => ({}))
      return { ok: !!(j && j.ok) }
    } catch {
      return { ok: false }
    }
  }

  return { sendContact }
}