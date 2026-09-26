const PRIMARY = [
  'Machine Learning',
  'Computer Vision',
  'Retrieval-Augmented Generation',
  'AI Agents',
  'LLM Applications',
  'Intelligent Automation',
  'Deep Learning',
  'MLOps',
];

const SECONDARY = ['train', 'evaluate', 'retrieve', 'generate', 'detect', 'deploy', 'iterate', 'ship'];

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="mx-6 size-5 shrink-0 md:mx-8 md:size-6" aria-hidden>
      <path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12Z" fill="url(#marquee-star)" />
    </svg>
  );
}

/** Decorative infinite ticker of focus areas (listed accessibly in About). */
export function Marquee() {
  return (
    <div aria-hidden className="relative overflow-hidden py-16 md:py-24">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="marquee-star" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: 'var(--color-pink)' }} />
            <stop offset="1" style={{ stopColor: 'var(--color-petal)' }} />
          </linearGradient>
        </defs>
      </svg>

      {/* back band — crosses behind, runs the other way */}
      <div className="marquee-band absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[4.5deg] border-y border-line/70 bg-ink-2/90 py-2.5 opacity-90">
        <div className="marquee-track marquee-reverse">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center">
              {[...SECONDARY, ...SECONDARY].map((word, i) => (
                <li key={i} className="px-6 font-mono text-xs uppercase tracking-[0.3em] text-mute">
                  {word} <span className="text-rose">→</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* front band */}
      <div className="marquee-band relative mx-[-5%] -rotate-[1.6deg] bg-[linear-gradient(90deg,var(--color-wine-2),var(--color-wine),var(--color-wine-2))] py-5 md:py-6">
        <div className="hairline absolute inset-x-0 top-0" />
        <div className="hairline absolute inset-x-0 bottom-0" />
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center">
              {PRIMARY.map((item, i) => (
                <li key={item} className="flex items-center">
                  <span
                    className={`whitespace-nowrap font-display text-[clamp(1.6rem,3.6vw,2.9rem)] font-bold tracking-[-0.02em] ${
                      i % 2 ? 'text-outline' : 'text-blush'
                    }`}
                  >
                    {item}
                  </span>
                  <Star />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
