import { useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { resetPassword } from '../services/api'
import SEOHead from '../components/SEOHead'
import { resetPasswordSchema } from '../lib/validations'

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setFieldErrors({})
    const result = resetPasswordSchema.safeParse({ password, confirm })
    if (!result.success) {
      setFieldErrors(result.error.flatten().fieldErrors)
      return
    }

    setLoading(true)
    try {
      await resetPassword(token, result.data.password)
      setSuccess(true)
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al restablecer la contraseña')
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <>
        <SEOHead title="Invalid Reset Link" canonicalPath="/reset-password" />
        <section className="pt-[150px] max-sm:pt-[120px] px-[7.5vw] pb-20 max-sm:px-5 flex items-start justify-center min-h-screen">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-[12px] p-8 text-center">
            <h1 className="text-3xl font-semibold text-white mb-4">Invalid link</h1>
            <p className="text-white/50 mb-6">
              This reset link is invalid or has expired.
            </p>
            <Link
              to="/forgot-password"
              className="inline-block w-full h-12 leading-[48px] rounded-xl bg-white text-[#0d1a0d] font-semibold text-base hover:opacity-90 transition-opacity"
            >
              Request a new link
            </Link>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <SEOHead
        title="Set New Password"
        description="Set a new password for your Planto account."
        canonicalPath="/reset-password"
      />
      <section className="pt-[150px] max-sm:pt-[120px] px-[7.5vw] pb-20 max-sm:px-5 flex items-start justify-center min-h-screen">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-[12px] p-8">
        <h1 className="text-3xl font-semibold text-white mb-2">New password</h1>
        <p className="text-white/50 mb-8">Choose a new password for your account.</p>

        {success && (
          <p className="text-[#55B000] text-sm mb-4 bg-[#55B000]/10 rounded-xl px-4 py-3">
            Password updated! Redirecting to sign in…
          </p>
        )}

        {error && (
          <p className="text-red-400 text-sm mb-4 bg-red-400/10 rounded-xl px-4 py-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-white/60 text-sm">New password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 outline-none focus:border-white/40 transition-colors font-[inherit]"
            />
            {fieldErrors.password && <p className="text-red-400 text-xs">{fieldErrors.password[0]}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="confirm" className="text-white/60 text-sm">Confirm password</label>
            <input
              id="confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              className="h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 outline-none focus:border-white/40 transition-colors font-[inherit]"
            />
            {fieldErrors.confirm && <p className="text-red-400 text-xs">{fieldErrors.confirm[0]}</p>}
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full h-12 rounded-xl bg-white text-[#0d1a0d] font-semibold text-base cursor-pointer border-none hover:opacity-90 transition-opacity mt-2 disabled:opacity-50"
          >
            {loading ? 'Updating…' : 'Reset password'}
          </button>
        </form>
      </div>
    </section>
    </>
  )
}
