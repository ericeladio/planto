import Skeleton from './Skeleton'

export default function GlassCardSkeleton() {
  return (
    <div className="relative w-[clamp(320px,30vw,512px)] shrink-0 mt-[-20px] max-lg:w-[min(420px,90vw)] max-lg:mt-15">
      <Skeleton
        variant="circle"
        className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[90%] aspect-square z-2 pointer-events-none max-lg:top-[-20%]"
      />
      <div className="relative w-full aspect-[512/644] backdrop-blur-[12.5px]">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 512 644"
          fill="none"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="card-shadow-skel" x="-5%" y="-2%" width="110%" height="110%">
              <feDropShadow dx="0" dy="9" stdDeviation="9.2" floodColor="rgba(0,0,0,0.25)" />
            </filter>
            <linearGradient id="card-stroke-skel" x1="12" y1="60.5" x2="453" y2="620" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" stopOpacity="0.2" />
              <stop offset="0.52" stopOpacity="0" />
              <stop offset="1" stopColor="white" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            d="M0 92.3058C0 44.2507 43.5673 7.75052 91.1755 14.2889C142.448 21.3305 205.999 28.3316 256 28.3316C306.001 28.3316 369.552 21.3305 420.825 14.2889C468.433 7.75053 512 44.2507 512 92.3058V567C512 609.526 477.526 644 435 644H77C34.4741 644 0 609.526 0 567V92.3058Z"
            fill="white"
            fillOpacity="0.05"
            filter="url(#card-shadow-skel)"
          />
          <path
            d="M420.961 15.2793C467.994 8.82018 511 44.8828 511 92.3057V567C511 608.974 476.974 643 435 643H77C35.0264 643 1 608.974 1 567V92.3057C1.00006 44.8828 44.0061 8.82017 91.0391 15.2793C142.32 22.3221 205.927 29.332 256 29.332C306.073 29.332 369.68 22.3221 420.961 15.2793Z"
            stroke="url(#card-stroke-skel)"
            strokeWidth="2"
          />
        </svg>
        <div className="absolute bottom-[10%] left-[10%] flex flex-col gap-2 z-2">
          <Skeleton variant="text" width="40%" height={20} />
          <Skeleton variant="text" width="65%" height={32} />
          <Skeleton variant="rect" className="rounded-xl mt-3" width={180} height={56} />
        </div>
      </div>
    </div>
  )
}
