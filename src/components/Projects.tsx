import { useState } from 'react';
import { projectFilters, projects, type Project, type ProjectCategory } from '../config/projects';
import { ProjectCard } from './ProjectCard';
import { ProjectDialog } from './ProjectDialog';
import { Accent, SectionHeading } from './SectionHeading';

type Filter = 'all' | ProjectCategory;

const spanFor: Record<Project['layout'], string> = {
  feature: 'md:col-span-2 lg:col-span-12',
  wide: 'lg:col-span-7',
  narrow: 'lg:col-span-5',
};

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState<Filter>('all');

  const visible = filter === 'all' ? projects : projects.filter((p) => p.categories.includes(filter));
  const countFor = (id: Filter) => (id === 'all' ? projects.length : projects.filter((p) => p.categories.includes(id)).length);
  let featureCount = 0;

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-24 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="hairline absolute inset-x-0 top-0 opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_0%,color-mix(in_srgb,var(--color-wine)_85%,transparent),transparent_70%)]" />
        <div className="orb orb-drift left-[-10%] top-[30%] h-[28rem] w-[28rem] bg-pink/10" />
        <div className="orb orb-drift-slow right-[-8%] top-[65%] h-[30rem] w-[30rem] bg-rose/10" />
      </div>

      <div className="container-x">
        <SectionHeading
          index="02"
          label="Selected work"
          id="projects-title"
          lead="Enterprise AI, computer vision, machine learning and frontend work: projects where I took an idea to something that runs."
        >
          Selected things I&apos;ve <Accent>built</Accent>.
        </SectionHeading>

        <div className="reveal">
          {/* Filter bar */}
          <div className="-mx-1 mb-10 overflow-x-auto px-1 pb-2 [scrollbar-width:none] md:mb-12">
            <div
              role="group"
              aria-label="Filter projects by category"
              className="inline-flex min-w-max gap-1 rounded-full border border-line/80 bg-ink-2/70 p-1 backdrop-blur-md"
            >
              {projectFilters.map((f) => {
                const active = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(f.id)}
                    className={`flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-[color,background,box-shadow] duration-300 ${
                      active
                        ? 'bg-[linear-gradient(135deg,color-mix(in_srgb,var(--color-pink)_28%,var(--color-wine)),var(--color-wine))] text-blush shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--color-rose)_50%,transparent),0_6px_22px_-10px_var(--color-pink)]'
                        : 'text-mute hover:text-blush'
                    }`}
                  >
                    {f.label}
                    <span
                      className={`rounded-full px-1.5 font-mono text-[0.68rem] ${active ? 'bg-pink/25 text-blush' : 'bg-line/60 text-mute'}`}
                    >
                      {countFor(f.id)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <p className="sr-only" aria-live="polite">
            Showing {visible.length} project{visible.length === 1 ? '' : 's'}
          </p>

          {/* Grid — re-keyed on filter so cards animate in */}
          <div key={filter} className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-12">
            {visible.map((project, i) => {
              const number = String(projects.indexOf(project) + 1).padStart(2, '0');
              const feature = filter === 'all' && project.layout === 'feature';
              const span =
                filter === 'all'
                  ? spanFor[project.layout]
                  : visible.length === 1
                    ? 'md:col-span-2 lg:col-span-12'
                    : 'lg:col-span-6';
              const flip = feature && featureCount++ % 2 === 1;
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  number={number}
                  variant={feature ? 'feature' : 'stacked'}
                  flip={flip}
                  onOpen={setSelected}
                  className={`card-in ${span}`}
                  style={{ animationDelay: `${Math.min(i, 6) * 70}ms` }}
                />
              );
            })}
          </div>
        </div>
      </div>

      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
