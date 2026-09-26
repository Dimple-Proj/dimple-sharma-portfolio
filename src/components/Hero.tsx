import { links, person, resumeDownloadName } from '../config/site';
import { delay } from '../lib/style';
import { ArrowRight, Download } from './Icons';
import { NeuralField } from './NeuralField';
import { Scramble } from './Scramble';

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 md:pt-32"
    >
      {/* Ambient gradients */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0 opacity-60" />
        <div className="orb orb-drift -right-[10%] top-[8%] h-[34rem] w-[34rem] bg-pink/25" />
        <div className="orb orb-drift-slow right-[18%] top-[40%] h-[22rem] w-[22rem] bg-rose/15" />
        <div className="orb -left-[12%] bottom-[-10%] h-[30rem] w-[30rem] bg-wine" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
      </div>

      {/* Neural network visual — sits right, fades toward the text */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full opacity-35 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_60%,transparent)] md:opacity-60 lg:w-[58%] lg:opacity-100 lg:[mask-image:linear-gradient(to_right,transparent,black_30%,black_85%,transparent)]"
      >
        <NeuralField className="h-full w-full" />
      </div>

      <div className="container-x">
        <div className="max-w-[46rem]">
          <p className="eyebrow reveal flex flex-wrap items-center gap-3">
            <span className="h-px w-10 bg-[image:var(--grad-accent)]" aria-hidden />
            <Scramble text={person.eyebrow} />
          </p>

          <h1
            id="hero-title"
            className="reveal mt-7 text-[clamp(2.7rem,7vw,6.1rem)] font-bold leading-[0.98] tracking-[-0.035em] text-blush"
            style={delay(80)}
          >
            Building{' '}
            <span className="font-serif text-[1.08em] font-normal italic tracking-[-0.01em] text-gradient-flow pr-1">
              intelligent
            </span>
            <br className="hidden sm:block" /> systems that solve{' '}
            <span className="relative inline-block">
              <span className="text-gradient">real-world</span>
              <svg
                aria-hidden
                viewBox="0 0 300 20"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3 w-full md:-bottom-3"
              >
                <defs>
                  <linearGradient id="hero-underline" x1="0" x2="1">
                    <stop offset="0" style={{ stopColor: 'var(--color-pink)' }} />
                    <stop offset="0.6" style={{ stopColor: 'var(--color-rose)' }} />
                    <stop offset="1" style={{ stopColor: 'var(--color-petal)' }} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M2 14 C 60 4, 140 4, 298 10"
                  fill="none"
                  stroke="url(#hero-underline)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  pathLength={1}
                  className="draw-in"
                />
              </svg>
            </span>{' '}
            problems.
          </h1>

          <p
            className="reveal mt-8 max-w-[36rem] text-lg leading-relaxed text-mute md:text-xl"
            style={delay(160)}
          >
            {person.intro}
          </p>

          <div
            className="reveal mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
            style={delay(240)}
          >
            <a href="#projects" className="btn btn-primary" data-magnetic>
              Explore my work
              <ArrowRight />
            </a>
            {links.resume && (
              <a href={links.resume} download={resumeDownloadName} className="btn btn-ghost" data-magnetic>
                <Download /> Download Resume
                <span className="sr-only"> (PDF)</span>
              </a>
            )}
            <a
              href="#contact"
              className="group inline-flex min-h-12 items-center gap-2 rounded-full px-3 font-semibold text-blush/90 underline decoration-rose/50 decoration-2 underline-offset-[6px] transition-colors hover:text-blush hover:decoration-rose"
            >
              Let&apos;s connect
            </a>
          </div>

          <p
            className="reveal beam mt-10 inline-flex items-center gap-3 rounded-full border border-line/80 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-wine)_80%,transparent),transparent)] py-2 pl-3 pr-4 text-sm text-blush/90"
            style={delay(320)}
          >
            <span className="pulse-dot" aria-hidden />
            {person.availability}
          </p>
        </div>

        {/* Meta strip */}
        <dl
          className="reveal mt-16 grid max-w-3xl gap-6 border-t border-line/70 pt-6 text-sm sm:grid-cols-2 md:mt-20"
          style={delay(400)}
        >
          <div>
            <dt className="eyebrow !text-[0.7rem]">Studying</dt>
            <dd className="mt-1.5 text-blush/90">{person.education}</dd>
          </div>
          <div>
            <dt className="eyebrow !text-[0.7rem]">Focus</dt>
            <dd className="mt-1.5 text-blush/90">{person.focus}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
