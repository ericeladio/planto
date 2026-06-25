import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { CartProvider } from '../context/CartContext'
import Navbar from './Navbar'
import CartPage from './CartPage'
import { IMAGES } from '../constants'

export default function Layout() {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <CartProvider>
      <div className="relative min-h-screen text-white font-[Inter,sans-serif] overflow-x-hidden">
        <div
          className="fixed inset-0 z-[-1] bg-[#0d1a0d] bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(/back.png)` }}
        />
        <Navbar
          logoImg={IMAGES.LOGO_PLANT}
          onCartClick={() => setCartOpen(true)}
        />
        <Outlet />
      </div>
      <CartPage isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </CartProvider>
  )
}
