import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import StarRating from '../components/StarRating'
import { ALL_PLANTS } from '../data/plants'
import { getPlantId } from '../utils/plantId'
import Footer from '../components/Footer'

export default function MarketPage() {
  const { addItem } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 6

  const filtered = useMemo(() => {
    let result = [...ALL_PLANTS]

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((p) => p.name.toLowerCase().includes(q))
    }

    if (sort === 'price-asc') result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
    else if (sort === 'price-desc') result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
    else if (sort === 'name-asc') result.sort((a, b) => a.name.localeCompare(b.name))
    else if (sort === 'name-desc') result.sort((a, b) => b.name.localeCompare(a.name))

    return result
  }, [search, sort])

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <>
      <section className="pt-[150px] px-[7.5vw] pb-20 max-sm:pt-[120px] max-sm:px-5 max-sm:pb-15">
      <h1 className="text-[clamp(32px,3.4vw,55px)] font-semibold text-white mb-8">Plants Market</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search plants..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 outline-none focus:border-white/40 transition-colors font-[inherit]"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>

        <select
          value={sort}
          onChange={(e) => { setSort(e.target.value); setPage(1) }}
          className="h-12 px-4 rounded-xl bg-white/5 border border-white/20 text-white/75 outline-none focus:border-white/40 transition-colors cursor-pointer font-[inherit] appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%227%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M6%207L.804%201.75h10.392L6%207z%22%20fill%3D%22%23fff%22%20opacity%3D%22.75%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_7px] bg-[right_16px_center] bg-no-repeat pr-10"
        >
          <option value="" className="bg-[#0d1a0d]">Sort by</option>
          <option value="price-asc" className="bg-[#0d1a0d]">Price: Low to High</option>
          <option value="price-desc" className="bg-[#0d1a0d]">Price: High to Low</option>
          <option value="name-asc" className="bg-[#0d1a0d]">Name A-Z</option>
          <option value="name-desc" className="bg-[#0d1a0d]">Name Z-A</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {paginated.map((plant, i) => (
          <article
            key={i}
            onClick={() => {
              if (plant.slug) navigate(`/plant/${plant.slug}`)
            }}
            className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-[12px] overflow-hidden transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] cursor-pointer"
          >
            <div className="relative pt-[75%] overflow-hidden">
              <img
                src={plant.img}
                alt={plant.name}
                className="absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="p-5 flex flex-col gap-3">
              <h3 className="text-lg font-semibold text-white truncate">{plant.name}</h3>
              <p className="text-sm text-white/60 leading-[1.4] line-clamp-2">{plant.desc}</p>

              {plant.rating && <StarRating rating={plant.rating} size={18} />}

              <div className="flex items-center justify-between mt-1">
                <span className="text-xl font-bold text-white">{plant.price}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (!user) {
                      navigate('/login')
                      return
                    }
                    addItem(getPlantId(plant.slug), plant.name, plant.price, plant.img)
                  }}
                  className="px-4 py-2 rounded-xl bg-white text-[#0d1a0d] text-sm font-semibold cursor-pointer border-none hover:opacity-90 transition-opacity"
                >
                  Add to bag
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 disabled:opacity-30 cursor-pointer disabled:cursor-default hover:bg-white/10 transition-colors font-[inherit] text-sm"
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-9 h-9 rounded-lg text-sm font-medium cursor-pointer border transition-colors font-[inherit] ${
                page === i + 1
                  ? 'bg-white text-[#0d1a0d] border-white'
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 disabled:opacity-30 cursor-pointer disabled:cursor-default hover:bg-white/10 transition-colors font-[inherit] text-sm"
          >
            &gt;
          </button>
        </div>
      )}
    </section>
      <Footer />
    </>
  )
}

function parsePrice(price: string): number {
  return Number(price.replace(/[^0-9.]/g, '')) || 0
}
