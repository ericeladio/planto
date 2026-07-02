import Skeleton from './Skeleton'

export default function PlantCardSkeleton() {
  return (
    <article className="relative pt-[42%] flex flex-col">
      <Skeleton
        variant="circle"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] aspect-square z-2"
      />
      <div className="flex-1 bg-white/5 border-[1.5px] border-white/20 rounded-[40px] backdrop-blur-[12.5px] pt-[54%] px-[13%] pb-[12%] flex flex-col gap-3.5 drop-shadow-[0_9px_18px_rgba(0,0,0,0.25)]">
        <Skeleton variant="text" width="70%" height={30} />
        <Skeleton variant="text" className="w-full" height={18} />
        <Skeleton variant="text" className="w-full" height={18} />
        <div className="flex items-center justify-between mt-1">
          <Skeleton variant="text" width="35%" height={30} />
          <Skeleton variant="rect" className="rounded-xl" width={55} height={55} />
        </div>
      </div>
    </article>
  )
}
