import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

interface CartItem {
  name: string
  price: string
  img: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  totalItems: number
  cartTotal: string
  addItem: (name: string, price: string, img: string) => void
  removeItem: (name: string) => void
  updateQuantity: (name: string, delta: number) => void
}

const STORAGE_KEY = 'planto_cart'

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return []
}

function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {}
}

const CartContext = createContext<CartContextType | null>(null)

function formatPrice(price: string): number {
  return Number(price.replace(/[^0-9.]/g, '')) || 0
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart)

  useEffect(() => {
    saveCart(items)
  }, [items])

  const addItem = useCallback((name: string, price: string, img: string) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.name === name)
      if (existing) {
        if (existing.quantity >= 99) return prev
        return prev.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...prev, { name, price, img, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((name: string) => {
    setItems((prev) => prev.filter((item) => item.name !== name))
  }, [])

  const updateQuantity = useCallback((name: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.name !== name) return item
          const next = item.quantity + delta
          if (next > 99) return { ...item, quantity: 99 }
          return { ...item, quantity: next }
        })
        .filter((item) => item.quantity > 0),
    )
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const rawTotal = items.reduce((sum, item) => sum + formatPrice(item.price) * item.quantity, 0)
  const cartTotal = `Rs. ${rawTotal.toLocaleString('en-IN')}/-`

  return (
    <CartContext.Provider value={{ items, totalItems, cartTotal, addItem, removeItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
