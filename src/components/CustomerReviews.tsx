import { useEffect, useState } from 'react'
import { getBestReviews, toReviewFrontend } from '../services/api'
import type { Review } from '../types'
import SectionHeader from './SectionHeader'
import ReviewCard from './ReviewCard'
import ReviewCardSkeleton from './ReviewCardSkeleton'

export default function CustomerReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getBestReviews()
      .then((data) => setReviews(data.map(toReviewFrontend)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="flex flex-col gap-14 px-[7.5vw] py-10 pb-20">
      <SectionHeader title="Customer Review" gradientPrefix="rev" />

      {loading && (
        <div className="grid grid-cols-3 gap-[clamp(20px,2.5vw,40px)] max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:max-w-full max-sm:mx-auto">
          {[1, 2, 3].map((i) => (
            <ReviewCardSkeleton key={i} />
          ))}
        </div>
      )}

      {error && (
        <p className="text-red-400 text-center">Failed to load reviews: {error}</p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-3 gap-[clamp(20px,2.5vw,40px)] max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:max-w-full max-sm:mx-auto">
          {reviews.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      )}
    </section>
  )
}
