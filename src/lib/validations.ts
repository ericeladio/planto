import { z } from 'zod'

export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Invalid email')

export const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters')

export const newsletterSchema = z.object({
  email: emailSchema,
})

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
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
    confirm: z.string().min(1, 'Confirm your password'),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Passwords do not match',
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
      .min(1, 'Card number is required')
      .transform((v) => v.replace(/\s/g, ''))
      .refine((v) => luhnCheck(v), 'Invalid card number'),
    exp_month: z.coerce
      .number()
      .min(1, 'Invalid month')
      .max(12, 'Invalid month'),
    exp_year: z.coerce
      .number()
      .min(new Date().getFullYear(), 'Card has expired'),
    cvv: z
      .string()
      .min(3, 'Invalid CVV')
      .max(4, 'Invalid CVV')
      .regex(/^\d+$/, 'CVV must be numeric'),
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
    { message: 'Card has expired', path: ['exp_month'] },
  )

export const savedCardCvvSchema = z.object({
  cvv: z
    .string()
    .min(3, 'Invalid CVV')
    .max(4, 'Invalid CVV')
    .regex(/^\d+$/, 'CVV must be numeric'),
})
