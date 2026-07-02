import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import * as api from '../services/api'
import { useAuth } from './AuthContext'

interface CartItem {
  id: number
  name: string
  price: string
  img: string
  quantity: number
  plant_id: number
}

interface CartContextType {
  items: CartItem[]
  totalItems: number
  cartTotal: string
  addItem: (plant_id: number, name: string, price: string, img: string) => void
  removeItem: (item_id: number) => void
  updateQuantity: (item_id: number, delta: number) => void
}

const CartContext = createContext<CartContextType | null>(null)

function formatPrice(price: string): number {
  return Number(price.replace(/[^0-9.]/g, '')) || 0
}

function formatPriceOutput(raw: number): string {
  return `Rs. ${raw.toLocaleString('en-IN')}/-`
}

function itemId(): number {
  return Date.now() + Math.floor(Math.random() * 10000)
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    localStorage.removeItem('planto_cart')
  }, [])

  useEffect(() => {
    if (user) {
      api.getCart()
        .then((res) =>
          setItems(
            res.items.map((i) => ({
              id: i.id,
              name: i.plant_name,
              price: formatPriceOutput(i.plant_price),
              img: i.plant_image,
              quantity: i.quantity,
              plant_id: i.plant_id,
            })),
          ),
        )
        .catch(() => setItems([]))
    } else {
      setItems([])
    }
  }, [user])

  const addItem = useCallback(
    async (plant_id: number, name: string, price: string, img: string) => {
      if (!user) return
      try {
        const res = await api.addToCart(plant_id, 1)
        setItems(
          res.items.map((i) => ({
            id: i.id,
            name: i.plant_name,
            price: formatPriceOutput(i.plant_price),
            img: i.plant_image,
            quantity: i.quantity,
            plant_id: i.plant_id,
          })),
        )
      } catch {
        setItems((prev) => {
          const existing = prev.find((item) => item.plant_id === plant_id)
          if (existing) {
            if (existing.quantity >= 99) return prev
            return prev.map((item) =>
              item.plant_id === plant_id ? { ...item, quantity: item.quantity + 1 } : item,
            )
          }
          return [...prev, { id: itemId(), name, price, img, quantity: 1, plant_id }]
        })
      }
    },
    [user],
  )

  const removeItem = useCallback(
    async (item_id: number) => {
      if (!user) {
        setItems((prev) => prev.filter((item) => item.id !== item_id))
        return
      }
      try {
        const res = await api.removeFromCart(item_id)
        setItems(
          res.items.map((i) => ({
            id: i.id,
            name: i.plant_name,
            price: formatPriceOutput(i.plant_price),
            img: i.plant_image,
            quantity: i.quantity,
            plant_id: i.plant_id,
          })),
        )
      } catch {
        setItems((prev) => prev.filter((item) => item.id !== item_id))
      }
    },
    [user],
  )

  const updateQuantity = useCallback(
    async (item_id: number, delta: number) => {
      if (!user) {
        setItems((prev) =>
          prev
            .map((item) => {
              if (item.id !== item_id) return item
              const next = item.quantity + delta
              if (next > 99) return { ...item, quantity: 99 }
              return { ...item, quantity: next }
            })
            .filter((item) => item.quantity > 0),
        )
        return
      }

      const current = items.find((i) => i.id === item_id)
      if (!current) return
      const nextQty = current.quantity + delta
      if (nextQty <= 0) {
        await removeItem(item_id)
        return
      }
      try {
        const res = await api.updateCartItem(item_id, Math.min(nextQty, 99))
        setItems(
          res.items.map((i) => ({
            id: i.id,
            name: i.plant_name,
            price: formatPriceOutput(i.plant_price),
            img: i.plant_image,
            quantity: i.quantity,
            plant_id: i.plant_id,
          })),
        )
      } catch {
        setItems((prev) =>
          prev
            .map((item) => {
              if (item.id !== item_id) return item
              const next = item.quantity + delta
              if (next > 99) return { ...item, quantity: 99 }
              return { ...item, quantity: next }
            })
            .filter((item) => item.quantity > 0),
        )
      }
    },
    [user, items, removeItem],
  )

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const rawTotal = items.reduce((sum, item) => sum + formatPrice(item.price) * item.quantity, 0)
  const cartTotal = formatPriceOutput(rawTotal)

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
