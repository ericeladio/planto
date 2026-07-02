import { useEffect, useState } from 'react'
import { getTrending, toPlantFrontend } from '../services/api'
import type { Plant } from '../types'
import SectionHeader from './SectionHeader'
import ProductPill from './ProductPill'
import ProductPillSkeleton from './ProductPillSkeleton'
import CarouselDots from './CarouselDots'

interface TrendingPlantsProps {
  bagIcon: string
}

export default function TrendingPlants({ bagIcon }: TrendingPlantsProps) {
  const [plants, setPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getTrending()
      .then((data) => setPlants(data.map(toPlantFrontend)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section className="flex flex-col gap-10 px-[7.5vw] py-10 pb-20">
        <SectionHeader title="Our Trendy plants" gradientPrefix="trend" />
        <ProductPillSkeleton />
        <ProductPillSkeleton />
      </section>
    )
  }

  if (error) {
    return (
      <section className="flex flex-col gap-10 px-[7.5vw] py-10 pb-20">
        <SectionHeader title="Our Trendy plants" gradientPrefix="trend" />
        <p className="text-red-400 text-center">Failed to load trending plants: {error}</p>
      </section>
    )
  }

  if (plants.length < 2) return null

  const pillData1 = {
    title: plants[0].name,
    slug: plants[0].slug ?? '',
    desc: plants[0].desc,
    price: plants[0].price,
    img: plants[0].img,
    imgAlt: plants[0].name,
    ambientClass: 'tree' as const,
  }

  const pillData2 = {
    title: plants[1].name,
    slug: plants[1].slug ?? '',
    desc: plants[1].desc,
    price: plants[1].price,
    img: plants[1].img,
    imgAlt: plants[1].name,
    ambientClass: 'glow' as const,
  }

  return (
    <section className="flex flex-col gap-10 px-[7.5vw] py-10 pb-20">
      <SectionHeader title="Our Trendy plants" gradientPrefix="trend" />

      <ProductPill data={pillData1} bagIcon={bagIcon} />
      <ProductPill data={pillData2} bagIcon={bagIcon} reverse />

      <CarouselDots activeIndex={0} />
    </section>
  )
}
