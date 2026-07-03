import { z } from 'zod'

export const emailSchema = z
  .string()
  .min(1, 'El email es requerido')
  .email('Email inválido')

export const passwordSchema = z
  .string()
  .min(6, 'La contraseña debe tener al menos 6 caracteres')

export const newsletterSchema = z.object({
  email: emailSchema,
})

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'La contraseña es requerida'),
})

export const registerSchema = z.object({
  fullName: z.string().optional(),
  email: emailSchema,
  password: passwordSchema,
})

export const forgotPasswordSchema = z.object({
  email: emailSchema,
})

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirm: z.string().min(1, 'Confirma tu contraseña'),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Las contraseñas no coinciden',
    path: ['confirm'],
  })
