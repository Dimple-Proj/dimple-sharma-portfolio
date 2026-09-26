import { useEffect, useRef, type ReactNode } from 'react';
import type { Project } from '../config/projects';
import { Check, Close } from './Icons';
import { ProjectLinks } from './ProjectLinks';
import { ProjectVisual } from './ProjectVisuals';

interface Props {
  project: Project | null;
  onClose: () => void;
}

/** Project detail view built on the native <dialog> (focus trap + Esc for free). */
export function ProjectDialog({ project, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = 'hidden';
    } else if (!project && dialog.open) {
      dialog.close();
    }
  }, [project]);

  const handleClose = () => {
    document.documentElement.style.overflow = '';
    onClose();
  };

  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onClose={handleClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      {project && (
        <div className="gradient-border relative max-h-[calc(100dvh-1.5rem)] overflow-y-auto overflow-x-hidden rounded-[28px] bg-ink-2 [background-image:var(--grad-wine)]">
          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="absolute right-4 top-4 z-20 grid size-11 place-items-center rounded-full border border-line bg-ink/80 text-blush backdrop-blur transition-colors hover:border-rose hover:text-rose"
            aria-label="Close project details"
          >
            <Close />
          </button>

          <div className="relative aspect-[3/2] max-h-[46vh] w-full overflow-hidden border-b border-line/80 sm:aspect-[2/1]">
            <ProjectVisual project={project} />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,var(--color-wine-2))]"
            />
          </div>

          <div className="relative z-10 p-6 sm:p-10">
            <p className="eyebrow !text-[0.72rem]">{project.category}</p>
            <h3
              id="project-dialog-title"
              className="mt-3 text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.025em]"
            >
              {project.title}
            </h3>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-line/80 bg-ink/50 px-3 py-1 text-xs text-blush/90">
              <span aria-hidden className="size-1.5 rounded-full bg-[image:var(--grad-accent)]" />
              {project.status}
            </p>

            <DetailBlock label="Overview" className="mt-8">
              <p className="max-w-2xl text-lg leading-relaxed text-blush/90">{project.tagline}</p>
            </DetailBlock>

            <div className="mt-10 grid gap-10 md:grid-cols-2">
              <DetailBlock label="The problem">
                <p className="leading-relaxed text-blush/85">{project.problem}</p>
              </DetailBlock>
              <DetailBlock label="My contribution">
                <p className="leading-relaxed text-blush/85">{project.contribution}</p>
              </DetailBlock>
            </div>

            <DetailBlock label="Key implementation details" className="mt-10">
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl border border-line/70 bg-ink/40 p-4 leading-relaxed text-blush/90"
                  >
                    <span
                      aria-hidden
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-[image:var(--grad-accent)] shadow-[0_0_8px_var(--color-pink)]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </DetailBlock>

            {project.outcomes.length > 0 && (
              <DetailBlock label="Verified outcomes" className="mt-10">
                <ul className="space-y-3">
                  {project.outcomes.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-blush/90">
                      <Check width={18} height={18} className="mt-0.5 shrink-0 text-rose" />
                      {item}
                    </li>
                  ))}
                </ul>
              </DetailBlock>
            )}

            {project.note && (
              <p className="mt-8 rounded-xl border border-dashed border-line p-4 text-sm leading-relaxed text-mute">
                <span className="font-semibold text-blush/90">Scope note: </span>
                {project.note}
              </p>
            )}

            <DetailBlock label="Tech stack" className="mt-10">
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li key={tech} className="chip">
                    {tech}
                  </li>
                ))}
              </ul>
            </DetailBlock>

            <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-line/70 pt-8">
              <ProjectLinks project={project} size="md" />
              {project.privateNote && <p className="text-sm text-mute">{project.privateNote}.</p>}
              {!project.links.github && !project.links.demo && !project.privateNote && (
                <p className="text-sm text-mute">Public links for this project are not available yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

function DetailBlock({ label, children, className = '' }: { label: string; children: ReactNode; className?: string }) {
  return (
    <section className={className}>
      <h4 className="font-mono text-[0.72rem] font-normal uppercase tracking-[0.16em] text-rose">{label}</h4>
      <div className="mt-3">{children}</div>
    </section>
  );
}
