export interface Plant {
  name: string
  desc: string
  price: string
  img: string
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
