-- Script para popular a tabela de depoimentos (testimonials)
-- Execute este script no Editor SQL do Supabase

INSERT INTO testimonials (name, role, company, text, rating, avatar, created_at) VALUES
(
  'Carlos Eduardo Silva',
  'Engenheiro de Qualidade',
  'Metalúrgica TechSolutions',
  'O Fellip é um especialista. Precisávamos renovar nossos paquímetros e micrômetros para a certificação ISO. Ele indicou os modelos IP67 ideais para nosso ambiente de usinagem, com proteção contra óleo e poeira.',
  5,
  'https://xsgames.co/randomusers/assets/avatars/male/42.jpg',
  NOW() - INTERVAL '2 days'
),
(
  'Mariana Costa',
  'Gerente de Laboratório',
  'LabControl Análises',
  'Atendimento técnico impecável. A aquisição dos durômetros portáteis foi decisiva para nosso controle de qualidade em campo. O Fellip garantiu a entrega técnica e os certificados de calibração que precisávamos.',
  5,
  'https://xsgames.co/randomusers/assets/avatars/female/35.jpg',
  NOW() - INTERVAL '5 days'
),
(
  'Roberto Almeida',
  'Supervisor de Manutenção',
  'Indústria Têxtil Almeida',
  'Muito satisfeito com a compra dos termovisores. O Fellip fez uma consultoria detalhada que nos ajudou a escolher o modelo certo para nossa manutenção preditiva. Equipamento robusto e preciso.',
  4,
  'https://xsgames.co/randomusers/assets/avatars/male/12.jpg',
  NOW() - INTERVAL '1 week'
),
(
  'Fernanda Oliveira',
  'Sócia-Proprietária',
  'Usinagem Oliveira',
  'O suporte do Fellip na escolha do projetor de perfil foi excelente. Ele entendeu nossa necessidade de medição de peças complexas e conseguiu um equipamento que atende perfeitamente nossa demanda com ótimo custo-benefício.',
  5,
  'https://xsgames.co/randomusers/assets/avatars/female/68.jpg',
  NOW() - INTERVAL '2 weeks'
),
(
  'Ricardo Santos',
  'Técnico em Refrigeração',
  'ClimaFrio Serviços',
  'Comprei todo meu kit de medição (multímetro, manômetro digital e vacuômetro) com o Fellip. Honestidade na negociação e produtos de primeira linha. A precisão dos instrumentos mudou meu trabalho.',
  5,
  'https://xsgames.co/randomusers/assets/avatars/male/23.jpg',
  NOW() - INTERVAL '1 month'
);
