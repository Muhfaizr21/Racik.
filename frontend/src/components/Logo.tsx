interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9 md:w-10 md:h-10',
    lg: 'w-12 h-12',
  }

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg md:text-xl',
    lg: 'text-2xl',
  }

  const subtitleSizes = {
    sm: 'text-[7px]',
    md: 'text-[8px]',
    lg: 'text-[9px]',
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      {/* Icon Badge */}
      <div
        className={`relative ${iconSizes[size]} rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] shrink-0`}
        style={{
          background: 'radial-gradient(circle at 30% 25%, #2a1b10 0%, #15110d 60%, #0d0a08 100%)',
          boxShadow: '0 4px 14px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.15)',
        }}
      >
        {/* Subtle metallic border */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            border: '1.5px solid transparent',
            background: 'linear-gradient(145deg, rgba(243,229,171,0.5), rgba(212,175,55,0.8), rgba(138,98,24,0.3)) border-box',
            WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'destination-out',
            maskComposite: 'exclude',
          }}
        />

        {/* Bespoke Luxury Perfume Flacon & Monogram SVG */}
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[82%] h-[82%] drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]"
        >
          <defs>
            {/* Gold Linear Gradient */}
            <linearGradient id="racikGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2B2" />
              <stop offset="35%" stopColor="#E5C158" />
              <stop offset="70%" stopColor="#C99827" />
              <stop offset="100%" stopColor="#8C6212" />
            </linearGradient>

            {/* Subtle Amber Glow */}
            <linearGradient id="essenceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0.2" />
            </linearGradient>

            {/* Glass Facet Gradient */}
            <linearGradient id="facetHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Perfume Cap */}
          <rect
            x="16"
            y="6.5"
            width="8"
            height="5"
            rx="1.2"
            fill="url(#racikGold)"
            stroke="#FFEAA7"
            strokeWidth="0.5"
          />
          {/* Cap highlight */}
          <rect x="18" y="7.5" width="4" height="1.2" rx="0.6" fill="#FFFFFF" fillOpacity="0.6" />

          {/* Bottle Neck Ring */}
          <rect x="17.5" y="11.5" width="5" height="1.8" rx="0.5" fill="url(#racikGold)" />

          {/* Bottle Shoulder & Body (Curved Diamond Silhouette) */}
          <path
            d="M 12 17 C 12 14.8 14.5 13.5 17 13.5 H 23 C 25.5 13.5 28 14.8 28 17 L 29.5 29 C 29.8 31.8 27.6 34.2 24.8 34.2 H 15.2 C 12.4 34.2 10.2 31.8 10.5 29 Z"
            fill="#120A0C"
            stroke="url(#racikGold)"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />

          {/* Inner Liquid Wave / Essence */}
          <path
            d="M 12.2 24 C 15 22.8 18 24.8 21 23.8 C 24 22.8 26.5 24 28.2 23.5 L 28.6 28.8 C 28.8 31.2 26.8 33.2 24.4 33.2 H 15.6 C 13.2 33.2 11.2 31.2 11.4 28.8 Z"
            fill="url(#essenceGrad)"
            opacity="0.75"
          />

          {/* Monogram "R" in high-fashion serif styling */}
          <path
            d="M 17 18.5 H 21.5 C 23.2 18.5 24.4 19.4 24.4 21.1 C 24.4 22.6 23.3 23.6 21.8 23.7 L 24.6 28.5 H 22.6 L 20.2 24.2 H 18.6 V 28.5 H 17 V 18.5 Z M 18.6 22.8 H 21.3 C 22.2 22.8 22.8 22.2 22.8 21.1 C 22.8 20.1 22.1 19.8 21.2 19.8 H 18.6 V 22.8 Z"
            fill="url(#racikGold)"
          />

          {/* Delicate Glass Highlight on left edge */}
          <path
            d="M 12.8 17.5 L 11.8 28.5"
            stroke="url(#facetHighlight)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-baseline gap-0.5">
            <span
              className={`${titleSizes[size]} font-bold tracking-tight text-white font-sans`}
            >
              Racik
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#FFF2B2] animate-pulse ml-0.5 mb-1" />
          </div>
          <span
            className={`${subtitleSizes[size]} font-medium tracking-[0.28em] text-[#D4AF37]/80 uppercase -mt-0.5 font-mono`}
          >
            Parfumerie
          </span>
        </div>
      )}
    </div>
  )
}
