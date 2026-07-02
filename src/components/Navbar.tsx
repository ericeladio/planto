import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import type { UserOut } from '../services/api'

interface NavbarProps {
  logoImg: string
  onCartClick: () => void
  user: UserOut | null
  loading: boolean
}

export default function Navbar({ logoImg, onCartClick, user, loading }: NavbarProps) {
  const { totalItems } = useCart()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const isHome = location.pathname === '/'

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center px-[7.5vw] h-[110px] max-sm:px-5 max-sm:h-20 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-[#0d1a0d]/60' : ''
      }`}
    >
      <button
        onClick={() => {
          if (isHome) window.scrollTo({ top: 0, behavior: 'smooth' })
          else navigate('/')
        }}
        className="flex items-center gap-2 shrink-0 bg-transparent border-none p-0 cursor-pointer"
      >
        <img src={logoImg} alt="Planto plant icon" className="w-10 h-10 object-contain" />
        <span className="text-2xl font-black opacity-75">Planto.</span>
      </button>

      <nav className="flex items-center gap-[clamp(24px,3.5vw,54px)] mx-auto opacity-75 max-sm:hidden">
        <button
          onClick={() => {
            if (isHome) window.scrollTo({ top: 0, behavior: 'smooth' })
            else navigate('/')
          }}
          className={`bg-transparent border-none p-0 cursor-pointer text-[clamp(16px,1.4vw,24px)] font-medium whitespace-nowrap ${
            isHome ? 'text-white' : 'text-white/60 hover:text-white'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => navigate('/market')}
          className={`bg-transparent border-none p-0 cursor-pointer text-[clamp(16px,1.4vw,24px)] font-medium whitespace-nowrap ${
            !isHome ? 'text-white' : 'text-white/60 hover:text-white'
          }`}
        >
          Plants Type
        </button>

        <button
          onClick={() => {
            const footer = document.querySelector('footer')
            if (footer) {
              footer.scrollIntoView({ behavior: 'smooth' })
            } else if (!isHome) {
              navigate('/')
              setTimeout(() => {
                document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' })
              }, 300)
            }
          }}
          className="bg-transparent border-none p-0 cursor-pointer text-white/60 hover:text-white text-[clamp(16px,1.4vw,24px)] font-medium whitespace-nowrap"
        >
          Contact
        </button>
        <button
          onClick={() => navigate('/blog')}
          className={`bg-transparent border-none p-0 cursor-pointer text-[clamp(16px,1.4vw,24px)] font-medium whitespace-nowrap ${
            location.pathname.startsWith('/blog') ? 'text-white' : 'text-white/60 hover:text-white'
          }`}
        >
          Blog
        </button>
      </nav>

      <div className="flex items-center gap-4 shrink-0">
        {loading ? (
          <div className="w-6 h-6 rounded-full border-2 border-white/20 border-t-white animate-spin" />
        ) : user ? (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="bg-transparent border-none p-0 cursor-pointer"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#55B000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-75 hover:opacity-100 transition-opacity">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-white/10 bg-[#1a3a1a] backdrop-blur-[12px] py-2 shadow-xl">
                <p className="px-4 py-2 text-sm text-white/50 truncate">{user.email}</p>
                <hr className="border-white/10" />
                <button
                  onClick={() => { logout(); navigate('/') }}
                  className="w-full text-left px-4 py-2 text-sm text-white/75 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className="bg-transparent border-none p-0 cursor-pointer">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-75 hover:opacity-100 transition-opacity">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        )}

        <button onClick={onCartClick} className="relative bg-transparent border-none p-0 cursor-pointer">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-75">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#55B000] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems > 99 ? '99+' : totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
