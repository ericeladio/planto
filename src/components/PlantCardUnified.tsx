import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import StarRating from './StarRating'
import type { Plant } from '../types'
import { getPlantId } from '../utils/plantId'
import { formatCurrency } from '../utils/formatCurrency'

interface PlantCardUnifiedProps {
  plant: Plant
  bagIcon?: string
}

export default function PlantCardUnified({ plant, bagIcon }: PlantCardUnifiedProps) {
  const { addItem } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!user) {
      navigate('/login')
      return
    }
    addItem(getPlantId(plant.slug), plant.name, plant.price, plant.currency, plant.img)
  }

  return (
    <Link
      to={plant.slug ? `/plant/${plant.slug}` : '#'}
      className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-[12px] overflow-hidden transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] no-underline block"
    >
      <div className="relative pt-[75%] overflow-hidden">
        <img
          src={plant.img}
          alt={plant.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-5 flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-white truncate">{plant.name}</h2>
        <p className="text-sm text-white/60 leading-[1.4] line-clamp-2">{plant.desc}</p>

        {plant.rating && <StarRating rating={plant.rating} size={18} />}

        <div className="flex items-center justify-between mt-1">
          <span className="text-xl font-bold text-white">{formatCurrency(plant.price, plant.currency)}</span>
          {bagIcon ? (
            <button
              onClick={handleAddToCart}
              className="inline-flex items-center justify-center w-10 h-10 border-2 border-white/75 rounded-xl bg-transparent cursor-pointer opacity-75 transition-[background] hover:bg-white/10 shrink-0"
              aria-label="Add to bag"
            >
              <img src={bagIcon} alt="" width="22" height="22" />
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 rounded-xl bg-white text-[#0d1a0d] text-sm font-semibold cursor-pointer border-none hover:opacity-90 transition-opacity"
            >
              Add to bag
            </button>
          )}
        </div>
      </div>
    </Link>
  )
}
