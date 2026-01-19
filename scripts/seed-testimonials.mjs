import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const envPath = path.join(rootDir, '.env')

console.log('Lendo configurações de:', envPath)

let env = {}
try {
  const envContent = fs.readFileSync(envPath, 'utf-8')
  envContent.split('\n').forEach(line => {
    const [key, ...values] = line.split('=')
    if (key && values.length) {
      env[key.trim()] = values.join('=').trim()
    }
  })
} catch (e) {
  console.error('Erro ao ler arquivo .env:', e.message)
  process.exit(1)
}

const supabaseUrl = env.NUXT_PUBLIC_SUPABASE_URL
const supabaseKey = env.NUXT_SUPABASE_SERVICE_ROLE

if (!supabaseUrl || !supabaseKey) {
  console.error('Configurações do Supabase não encontradas no .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const testimonials = [
  {
    name: 'Carlos Eduardo Silva',
    role: 'Engenheiro de Qualidade',
    company: 'Metalúrgica TechSolutions',
    text: 'O Fellip é um especialista. Precisávamos renovar nossos paquímetros e micrômetros para a certificação ISO. Ele indicou os modelos IP67 ideais para nosso ambiente de usinagem, com proteção contra óleo e poeira.',
    rating: 5,
    avatar: 'https://xsgames.co/randomusers/assets/avatars/male/42.jpg',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    name: 'Mariana Costa',
    role: 'Gerente de Laboratório',
    company: 'LabControl Análises',
    text: 'Atendimento técnico impecável. A aquisição dos durômetros portáteis foi decisiva para nosso controle de qualidade em campo. O Fellip garantiu a entrega técnica e os certificados de calibração que precisávamos.',
    rating: 5,
    avatar: 'https://xsgames.co/randomusers/assets/avatars/female/35.jpg',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    name: 'Roberto Almeida',
    role: 'Supervisor de Manutenção',
    company: 'Indústria Têxtil Almeida',
    text: 'Muito satisfeito com a compra dos termovisores. O Fellip fez uma consultoria detalhada que nos ajudou a escolher o modelo certo para nossa manutenção preditiva. Equipamento robusto e preciso.',
    rating: 4,
    avatar: 'https://xsgames.co/randomusers/assets/avatars/male/12.jpg',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    name: 'Fernanda Oliveira',
    role: 'Sócia-Proprietária',
    company: 'Usinagem Oliveira',
    text: 'O suporte do Fellip na escolha do projetor de perfil foi excelente. Ele entendeu nossa necessidade de medição de peças complexas e conseguiu um equipamento que atende perfeitamente nossa demanda com ótimo custo-benefício.',
    rating: 5,
    avatar: 'https://xsgames.co/randomusers/assets/avatars/female/68.jpg',
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    name: 'Ricardo Santos',
    role: 'Técnico em Refrigeração',
    company: 'ClimaFrio Serviços',
    text: 'Comprei todo meu kit de medição (multímetro, manômetro digital e vacuômetro) com o Fellip. Honestidade na negociação e produtos de primeira linha. A precisão dos instrumentos mudou meu trabalho.',
    rating: 5,
    avatar: 'https://xsgames.co/randomusers/assets/avatars/male/23.jpg',
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  }
]

async function seed() {
  console.log('Iniciando inserção de depoimentos...')
  const { error } = await supabase.from('testimonials').insert(testimonials)
  if (error) {
    console.error('Erro ao inserir depoimentos:', error)
  } else {
    console.log('Depoimentos inseridos com sucesso!')
  }
}

seed()
