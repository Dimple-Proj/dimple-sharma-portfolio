import type { CSSProperties, PointerEvent } from 'react';
import type { Project, ProjectKind } from '../config/projects';
import { ArrowRight, Check } from './Icons';
import { ProjectLinks } from './ProjectLinks';
import { ProjectVisual } from './ProjectVisuals';

interface Props {
  project: Project;
  number: string;
  variant: 'feature' | 'stacked';
  flip?: boolean;
  onOpen: (project: Project) => void;
  style?: CSSProperties;
  className?: string;
}

function trackPointer(event: PointerEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
}

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Subtle 3D tilt + glare position for the project visual (mouse only). */
function tilt(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== 'mouse' || reducedMotion()) return;
  const frame = event.currentTarget.firstElementChild as HTMLElement | null;
  if (!frame) return;
  const rect = event.currentTarget.getBoundingClientRect();
  const px = (event.clientX - rect.left) / rect.width;
  const py = (event.clientY - rect.top) / rect.height;
  frame.style.transform = `rotateX(${(0.5 - py) * 6}deg) rotateY(${(px - 0.5) * 8}deg)`;
  frame.style.setProperty('--gx', `${px * 100}%`);
  frame.style.setProperty('--gy', `${py * 100}%`);
}

function resetTilt(event: PointerEvent<HTMLElement>) {
  const frame = event.currentTarget.firstElementChild as HTMLElement | null;
  if (frame) frame.style.transform = '';
}

/** Kind-specific decoration layered over the illustration. */
function FrameDecor({ kind }: { kind: ProjectKind }) {
  switch (kind) {
    case 'vision':
      return (
        <>
          {['left-3 top-3 border-l-2 border-t-2', 'right-3 top-3 border-r-2 border-t-2', 'left-3 bottom-3 border-l-2 border-b-2', 'right-3 bottom-3 border-r-2 border-b-2'].map(
            (pos) => (
              <span key={pos} className={`absolute size-5 border-rose/80 ${pos}`} />
            ),
          )}
          <span className="frame-scan absolute inset-x-6 top-0 h-px bg-[image:var(--grad-accent)] opacity-70" />
        </>
      );
    case 'frontend':
      return (
        <span className="absolute inset-x-0 top-0 flex h-7 items-center gap-1.5 border-b border-line/80 bg-ink/85 px-3 backdrop-blur-sm">
          <span className="size-2 rounded-full bg-pink/80" />
          <span className="size-2 rounded-full bg-rose/50" />
          <span className="size-2 rounded-full bg-line" />
          <span className="ml-3 h-3 w-40 max-w-[50%] rounded-full bg-line/70" />
        </span>
      );
    case 'data':
      return (
        <>
          <span className="film-edge absolute inset-x-0 top-0 h-3" />
          <span className="film-edge absolute inset-x-0 bottom-0 h-3" />
        </>
      );
    case 'ml':
      return (
        <span className="absolute inset-0 bg-[radial-gradient(color-mix(in_srgb,var(--color-rose)_22%,transparent)_1px,transparent_1px)] [background-size:18px_18px] opacity-40" />
      );
    default:
      return null;
  }
}

function Visual({ project, onOpen, className = '' }: { project: Project; onOpen: Props['onOpen']; className?: string }) {
  // Pointer shortcut only; keyboard users use the "View details" button.
  return (
    <div
      onClick={() => onOpen(project)}
      onPointerMove={tilt}
      onPointerLeave={resetTilt}
      data-cursor="View"
      className={`cursor-pointer [perspective:1400px] ${className}`}
    >
      <div
        className={`relative h-full overflow-hidden rounded-2xl border border-line/80 bg-ink transition-[transform,border-color,box-shadow] duration-700 ease-[var(--ease-expo)] will-change-transform group-hover:border-rose/50 group-hover:shadow-[0_24px_60px_-30px_var(--color-pink)] ${
          project.kind === 'enterprise' ? 'beam' : ''
        }`}
      >
        <div className="h-full w-full transition-transform duration-[1.2s] ease-[var(--ease-expo)] group-hover:scale-[1.04]">
          <ProjectVisual project={project} />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,color-mix(in_srgb,var(--color-ink)_60%,transparent))]"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <FrameDecor kind={project.kind} />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(420px_circle_at_var(--gx,50%)_var(--gy,50%),color-mix(in_srgb,var(--color-petal)_16%,transparent),transparent_45%)] opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>
    </div>
  );
}

function Status({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line/80 bg-ink/50 px-3 py-1 text-xs text-blush/90">
      <span aria-hidden className="size-1.5 rounded-full bg-[image:var(--grad-accent)] shadow-[0_0_8px_var(--color-pink)]" />
      {text}
    </span>
  );
}

