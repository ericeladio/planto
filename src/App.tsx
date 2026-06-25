import backImg from './assets/back.png'
import useScrollScale from './hooks/useScrollScale'
import { IMAGES, TOP_SELLING_PLANTS, CUSTOMER_REVIEWS } from './constants'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import TrendingPlants from './components/TrendingPlants'
import TopSelling from './components/TopSelling'
import CustomerReviews from './components/CustomerReviews'
import BestO2Section from './components/BestO2Section'
import Footer from './components/Footer'

function App() {
  const { scale } = useScrollScale()

  return (
    <div
      className="relative min-h-screen text-white font-[Inter,sans-serif] overflow-x-hidden"
    >
      <div
        className="fixed inset-0 z-[-1] bg-[#0d1a0d] bg-contain bg-center bg-no-repeat transition-transform duration-300 ease-out will-change-transform"
        style={{
          backgroundImage: `url(${backImg})`,
          transform: `scale(${scale})`,
        }}
      />
      <Navbar logoImg={IMAGES.LOGO_PLANT} searchIcon={IMAGES.SEARCH_ICON} />
      <main>
        <HeroSection heroImg={IMAGES.HERO_PLANT} />
        <div id="trending-trigger">
          <TrendingPlants bagIcon={IMAGES.BAG_ICON} />
        </div>
        <TopSelling plants={TOP_SELLING_PLANTS} bagIcon={IMAGES.CARD_BAG_ICON} />
        <CustomerReviews reviews={CUSTOMER_REVIEWS} />
        <BestO2Section
          arrowLeft={IMAGES.ARROW_LEFT}
          arrowRight={IMAGES.ARROW_RIGHT}
        />
      </main>
      <Footer />
    </div>
  )
}

export default App
