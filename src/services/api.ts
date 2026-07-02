const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

// ─── Token management ────────────────────────────────────────────────────────

function getToken(): string | null {
  return localStorage.getItem('planto_token')
}

function setToken(token: string): void {
  localStorage.setItem('planto_token', token)
}

function clearToken(): void {
  localStorage.removeItem('planto_token')
}

// ─── Base request ────────────────────────────────────────────────────────────

interface RequestOptions {
  method?: string
  body?: unknown
  auth?: boolean
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, auth = false } = options

  const headers: Record<string, string> = {}
  if (body) {
    headers['Content-Type'] = 'application/json'
  }
  if (auth) {
    const token = getToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    let detail = `HTTP ${res.status}`
    try {
      const err = await res.json()
      if (err.detail) detail = err.detail
    } catch {
      // ignore parse error
    }
    throw new Error(detail)
  }

  return res.json()
}

// ─── Types (API responses) ───────────────────────────────────────────────────

export interface PlantOut {
  id: number
  name: string
  slug: string
  description: string | null
  price: number
  currency: string
  image_url: string
  rating: number | null
  category: string | null
  light: string | null
  water: string | null
  height: string | null
  toxicity: string | null
}

export interface PlantListResponse {
  items: PlantOut[]
  total: number
  page: number
  per_page: number
  pages: number
}

export interface UserOut {
  id: number
  email: string
  full_name: string | null
}

export interface TokenResponse {
  access_token: string
  token_type: string
  user: UserOut
}

export interface CartItemOut {
  id: number
  plant_id: number
  plant_name: string
  plant_price: number
  plant_image: string
  quantity: number
}

export interface CartResponse {
  items: CartItemOut[]
  total_items: number
  total_price: number
}

export interface OrderOut {
  id: number
  status: string
  total: number
  items: CartItemOut[]
  created_at: string
}

export interface BlogPostOut {
  id: number
  slug: string
  title: string
  excerpt: string | null
  content: string | null
  image_url: string | null
  date: string | null
  author: string
}

export interface BlogListResponse {
  items: BlogPostOut[]
  total: number
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Convierte un PlantOut al formato Plant del frontend */
export function toPlantFrontend(p: PlantOut) {
  return {
    name: p.name,
    slug: p.slug,
    desc: p.description ?? '',
    price: `Rs. ${p.price}/-`,
    img: p.image_url,
    rating: p.rating ?? undefined,
    category: p.category ?? undefined,
    light: p.light ?? undefined,
    water: p.water ?? undefined,
    height: p.height ?? undefined,
    toxicity: p.toxicity ?? undefined,
  }
}

// ─── Plants ──────────────────────────────────────────────────────────────────

export interface GetPlantsParams {
  search?: string
  category?: string
  sort?: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'
  page?: number
  per_page?: number
}

export function getPlants(params?: GetPlantsParams): Promise<PlantListResponse> {
  const qs = new URLSearchParams()
  if (params?.search) qs.set('search', params.search)
  if (params?.category) qs.set('category', params.category)
  if (params?.sort) qs.set('sort', params.sort)
  if (params?.page) qs.set('page', String(params.page))
  if (params?.per_page) qs.set('per_page', String(params.per_page))
  const q = qs.toString()
  return request<PlantListResponse>(`/api/plants${q ? `?${q}` : ''}`)
}

export function getPlant(slug: string): Promise<PlantOut> {
  return request<PlantOut>(`/api/plants/${slug}`)
}

export function getTopSelling(): Promise<PlantOut[]> {
  return request<PlantOut[]>('/api/plants/top-selling')
}

export function getTrending(): Promise<PlantOut[]> {
  return request<PlantOut[]>('/api/plants/trending')
}

export function getNewArrivals(): Promise<PlantOut[]> {
  return request<PlantOut[]>('/api/plants/new-arrivals')
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

export interface ReviewOut {
  id: number
  plant_id: number
  name: string
  rating: number
  text: string
  avatar_color: string
}

export function getBestReviews(): Promise<ReviewOut[]> {
  return request<ReviewOut[]>('/api/reviews')
}

export function getPlantReviews(plantId: number): Promise<ReviewOut[]> {
  return request<ReviewOut[]>(`/api/reviews/plant/${plantId}`)
}

export function toReviewFrontend(r: ReviewOut) {
  return {
    name: r.name,
    rating: r.rating,
    text: r.text,
    avatarColor: r.avatar_color,
  }
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export async function login(email: string, password: string): Promise<TokenResponse> {
  const formData = new URLSearchParams()
  formData.set('username', email)
  formData.set('password', password)

  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData,
  })

  if (!res.ok) {
    let detail = `HTTP ${res.status}`
    try {
      const err = await res.json()
      if (err.detail) detail = err.detail
    } catch {
      // ignore
    }
    throw new Error(detail)
  }

  const data: TokenResponse = await res.json()
  setToken(data.access_token)
  return data
}

export async function register(
  email: string,
  password: string,
  full_name?: string,
): Promise<TokenResponse> {
  const data = await request<TokenResponse>('/api/auth/register', {
    method: 'POST',
    body: { email, password, full_name },
  })
  setToken(data.access_token)
  return data
}

export function getMe(): Promise<UserOut> {
  return request<UserOut>('/api/auth/me', { auth: true })
}

export function logout(): void {
  clearToken()
}

// ─── Password Reset ──────────────────────────────────────────────────────────

export function forgotPassword(email: string): Promise<{ message: string }> {
  return request<{ message: string }>('/api/auth/forgot-password', {
    method: 'POST',
    body: { email },
  })
}

export async function resetPassword(token: string, newPassword: string): Promise<TokenResponse> {
  const data = await request<TokenResponse>('/api/auth/reset-password', {
    method: 'POST',
    body: { token, new_password: newPassword },
  })
  setToken(data.access_token)
  return data
}

// ─── Cart ────────────────────────────────────────────────────────────────────

export function getCart(): Promise<CartResponse> {
  return request<CartResponse>('/api/cart', { auth: true })
}

export function addToCart(plant_id: number, quantity: number = 1): Promise<CartResponse> {
  return request<CartResponse>('/api/cart', {
    method: 'POST',
    body: { plant_id, quantity },
    auth: true,
  })
}

export function updateCartItem(item_id: number, quantity: number): Promise<CartResponse> {
  return request<CartResponse>(`/api/cart/${item_id}`, {
    method: 'PATCH',
    body: { quantity },
    auth: true,
  })
}

export function removeFromCart(item_id: number): Promise<CartResponse> {
  return request<CartResponse>(`/api/cart/${item_id}`, {
    method: 'DELETE',
    auth: true,
  })
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export function createOrder(): Promise<OrderOut> {
  return request<OrderOut>('/api/orders', { method: 'POST', auth: true })
}

export function getOrders(): Promise<OrderOut[]> {
  return request<OrderOut[]>('/api/orders', { auth: true })
}

// ─── Blog ────────────────────────────────────────────────────────────────────

export function getBlogPosts(): Promise<BlogListResponse> {
  return request<BlogListResponse>('/api/blog')
}

export function getBlogPost(slug: string): Promise<BlogPostOut> {
  return request<BlogPostOut>(`/api/blog/${slug}`)
}

// ─── Newsletter ───────────────────────────────────────────────────────────────

export function subscribeNewsletter(email: string): Promise<{ message: string }> {
  return request<{ message: string }>('/api/newsletter/subscribe', {
    method: 'POST',
    body: { email },
  })
}
