export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden fill="none">
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="48" y2="48">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="21" stroke="url(#logo-g)" strokeWidth="1.5" strokeDasharray="3 4" />
      <ellipse cx="24" cy="24" rx="22" ry="8" stroke="url(#logo-g)" strokeWidth="1.5" transform="rotate(-24 24 24)" />
      <circle cx="24" cy="24" r="9" fill="url(#logo-g)" />
      <circle cx="42" cy="15" r="2.4" fill="#fbbf24" />
    </svg>
  );
}
