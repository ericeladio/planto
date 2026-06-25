import { TOP_SELLING_PLANTS, TRENDING_PRODUCTS } from '../constants'
import type { Plant } from '../types'

export const ALL_PLANTS: Plant[] = [
  ...TOP_SELLING_PLANTS.map((p) => ({ ...p, rating: 4.5, category: 'Interior' })),
  {
    name: TRENDING_PRODUCTS[0].title,
    desc: TRENDING_PRODUCTS[0].desc,
    price: TRENDING_PRODUCTS[0].price,
    img: TRENDING_PRODUCTS[0].img,
    rating: 4.5,
    category: 'Exterior',
  },
  {
    name: TRENDING_PRODUCTS[1].title,
    desc: TRENDING_PRODUCTS[1].desc,
    price: TRENDING_PRODUCTS[1].price,
    img: TRENDING_PRODUCTS[1].img,
    rating: 4.5,
    category: 'Suculentas',
  },
]
