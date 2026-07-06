export interface Plant {
  name: string
  slug?: string
  desc: string
  price: number
  currency: string
  img: string
  rating?: number
  category?: string
  light?: string
  water?: string
  height?: string
  toxicity?: string
}

export interface Review {
  name: string
  rating: number
  text: string
  avatarColor: string
}

export interface ProductPillData {
  title: string
  slug: string
  desc: string
  price: number
  currency: string
  img: string
  imgAlt: string
  ambientClass: 'tree' | 'glow'
}

export interface HeroGlassCardData {
  img: string
  alt: string
  category: string
  name: string
}

export interface O2Slide {
  img: string
  title: string
  texts: string[]
}
