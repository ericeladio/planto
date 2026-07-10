import { useEffect, useState } from 'react'
import { getTopSelling, toPlantFrontend } from '../services/api'
import type { Plant } from '../types'
import SectionHeader from './SectionHeader'
import PlantCardUnified from './PlantCardUnified'

interface TopSellingProps {
  bagIcon: string
}

export default function TopSelling({ bagIcon }: TopSellingProps) {
  const [plants, setPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getTopSelling()
      .then((data) => setPlants(data.map(toPlantFrontend)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section className="flex flex-col gap-10 px-[7.5vw] py-10 pb-20">
        <SectionHeader title="Our Top Selling" gradientPrefix="top" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-3xl border border-white/10 bg-white/5 h-[400px] animate-pulse" />
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="flex flex-col gap-10 px-[7.5vw] py-10 pb-20">
        <SectionHeader title="Our Top Selling" gradientPrefix="top" />
        <p className="text-red-400 text-center">Failed to load top selling plants: {error}</p>
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-10 px-[7.5vw] py-10 pb-20">
      <SectionHeader title="Our Top Selling" gradientPrefix="top" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plants.map((plant, i) => (
          <PlantCardUnified key={i} plant={plant} bagIcon={bagIcon} />
        ))}
      </div>
    </section>
  )
}
