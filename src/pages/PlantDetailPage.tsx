import { useParams, useNavigate } from 'react-router-dom'
import { ALL_PLANTS } from '../data/plants'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import StarRating from '../components/StarRating'
import SEOHead from '../components/SEOHead'
import { getPlantId } from '../utils/plantId'
import { formatCurrency } from '../utils/formatCurrency'

export default function PlantDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const { user } = useAuth()

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login')
      return
    }
    addItem(getPlantId(plant!.slug), plant!.name, plant!.price, plant!.currency, plant!.img)
  }

  const plant = ALL_PLANTS.find((p) => p.slug === slug)

  if (!plant) {
    return (
      <>
        <SEOHead title="Plant Not Found" canonicalPath={`/plant/${slug}`} />
        <section className="pt-[150px] max-sm:pt-[120px] px-[7.5vw] pb-20 text-center">
          <h1 className="text-2xl text-white mb-4">Plant not found</h1>
          <button
            onClick={() => navigate('/market')}
            className="text-white/60 hover:text-white underline bg-transparent border-none cursor-pointer font-[inherit]"
          >
            Back to Market
          </button>
        </section>
      </>
    )
  }

  const details = [
    { label: 'Category', value: plant.category },
    { label: 'Light', value: plant.light },
    { label: 'Water', value: plant.water },
    { label: 'Height', value: plant.height },
    { label: 'Toxicity', value: plant.toxicity },
  ].filter((d) => d.value)

  return (
    <>
      <SEOHead
        title={plant.name}
        description={plant.desc || `Buy ${plant.name} at Planto. Premium indoor plant with fast delivery.`}
        canonicalPath={`/plant/${plant.slug}`}
        image={plant.img}
        type="product"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: plant.name,
          image: plant.img,
          description: plant.desc,
          brand: { '@type': 'Brand', name: 'Planto' },
          offers: {
            '@type': 'Offer',
            price: plant.price,
            priceCurrency: plant.currency,
            availability: 'https://schema.org/InStock',
            url: `https://planto.com/plant/${plant.slug}`,
          },
          ...(plant.rating ? {
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: String(plant.rating),
              reviewCount: '1',
            },
          } : {}),
        }}
      />
      <section className="pt-[150px] max-sm:pt-[120px] px-[7.5vw] pb-20 max-sm:px-5">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate('/market')}
          className="flex items-center gap-2 text-white/50 hover:text-white bg-transparent border-none cursor-pointer font-[inherit] text-sm mb-8 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5m7-7-7 7 7 7" />
          </svg>
          Back to Market
        </button>

        <div className="flex gap-10 max-lg:flex-col">
          <div className="relative w-[clamp(300px,40vw,500px)] aspect-square shrink-0 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-[12px] overflow-hidden max-lg:w-full max-lg:aspect-[3/2]">
            <img
              src={plant.img}
              alt={plant.name}
              className="absolute inset-0 w-full h-full object-contain p-8"
            />
          </div>

          <div className="flex-1 min-w-0 flex flex-col gap-5">
            <h1 className="text-[clamp(28px,3vw,48px)] font-semibold text-white">{plant.name}</h1>

            {plant.rating && <StarRating rating={plant.rating} size={24} />}

            <span className="text-2xl font-bold text-white">{formatCurrency(plant.price, plant.currency)}</span>

            <p className="text-white/60 leading-[1.7] text-base">{plant.desc}</p>

            <button
              onClick={handleAddToCart}
              className="self-start px-8 py-3 rounded-xl bg-white text-[#0d1a0d] font-semibold text-base cursor-pointer border-none hover:opacity-90 transition-opacity"
            >
              Add to Bag
            </button>

            {details.length > 0 && (
              <div className="mt-4 border-t border-white/10 pt-6 flex flex-col gap-4">
                {details.map((d) => (
                  <div key={d.label} className="flex items-start gap-2">
                    <span className="text-white/40 text-sm w-20 shrink-0">{d.label}</span>
                    <span className="text-white/75 text-sm leading-[1.5]">{d.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
