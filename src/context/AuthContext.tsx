import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import * as api from '../services/api'
import type { UserOut } from '../services/api'

interface AuthContextType {
  user: UserOut | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, full_name?: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserOut | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('planto_token')
    if (!token) {
      setLoading(false)
      return
    }
    api.getMe()
      .then(setUser)
      .catch(() => localStorage.removeItem('planto_token'))
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const res = await api.login(email, password)
    setUser(res.user)
  }, [])

  const register = useCallback(async (email: string, password: string, full_name?: string) => {
    const res = await api.register(email, password, full_name)
    setUser(res.user)
  }, [])

  const logout = useCallback(() => {
    api.logout()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
