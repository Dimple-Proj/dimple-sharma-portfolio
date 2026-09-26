import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { links, navItems, person, resumeDownloadName } from '../config/site';
import { Download } from './Icons';
import { useActiveSection } from '../hooks/useActiveSection';

const NAV_IDS = navItems.map((item) => item.id);

export function Nav() {
  const active = useActiveSection(NAV_IDS);
  const [open, setOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  // Scroll state + gradient progress bar (DOM writes only, no re-renders)
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (headerRef.current) headerRef.current.dataset.scrolled = String(y > 24);
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
        }
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  // Slide the gradient pill under the active link
  useLayoutEffect(() => {
    const place = () => {
      const link = listRef.current?.querySelector<HTMLAnchorElement>(`a[href="#${active}"]`);
      const pill = pillRef.current;
      if (!link || !pill) return;
      pill.style.width = `${link.offsetWidth}px`;
      pill.style.transform = `translateX(${link.offsetLeft}px)`;
      pill.style.opacity = '1';
    };
    place();
    document.fonts?.ready.then(place);
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [active]);

  // Mobile menu: lock scroll, close on Escape, manage focus
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = 'hidden';
    mobilePanelRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    const button = menuButtonRef.current;
    return () => {
      root.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      button?.focus();
    };
  }, [open]);

  return (
    <>
    <header
      ref={headerRef}
      data-scrolled="false"
      className="group/header fixed inset-x-0 top-0 z-50 transition-colors duration-500 data-[scrolled=true]:bg-ink/75 data-[scrolled=true]:backdrop-blur-xl"
    >
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-6">
        <a
          href="#home"
          className="group relative z-10 flex items-center gap-3 rounded-full"
          aria-label={`${person.name} — back to top`}
          onClick={() => setOpen(false)}
        >
          <span className="relative grid size-9 place-items-center overflow-hidden rounded-xl bg-[image:var(--grad-button)] bg-[length:200%_100%] font-display text-sm font-extrabold text-ink transition-[background-position] duration-700 group-hover:bg-[position:100%_0]">
            {person.initials}
          </span>
          <span className="font-display text-[1.05rem] font-semibold tracking-tight text-blush">
            {person.firstName}
            <span className="text-gradient">.</span>
            <span className="text-mute transition-colors group-hover:text-blush">sharma</span>
          </span>
        </a>

        {/* Desktop */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul
            ref={listRef}
            className="relative flex items-center gap-1 rounded-full border border-line/80 bg-ink-2/60 p-1 backdrop-blur-md"
          >
            <span
              ref={pillRef}
              aria-hidden
              className="absolute left-0 top-1 bottom-1 rounded-full opacity-0 transition-[transform,width] duration-500 ease-[var(--ease-expo)]"
              style={{
                background:
                  'linear-gradient(135deg, color-mix(in srgb, var(--color-pink) 26%, var(--color-wine)), var(--color-wine))',
                boxShadow:
                  'inset 0 0 0 1px color-mix(in srgb, var(--color-rose) 45%, transparent), 0 6px 22px -10px var(--color-pink)',
              }}
            />
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="relative">
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative block rounded-full px-4 py-2 text-[0.92rem] font-medium transition-colors duration-300 ${
                      isActive ? 'text-blush' : 'text-mute hover:text-blush'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {links.resume && (
            <a href={links.resume} download={resumeDownloadName} className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-mute transition-colors hover:text-blush">
              <Download width={16} height={16} /> Resume
              <span className="sr-only"> (download PDF)</span>
            </a>
          )}
          <a href="#contact" data-magnetic className="btn btn-primary !min-h-10 !px-5 !py-2 text-sm">
            Let&apos;s connect
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          ref={menuButtonRef}
          type="button"
          className="relative z-10 grid size-11 place-items-center rounded-full border border-line bg-ink-2/70 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 h-[2px] w-5 rounded-full bg-blush transition-transform duration-300 ${
                open ? 'top-[5px] rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 h-[2px] w-5 rounded-full bg-[image:var(--grad-accent)] transition-transform duration-300 ${
                open ? 'top-[5px] -rotate-45' : 'top-[10px]'
              }`}
            />
          </span>
        </button>
      </div>

      {/* Gradient scroll progress */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-line/0 transition-colors group-data-[scrolled=true]/header:bg-line/60">
        <div
          ref={progressRef}
          className="h-full origin-left scale-x-0 bg-[image:var(--grad-accent)]"
          aria-hidden
        />
      </div>

    </header>
    {/* Mobile panel */}
    <div
      id="mobile-menu"
      ref={mobilePanelRef}
      hidden={!open}
      className="fixed inset-0 z-40 overflow-y-auto bg-ink md:hidden"
    >
      <div className="orb -right-20 top-10 h-72 w-72 bg-pink/30" aria-hidden />
      <div className="orb -left-24 bottom-10 h-80 w-80 bg-wine" aria-hidden />
      <nav aria-label="Mobile" className="container-x relative flex min-h-full flex-col pb-10 pt-28">
        <ul className="flex flex-col">
          {navItems.map((item, index) => (
            <li
              key={item.id}
              className="border-b border-line/70 motion-safe:animate-[dialog-in_0.6s_var(--ease-expo)_both]"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === item.id ? 'location' : undefined}
                className="group flex items-baseline justify-between py-5 font-display text-4xl font-semibold tracking-tight"
              >
                <span className={active === item.id ? 'text-gradient' : 'text-blush'}>{item.label}</span>
                <span className="font-mono text-xs text-mute">0{index + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-auto pt-10 text-sm text-mute">
          <span className="pulse-dot mr-2 align-middle" aria-hidden />
          {person.availability}
        </p>
      </nav>
    </div>
    </>
  );
}
