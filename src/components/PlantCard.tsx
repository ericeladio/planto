import { useCart } from '../context/CartContext'
import type { Plant } from '../types'

interface PlantCardProps {
  plant: Plant
  bagIcon: string
}

export default function PlantCard({ plant, bagIcon }: PlantCardProps) {
  const { addItem } = useCart()
  return (
    <article className="relative pt-[42%] flex flex-col">
      <img
        src={plant.img}
        alt={plant.name}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] aspect-square object-contain z-2 pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
      />
      <div className="flex-1 bg-white/5 border-[1.5px] border-white/20 rounded-[40px] backdrop-blur-[12.5px] pt-[54%] px-[13%] pb-[12%] flex flex-col gap-3.5 drop-shadow-[0_9px_18px_rgba(0,0,0,0.25)]">
        <h3 className="text-[clamp(20px,2.2vw,38px)] font-normal text-white/75 leading-[1.2]">{plant.name}</h3>
        <p className="text-[clamp(13px,1.1vw,20px)] font-normal text-white/75 leading-[1.5]">{plant.desc}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[clamp(20px,2.2vw,38px)] font-normal text-white/75">{plant.price}</span>
          <button
            onClick={() => addItem(plant.name, plant.price, plant.img)}
            className="inline-flex items-center justify-center w-[clamp(40px,3.5vw,55px)] h-[clamp(40px,3.5vw,55px)] border-2 border-white/75 rounded-xl bg-transparent cursor-pointer opacity-75 transition-[background] hover:bg-white/10 shrink-0"
            aria-label="Add to bag"
          >
            <img src={bagIcon} alt="" width="27" height="27" />
          </button>
        </div>
      </div>
    </article>
  )
}
