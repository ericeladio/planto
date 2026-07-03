import { Link } from 'react-router-dom'
import { useState, type FormEvent } from 'react'
import { subscribeNewsletter } from '../services/api'
import { newsletterSchema } from '../lib/validations'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

  async function handleSubscribe(e: FormEvent) {
    e.preventDefault()
    setFieldErrors({})
    const result = newsletterSchema.safeParse({ email })
    if (!result.success) {
      setFieldErrors(result.error.flatten().fieldErrors)
      return
    }
    setStatus('loading')
    try {
      const res = await subscribeNewsletter(result.data.email.trim())
      setMessage(res.message)
      setStatus('success')
      setEmail('')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Something went wrong')
      setStatus('error')
    }
  }

  return (
    <footer className="px-[7.5vw] pt-15 pb-12 border-t border-white/12 max-sm:px-5 max-sm:pt-10 max-sm:pb-8">
      <div className="grid grid-cols-[1fr_1fr_1.4fr] gap-[clamp(32px,5vw,80px)] items-start max-lg:grid-cols-1 max-lg:gap-10">
        <div>
          <p className="text-[clamp(16px,1.4vw,24px)] font-medium text-white leading-[1.6] max-w-[42ch]">
           Where leaves whisper and roots take hold — we bring the quiet beauty of the earth into your home.
          </p>
        </div>

        <div>
          <h4 className="text-[clamp(20px,1.8vw,28px)] font-extrabold text-white mb-5">Quick Links</h4>
          <nav className="flex flex-col gap-4">
            <Link to="/" className="bg-transparent border-none p-0 text-left text-[clamp(16px,1.4vw,24px)] font-medium text-white no-underline transition-opacity hover:opacity-75">
              Home
            </Link>
            <Link to="/market" className="bg-transparent border-none p-0 text-left text-[clamp(16px,1.4vw,24px)] font-medium text-white no-underline transition-opacity hover:opacity-75">
              Types of Plants
            </Link>
            <Link to="/privacy" className="bg-transparent border-none p-0 text-left text-[clamp(16px,1.4vw,24px)] font-medium text-white no-underline transition-opacity hover:opacity-75">
              Privacy
            </Link>
          </nav>
        </div>

        <div>
          <h4 className="text-[clamp(20px,1.8vw,28px)] font-extrabold text-white mb-5">For Every Update.</h4>
          <div className="mb-6">
            <form onSubmit={handleSubscribe} className="flex border-2 border-white rounded-lg overflow-hidden max-sm:flex-col">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none px-6 py-[18px] text-[clamp(16px,1.4vw,24px)] font-medium text-white/75 font-[inherit]"
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-white border-none px-6 text-[clamp(14px,1.1vw,22px)] font-bold text-black cursor-pointer uppercase font-[inherit] whitespace-nowrap transition-opacity hover:opacity-85 disabled:opacity-50 max-sm:px-4 max-sm:py-4"
              >
                {status === 'loading' ? 'SENDING...' : 'SUBSCRIBE'}
              </button>
            </form>
            {fieldErrors.email && (
              <p className="text-red-400 text-sm mt-2">{fieldErrors.email[0]}</p>
            )}
            {status === 'success' && (
              <p className="text-[#55B000] text-sm mt-2">{message}</p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-sm mt-2">{message}</p>
            )}
          </div>
          <p className="text-[clamp(16px,1.4vw,24px)] font-medium text-white">planto &copy; all right reserve</p>
        </div>
      </div>
    </footer>
  )
}
