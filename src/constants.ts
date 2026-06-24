import type { Plant, Review, ProductPillData } from './types'

export const IMAGES = {
  LOGO_PLANT:
    'https://api.builder.io/api/v1/image/assets/TEMP/feb0cdd5abc33a006541acaa2d41286c5d672234?width=96',
  SEARCH_ICON:
    'https://api.builder.io/api/v1/image/assets/TEMP/319c48270f0c481659c695639b3bc2a1642b117a?width=52',
  HERO_PLANT:
    'https://api.builder.io/api/v1/image/assets/TEMP/ef8a32dcec484a9b60dbaa0f8ae73718cced7c81?width=918',
  PRODUCT_LEFT:
    'https://api.builder.io/api/v1/image/assets/TEMP/763dd970ada067132be533eb7ebccbde943dae86?width=1202',
  PRODUCT_RIGHT:
    'https://api.builder.io/api/v1/image/assets/TEMP/e44f8798449db0c15aa91c37cdce7c11975284dd?width=1464',
  BAG_ICON:
    'https://api.builder.io/api/v1/image/assets/TEMP/550025c01c74d82d9dbe574de8b950c0151eab35?width=68',
  CARD_BAG_ICON:
    'https://api.builder.io/api/v1/image/assets/TEMP/3b491c1d487508b9e434593922617afb444ba3cb?width=54',
  O2_PLANT:
    'https://api.builder.io/api/v1/image/assets/TEMP/fa3a58342254182b92a36092f9d4f5a0b11ecf6a?width=1789',
  ARROW_LEFT:
    'https://api.builder.io/api/v1/image/assets/TEMP/6792e81bb7bd6c1ddcd98456c914e058ea9a3aad?width=48',
  ARROW_RIGHT:
    'https://api.builder.io/api/v1/image/assets/TEMP/9ab8fa0d2ad0f76b4bb2040e01428dff6b091bec?width=50',
} as const

export const CUSTOMER_REVIEWS: Review[] = [
  {
    name: 'Maxn Raval',
    rating: 4.5,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
    avatarColor: '#5a3a28',
  },
  {
    name: 'venely k',
    rating: 4.5,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
    avatarColor: '#7a4a3a',
  },
  {
    name: 'Lii thakur',
    rating: 4.5,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
    avatarColor: '#4a5a6a',
  },
]

export const TOP_SELLING_PLANTS: Plant[] = [
  {
    name: 'Hosta',
    desc: 'Planta de follaje vibrante, ideal para sombra y jardines húmedos.',
    price: 'Rs. 399/-',
    img: 'https://api.builder.io/api/v1/image/assets/TEMP/d335a913dbba57246363adb5f6b65028d5a6abad?width=918',
  },
  {
    name: 'Haworthia',
    desc: 'Suculenta pequeña con hojas rayadas, perfecta para interiores.',
    price: 'Rs. 299/-',
    img: 'https://api.builder.io/api/v1/image/assets/TEMP/c3deee742429635aa5bd0be3d16a82edce2457f3?width=918',
  },
  {
    name: 'Cactus columnar',
    desc: 'Cactus alto y esbelto que aporta un toque desértico y moderno.',
    price: 'Rs. 459/-',
    img: 'https://api.builder.io/api/v1/image/assets/TEMP/31e5e608156f09389c0ac4e8bbdd7ff4b9fbb4be?width=918',
  },
  {
    name: 'Monstera deliciosa',
    desc: 'La clásica costilla de Adán con hojas grandes y frondosas.',
    price: 'Rs. 599/-',
    img: 'https://api.builder.io/api/v1/image/assets/TEMP/12f34ae16439ae788c3fa31722bfa3b1a7a67fd9?width=918',
  },
  {
    name: 'Strelitzia nicolai',
    desc: 'Ave del paraíso gigante, hojas similares al banano para un look tropical.',
    price: 'Rs. 799/-',
    img: 'https://api.builder.io/api/v1/image/assets/TEMP/b02a0413d3df262c6f931e3fa9ee7c1f1626f2f7?width=918',
  },
  {
    name: 'Aloe vera',
    desc: 'Suculenta medicinal con gel hidratante, fácil de cuidar.',
    price: 'Rs. 349/-',
    img: 'https://api.builder.io/api/v1/image/assets/TEMP/5316816ff52ae9b3ef62af45bfce99cb08476b4c?width=918',
  },
]

export const TRENDING_PRODUCTS: [ProductPillData, ProductPillData] = [
  {
    title: 'Hosta — Elegancia en Sombra',
    desc: 'Hosta, conocida por su follaje exuberante en tonos verdes y dorados. Resistente y de bajo mantenimiento, embellece cualquier rincón sombreado.',
    price: 'Rs. 399/-',
    img: 'https://api.builder.io/api/v1/image/assets/TEMP/763dd970ada067132be533eb7ebccbde943dae86?width=1202',
    imgAlt: 'Hosta plant',
    ambientClass: 'tree',
  },
  {
    title: 'Haworthia — Suculenta de Moda',
    desc: 'Pequeña pero llamativa, la Haworthia luce rayas blancas únicas. Ideal para escritorios y espacios compactos con poca luz.',
    price: 'Rs. 299/-',
    img: 'https://api.builder.io/api/v1/image/assets/TEMP/e44f8798449db0c15aa91c37cdce7c11975284dd?width=1464',
    imgAlt: 'Haworthia succulent',
    ambientClass: 'glow',
  },
]
