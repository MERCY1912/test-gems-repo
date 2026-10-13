export type CrystalLogoVariant = "hero" | "header";

export type CrystalLogoProps = {
  /** Крупный кристалл для hero или компактный для шапки. */
  variant?: CrystalLogoVariant;
  /** Размер стороны в пикселях; по умолчанию 160 для hero и 40 для шапки. */
  size?: number;
  className?: string;
};

const VARIANT_SIZE: Record<CrystalLogoVariant, number> = {
  hero: 160,
  header: 40,
};

/**
 * Декоративный inline-кристалл: многослойные грани, градиенты, внутренние блики
 * и фильтры свечения (feGaussianBlur / feDropShadow). Движение задано в
 * app/globals.css и полностью отключается при prefers-reduced-motion: reduce.
 *
 * Идентификаторы градиентов/фильтров зависят от variant, поэтому на одной
 * странице не должно быть двух кристаллов одного варианта.
 */
export default function CrystalLogo({ variant = "hero", size, className }: CrystalLogoProps) {
  const dimension = size ?? VARIANT_SIZE[variant];
  const uid = `crystal-${variant}`;

  return (
    <svg
      aria-hidden="true"
      className={className}
      height={dimension}
      role="presentation"
      viewBox="0 0 200 240"
      width={dimension}
    >
      <defs>
        <radialGradient id={`${uid}-halo`} cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#bfeeff" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#3aa8e0" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#05070d" stopOpacity="0" />
        </radialGradient>

        <linearGradient id={`${uid}-crown-left`} x1="12%" y1="0%" x2="88%" y2="100%">
          <stop offset="0%" stopColor="#f4fbff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#5ecbff" stopOpacity="0.65" />
        </linearGradient>

        <linearGradient id={`${uid}-crown-right`} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a9d8f5" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#1c4a6b" stopOpacity="0.95" />
        </linearGradient>

        <linearGradient id={`${uid}-pavilion-left`} x1="0%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#8fe3ff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#0d2438" stopOpacity="0.95" />
        </linearGradient>

        <linearGradient id={`${uid}-pavilion-right`} x1="100%" y1="0%" x2="20%" y2="100%">
          <stop offset="0%" stopColor="#cdeeff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#071726" stopOpacity="0.95" />
        </linearGradient>

        <radialGradient id={`${uid}-core`} cx="50%" cy="34%" r="58%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#9fe6ff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#05070d" stopOpacity="0" />
        </radialGradient>

        <linearGradient id={`${uid}-glint`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        <filter
          id={`${uid}-glow`}
          colorInterpolationFilters="sRGB"
          height="220%"
          width="220%"
          x="-60%"
          y="-60%"
        >
          <feGaussianBlur in="SourceGraphic" result="crystalBlur" stdDeviation="12" />
          <feMerge>
            <feMergeNode in="crystalBlur" />
            <feMergeNode in="crystalBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter
          id={`${uid}-depth`}
          colorInterpolationFilters="sRGB"
          height="180%"
          width="180%"
          x="-40%"
          y="-40%"
        >
          <feDropShadow
            dx="0"
            dy="10"
            floodColor="#5ecbff"
            floodOpacity="0.35"
            stdDeviation="10"
          />
        </filter>
      </defs>

      <ellipse
        className="crystal-glow"
        cx="100"
        cy="122"
        fill={`url(#${uid}-halo)`}
        filter={`url(#${uid}-glow)`}
        rx="84"
        ry="102"
      />

      <g className="crystal-float" filter={`url(#${uid}-depth)`}>
        <polygon
          fill={`url(#${uid}-crown-left)`}
          points="66,46 100,46 100,96 26,96"
          stroke="#8fe3ff"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
        <polygon
          fill={`url(#${uid}-crown-right)`}
          points="100,46 134,46 174,96 100,96"
          stroke="#8fe3ff"
          strokeOpacity="0.3"
          strokeWidth="1"
        />
        <polygon fill={`url(#${uid}-core)`} opacity="0.92" points="66,46 134,46 118,64 82,64" />
        <polygon
          fill={`url(#${uid}-pavilion-left)`}
          points="26,96 100,96 100,214"
          stroke="#8fe3ff"
          strokeOpacity="0.28"
          strokeWidth="1"
        />
        <polygon
          fill={`url(#${uid}-pavilion-right)`}
          points="100,96 174,96 100,214"
          stroke="#8fe3ff"
          strokeOpacity="0.28"
          strokeWidth="1"
        />

        <g fill="none" stroke="#eaf7ff" strokeOpacity="0.32" strokeWidth="1">
          <path d="M26 96 H174" />
          <path d="M66 46 L26 96" />
          <path d="M134 46 L174 96" />
          <path d="M100 46 V214" />
          <path d="M82 64 L26 96" />
          <path d="M118 64 L174 96" />
        </g>

        <polygon
          className="crystal-sparkle"
          fill={`url(#${uid}-glint)`}
          opacity="0.5"
          points="74,52 88,52 58,92 48,92"
        />
        <polygon
          className="crystal-sparkle"
          fill={`url(#${uid}-glint)`}
          opacity="0.24"
          points="110,102 140,102 120,152"
        />
        <circle cx="100" cy="198" fill="#ffffff" opacity="0.75" r="3.2" />
      </g>
    </svg>
  );
}
