import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import StarRating from './StarRating'
import GlassCardSkeleton from './GlassCardSkeleton'
import type { PlantOut } from '../services/api'


interface HeroReviewerProps {
  name: string
  rating: number
  text: string
}

function HeroReviewer({ name, rating, text }: HeroReviewerProps) {
  return (
    <>
      <div className="flex items-center gap-4 mb-[18px]">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2d5a2d] to-[#4a8a4a] shrink-0 border-2 border-white/20" aria-hidden="true" />
        <div className="flex flex-col gap-1.5">
          <span className="text-[22px] font-medium text-white">{name}</span>
          <StarRating rating={rating} />
        </div>
      </div>
      <p className="text-[17px] font-normal opacity-75 leading-[1.5] max-w-[341px]">{text}</p>
    </>
  )
}

interface GlassCardProps {
  img: string
  alt: string
  category: string | null
  name: string | null
}

const FALLBACK_PLANT = {
  image_url: '',
  category: 'Trendy House Plant',
  name: 'Calathea plant',
}

function GlassCard({ img, alt, category, name }: GlassCardProps) {
  const { addItem } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleBuy = () => {
    if (!user) {
      navigate('/login')
      return
    }
    addItem(0, name ?? 'Plant', 'Rs. 359/-', img)
  }

  return (
    <div className="relative w-[clamp(320px,30vw,512px)] shrink-0 mt-[-20px] max-lg:w-[min(420px,90vw)] max-lg:mt-15">
      <img
        src={img}
        alt={alt}
        className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[90%] h-auto object-contain z-2 pointer-events-none max-lg:top-[-20%]"
      />
      <div className="relative w-full aspect-[512/644] backdrop-blur-[12.5px]">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 512 644"
          fill="none"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="card-shadow" x="-5%" y="-2%" width="110%" height="110%">
              <feDropShadow dx="0" dy="9" stdDeviation="9.2" floodColor="rgba(0,0,0,0.25)" />
            </filter>
            <linearGradient id="card-stroke" x1="12" y1="60.5" x2="453" y2="620" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" stopOpacity="0.2" />
              <stop offset="0.52" stopOpacity="0" />
              <stop offset="1" stopColor="white" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            d="M0 92.3058C0 44.2507 43.5673 7.75052 91.1755 14.2889C142.448 21.3305 205.999 28.3316 256 28.3316C306.001 28.3316 369.552 21.3305 420.825 14.2889C468.433 7.75053 512 44.2507 512 92.3058V567C512 609.526 477.526 644 435 644H77C34.4741 644 0 609.526 0 567V92.3058Z"
            fill="white"
            fillOpacity="0.05"
            filter="url(#card-shadow)"
          />
          <path
            d="M420.961 15.2793C467.994 8.82018 511 44.8828 511 92.3057V567C511 608.974 476.974 643 435 643H77C35.0264 643 1 608.974 1 567V92.3057C1.00006 44.8828 44.0061 8.82017 91.0391 15.2793C142.32 22.3221 205.927 29.332 256 29.332C306.073 29.332 369.68 22.3221 420.961 15.2793Z"
            stroke="url(#card-stroke)"
            strokeWidth="2"
          />
        </svg>

        <div className="absolute bottom-[10%] left-[10%] flex flex-col gap-2 z-2">
          <span className="text-[clamp(14px,1.4vw,23px)] font-normal opacity-75">{category}</span>
          <span className="text-[clamp(20px,2.2vw,38px)] font-normal opacity-75">{name}</span>
          <button
            onClick={handleBuy}
            className="inline-flex items-center justify-center min-w-[180px] h-14 border-2 border-white rounded-xl bg-transparent text-white text-2xl font-medium cursor-pointer font-[inherit] transition-[background] hover:bg-white/8 mt-3"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

interface HeroSectionProps {
  heroImg: string
  plant?: PlantOut
  loading?: boolean
}

export default function HeroSection({ heroImg, plant, loading }: HeroSectionProps) {
  const p = plant ?? FALLBACK_PLANT
  return (
    <section className="flex items-start gap-[clamp(32px,4vw,80px)] px-[7.5vw] pb-20 pt-10 max-lg:flex-col max-lg:items-center max-lg:pb-15">
      <div className="flex-1 min-w-0 pt-15 max-lg:pt-5 max-lg:text-center">
        <h1 className="text-[clamp(52px,7.5vw,118px)] font-semibold leading-[1.05] opacity-75 mb-7 max-sm:text-[42px]">
          Breathe Natural
        </h1>
        <p className="text-[clamp(16px,1.4vw,23px)] font-medium opacity-75 leading-[1.5] max-w-[56ch] mb-11 max-lg:max-w-full">
          From root to petal, leaf to bloom — let nature breathe new life into every room.
        </p>

        <div className="flex items-center gap-8 mb-14 flex-wrap max-lg:justify-center">
          <Link to="/market" className="inline-flex items-center justify-center min-w-[217px] h-16 border-2 border-white rounded-xl bg-transparent text-white text-[28px] font-medium cursor-pointer font-[inherit] transition-[background] hover:bg-white/8 no-underline max-sm:min-w-[160px] max-sm:text-xl max-sm:h-[52px]">
            Explore
          </Link>
          <button className="flex items-center gap-[18px] bg-transparent border-none text-white/75 text-xl font-normal cursor-pointer font-[inherit]">
            <span className="flex items-center justify-center w-16 h-16 border-2 border-white/75 rounded-full shrink-0 transition-[background] hover:bg-white/8">
              <svg width="16" height="18" viewBox="0 0 16 18" fill="none" aria-hidden="true">
                <path d="M15 7.268C16.333 8.033 16.333 9.967 15 10.732L3 17.66C1.667 18.425 0 17.45 0 15.928V2.072C0 0.55 1.667-0.425 3 0.34L15 7.268Z" fill="white" opacity="0.75" />
              </svg>
            </span>
            Live Demo...
          </button>
        </div>

        <HeroReviewer
          name="alena Patel"
          rating={4.5}
          text="Every leaf you bring home is a breath of fresh air — start your green journey today."
        />
      </div>

      {loading ? (
        <GlassCardSkeleton />
      ) : (
        <GlassCard
          img={p.image_url || heroImg}
          alt={p.name ?? 'Plant'}
          category={p.category}
          name={p.name}
        />
      )}
    </section>
  )
}
