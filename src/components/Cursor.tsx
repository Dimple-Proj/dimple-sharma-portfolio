import { useEffect, useRef } from 'react';

/**
 * A soft trailing ring + dot that complements (never replaces) the native
 * cursor. Grows over links/buttons and shows a label over `[data-cursor]`.
 * Only enabled for fine pointers without reduced-motion preferences.
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!ring || !dot || !label) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let visible = false;
    let frame = 0;

    const show = (on: boolean) => {
      visible = on;
      ring.style.opacity = on ? '1' : '0';
      dot.style.opacity = on ? '1' : '0';
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      x = event.clientX;
      y = event.clientY;
      if (!visible) {
        rx = x;
        ry = y;
        show(true);
      }
      const target = (event.target as Element | null)?.closest?.('a, button, [data-cursor], summary, label');
      const text = target?.getAttribute('data-cursor') ?? '';
      ring.dataset.state = target ? (text ? 'label' : 'hover') : '';
      if (label.textContent !== text) label.textContent = text;
    };

    const tick = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    const onLeave = () => show(false);
    const onDown = () => ring.classList.add('is-down');
    const onUp = () => ring.classList.remove('is-down');

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.documentElement.addEventListener('pointerleave', onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div aria-hidden>
      <div ref={ringRef} className="cursor-ring">
        <span className="cursor-ring-shape" />
        <span ref={labelRef} className="cursor-label" />
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
