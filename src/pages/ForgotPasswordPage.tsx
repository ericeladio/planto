import { useState } from 'react'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../services/api'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await forgotPassword(email)
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar el correo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="pt-[150px] max-sm:pt-[120px] px-[7.5vw] pb-20 max-sm:px-5 flex items-start justify-center min-h-screen">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-[12px] p-8">
        <h1 className="text-3xl font-semibold text-white mb-2">Reset password</h1>
        <p className="text-white/50 mb-8">
          Enter your email and we'll send you a link to reset your password.
        </p>

        {sent ? (
          <div>
            <p className="text-[#55B000] text-sm mb-4 bg-[#55B000]/10 rounded-xl px-4 py-3">
              Check your email. If an account exists for <strong>{email}</strong>, you'll receive a reset link shortly.
            </p>
            <Link
              to="/login"
              className="block text-center w-full h-12 leading-[48px] rounded-xl bg-white/10 text-white font-semibold text-base hover:bg-white/20 transition-colors"
            >
              Back to sign in
            </Link>
          </div>
        ) : (
          <>
            {error && (
              <p className="text-red-400 text-sm mb-4 bg-red-400/10 rounded-xl px-4 py-3">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-white/60 text-sm">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 outline-none focus:border-white/40 transition-colors font-[inherit]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-white text-[#0d1a0d] font-semibold text-base cursor-pointer border-none hover:opacity-90 transition-opacity mt-2 disabled:opacity-50"
              >
                {loading ? 'Sending…' : 'Send reset link'}
              </button>
            </form>

            <p className="text-white/40 text-sm text-center mt-6">
              <Link to="/login" className="text-white/75 hover:text-white underline">
                Back to sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </section>
  )
}
