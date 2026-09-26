import { about, links, profile, resumeDownloadName } from '../config/site';
import { Download, GitHub, LinkedIn, Mail } from './Icons';
import { delay } from '../lib/style';
import { Accent, SectionHeading } from './SectionHeading';

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative pb-24 pt-12 md:pb-36 md:pt-16">
      <div className="container-x">
        <SectionHeading index="01" label="About" id="about-title">
          Curious by default, <Accent>hands-on</Accent> by habit.
        </SectionHeading>

        <ProfileCard />

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16 md:mt-20">
          {/* Story */}
          <div className="lg:col-span-7">
            <blockquote className="reveal relative pl-6 font-display text-[clamp(1.45rem,2.6vw,2rem)] font-medium leading-snug tracking-tight text-blush">
              <span
                aria-hidden
                className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full bg-gradient-to-b from-pink via-rose to-transparent"
              />
              {about.statement}
            </blockquote>

            <div className="mt-10 space-y-6 text-[1.075rem] leading-[1.8] text-blush/85">
              {about.paragraphs.map((text, i) => (
                <p key={i} className="reveal max-w-[62ch]" style={delay(i * 80)}>
                  {text}
                </p>
              ))}
            </div>

            {/* Approach */}
            <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-line/70 sm:grid-cols-3">
              {about.approach.map((step, i) => (
                <li
                  key={step.title}
                  className="reveal group relative bg-ink-2 p-6 transition-colors duration-500 hover:bg-wine-2"
                  style={delay(i * 90)}
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[image:var(--grad-accent)] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-x-100"
                  />
                  <span className="font-mono text-xs text-gradient">0{i + 1}</span>
                  <h3 className="mt-3 text-lg font-semibold leading-snug text-blush">{step.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-mute">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Interests card with orbit visual */}
          <aside className="reveal lg:col-span-5" style={delay(120)} aria-label="Areas of interest">
            <div className="gradient-border surface relative overflow-hidden rounded-[28px] p-7 md:p-9">
              <OrbitVisual />
              <p className="eyebrow relative mt-8">What I&apos;m exploring</p>
              <ul className="relative mt-5 divide-y divide-line/70">
                {about.interests.map((interest, i) => (
                  <li
                    key={interest}
                    className="group flex items-center justify-between gap-4 py-3.5 text-[1.02rem] text-blush/90"
                  >
                    <span className="transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1.5">
                      {interest}
                    </span>
                    <span className="font-mono text-xs text-mute transition-colors group-hover:text-rose">
                      /{String(i + 1).padStart(2, '0')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/** At-a-glance profile: education, CGPA, current role and links. */
function ProfileCard() {
  const facts: { label: string; value: string; sub: string }[] = [
    { label: 'Education', value: profile.education.degree, sub: `${profile.education.institution} · ${profile.education.status}` },
    { label: 'Currently', value: profile.role, sub: `${profile.company} · ${profile.roleDates}` },
    { label: 'Based in', value: profile.location, sub: 'Open to conversations & collaborations' },
  ];
  return (
    <div className="reveal gradient-border surface relative overflow-hidden rounded-[28px]">
      <div aria-hidden className="orb -left-20 -top-24 h-72 w-72 bg-pink/15" />
      <div className="relative grid gap-px bg-line/50 md:grid-cols-2 lg:grid-cols-4">
        {profile.cgpa && (
          <div className="relative flex flex-col justify-center bg-ink-2/90 p-7 md:p-8">
            <p className="eyebrow !text-[0.7rem]">{profile.cgpaLabel}</p>
            <p className="mt-2 font-display text-6xl font-extrabold leading-none tracking-tighter text-gradient">
              {profile.cgpa}
            </p>
            <p className="mt-3 text-sm text-mute">B.Tech · AI &amp; ML</p>
          </div>
        )}
        {facts.map((fact) => (
          <div key={fact.label} className="bg-ink-2/90 p-7 md:p-8">
            <p className="eyebrow !text-[0.7rem]">{fact.label}</p>
            <p className="mt-3 text-lg font-semibold leading-snug text-blush">{fact.value}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-mute">{fact.sub}</p>
          </div>
        ))}
      </div>
      <div className="relative flex flex-wrap items-center gap-3 border-t border-line/70 bg-ink-2/80 px-7 py-5 md:px-8">
        {links.resume && (
          <a href={links.resume} download={resumeDownloadName} className="btn btn-primary !min-h-11 !px-5 !py-2 text-sm">
            <Download /> Download resume
            <span className="sr-only"> (PDF)</span>
          </a>
        )}
        {links.github && (
          <a href={links.github} target="_blank" rel="noreferrer noopener" className="btn btn-ghost !min-h-11 !px-5 !py-2 text-sm">
            <GitHub /> GitHub
            <span className="sr-only"> profile (opens in a new tab)</span>
          </a>
        )}
        {links.linkedin && (
          <a href={links.linkedin} target="_blank" rel="noreferrer noopener" className="btn btn-ghost !min-h-11 !px-5 !py-2 text-sm">
            <LinkedIn /> LinkedIn
            <span className="sr-only"> profile (opens in a new tab)</span>
          </a>
        )}
        {links.email && (
          <a href={`mailto:${links.email}`} className="btn btn-ghost !min-h-11 !px-5 !py-2 text-sm">
            <Mail /> Email
          </a>
        )}
      </div>
    </div>
  );
}

function OrbitVisual() {
  const labels = ['LLMs', 'Agents', 'RAG', 'Vision', 'MLOps'];
  return (
    <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[18rem]">
      <div className="absolute inset-[18%] rounded-full bg-[conic-gradient(from_200deg,var(--color-pink),var(--color-rose),var(--color-petal),var(--color-wine),var(--color-pink))] opacity-90 blur-2xl" />
      <div className="absolute inset-[30%] rounded-full bg-[radial-gradient(circle_at_35%_30%,var(--color-petal),var(--color-rose)_35%,var(--color-pink)_60%,var(--color-wine)_100%)] shadow-[0_0_60px_-10px_var(--color-pink)]" />
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="orbit-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: 'var(--color-rose)' }} stopOpacity="0.9" />
            <stop offset="1" style={{ stopColor: 'var(--color-line)' }} stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="92" fill="none" stroke="url(#orbit-ring)" strokeDasharray="2 5" />
        <circle cx="100" cy="100" r="70" fill="none" style={{ stroke: 'var(--color-line)' }} />
      </svg>
      <div className="absolute inset-0 motion-safe:animate-[spin_40s_linear_infinite]">
        {labels.map((label, i) => {
          const angle = (i / labels.length) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + Math.cos(angle) * 46;
          const y = 50 + Math.sin(angle) * 46;
          return (
            <span
              key={label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <span className="block rounded-full border border-line bg-ink/90 px-2.5 py-1 font-mono text-[0.7rem] text-blush motion-safe:animate-[spin_40s_linear_infinite_reverse]">
                {label}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
