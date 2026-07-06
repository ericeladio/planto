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

// ─── Payment ──────────────────────────────────────────────────────────────────

function luhnCheck(card: string): boolean {
  const digits = card.replace(/\D/g, '')
  if (digits.length < 13 || digits.length > 19) return false
  let sum = 0
  let alternate = false
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10)
    if (alternate) {
      n *= 2
      if (n > 9) n -= 9
    }
    sum += n
    alternate = !alternate
  }
  return sum % 10 === 0
}

export const paymentSchema = z
  .object({
    card_number: z
      .string()
      .min(1, 'El número de tarjeta es requerido')
      .transform((v) => v.replace(/\s/g, ''))
      .refine((v) => luhnCheck(v), 'Número de tarjeta inválido'),
    exp_month: z.coerce
      .number()
      .min(1, 'Mes inválido')
      .max(12, 'Mes inválido'),
    exp_year: z.coerce
      .number()
      .min(new Date().getFullYear(), 'La tarjeta ha expirado'),
    cvv: z
      .string()
      .min(3, 'CVV inválido')
      .max(4, 'CVV inválido')
      .regex(/^\d+$/, 'CVV debe ser numérico'),
  })
  .refine(
    (data) => {
      const now = new Date()
      const currentYear = now.getFullYear()
      const currentMonth = now.getMonth() + 1
      if (data.exp_year > currentYear) return true
      if (data.exp_year === currentYear && data.exp_month >= currentMonth) return true
      return false
    },
    { message: 'La tarjeta ha expirado', path: ['exp_month'] },
  )

export const savedCardCvvSchema = z.object({
  cvv: z
    .string()
    .min(3, 'CVV inválido')
    .max(4, 'CVV inválido')
    .regex(/^\d+$/, 'CVV debe ser numérico'),
})
