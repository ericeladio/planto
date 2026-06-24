interface SectionHeaderProps {
  title: string
  gradientPrefix: string
}

export default function SectionHeader({ title, gradientPrefix }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-5 max-lg:justify-center">
      <svg className="shrink-0" width="69" height="69" viewBox="0 0 69 69" fill="none" aria-hidden="true">
        <path
          d="M0 0L0 46C0 58.7026 10.2975 69 23 69H68.5"
          stroke={`url(#${gradientPrefix}-left)`}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id={`${gradientPrefix}-left`} x1="-0.5" y1="-2" x2="68.5" y2="69" gradientUnits="userSpaceOnUse">
            <stop stopColor="#55B000" />
            <stop offset="0.5" stopColor="white" stopOpacity="0.16" />
            <stop offset="1" stopColor="#50790B" />
          </linearGradient>
        </defs>
      </svg>

      <h2 className="text-[clamp(32px,3.4vw,55px)] font-semibold text-white whitespace-nowrap max-sm:text-[28px]">
        {title}
      </h2>

      <svg className="shrink-0" width="69" height="69" viewBox="0 0 69 69" fill="none" aria-hidden="true">
        <path
          d="M68.5 69L68.5 23C68.5 10.2974 58.2025 0 45.5 0L0 0"
          stroke={`url(#${gradientPrefix}-right)`}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id={`${gradientPrefix}-right`} x1="69" y1="71" x2="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#55B000" />
            <stop offset="0.5" stopColor="white" stopOpacity="0.16" />
            <stop offset="1" stopColor="#50790B" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
