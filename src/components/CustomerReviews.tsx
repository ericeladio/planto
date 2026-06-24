import type { Review } from '../types'
import SectionHeader from './SectionHeader'
import ReviewCard from './ReviewCard'

interface CustomerReviewsProps {
  reviews: Review[]
}

export default function CustomerReviews({ reviews }: CustomerReviewsProps) {
  return (
    <section className="flex flex-col gap-14 px-[7.5vw] py-10 pb-20">
      <SectionHeader title="Customer Review" gradientPrefix="rev" />

      <div className="grid grid-cols-3 gap-[clamp(20px,2.5vw,40px)] max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:max-w-[400px] max-sm:mx-auto">
        {reviews.map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </div>
    </section>
  )
}
