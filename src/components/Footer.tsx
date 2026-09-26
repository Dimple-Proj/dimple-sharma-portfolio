import { navItems, person } from '../config/site';
import { ArrowUp } from './Icons';

export function Footer() {
  return (
    <footer className="relative pb-10 pt-6">
      <div className="container-x">
        <div className="hairline mb-10 opacity-70" />
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-lg font-semibold text-blush">
              {person.name}
              <span className="text-gradient">.</span>
            </p>
            <p className="mt-1 text-sm text-mute">
              © {new Date().getFullYear()} · Designed &amp; built with React, TypeScript &amp; Tailwind.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-mute transition-colors hover:text-rose">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="#home"
            className="group inline-flex items-center gap-2 self-start text-sm text-mute transition-colors hover:text-blush md:self-auto"
          >
            Back to top
            <span className="grid size-9 place-items-center rounded-full border border-line transition-all duration-500 group-hover:-translate-y-1 group-hover:border-transparent group-hover:bg-[image:var(--grad-button)] group-hover:text-ink">
              <ArrowUp width={16} height={16} />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
