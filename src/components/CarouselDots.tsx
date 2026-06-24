interface CarouselDotsProps {
  activeIndex?: number
  count?: number
}

export default function CarouselDots({ activeIndex = 0, count = 3 }: CarouselDotsProps) {
  return (
    <div className="flex items-center justify-center gap-2 pt-2">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={`h-[6px] rounded-[46px] bg-white ${
            i === activeIndex ? 'w-[21px]' : 'w-[6px]'
          }`}
        />
      ))}
    </div>
  )
}
