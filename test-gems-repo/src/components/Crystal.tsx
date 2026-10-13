import "../styles/crystal.css";

export default function Crystal({ title }: { title: string }) {
  return (
    <div className="crystal-wrap">
      <svg
        className="crystal"
        viewBox="0 0 200 260"
        width="200"
        height="260"
        role="img"
        aria-label={title}
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>{title}</title>
        <defs>
          <linearGradient id="crFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8fe3ff" />
            <stop offset="0.5" stopColor="#3aa0db" />
            <stop offset="1" stopColor="#123a63" />
          </linearGradient>
          <linearGradient id="crShine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="crystal-float">
          <polygon className="crystal-base" points="100,10 170,80 160,220 40,220 30,80" fill="url(#crFill)" />
          <polygon className="crystal-facet crystal-tilt-a" points="100,10 170,80 100,110 30,80" fill="#5fc6f2" />
          <polygon className="crystal-facet crystal-tilt-b" points="100,110 170,80 160,220 100,190" fill="#2574ae" />
          <polygon className="crystal-facet" points="100,110 100,190 40,220 30,80" fill="#1b587f" />
          <polygon className="crystal-facet crystal-tilt-c" points="100,10 100,110 30,80" fill="#a9ecff" />
          <polygon className="crystal-facet crystal-tilt-d" points="100,110 160,220 100,190" fill="#0f3a5f" />
          <polygon className="crystal-facet" points="100,10 170,80 100,110" fill="#7ad4f5" />
          <polygon className="crystal-facet" points="100,110 40,220 100,190" fill="#154b72" />
          <rect className="crystal-shimmer" x="0" y="0" width="200" height="260" fill="url(#crShine)" opacity="0.35" />
        </g>
      </svg>
    </div>
  );
}
