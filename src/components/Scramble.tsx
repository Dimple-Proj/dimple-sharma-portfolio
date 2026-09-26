import { useEffect, useRef } from 'react';

const GLYPHS = '01<>/\\[]{}=+*#_-';

/**
 * Decodes text from random glyphs when it scrolls into view, and again on
 * hover. Screen readers get the plain text; the animated copy is hidden.
 */
export function Scramble({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const play = () => {
      cancelAnimationFrame(frame);
      let start = 0;
      const step = (time: number) => {
        if (!start) start = time;
        const progress = Math.min((time - start) / 750, 1);
        const settled = Math.floor(progress * text.length);
        let out = '';
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          out += i < settled || ch === ' ' ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        el.textContent = out;
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          play();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    el.addEventListener('pointerenter', play);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.removeEventListener('pointerenter', play);
    };
  }, [text]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden>
        {text}
      </span>
    </span>
  );
}
