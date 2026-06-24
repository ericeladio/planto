import type { Review } from '../types'
import StarRating from './StarRating'

interface ReviewCardProps {
  review: Review
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="bg-[#1e2e1a] rounded-[40px] p-[clamp(24px,3vw,44px)] flex flex-col gap-7">
      <div className="flex items-center gap-5">
        <div
          className="w-[72px] h-[72px] rounded-full shrink-0 border-2 border-white/20"
          style={{ background: review.avatarColor }}
        />
        <div className="flex flex-col gap-2">
          <span className="text-[clamp(18px,1.8vw,28px)] font-bold text-white">{review.name}</span>
          <StarRating rating={review.rating} size={22} />
        </div>
      </div>
      <p className="text-[clamp(14px,1.2vw,20px)] font-normal text-white/75 leading-[1.6]">{review.text}</p>
    </article>
  )
}
