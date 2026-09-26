import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  layer: number;
  phase: number;
  act: number; // activation glow, decays over time
}
interface Edge {
  from: number;
  to: number;
}
interface Pulse {
  edge: number;
  t: number;
  speed: number;
  hops: number;
}

const LAYERS = [4, 6, 7, 6, 3];

function hexToRgb(hex: string): [number, number, number] {
  const value = hex.replace('#', '').trim();
  const full = value.length === 3 ? value.replace(/./g, (c) => c + c) : value;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/**
 * A small feed-forward network drawn on canvas. Signals travel along the
 * edges layer by layer; nodes light up as they receive them and brighten
 * near the pointer. Static frame when reduced motion is requested.
 */
export function NeuralField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const css = getComputedStyle(document.documentElement);
    const color = (name: string, fallback: string) =>
      hexToRgb(css.getPropertyValue(name).trim() || fallback);
    const pink = color('--color-pink', '#f20a79');
    const rose = color('--color-rose', '#ff4da6');
    const petal = color('--color-petal', '#ffb3d6');
    const line = color('--color-line', '#402034');
    const ink = color('--color-ink', '#090509');
    const rgba = ([r, g, b]: [number, number, number], a: number) => `rgba(${r},${g},${b},${a})`;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let outgoing: number[][] = [];
    let pulses: Pulse[] = [];
    let frame = 0;
    let running = false;
    let last = 0;
    let spawnTimer = 0;
    const pointer = { x: -9999, y: -9999 };

    const build = () => {
      nodes = [];
      edges = [];
      const padX = width * 0.1;
      const padY = height * 0.14;
      const layerIndex: number[][] = [];
      LAYERS.forEach((count, l) => {
        const x = padX + (l * (width - padX * 2)) / (LAYERS.length - 1);
        const ids: number[] = [];
        for (let i = 0; i < count; i++) {
          const y = padY + ((i + 0.5) * (height - padY * 2)) / count;
          ids.push(nodes.length);
          nodes.push({ x, y, layer: l, phase: Math.random() * Math.PI * 2, act: 0 });
        }
        layerIndex.push(ids);
      });
      outgoing = nodes.map(() => []);
      for (let l = 0; l < layerIndex.length - 1; l++) {
        for (const a of layerIndex[l]) {
          for (const b of layerIndex[l + 1]) {
            outgoing[a].push(edges.length);
            edges.push({ from: a, to: b });
          }
        }
      }
      pulses = [];
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      if (!running) draw(0);
    };

    const position = (node: Node, time: number) => {
      const float = reduceMotion ? 0 : Math.sin(time * 0.0007 + node.phase) * 5;
      let x = node.x;
      let y = node.y + float;
      const dx = x - pointer.x;
      const dy = y - pointer.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 140 && dist > 0.01) {
        const push = (1 - dist / 140) * 10;
        x += (dx / dist) * push;
        y += (dy / dist) * push;
      }
      return { x, y, near: Math.max(0, 1 - dist / 180) };
    };

    const spawn = () => {
      const firstLayer = nodes.filter((n) => n.layer === 0);
      const start = nodes.indexOf(firstLayer[Math.floor(Math.random() * firstLayer.length)]);
      const options = outgoing[start];
      pulses.push({
        edge: options[Math.floor(Math.random() * options.length)],
        t: 0,
        speed: 0.0009 + Math.random() * 0.0006,
        hops: 0,
      });
    };

    const draw = (time: number) => {
      const dt = last ? Math.min(time - last, 50) : 16;
      last = time;
      ctx.clearRect(0, 0, width, height);

      const pos = nodes.map((n) => position(n, time));

      // edges — gradient strokes from pink to petal
      ctx.lineWidth = 1;
      for (const edge of edges) {
        const a = pos[edge.from];
        const b = pos[edge.to];
        const glow = Math.max(a.near, b.near);
        const gradient = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        gradient.addColorStop(0, rgba(pink, 0.08 + glow * 0.35));
        gradient.addColorStop(1, rgba(petal, 0.04 + glow * 0.25));
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // pulses travelling along edges
      if (!reduceMotion) {
        spawnTimer += dt;
        if (spawnTimer > 260 && pulses.length < 26) {
          spawnTimer = 0;
          spawn();
        }
        const next: Pulse[] = [];
        for (const p of pulses) {
          p.t += p.speed * dt;
          const edge = edges[p.edge];
          const a = pos[edge.from];
          const b = pos[edge.to];
          if (p.t >= 1) {
            nodes[edge.to].act = 1;
            const options = outgoing[edge.to];
            if (options.length && Math.random() < 0.85) {
              next.push({ edge: options[Math.floor(Math.random() * options.length)], t: 0, speed: p.speed, hops: p.hops + 1 });
            }
            continue;
          }
          const x = a.x + (b.x - a.x) * p.t;
          const y = a.y + (b.y - a.y) * p.t;
          // trail
          const tail = Math.max(0, p.t - 0.18);
          const trail = ctx.createLinearGradient(a.x + (b.x - a.x) * tail, a.y + (b.y - a.y) * tail, x, y);
          trail.addColorStop(0, rgba(pink, 0));
          trail.addColorStop(1, rgba(rose, 0.9));
          ctx.strokeStyle = trail;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(a.x + (b.x - a.x) * tail, a.y + (b.y - a.y) * tail);
          ctx.lineTo(x, y);
          ctx.stroke();
          // head
          const halo = ctx.createRadialGradient(x, y, 0, x, y, 9);
          halo.addColorStop(0, rgba(petal, 0.95));
          halo.addColorStop(0.35, rgba(rose, 0.55));
          halo.addColorStop(1, rgba(pink, 0));
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(x, y, 9, 0, Math.PI * 2);
          ctx.fill();
          next.push(p);
        }
        pulses = next;
      }

      // nodes
      nodes.forEach((node, i) => {
        const { x, y, near } = pos[i];
        const energy = Math.max(node.act, near * 0.8);
        if (energy > 0.02) {
          const r = 16 + energy * 10;
          const halo = ctx.createRadialGradient(x, y, 0, x, y, r);
          halo.addColorStop(0, rgba(pink, 0.35 * energy));
          halo.addColorStop(1, rgba(pink, 0));
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
        const radius = node.layer === 0 || node.layer === LAYERS.length - 1 ? 4.5 : 3.6;
        ctx.fillStyle = rgba(ink, 1);
        ctx.beginPath();
        ctx.arc(x, y, radius + 1.5, 0, Math.PI * 2);
        ctx.fill();
        const fill = ctx.createLinearGradient(x - radius, y - radius, x + radius, y + radius);
        fill.addColorStop(0, rgba(pink, 0.55 + energy * 0.45));
        fill.addColorStop(1, rgba(petal, 0.45 + energy * 0.55));
        ctx.fillStyle = fill;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = rgba(line, 0.9);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, radius + 5, 0, Math.PI * 2);
        ctx.stroke();
        node.act = Math.max(0, node.act - dt * 0.0016);
      });
    };

    const loop = (time: number) => {
      draw(time);
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      last = 0;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      if (reduceMotion) draw(0);
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Only animate while visible on screen and the tab is active
    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !document.hidden) start();
      else stop();
    });
    visibility.observe(canvas);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pointermove', onPointer, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibility.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointer);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
