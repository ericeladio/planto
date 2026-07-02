import Skeleton from './Skeleton'

export default function ProductPillSkeleton() {
  return (
    <article className="relative flex items-center rounded-[151px] border-2 border-white/27 bg-white/5 backdrop-blur-[20px] overflow-visible min-h-[360px] py-10 max-lg:flex-col max-lg:rounded-[40px] max-lg:p-10 max-lg:items-start max-lg:min-h-unset">
      <div className="absolute inset-0 rounded-[151px] bg-white/3 pointer-events-none" />
      <div className="relative shrink-0 z-2 w-[clamp(200px,22vw,380px)] -ml-10 mr-[clamp(16px,2vw,40px)] max-lg:w-[min(300px,70vw)] max-lg:m-0 max-lg:mx-auto">
        <Skeleton variant="rect" className="aspect-square w-full rounded-3xl" />
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-5 z-2 pr-[clamp(40px,5vw,100px)] max-lg:p-0 max-lg:px-4 max-lg:items-center max-lg:text-center">
        <Skeleton variant="text" width="50%" height={32} />
        <Skeleton variant="text" className="w-full" height={20} />
        <Skeleton variant="text" className="w-full" height={20} />
        <Skeleton variant="text" width="30%" height={20} />
        <Skeleton variant="text" width="25%" height={32} />
        <div className="flex items-center gap-4 max-lg:justify-center">
          <Skeleton variant="rect" className="rounded-xl" width={217} height={64} />
          <Skeleton variant="rect" className="rounded-xl" width={64} height={64} />
        </div>
      </div>
    </article>
  )
}
