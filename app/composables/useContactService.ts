export type ContactPayload = {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export function useContactService() {
  const sendContact = async (payload: ContactPayload) => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return { ok: true }
  }

  return { sendContact }
}