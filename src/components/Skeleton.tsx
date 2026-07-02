interface SkeletonProps {
  className?: string
  variant?: 'rect' | 'circle' | 'text'
  width?: string | number
  height?: string | number
}

export default function Skeleton({ className = '', variant = 'rect', width, height }: SkeletonProps) {
  const base = 'animate-pulse bg-white/5 border border-white/10'
  const shape = variant === 'circle'
    ? 'rounded-full'
    : variant === 'text'
    ? 'rounded-md h-4'
    : 'rounded-2xl'
  return (
    <div
      className={`${base} ${shape} ${className}`}
      style={{ width, height }}
    />
  )
}
