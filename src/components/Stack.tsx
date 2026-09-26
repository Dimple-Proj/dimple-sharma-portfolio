import { stack } from '../config/site';
import { delay } from '../lib/style';
import { Accent, SectionHeading } from './SectionHeading';

export function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="relative overflow-hidden py-24 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_15%_40%,color-mix(in_srgb,var(--color-wine)_90%,transparent),transparent_70%)]" />
        <div className="orb orb-drift right-[-6%] bottom-[5%] h-[24rem] w-[24rem] bg-pink/10" />
      </div>

      <div className="container-x">
        <SectionHeading
          index="04"
          label="Toolkit"
          id="stack-title"
          lead="Only tools I've used in real projects. Each group shows where."
        >
          The <Accent>stack</Accent> behind the work.
        </SectionHeading>

        <div className="reveal gradient-border overflow-hidden rounded-[28px]">
          <ul className="grid gap-px bg-line/60 sm:grid-cols-2 lg:grid-cols-3">
            {stack.map((group, i) => (
              <li
                key={group.group}
                className="group relative flex flex-col bg-ink-2 p-7 md:p-8"
                style={delay(i * 50)}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,color-mix(in_srgb,var(--color-pink)_16%,var(--color-wine)),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[image:var(--grad-accent)] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-x-100"
                />
                <div className="relative flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-blush">{group.group}</h3>
                  <span className="font-mono text-xs text-mute">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <ul className="relative mt-5 flex flex-wrap gap-2" aria-label={`${group.group} technologies`}>
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-line/80 bg-ink/50 px-3 py-1.5 text-[0.93rem] text-blush/90 transition-colors duration-300 group-hover:border-rose/40"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="relative mt-auto pt-5 text-sm text-mute">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-rose">Used in </span>
                  {group.usedIn}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
