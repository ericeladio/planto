import Skeleton from './Skeleton'

interface ReviewCardSkeletonProps {
  className?: string
}

export default function ReviewCardSkeleton({ className = '' }: ReviewCardSkeletonProps) {
  return (
    <article className={`bg-[#1e2e1a] rounded-[40px] p-[clamp(24px,3vw,44px)] flex flex-col gap-7 ${className}`}>
      <div className="flex items-center gap-5">
        <Skeleton variant="circle" width={72} height={72} />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton variant="text" width="60%" height={22} />
          <Skeleton variant="text" width="40%" height={16} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton variant="text" className="w-full" height={16} />
        <Skeleton variant="text" className="w-full" height={16} />
        <Skeleton variant="text" width="70%" height={16} />
      </div>
    </article>
  )
}
