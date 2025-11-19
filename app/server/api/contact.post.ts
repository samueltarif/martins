import { defineEventHandler, readBody } from 'h3'
import { useRuntimeConfig } from '#imports'
import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const name = (body?.name || '').toString().trim()
  const email = (body?.email || '').toString().trim()
  const phone = (body?.phone || '').toString().trim()
  const subject = (body?.subject || '').toString().trim()
  const message = (body?.message || '').toString().trim()

  if (!name || !email || !subject || !message) return { error: 'invalid' }

  const config = useRuntimeConfig()
  const user = config.smtpUser as string | undefined
  const pass = config.smtpPass as string | undefined
  if (!user || !pass) return { error: 'smtp_not_configured' }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user, pass }
    })

    const to = user
    const from = `${name} <${user}>`
    const subjectLine = `Novo contato: ${subject}`
    const text = `Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone}\nAssunto: ${subject}\n\nMensagem:\n${message}`
    const html = `<div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">`
      + `<h2 style="margin:0 0 8px">Novo contato do site</h2>`
      + `<p><strong>Nome:</strong> ${name}</p>`
      + `<p><strong>E-mail:</strong> ${email}</p>`
      + `<p><strong>Telefone:</strong> ${phone || '-'} </p>`
      + `<p><strong>Assunto:</strong> ${subject}</p>`
      + `<hr style="border:none;border-top:1px solid #eee;margin:12px 0">`
      + `<p style="white-space:pre-wrap">${message}</p>`
      + `</div>`

    await transporter.sendMail({ from, to, replyTo: email, subject: subjectLine, text, html })
    return { ok: true }
  } catch (e: any) {
    return { error: 'send_failed' }
  }
})