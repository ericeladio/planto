export default function Footer() {
  return (
    <footer className="px-[7.5vw] pt-15 pb-12 border-t border-white/12 max-sm:px-5 max-sm:pt-10 max-sm:pb-8">
      <div className="grid grid-cols-[1fr_1fr_1.4fr] gap-[clamp(32px,5vw,80px)] items-start max-lg:grid-cols-1 max-lg:gap-10">
        <div>
          <p className="text-[clamp(16px,1.4vw,24px)] font-medium text-white leading-[1.6] max-w-[42ch]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div>
          <h4 className="text-[clamp(20px,1.8vw,28px)] font-extrabold text-white mb-5">Quick Link's</h4>
          <nav className="flex flex-col gap-4">
            <a href="#" className="text-[clamp(16px,1.4vw,24px)] font-medium text-white no-underline transition-opacity hover:opacity-75">Home</a>
            <a href="#" className="text-[clamp(16px,1.4vw,24px)] font-medium text-white no-underline transition-opacity hover:opacity-75">Type's Of plant's</a>
            <a href="#" className="text-[clamp(16px,1.4vw,24px)] font-medium text-white no-underline transition-opacity hover:opacity-75">Privacy</a>
          </nav>
        </div>

        <div>
          <h4 className="text-[clamp(20px,1.8vw,28px)] font-extrabold text-white mb-5">For Every Update.</h4>
          <div className="mb-6">
            <div className="flex border-2 border-white rounded-lg overflow-hidden max-sm:flex-col">
              <input
                type="email"
                placeholder="Enter Email"
                className="flex-1 bg-transparent border-none outline-none px-6 py-[18px] text-[clamp(16px,1.4vw,24px)] font-medium text-white/75 font-[inherit]"
              />
              <button className="bg-white border-none px-6 text-[clamp(14px,1.1vw,22px)] font-bold text-black cursor-pointer uppercase font-[inherit] whitespace-nowrap transition-opacity hover:opacity-85 max-sm:px-4 max-sm:py-4">
                SUBSCRIBE
              </button>
            </div>
          </div>
          <p className="text-[clamp(16px,1.4vw,24px)] font-medium text-white">planto &copy; all right reserve</p>
        </div>
      </div>
    </footer>
  )
}