function Stack({ items, max }: { items: string[]; max: number }) {
  const shown = items.slice(0, max);
  const rest = items.length - shown.length;
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
      {shown.map((tech) => (
        <li key={tech} className="chip">
          {tech}
        </li>
      ))}
      {rest > 0 && (
        <li className="chip !text-mute" aria-label={`and ${rest} more: ${items.slice(max).join(', ')}`}>
          +{rest}
        </li>
      )}
    </ul>
  );
}

function OpenButton({ project, onOpen, primary }: { project: Project; onOpen: Props['onOpen']; primary: boolean }) {
  return (
    <button
      type="button"
      className={`btn ${primary ? 'btn-primary' : 'btn-ghost'} !min-h-11 !px-5 !py-2 text-sm`}
      onClick={() => onOpen(project)}
      aria-haspopup="dialog"
    >
      View details <ArrowRight />
      <span className="sr-only">: {project.title}</span>
    </button>
  );
}

export function ProjectCard({ project, number, variant, flip = false, onOpen, style, className = '' }: Props) {
  const titleId = `${project.id}-title`;
  const shell =
    'gradient-border spotlight surface group relative isolate overflow-hidden rounded-[28px] transition-transform duration-700 ease-[var(--ease-expo)] hover:-translate-y-1.5';

  if (variant === 'feature') {
    const preview = project.outcomes.length ? project.outcomes : project.highlights;
    return (
      <article aria-labelledby={titleId} onPointerMove={trackPointer} className={`${shell} ${className}`} style={style}>
        <div
          aria-hidden
          className={`orb h-80 w-80 bg-pink/15 opacity-60 transition-opacity duration-700 group-hover:opacity-100 ${
            flip ? '-left-24 -bottom-24' : '-right-24 -top-24'
          }`}
        />
        <div className="relative z-10 grid gap-8 p-4 sm:p-6 lg:grid-cols-12 lg:items-center lg:gap-12 lg:p-8">
          <Visual project={project} onOpen={onOpen} className={`aspect-[3/2] lg:col-span-7 ${flip ? 'lg:order-2' : ''}`} />
          <div className={`px-1 pb-2 sm:px-2 lg:col-span-5 lg:pb-0 ${flip ? 'lg:order-1' : ''}`}>
            <div className="flex items-center gap-4">
              <span aria-hidden className="font-display text-5xl font-extrabold leading-none tracking-tighter text-gradient">
                {number}
              </span>
              <p className="eyebrow !text-[0.72rem] leading-snug">{project.category}</p>
            </div>
            <h3
              id={titleId}
              className="mt-4 text-[clamp(1.75rem,3vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.025em] text-blush"
            >
              {project.title}
            </h3>
            <div className="mt-3">
              <Status text={project.status} />
            </div>
            <p className="mt-4 text-lg leading-relaxed text-blush/90">{project.tagline}</p>

            <ul className="mt-5 space-y-2" aria-label={project.outcomes.length ? 'Verified outcomes' : 'Highlights'}>
              {preview.slice(0, 3).map((item) => (
                <li key={item} className="flex gap-2.5 text-[0.95rem] leading-snug text-mute">
                  <Check width={16} height={16} className="mt-0.5 shrink-0 text-rose" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <Stack items={project.stack} max={6} />
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <OpenButton project={project} onOpen={onOpen} primary />
              <ProjectLinks project={project} />
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      aria-labelledby={titleId}
      onPointerMove={trackPointer}
      className={`${shell} flex flex-col ${className}`}
      style={style}
    >
      <div aria-hidden className="orb -right-20 -top-20 h-64 w-64 bg-pink/10 opacity-50 transition-opacity duration-700 group-hover:opacity-100" />
      <div className="relative z-10 flex flex-1 flex-col p-4 sm:p-5">
        <Visual project={project} onOpen={onOpen} className="aspect-[16/10]" />
        <div className="flex flex-1 flex-col px-1 pb-1 pt-6 sm:px-2">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <p className="eyebrow flex items-center gap-3 !text-[0.7rem] leading-snug">
              <span aria-hidden className="text-gradient font-semibold">
                {number}
              </span>
              {project.category}
            </p>
          </div>
          <h3 id={titleId} className="mt-3 text-[clamp(1.5rem,2.4vw,2rem)] font-bold leading-[1.1] tracking-[-0.02em] text-blush">
            {project.title}
          </h3>
          <div className="mt-3">
            <Status text={project.status} />
          </div>
          <p className="mt-4 leading-relaxed text-blush/85">{project.tagline}</p>
          <div className="mt-5">
            <Stack items={project.stack} max={5} />
          </div>
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
            <OpenButton project={project} onOpen={onOpen} primary={false} />
            <ProjectLinks project={project} />
          </div>
        </div>
      </div>
    </article>
  );
}
