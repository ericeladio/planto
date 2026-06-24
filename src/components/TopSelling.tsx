import type { Plant } from '../types'
import PlantCard from './PlantCard'

interface TopSellingProps {
  plants: Plant[]
  bagIcon: string
}

export default function TopSelling({ plants, bagIcon }: TopSellingProps) {
  return (
    <section className="flex flex-col gap-14 px-[7.5vw] py-10 pb-[100px]">
      <div className="relative flex items-center justify-center px-12 py-4 w-fit mx-auto">
        <svg className="absolute top-0 right-0 shrink-0" width="70" height="50" viewBox="0 0 70 50" fill="none" aria-hidden="true">
          <path d="M69.5 49L69.5 14C69.5 6.268 63.232 0 55.5 0L1 0" stroke="url(#ts-grad-tr)" strokeWidth="5" strokeLinecap="round" />
          <defs>
            <linearGradient id="ts-grad-tr" x1="70" y1="50" x2="0" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#55B000" />
              <stop offset="0.5" stopColor="white" stopOpacity="0.156" />
              <stop offset="1" stopColor="#50790B" />
            </linearGradient>
          </defs>
        </svg>

        <h2 className="text-[clamp(32px,3.4vw,55px)] font-semibold text-white whitespace-nowrap max-sm:text-[28px]">
          Our Top Selling
        </h2>

        <svg className="absolute bottom-0 left-0 shrink-0" width="70" height="50" viewBox="0 0 70 50" fill="none" aria-hidden="true">
          <path d="M0.5 1L0.5 36C0.5 43.732 6.768 50 14.5 50L69 50" stroke="url(#ts-grad-bl)" strokeWidth="5" strokeLinecap="round" />
          <defs>
            <linearGradient id="ts-grad-bl" x1="0" y1="0" x2="70" y2="50" gradientUnits="userSpaceOnUse">
              <stop stopColor="#55B000" />
              <stop offset="0.5" stopColor="white" stopOpacity="0.156" />
              <stop offset="1" stopColor="#50790B" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-[clamp(20px,2.5vw,40px)] max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:max-w-[360px] max-sm:mx-auto">
        {plants.map((plant, i) => (
          <PlantCard key={i} plant={plant} bagIcon={bagIcon} />
        ))}
      </div>
    </section>
  )
}
