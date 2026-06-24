import SectionHeader from './SectionHeader'
import ProductPill from './ProductPill'
import CarouselDots from './CarouselDots'
import { TRENDING_PRODUCTS } from '../constants'

interface TrendingPlantsProps {
  bagIcon: string
}

export default function TrendingPlants({ bagIcon }: TrendingPlantsProps) {
  return (
    <section className="flex flex-col gap-10 px-[7.5vw] py-10 pb-20">
      <SectionHeader title="Our Trendy plants" gradientPrefix="trend" />

      <ProductPill data={TRENDING_PRODUCTS[0]} bagIcon={bagIcon} />
      <ProductPill data={TRENDING_PRODUCTS[1]} bagIcon={bagIcon} reverse />

      <CarouselDots activeIndex={0} />
    </section>
  )
}
