import { IMAGES } from '../constants'
import HeroSection from '../components/HeroSection'
import TrendingPlants from '../components/TrendingPlants'
import TopSelling from '../components/TopSelling'
import CustomerReviews from '../components/CustomerReviews'
import BestO2Section from '../components/BestO2Section'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <main className="pt-[110px] max-sm:pt-20">
      <HeroSection heroImg={IMAGES.HERO_PLANT} />
      <div id="trending-trigger">
        <TrendingPlants bagIcon={IMAGES.BAG_ICON} />
      </div>
      <TopSelling bagIcon={IMAGES.CARD_BAG_ICON} />
      <CustomerReviews />
      <BestO2Section arrowLeft={IMAGES.ARROW_LEFT} arrowRight={IMAGES.ARROW_RIGHT} />
      <Footer />
    </main>
  )
}
