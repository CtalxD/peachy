export type Skin = { label: string; ink: string; name: string };

const drops = [
  [62, 96, 3.2], [74, 132, 2.2], [58, 188, 2.8], [66, 262, 3.6], [80, 300, 2.4],
  [138, 110, 2.6], [144, 214, 3.4], [132, 284, 2.4], [126, 330, 3], [92, 336, 2],
] as const;

export function Can({ label, ink, name, className }: Skin & { className?: string }) {
  const id = name.toLowerCase();
  const shape =
    "M62 28 H138 Q142 44 156 54 Q162 58 162 68 V344 Q162 356 150 364 L142 372 H58 L50 364 Q38 356 38 344 V68 Q38 58 44 54 Q58 44 62 28 Z";
  return (
    <svg className={className} viewBox="0 0 200 400" role="img" aria-label={`Peachy ${name} iced tea can`}>
      <defs>
        <clipPath id={`c-${id}`}><path d={shape} /></clipPath>
        <linearGradient id={`cyl-${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".55" />
          <stop offset=".1" stopColor="#000" stopOpacity=".12" />
          <stop offset=".24" stopColor="#fff" stopOpacity=".42" />
          <stop offset=".34" stopColor="#fff" stopOpacity="0" />
          <stop offset=".72" stopColor="#000" stopOpacity=".1" />
          <stop offset=".9" stopColor="#000" stopOpacity=".35" />
          <stop offset="1" stopColor="#000" stopOpacity=".65" />
        </linearGradient>
        <linearGradient id={`alu-${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#8d9096" />
          <stop offset=".3" stopColor="#f2f3f5" />
          <stop offset=".55" stopColor="#b6b9be" />
          <stop offset=".8" stopColor="#eceef0" />
          <stop offset="1" stopColor="#7d8086" />
        </linearGradient>
        <linearGradient id={`rim-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".5" />
          <stop offset=".25" stopColor="#000" stopOpacity="0" />
          <stop offset=".8" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".45" />
        </linearGradient>
        {/* peach */}
        <radialGradient id={`skin-${id}`} cx=".4" cy=".3" r=".85">
          <stop offset="0" stopColor="#fbeab4" />
          <stop offset=".45" stopColor="#f3c78a" />
          <stop offset="1" stopColor="#e39a6e" />
        </radialGradient>
        <radialGradient id={`blush-${id}`} cx=".72" cy=".68" r=".6">
          <stop offset="0" stopColor="#b5213f" stopOpacity=".95" />
          <stop offset=".55" stopColor="#d4485a" stopOpacity=".6" />
          <stop offset="1" stopColor="#e0685f" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`dark-${id}`} cx=".5" cy=".5" r=".5">
          <stop offset=".6" stopColor="#4a0f1f" stopOpacity="0" />
          <stop offset="1" stopColor="#4a0f1f" stopOpacity=".5" />
        </radialGradient>
        <linearGradient id={`leaf-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8fb05a" />
          <stop offset="1" stopColor="#2f5223" />
        </linearGradient>
        <clipPath id={`p-${id}`}>
          <path d="M100 118 C126 106 156 128 152 166 C149 200 126 226 100 224 C74 226 51 200 48 166 C44 128 74 106 100 118 Z" />
        </clipPath>
        <filter id={`fuzz-${id}`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="3" seed="4" />
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 .92  0 0 0 0 .8  0 0 0 .9 -.25" />
        </filter>
        <filter id={`soft-${id}`}><feGaussianBlur stdDeviation="3" /></filter>
        <filter id={`soft8-${id}`}><feGaussianBlur stdDeviation="8" /></filter>
        <radialGradient id={`drop-${id}`} cx=".35" cy=".3" r=".8">
          <stop offset="0" stopColor="#fff" stopOpacity=".95" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".12" />
          <stop offset="1" stopColor="#000" stopOpacity=".35" />
        </radialGradient>
      </defs>

      <ellipse cx="100" cy="379" rx="64" ry="7" fill="#000" opacity=".4" filter={`url(#soft-${id})`} />

      <g clipPath={`url(#c-${id})`}>
        <rect x="30" y="20" width="140" height="360" fill={label} />
        <rect x="30" y="20" width="140" height="48" fill={`url(#alu-${id})`} />
        <rect x="30" y="338" width="140" height="40" fill={`url(#alu-${id})`} />

        {/* peach */}
        <ellipse cx="108" cy="232" rx="46" ry="8" fill="#000" opacity=".28" filter={`url(#soft-${id})`} />
        <g>
          <path d="M100 118 C126 106 156 128 152 166 C149 200 126 226 100 224 C74 226 51 200 48 166 C44 128 74 106 100 118 Z" fill={`url(#skin-${id})`} />
          <g clipPath={`url(#p-${id})`}>
            <rect x="40" y="100" width="120" height="130" fill={`url(#blush-${id})`} />
            <rect x="40" y="100" width="120" height="130" filter={`url(#fuzz-${id})`} opacity=".55" />
            <rect x="40" y="100" width="120" height="130" fill={`url(#dark-${id})`} />
            <path d="M99 120 C92 150 96 190 104 222" fill="none" stroke="#7a1c2c" strokeWidth="3" opacity=".45" filter={`url(#soft-${id})`} />
            <path d="M99 120 C92 150 96 190 104 222" fill="none" stroke="#fff5d6" strokeWidth="1" opacity=".35" transform="translate(3 0)" />
            <ellipse cx="76" cy="146" rx="13" ry="22" fill="#fff" opacity=".5" transform="rotate(22 76 146)" filter={`url(#soft-${id})`} />
            <ellipse cx="72" cy="140" rx="4" ry="8" fill="#fff" opacity=".85" transform="rotate(22 72 140)" />
          </g>
          <path d="M100 118 C98 110 100 104 104 100" stroke="#4b3017" strokeWidth="3.2" strokeLinecap="round" fill="none" />
          <path d="M104 106 C116 84 140 78 158 88 C150 108 126 118 104 106 Z" fill={`url(#leaf-${id})`} />
          <path d="M106 105 C122 96 138 91 152 89" stroke="#d6e4a8" strokeWidth="1.1" fill="none" opacity=".7" />
          <path d="M104 106 C92 90 72 86 60 92 C66 110 86 116 104 106 Z" fill={`url(#leaf-${id})`} opacity=".92" />
        </g>

        {/* type */}
        <text x="100" y="268" textAnchor="middle" className="py-canWord" fill={ink}>Peachy</text>
        <text x="100" y="288" textAnchor="middle" className="py-canSub" fill={ink}>{name} iced tea</text>
        <text x="100" y="326" textAnchor="middle" className="py-canFine" fill={ink}>12 fl oz (355 ml)</text>

        {/* condensation */}
        {drops.map(([x, y, r], i) => (
          <g key={i}>
            <ellipse cx={x + 0.6} cy={y + r * 0.9} rx={r} ry={r * 0.9} fill="#000" opacity=".25" />
            <circle cx={x} cy={y} r={r} fill={`url(#drop-${id})`} />
          </g>
        ))}

        <rect x="30" y="20" width="140" height="360" fill={`url(#cyl-${id})`} />
        <rect x="46" y="70" width="5" height="270" rx="2.5" fill="#fff" opacity=".35" filter={`url(#soft-${id})`} />
      </g>

      {/* lid */}
      <path d="M62 28 H138 Q140 36 146 42 L54 42 Q60 36 62 28 Z" fill={`url(#alu-${id})`} />
      <ellipse cx="100" cy="28" rx="38" ry="6.5" fill="#d5d8dc" />
      <ellipse cx="100" cy="28" rx="38" ry="6.5" fill={`url(#alu-${id})`} opacity=".8" />
      <ellipse cx="100" cy="29" rx="30" ry="4.6" fill="#a7abb1" />
      <path d="M84 27 H112 Q118 28 112 32 H84 Q78 28 84 27 Z" fill="#7b7f86" />
      <ellipse cx="127" cy="29" rx="3.6" ry="1.9" fill="#6d7178" />
      <path d="M62 28 H138 Q140 36 146 42 L54 42 Q60 36 62 28 Z" fill={`url(#rim-${id})`} opacity=".5" />
    </svg>
  );
}