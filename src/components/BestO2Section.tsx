import { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { getNewArrivals, toPlantFrontend } from '../services/api'
import type { Plant } from '../types'
import Skeleton from './Skeleton'

interface BestO2SectionProps {
  arrowLeft: string
  arrowRight: string
}

export default function BestO2Section({ arrowLeft, arrowRight }: BestO2SectionProps) {
  const [plants, setPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 10000, stopOnInteraction: false })])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => { if (emblaApi) emblaApi.scrollPrev() }, [emblaApi])
  const scrollNext = useCallback(() => { if (emblaApi) emblaApi.scrollNext() }, [emblaApi])

  useEffect(() => {
    getNewArrivals()
      .then((data) => setPlants(data.map(toPlantFrontend)))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    function onSelect() { if (emblaApi) setSelectedIndex(emblaApi.selectedScrollSnap()) }
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi])

  if (loading || plants.length === 0) {
    if (loading) {
      return (
        <section className="flex flex-col gap-10 px-[7.5vw] py-10 pb-20 max-sm:px-5 max-sm:pb-15">
          <div className="flex items-center gap-5 max-lg:justify-center">
            <Skeleton variant="rect" width={70} height={107} className="rounded-none border-none" />
            <Skeleton variant="text" width={200} height={55} />
            <Skeleton variant="rect" width={70} height={107} className="rounded-none border-none" />
          </div>
          <div className="rounded-[92px] border-3 border-white/44 bg-white/5 backdrop-blur-[20px] flex items-center min-h-[480px] overflow-visible max-lg:flex-col max-lg:rounded-[40px] max-lg:p-10">
            <Skeleton variant="rect" className="w-[clamp(300px,38vw,580px)] aspect-square rounded-3xl -ml-[5%] -mt-15 -mb-5 max-lg:w-[min(320px,70vw)] max-lg:m-0" />
            <div className="flex-1 min-w-0 px-[clamp(32px,5vw,80px)] py-12 pl-[clamp(24px,3vw,48px)] flex flex-col gap-7 z-2 max-lg:p-6 max-lg:items-center max-lg:text-center">
              <Skeleton variant="text" width="50%" height={32} />
              <Skeleton variant="text" className="w-full" height={24} />
              <Skeleton variant="text" className="w-full" height={24} />
              <Skeleton variant="text" width="30%" height={32} />
              <Skeleton variant="rect" className="rounded-xl" width={221} height={64} />
            </div>
          </div>
        </section>
      )
    }
    return null
  }

  return (
    <section className="flex flex-col gap-10 px-[7.5vw] py-10 pb-20 max-sm:px-5 max-sm:pb-15">
      <div className="flex items-center gap-5 max-lg:justify-center">
        <svg width="70" height="107" viewBox="0 0 70 107" fill="none" aria-hidden="true" className="shrink-0">
          <path d="M0 72.204L0 83.736C0 96.439 10.298 106.736 23 106.736H69.865" stroke="url(#np-grad-left)" strokeWidth="5" strokeLinecap="round" />
          <defs>
            <linearGradient id="np-grad-left" x1="-0.51" y1="70.11" x2="71.72" y2="104.88" gradientUnits="userSpaceOnUse">
              <stop stopColor="#55B000" />
              <stop offset="0.5" stopColor="white" stopOpacity="0.157" />
              <stop offset="1" stopColor="#50790B" />
            </linearGradient>
          </defs>
        </svg>

        <h2 className="text-[clamp(32px,3.4vw,55px)] font-semibold text-white whitespace-nowrap max-sm:text-[28px]">
          New Plants
        </h2>

        <svg width="70" height="107" viewBox="0 0 70 107" fill="none" aria-hidden="true" className="shrink-0">
          <path d="M69.865 34.532L69.865 22.999C69.865 10.297 59.567 0 46.865 0L0 0" stroke="url(#np-grad-right)" strokeWidth="5" strokeLinecap="round" />
          <defs>
            <linearGradient id="np-grad-right" x1="70.37" y1="36.625" x2="-1.863" y2="1.852" gradientUnits="userSpaceOnUse">
              <stop stopColor="#55B000" />
              <stop offset="0.5" stopColor="white" stopOpacity="0.157" />
              <stop offset="1" stopColor="#50790B" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {plants.map((plant) => (
            <div key={plant.slug} className="min-w-0 shrink-0 grow-0 basis-full">
              <div className="relative rounded-[92px] border-3 border-white/44 bg-white/5 backdrop-blur-[20px] flex items-center min-h-[480px] overflow-visible max-lg:flex-col max-lg:rounded-[40px] max-lg:p-10">
                <img
                  src={plant.img}
                  alt={plant.name}
                  loading="lazy"
                  className="relative w-[clamp(300px,38vw,580px)] h-auto object-contain shrink-0 -ml-[5%] -mt-15 -mb-5 z-2 pointer-events-none drop-shadow-[0_-60px_80px_rgba(0,0,0,0.17)_0_-20px_33px_rgba(0,0,0,0.12)] max-lg:w-[min(320px,70vw)] max-lg:m-0"
                />
                <div className="flex-1 min-w-0 px-[clamp(32px,5vw,80px)] py-12 pl-[clamp(24px,3vw,48px)] flex flex-col gap-7 z-2 max-lg:p-6 max-lg:items-center max-lg:text-center">
                  <h2 className="text-[clamp(22px,2.4vw,38px)] font-semibold text-white/75 leading-[1.3]">{plant.name}</h2>
                  <p className="text-[clamp(15px,1.4vw,28px)] font-semibold text-white/75 leading-[1.5]">{plant.desc}</p>
                  <span className="text-[clamp(22px,2.4vw,38px)] font-semibold text-white/75">{plant.price}</span>
                  <Link
                    to={plant.slug ? `/plant/${plant.slug}` : '#'}
                    className="inline-flex items-center justify-center w-fit min-w-[221px] h-16 border-2 border-white rounded-xl bg-transparent text-white text-[28px] font-medium cursor-pointer font-[inherit] transition-[background] hover:bg-white/8 opacity-75 max-lg:mx-auto max-sm:min-w-[160px] max-sm:text-xl max-sm:h-[52px] no-underline"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between max-lg:flex-col max-lg:gap-5">
        <div className="flex items-center justify-center gap-2 pt-2">
          {plants.map((_, i) => (
            <span
              key={i}
              className={`h-[6px] rounded-[46px] bg-white transition-all duration-300 ${
                i === selectedIndex ? 'w-[21px] opacity-100' : 'w-[6px] opacity-50'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button onClick={scrollPrev} className="cursor-pointer bg-transparent border-none p-0">
            <img src={arrowLeft} alt="Previous" className="w-[25px] h-[25px] opacity-75 transition-opacity hover:opacity-100" />
          </button>
          <span className="text-white/75 font-bold">
            <span className="text-xl">{String(selectedIndex + 1).padStart(2, '0')}/</span>
            <span className="text-[15px]">{String(plants.length).padStart(2, '0')}</span>
          </span>
          <button onClick={scrollNext} className="cursor-pointer bg-transparent border-none p-0">
            <img src={arrowRight} alt="Next" className="w-[25px] h-[25px] opacity-75 transition-opacity hover:opacity-100" />
          </button>
        </div>
      </div>
    </section>
  )
}
