import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import type { ProductPillData } from '../types'
import { getPlantId } from '../utils/plantId'

interface ProductPillProps {
  data: ProductPillData
  bagIcon: string
  reverse?: boolean
}

export default function ProductPill({ data, bagIcon, reverse = false }: ProductPillProps) {
  const { addItem } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login')
      return
    }
    addItem(getPlantId(data.slug), data.title, data.price, data.img)
  }
  const ambientStyles: Record<ProductPillData['ambientClass'], string> = {
    tree: 'before:content-[""] before:absolute before:top-[-30%] before:left-[15%] before:w-[40%] before:h-[200%] before:bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(30,80,20,0.6)_0%,transparent_70%)] before:blur-[40px]',
    glow: 'before:content-[""] before:absolute before:top-[-40%] before:left-[20%] before:w-[30%] before:h-[200%] before:bg-[radial-gradient(ellipse_50%_90%_at_50%_30%,rgba(60,160,40,0.45)_0%,rgba(30,80,20,0.2)_50%,transparent_80%)] before:blur-[48px]',
  }

  return (
    <article
      className={`relative flex items-center rounded-[151px] border-2 border-white/27 bg-white/5 backdrop-blur-[20px] overflow-visible min-h-[360px] py-10
        max-lg:flex-col max-lg:rounded-[40px] max-lg:p-10 max-lg:items-start max-lg:min-h-unset
        ${reverse ? 'max-lg:flex-col-reverse' : ''}
      `}
    >
      <div className="absolute inset-0 rounded-[151px] bg-white/3 pointer-events-none" />
      <div className={`absolute inset-0 rounded-[149px] overflow-hidden pointer-events-none ${ambientStyles[data.ambientClass]}`} aria-hidden="true" />

      {!reverse && (
        <div className="relative shrink-0 z-2 w-[clamp(200px,22vw,380px)] -ml-10 mr-[clamp(16px,2vw,40px)] max-lg:w-[min(300px,70vw)] max-lg:m-0 max-lg:mx-auto">
          <img
            src={data.img}
            alt={data.imgAlt}
            className="w-full h-auto object-contain block drop-shadow-[0_27px_80px_rgba(0,0,0,0.24)]"
          />
        </div>
      )}

      <div className={`flex-1 min-w-0 flex flex-col gap-5 z-2
        ${reverse
          ? 'pl-[clamp(40px,5vw,100px)] max-lg:p-0 max-lg:px-4 max-lg:items-center max-lg:text-center'
          : 'pr-[clamp(40px,5vw,100px)] max-lg:p-0 max-lg:px-4 max-lg:items-center max-lg:text-center'
        }`}
      >
        <h3 className="text-[clamp(22px,2.3vw,38px)] font-semibold text-white">{data.title}</h3>
        <p className="text-[clamp(14px,1.2vw,20px)] font-semibold text-white leading-[1.5] max-w-[50ch]">{data.desc}</p>
        <span className="text-[clamp(22px,2.3vw,38px)] font-semibold text-white">{data.price}</span>
        <div className="flex items-center gap-4 max-lg:justify-center">
          <button onClick={() => navigate(`/plant/${data.slug}`)} className="inline-flex items-center justify-center w-[217px] h-16 border-2 border-white rounded-xl bg-transparent text-white text-[28px] font-medium cursor-pointer font-[inherit] transition-[background] hover:bg-white/8 max-sm:w-[160px] max-sm:text-xl max-sm:h-[52px]">
            Explore
          </button>
          <button
            onClick={handleAddToCart}
            className="inline-flex items-center justify-center w-16 h-16 border-2 border-white rounded-xl bg-transparent cursor-pointer transition-[background] hover:bg-white/8" aria-label="Add to bag"
          >
            <img src={bagIcon} alt="" width="34" height="34" />
          </button>
        </div>
      </div>

      {reverse && (
        <div className="relative shrink-0 z-2 w-[clamp(200px,24vw,400px)] -mr-15 ml-[clamp(16px,2vw,40px)] max-lg:w-[min(300px,70vw)] max-lg:m-0 max-lg:mx-auto">
          <img
            src={data.img}
            alt={data.imgAlt}
            className="w-full h-auto object-contain block drop-shadow-[0_27px_80px_rgba(0,0,0,0.24)]"
          />
        </div>
      )}
    </article>
  )
}
