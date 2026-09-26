import { timeline } from '../config/site';
import { delay } from '../lib/style';
import { Accent, SectionHeading } from './SectionHeading';

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-24 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hairline absolute inset-x-0 top-0 opacity-40" />
      </div>

      <div className="container-x">
        <SectionHeading
          index="03"
          label="Experience"
          id="experience-title"
          lead="Where I've been learning by doing — in a team, on real projects."
        >
          Experience &amp; <Accent>education</Accent>.
        </SectionHeading>

        <ol className="relative">
          {/* gradient rail */}
          <span
            aria-hidden
            className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-pink via-rose/50 to-transparent md:left-[calc(25%+7px)]"
          />
          {timeline.map((entry, i) => (
            <li
              key={entry.org + entry.role}
              className="reveal relative grid gap-4 pb-14 pl-10 last:pb-0 md:grid-cols-4 md:gap-10 md:pl-0"
              style={delay(i * 100)}
            >
              <div className="md:pr-10 md:text-right">
                <p className="font-mono text-sm text-blush/90">{entry.dates}</p>
                <p className="eyebrow mt-1 !text-[0.7rem]">{entry.kind}</p>
              </div>

              <span
                aria-hidden
                className="absolute left-0 top-1 grid size-[15px] place-items-center rounded-full bg-ink ring-1 ring-rose/70 md:left-[25%]"
              >
                <span className="size-[7px] rounded-full bg-[image:var(--grad-accent)] shadow-[0_0_10px_var(--color-pink)]" />
              </span>

              <div className="group gradient-border spotlight surface relative overflow-hidden rounded-3xl p-6 md:col-span-3 md:ml-10 md:p-8">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold tracking-tight text-blush md:text-[1.7rem]">{entry.role}</h3>
                  <p className="mt-1 text-lg font-medium text-gradient">{entry.org}</p>
                  <p className="mt-4 max-w-[62ch] leading-relaxed text-blush/85">{entry.summary}</p>
                  <ul className="mt-5 space-y-2.5">
                    {entry.points.map((point) => (
                      <li key={point} className="flex gap-3 leading-relaxed text-mute">
                        <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-rose" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Focus areas">
                    {entry.tags.map((tag) => (
                      <li key={tag} className="chip">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
