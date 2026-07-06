import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import * as api from '../services/api'
import { useAuth } from './AuthContext'
import { formatCurrency } from '../utils/formatCurrency'

const DEFAULT_CURRENCY = 'Mx'

interface CartItem {
  id: number
  name: string
  price: number
  currency: string
  img: string
  quantity: number
  plant_id: number
}

interface CartContextType {
  items: CartItem[]
  totalItems: number
  cartTotal: string
  addItem: (plant_id: number, name: string, price: number, currency: string, img: string) => void
  removeItem: (item_id: number) => void
  updateQuantity: (item_id: number, delta: number) => void
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | null>(null)

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
              price: i.plant_price,
              currency: DEFAULT_CURRENCY,
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
    async (plant_id: number, name: string, price: number, currency: string, img: string) => {
      if (!user) return
      try {
        const res = await api.addToCart(plant_id, 1)
        setItems(
          res.items.map((i) => ({
            id: i.id,
            name: i.plant_name,
            price: i.plant_price,
            currency,
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
          return [...prev, { id: itemId(), name, price, currency, img, quantity: 1, plant_id }]
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
            price: i.plant_price,
            currency: DEFAULT_CURRENCY,
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
            price: i.plant_price,
            currency: DEFAULT_CURRENCY,
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
  const rawTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartTotal = formatCurrency(rawTotal, DEFAULT_CURRENCY)

  const refreshCart = useCallback(async () => {
    if (!user) {
      setItems([])
      return
    }
    try {
      const res = await api.getCart()
      setItems(
        res.items.map((i) => ({
          id: i.id,
          name: i.plant_name,
          price: i.plant_price,
          currency: DEFAULT_CURRENCY,
          img: i.plant_image,
          quantity: i.quantity,
          plant_id: i.plant_id,
        })),
      )
    } catch {
      setItems([])
    }
  }, [user])

  return (
    <CartContext.Provider value={{ items, totalItems, cartTotal, addItem, removeItem, updateQuantity, refreshCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
