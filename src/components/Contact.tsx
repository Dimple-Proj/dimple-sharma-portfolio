import { useState, type ReactNode } from 'react';
import { links, resumeDownloadName } from '../config/site';
import { delay } from '../lib/style';
import { Scramble } from './Scramble';
import { ArrowUpRight, Check, Copy, Download, GitHub, LinkedIn, Mail } from './Icons';

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    if (!links.email) return;
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the mailto button still works */
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-24 md:py-36">
      <div className="container-x">
        <div className="reveal gradient-border beam relative isolate overflow-hidden rounded-[32px] px-6 py-16 sm:px-12 md:py-24">
          {/* Layered gradient field */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 [background-image:var(--grad-wine)]" />
            <div className="orb orb-drift -left-[10%] -top-[30%] h-[26rem] w-[26rem] bg-pink/35" />
            <div className="orb orb-drift-slow -right-[8%] top-[20%] h-[24rem] w-[24rem] bg-rose/20" />
            <div className="orb orb-drift bottom-[-40%] left-[35%] h-[22rem] w-[22rem] bg-petal/10" />
            <div className="grid-bg absolute inset-0 opacity-50" />
          </div>

          <p className="eyebrow flex items-center gap-4">
            <span className="text-gradient font-semibold">05</span>
            <span className="h-px w-12 bg-[image:var(--grad-accent)]" aria-hidden />
            <Scramble text="Contact" />
          </p>

          <h2
            id="contact-title"
            className="mt-8 max-w-4xl text-[clamp(2.4rem,6.5vw,5.6rem)] font-bold leading-[0.98] tracking-[-0.035em] text-blush"
          >
            Have an{' '}
            <span className="text-gradient-flow pr-[0.08em] font-serif text-[1.08em] font-normal italic tracking-[-0.01em]">
              interesting
            </span>{' '}
            problem to solve?
          </h2>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-blush/85 md:text-xl" style={delay(100)}>
            I&apos;m always excited to explore meaningful projects, learn new things, and build useful technology.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            {links.email ? (
              <>
                <a href={`mailto:${links.email}`} className="btn btn-primary" data-magnetic>
                  <Mail /> Email me
                </a>
                <button type="button" onClick={copyEmail} className="btn btn-ghost" data-magnetic aria-live="polite">
                  {copied ? <Check /> : <Copy />}
                  {copied ? 'Copied' : 'Copy email'}
                </button>
              </>
            ) : (
              <Pending icon={<Mail />} label="Email" field="email" />
            )}

            <SocialLink href={links.linkedin} icon={<LinkedIn />} label="LinkedIn" />
            <SocialLink href={links.github} icon={<GitHub />} label="GitHub" />
            {links.resume && (
              <a href={links.resume} download={resumeDownloadName} className="btn btn-ghost" data-magnetic>
                <Download /> Download resume
                <span className="sr-only"> (PDF)</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, icon, label }: { href: string | null; icon: ReactNode; label: string }) {
  // Missing links (set to null in site.ts) are simply not shown.
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noreferrer noopener" className="btn btn-ghost" data-magnetic>
      {icon} {label} <ArrowUpRight />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function Pending({ icon, label, field }: { icon: ReactNode; label: string; field: string }) {
  return (
    <span
      className="btn btn-pending"
      aria-disabled="true"
      title={`Not added yet — set links.${field} in src/config/site.ts`}
    >
      {icon} {label} · link pending
    </span>
  );
}
