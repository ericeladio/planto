interface StarRatingProps {
  rating: number
  size?: number
  starId?: string
}

const STAR_PATH =
  'M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17.4l-6.2 4.5 2.4-7.4L2 9.4h7.6z'

export default function StarRating({ rating, size = 24, starId }: StarRatingProps) {
  const hasHalf = rating % 1 !== 0
  const gradientId = starId ?? `half-${Math.random().toString(36).slice(2, 8)}`

  return (
    <div className="flex gap-[2px]" aria-label={`${rating} stars`}>
      {[0, 1, 2, 3].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="#FFF84E">
          <path d={STAR_PATH} />
        </svg>
      ))}
      {hasHalf && (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id={gradientId}>
              <stop offset="50%" stopColor="#FFF84E" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path d={STAR_PATH} fill={`url(#${gradientId})`} stroke="#FFF84E" strokeWidth="1" />
        </svg>
      )}
    </div>
  )
}
