interface NavbarProps {
  logoImg: string
  searchIcon: string
}

export default function Navbar({ logoImg, searchIcon }: NavbarProps) {
  return (
    <header className="flex items-center px-[7.5vw] h-[110px] max-sm:px-5 max-sm:h-20">
      <div className="flex items-center gap-2 shrink-0">
        <img src={logoImg} alt="Planto plant icon" className="w-12 h-12 object-contain" />
        <span className="text-[28px] font-black opacity-75">Planto.</span>
      </div>

      <nav className="flex items-center gap-[clamp(24px,3.5vw,54px)] mx-auto opacity-75 max-sm:hidden">
        <a href="#" className="text-white no-underline text-[clamp(16px,1.4vw,24px)] font-medium flex items-center gap-1.5 whitespace-nowrap">
          Home
        </a>
        <a href="#" className="text-white no-underline text-[clamp(16px,1.4vw,24px)] font-medium flex items-center gap-1.5 whitespace-nowrap">
          Plants Type
          <svg width="12" height="7" viewBox="0 0 12 7" fill="none" aria-hidden="true" className="mt-0.5">
            <path d="M6 7L0.803847 1.75L11.1962 1.75L6 7Z" fill="white" />
          </svg>
        </a>
        <a href="#" className="text-white no-underline text-[clamp(16px,1.4vw,24px)] font-medium flex items-center gap-1.5 whitespace-nowrap">
          More
        </a>
        <a href="#" className="text-white no-underline text-[clamp(16px,1.4vw,24px)] font-medium flex items-center gap-1.5 whitespace-nowrap">
          Contact
        </a>
      </nav>

      <img src={searchIcon} alt="Search" className="w-[26px] h-[26px] opacity-75 shrink-0 cursor-pointer" />
    </header>
  )
}
