interface BestO2SectionProps {
  o2Img: string
  arrowLeft: string
  arrowRight: string
}

export default function BestO2Section({ o2Img, arrowLeft, arrowRight }: BestO2SectionProps) {
  return (
    <section className="flex flex-col gap-10 px-[7.5vw] py-10 pb-20 max-sm:px-5 max-sm:pb-15">
      <div className="flex items-center gap-5 max-lg:justify-center">
        <svg width="70" height="107" viewBox="0 0 70 107" fill="none" aria-hidden="true" className="shrink-0">
          <path d="M0 72.204L0 83.736C0 96.439 10.298 106.736 23 106.736H69.865" stroke="url(#o2-grad-left)" strokeWidth="5" strokeLinecap="round" />
          <defs>
            <linearGradient id="o2-grad-left" x1="-0.51" y1="70.11" x2="71.72" y2="104.88" gradientUnits="userSpaceOnUse">
              <stop stopColor="#55B000" />
              <stop offset="0.5" stopColor="white" stopOpacity="0.157" />
              <stop offset="1" stopColor="#50790B" />
            </linearGradient>
          </defs>
        </svg>

        <h2 className="text-[clamp(32px,3.4vw,55px)] font-semibold text-white whitespace-nowrap max-sm:text-[28px]">
          Our Best O2
        </h2>

        <svg width="70" height="107" viewBox="0 0 70 107" fill="none" aria-hidden="true" className="shrink-0">
          <path d="M69.865 34.532L69.865 22.999C69.865 10.297 59.567 0 46.865 0L0 0" stroke="url(#o2-grad-right)" strokeWidth="5" strokeLinecap="round" />
          <defs>
            <linearGradient id="o2-grad-right" x1="70.37" y1="36.625" x2="-1.863" y2="1.852" gradientUnits="userSpaceOnUse">
              <stop stopColor="#55B000" />
              <stop offset="0.5" stopColor="white" stopOpacity="0.157" />
              <stop offset="1" stopColor="#50790B" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative rounded-[92px] border-3 border-white/44 bg-white/5 backdrop-blur-[20px] flex items-center min-h-[480px] overflow-visible max-lg:flex-col max-lg:rounded-[40px] max-lg:p-10 max-lg:items-center">
        <img
          src={o2Img}
          alt="O2 plant"
          className="relative w-[clamp(300px,38vw,580px)] h-auto object-contain shrink-0 -ml-[5%] -mt-15 -mb-5 z-2 pointer-events-none drop-shadow-[0_-60px_80px_rgba(0,0,0,0.17)_0_-20px_33px_rgba(0,0,0,0.12)] max-lg:w-[min(320px,70vw)] max-lg:m-0"
        />
        <div className="flex-1 min-w-0 px-[clamp(32px,5vw,80px)] py-12 pl-[clamp(24px,3vw,48px)] flex flex-col gap-7 z-2 max-lg:p-6 max-lg:items-center max-lg:text-center">
          <h3 className="text-[clamp(22px,2.4vw,38px)] font-semibold text-white/75 leading-[1.3]">
            We Have Small And Best O2 Plants Collection's
          </h3>
          <p className="text-[clamp(15px,1.4vw,28px)] font-semibold text-white/75 leading-[1.5]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua
          </p>
          <p className="text-[clamp(15px,1.4vw,28px)] font-semibold text-white/75 leading-[1.5]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
          <button className="inline-flex items-center justify-center w-fit min-w-[221px] h-16 border-2 border-white rounded-xl bg-transparent text-white text-[28px] font-medium cursor-pointer font-[inherit] transition-[background] hover:bg-white/8 opacity-75 max-lg:mx-auto max-sm:min-w-[160px] max-sm:text-xl max-sm:h-[52px]">
            Explore
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between max-lg:flex-col max-lg:gap-5">
        <div className="flex items-center justify-center gap-2 pt-2">
          <span className="h-[6px] w-[21px] rounded-[46px] bg-white" />
          <span className="h-[6px] w-[6px] rounded-[46px] bg-white" />
          <span className="h-[6px] w-[6px] rounded-[46px] bg-white" />
        </div>

        <div className="flex items-center gap-4">
          <img src={arrowLeft} alt="Previous" className="w-[25px] h-[25px] cursor-pointer opacity-75 transition-opacity hover:opacity-100" />
          <span className="text-white/75 font-bold">
            <span className="text-xl">01/</span>
            <span className="text-[15px]">04</span>
          </span>
          <img src={arrowRight} alt="Next" className="w-[25px] h-[25px] cursor-pointer opacity-75 transition-opacity hover:opacity-100" />
        </div>
      </div>
    </section>
  )
}
