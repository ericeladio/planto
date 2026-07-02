import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { CartProvider } from '../context/CartContext'
import { AuthProvider } from '../context/AuthContext'
import { useAuth } from '../context/AuthContext'
import Navbar from './Navbar'
import CartPage from './CartPage'
import { IMAGES } from '../constants'

function LayoutInner() {
  const [cartOpen, setCartOpen] = useState(false)
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  return (
    <CartProvider>
      <div className="relative min-h-screen text-white font-[Inter,sans-serif] overflow-x-hidden">
        <div
          className="fixed inset-0 z-[-1] bg-[#0d1a0d] bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(/back.png)` }}
        />
        <Navbar
          logoImg={IMAGES.LOGO_PLANT}
          onCartClick={() => {
            if (user) {
              setCartOpen(true)
            } else {
              navigate('/login')
            }
          }}
          user={user}
          loading={loading}
        />
        <Outlet />
      </div>
      <CartPage isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </CartProvider>
  )
}

export default function Layout() {
  return (
    <AuthProvider>
      <LayoutInner />
    </AuthProvider>
  )
}
