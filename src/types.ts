export interface Plant {
  name: string
  desc: string
  price: string
  img: string
  rating?: number
  category?: string
}

export interface Review {
  name: string
  rating: number
  text: string
  avatarColor: string
}

export interface ProductPillData {
  title: string
  desc: string
  price: string
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
