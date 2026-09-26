import type { ReactNode } from 'react';
import { delay } from '../lib/style';
import { Scramble } from './Scramble';

interface Props {
  index: string;
  label: string;
  id: string;
  children: ReactNode;
  lead?: ReactNode;
}

export function SectionHeading({ index, label, id, children, lead }: Props) {
  return (
    <header className="mb-14 md:mb-20">
      <p className="eyebrow reveal flex items-center gap-4">
        <span className="text-gradient font-semibold">{index}</span>
        <span className="h-px w-12 bg-[image:var(--grad-accent)]" aria-hidden />
        <Scramble text={label} />
      </p>
      <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-end">
        <h2
          id={id}
          className="reveal text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[1.02] tracking-[-0.03em] text-blush lg:col-span-7"
          style={delay(60)}
        >
          {children}
        </h2>
        {lead && (
          <p
            className="reveal max-w-md text-lg leading-relaxed text-mute lg:col-span-5 lg:justify-self-end"
            style={delay(120)}
          >
            {lead}
          </p>
        )}
      </div>
    </header>
  );
}

/** Serif italic accent word with gradient fill. */
export function Accent({ children }: { children: ReactNode }) {
  return (
    <span className="text-gradient pr-[0.08em] font-serif text-[1.08em] font-normal italic tracking-[-0.01em]">
      {children}
    </span>
  );
}
