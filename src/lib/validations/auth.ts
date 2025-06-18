import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres')
})

export const registerSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número'
    ),
  confirmPassword: z.string(),
  role: z.enum(['admin', 'collaborator']),
  image: z.string().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword']
}) 