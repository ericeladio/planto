import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import SEOHead from '../components/SEOHead'
import { registerSchema } from '../lib/validations'

export default function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setFieldErrors({})
    const result = registerSchema.safeParse({ fullName, email, password })
    if (!result.success) {
      setFieldErrors(result.error.flatten().fieldErrors)
      return
    }
    setLoading(true)
    try {
      await register(result.data.email, result.data.password, result.data.fullName || undefined)
      setSuccess(true)
      setTimeout(() => navigate('/'), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrarse')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SEOHead
        title="Create Account"
        description="Join the Planto community. Create an account to shop premium indoor plants and get personalized care tips."
        canonicalPath="/register"
      />
      <section className="pt-[150px] max-sm:pt-[120px] px-[7.5vw] pb-20 max-sm:px-5 flex items-start justify-center min-h-screen">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-[12px] p-8">
        <h1 className="text-3xl font-semibold text-white mb-2">Create account</h1>
        <p className="text-white/50 mb-8">Join the Planto community</p>

        {success && (
          <p className="text-[#55B000] text-sm mb-4 bg-[#55B000]/10 rounded-xl px-4 py-3">
            Account created! Welcome to Planto. Redirecting…
          </p>
        )}

        {error && (
          <p className="text-red-400 text-sm mb-4 bg-red-400/10 rounded-xl px-4 py-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="text-white/60 text-sm">Full name</label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className="h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 outline-none focus:border-white/40 transition-colors font-[inherit]"
            />
            {fieldErrors.fullName && <p className="text-red-400 text-xs">{fieldErrors.fullName[0]}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-white/60 text-sm">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 outline-none focus:border-white/40 transition-colors font-[inherit]"
            />
            {fieldErrors.email && <p className="text-red-400 text-xs">{fieldErrors.email[0]}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-white/60 text-sm">Password</label>
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

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-white text-[#0d1a0d] font-semibold text-base cursor-pointer border-none hover:opacity-90 transition-opacity mt-2 disabled:opacity-50"
          >
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="text-white/40 text-sm text-center mt-6">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-white/75 hover:text-white underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </section>
    </>
  )
}
