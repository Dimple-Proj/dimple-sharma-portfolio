import { useId, type ReactNode } from 'react';
import type { Project, ProjectVisualKey } from '../config/projects';

/*
 * Custom SVG illustrations for each project. They are explanatory
 * diagrams of each system — not screenshots, and they show no metrics.
 * Colours come from the theme CSS variables.
 */

type U = (name: string) => string;
type Tone = 'pink' | 'rose' | 'petal' | 'wine' | 'wine-2' | 'ink' | 'ink-2' | 'line' | 'blush';

function Stop({ o = 0, c, a = 1 }: { o?: number; c: Tone; a?: number }) {
  return <stop offset={o} style={{ stopColor: `var(--color-${c})`, stopOpacity: a }} />;
}

const label = 'fill-mute font-mono';

function Scene({ title, children }: { title: string; children: (u: U) => ReactNode }) {
  const id = 'v' + useId().replace(/[^a-zA-Z0-9]/g, '');
  const u: U = (name) => `url(#${id}-${name})`;
  return (
    <svg viewBox="0 0 600 400" className="block h-full w-full overflow-visible" role="img" aria-label={title}>
      <defs>
        <linearGradient id={`${id}-accent`} x1="0" y1="0" x2="1" y2="1">
          <Stop c="pink" />
          <Stop o={0.55} c="rose" />
          <Stop o={1} c="petal" />
        </linearGradient>
        {/* user-space version so straight lines render the gradient too */}
        <linearGradient id={`${id}-line`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="600" y2="0">
          <Stop c="pink" />
          <Stop o={0.5} c="rose" />
          <Stop o={1} c="petal" />
        </linearGradient>
        <linearGradient id={`${id}-soft`} x1="0" y1="0" x2="1" y2="1">
          <Stop c="pink" a={0.38} />
          <Stop o={1} c="wine" a={0.2} />
        </linearGradient>
        <linearGradient id={`${id}-panel`} x1="0" y1="0" x2="0" y2="1">
          <Stop c="wine" a={0.95} />
          <Stop o={1} c="ink-2" />
        </linearGradient>
        <linearGradient id={`${id}-bar`} x1="0" y1="1" x2="0" y2="0">
          <Stop c="pink" a={0.4} />
          <Stop o={1} c="rose" />
        </linearGradient>
        <radialGradient id={`${id}-bg`} gradientUnits="userSpaceOnUse" cx="468" cy="48" r="620">
          <Stop c="pink" a={0.3} />
          <Stop o={0.38} c="wine" a={0.95} />
          <Stop o={1} c="ink" />
        </radialGradient>
        <radialGradient id={`${id}-dot`}>
          <Stop c="petal" />
          <Stop o={0.5} c="rose" />
          <Stop o={1} c="pink" />
        </radialGradient>
        <pattern id={`${id}-grid`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" className="stroke-line" strokeOpacity="0.45" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect x="-600" y="-400" width="1800" height="1200" className="fill-ink" />
      <rect x="-600" y="-400" width="1800" height="1200" fill={u('bg')} />
      <rect x="-600" y="-400" width="1800" height="1200" fill={u('grid')} opacity="0.55" />
      {children(u)}
    </svg>
  );
}

function Arrow({ d, u }: { d: string; u: U }) {
  return <path d={d} fill="none" stroke={u('line')} strokeWidth="2" strokeLinecap="round" className="svg-flow" />;
}

/* 1 · Smart Recycling AI */
function Recycling() {
  const rows: [string, number][] = [
    ['Plastic', 150],
    ['Glass', 72],
    ['Metal', 48],
    ['Paper', 32],
    ['Cardboard', 20],
    ['Trash', 10],
  ];
  return (
    <Scene title="Diagram: an image passes through a ResNet18 classifier and is sorted into six waste categories with recycling guidance">
      {(u) => (
        <>
          <g transform="translate(40 88)">
            <rect width="170" height="216" rx="16" className="fill-ink-2 stroke-line" />
            <rect x="10" y="10" width="150" height="196" rx="10" fill={u('soft')} opacity="0.55" />
            <g className="svg-float">
              <rect x="72" y="30" width="26" height="10" rx="3" fill={u('accent')} />
              <path
                d="M74 40h22v18c0 8 20 16 20 38v78c0 9-7 16-16 16H70c-9 0-16-7-16-16V96c0-22 20-30 20-38z"
                fill={u('panel')}
                stroke={u('accent')}
                strokeWidth="2"
              />
              <rect x="56" y="112" width="58" height="34" rx="4" fill={u('accent')} opacity="0.3" />
            </g>
            <g className="stroke-rose" fill="none" strokeWidth="2" strokeLinecap="round">
              <path d="M8 28V8h20M142 8h20v20M162 188v20h-20M28 208H8v-20" />
            </g>
            <rect className="svg-scan" x="10" y="12" width="150" height="3" rx="1.5" fill={u('line')} />
            <text x="0" y="238" fontSize="12" className={label}>
              input image
            </text>
          </g>

          <Arrow d="M222 196h44" u={u} />

          {[0, 1, 2, 3].map((i) => {
            const x = 280 + i * 22;
            const h = 150 - i * 26;
            const y = 196 - h / 2;
            return (
              <path
                key={i}
                d={`M${x} ${y + 10}L${x + 16} ${y}V${y + h - 10}L${x} ${y + h}Z`}
                fill={u('soft')}
                stroke={u('accent')}
                strokeOpacity={0.45 + i * 0.15}
              />
            );
          })}
          <text x="324" y="300" textAnchor="middle" fontSize="12" className={label}>
            ResNet18
          </text>

          <Arrow d="M374 196h22" u={u} />

          {rows.map(([name, width], i) => (
            <g key={name} transform={`translate(408 ${96 + i * 32})`}>
              <text y="10" fontSize="12" className={`font-mono ${i === 0 ? 'fill-blush' : 'fill-mute'}`}>
                {name}
              </text>
              <rect y="16" width="160" height="6" rx="3" className="fill-line" opacity="0.7" />
              <rect y="16" width={width} height="6" rx="3" style={{ fill: i === 0 ? u('accent') : 'var(--color-rose)' }} opacity={i === 0 ? 1 : 0.35} />
            </g>
          ))}
          <g transform="translate(408 296)">
            <rect width="160" height="30" rx="15" fill={u('soft')} className="stroke-pink" strokeOpacity="0.6" />
            <text x="16" y="19" fontSize="11" className="fill-blush font-mono">
              ↻ recycling guidance
            </text>
          </g>
        </>
      )}
    </Scene>
  );
}

/* 2 · Credit Risk Prediction */
function Credit() {
  const cells = [
    [52, 36, 44],
    [40, 48, 30],
    [56, 30, 40],
    [44, 42, 50],
    [36, 52, 34],
    [50, 34, 46],
    [42, 46, 38],
  ];
  // needle for an illustrative position on the gauge (no real score)
  const angle = Math.PI + 0.64 * Math.PI;
  const nx = 500 + Math.cos(angle) * 54;
  const ny = 232 + Math.sin(angle) * 54;
  return (
    <Scene title="Diagram: applicant data feeds a Logistic Regression model and an XGBoost model that estimate credit risk">
      {(u) => (
        <>
          <g transform="translate(36 96)">
            <rect width="190" height="210" rx="14" className="fill-ink-2 stroke-line" />
            <rect width="190" height="32" rx="14" fill={u('soft')} />
            <text x="14" y="21" fontSize="12" className="fill-blush font-mono">
              applicant_data
            </text>
            {cells.map((row, r) => (
              <g key={r} transform={`translate(14 ${46 + r * 23})`}>
                {r === 3 && <rect x="-8" y="-6" width="178" height="20" rx="6" fill={u('soft')} />}
                <rect width={row[0]} height="7" rx="3.5" className={r === 3 ? 'fill-rose' : 'fill-line'} />
                <rect x="62" width={row[1]} height="7" rx="3.5" className="fill-line" />
                <rect x="116" width={row[2]} height="7" rx="3.5" className="fill-line" />
              </g>
            ))}
          </g>

          <Arrow d="M228 200C252 200 250 150 272 150" u={u} />
          <Arrow d="M228 200C252 200 250 250 272 250" u={u} />

          <g transform="translate(272 124)">
            <rect width="134" height="52" rx="12" fill={u('panel')} className="stroke-line" />
            <text x="14" y="31" fontSize="12" className="fill-blush font-mono">
              LogReg
            </text>
            <path d="M84 38C98 38 100 14 120 14" fill="none" stroke={u('accent')} strokeWidth="2" />
          </g>
          <g transform="translate(272 224)">
            <rect width="134" height="52" rx="12" fill={u('panel')} stroke={u('accent')} />
            <text x="14" y="31" fontSize="12" className="fill-blush font-mono">
              XGBoost
            </text>
            {[0, 1, 2].map((t) => (
              <g key={t} transform={`translate(${82 + t * 16} 16)`} className="stroke-rose" fill="none" strokeWidth="1.4">
                <path d="M5 0V6M5 6L1 12M5 6L9 12M1 12L0 18M9 12L10 18" />
              </g>
            ))}
          </g>

          <Arrow d="M408 150C428 150 424 200 440 212" u={u} />
          <Arrow d="M408 250C428 250 424 226 440 222" u={u} />

          <path d="M432 232A68 68 0 0 1 568 232" fill="none" className="stroke-line" strokeWidth="12" strokeLinecap="round" />
          <path
            d="M432 232A68 68 0 0 1 568 232"
            fill="none"
            stroke={u('line')}
            strokeWidth="12"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray="64 100"
          />
          <line x1="500" y1="232" x2={nx} y2={ny} className="stroke-blush" strokeWidth="3" strokeLinecap="round" />
          <circle cx="500" cy="232" r="7" fill={u('dot')} />
          <text x="500" y="266" textAnchor="middle" fontSize="12" className="fill-blush font-mono">
            risk
          </text>
          <text x="428" y="258" fontSize="10" className={label}>
            low
          </text>
          <text x="572" y="258" textAnchor="end" fontSize="10" className={label}>
            high
          </text>
        </>
      )}
    </Scene>
  );
}

/* 3 · RailTel Procurement Chatbot (RAG) */
function Rag() {
  const dots = [
    [238, 150], [256, 138], [276, 152], [248, 172], [270, 176], [290, 168],
    [236, 196], [258, 204], [282, 198], [296, 214], [246, 222], [270, 230],
    [228, 176], [300, 186], [262, 160], [284, 222],
  ];
  const hits = new Set([4, 7, 13]);
  return (
    <Scene title="Diagram: department documents are embedded, retrieved with role-based access, and passed to an LLM that answers with citations">
      {(u) => (
        <>
          <g transform="translate(36 58)">
            <rect width="156" height="28" rx="14" fill={u('soft')} className="stroke-pink" strokeOpacity="0.55" />
            <g transform="translate(12 7)" className="stroke-rose" fill="none" strokeWidth="1.6">
              <rect x="1" y="6" width="12" height="9" rx="2" />
              <path d="M4 6V4a3 3 0 0 1 6 0v2" />
            </g>
            <text x="32" y="18" fontSize="11" className="fill-blush font-mono">
              role-based access
            </text>
          </g>

          {[2, 1, 0].map((i) => (
            <g key={i} transform={`translate(${36 + i * 10} ${104 + i * 12})`}>
              <rect width="120" height="150" rx="10" fill={u('panel')} className="stroke-line" />
              {i === 0 &&
                [60, 88, 72, 94, 50, 80, 66].map((w, l) => (
                  <rect
                    key={l}
                    x="14"
                    y={22 + l * 16}
                    width={w}
                    height="6"
                    rx="3"
                    style={{ fill: l === 3 ? u('accent') : 'var(--color-line)' }}
                  />
                ))}
            </g>
          ))}
          <text x="36" y="300" fontSize="11" className={label}>
            dept. knowledge bases
          </text>

          <Arrow d="M180 186h36" u={u} />

          {dots.map(([x, y], i) =>
            hits.has(i) ? (
              <g key={i}>
                <circle cx={x} cy={y} r="11" fill="none" className="stroke-rose" strokeOpacity="0.6" />
                <circle cx={x} cy={y} r="5" fill={u('dot')} />
              </g>
            ) : (
              <circle key={i} cx={x} cy={y} r="3.5" className="fill-mute" opacity="0.35" />
            ),
          )}
          <text x="264" y="300" textAnchor="middle" fontSize="11" className={label}>
            retrieve
          </text>

          <Arrow d="M312 186h24" u={u} />

          <g transform="translate(340 146)">
            <rect width="80" height="80" rx="18" fill={u('panel')} stroke={u('accent')} strokeWidth="1.5" />
            <circle cx="40" cy="40" r="22" fill={u('soft')} />
            <text x="40" y="46" textAnchor="middle" fontSize="16" fontWeight="700" className="fill-blush font-display">
              LLM
            </text>
          </g>
          <text x="380" y="300" textAnchor="middle" fontSize="11" className={label}>
            generate
          </text>

          <Arrow d="M422 186h22" u={u} />

          <g transform="translate(448 72)">
            <rect width="126" height="232" rx="16" fill={u('panel')} className="stroke-line" />
            <text x="14" y="26" fontSize="11" className="fill-blush font-mono">
              answer
            </text>
            {[92, 80, 98, 64, 86, 72, 90, 54].map((w, l) => (
              <rect key={l} x="14" y={42 + l * 16} width={w} height="6" rx="3" className="fill-line" />
            ))}
            {['[1]', '[2]'].map((c, i) => (
              <g key={c} transform={`translate(${14 + i * 44} 186)`}>
                <rect width="36" height="22" rx="11" fill={u('soft')} className="stroke-pink" strokeOpacity="0.7" />
                <text x="18" y="15" textAnchor="middle" fontSize="11" className="fill-blush font-mono">
                  {c}
                </text>
              </g>
            ))}
            <text x="14" y="224" fontSize="10" className={label}>
              cited sources
            </text>
          </g>
        </>
      )}
    </Scene>
  );
}

/* 4 · AI Data Annotation Pilot */
function Annotation() {
  const tracks: { name: string; segs: [number, number][] }[] = [
    { name: 'task', segs: [[0, 300]] },
    { name: 'sub-task', segs: [[0, 120], [128, 196], [204, 300]] },
    { name: 'action', segs: [[0, 44], [50, 96], [102, 120], [128, 170], [176, 196], [204, 250], [256, 300]] },
  ];
  const rows = [
    ['00:02', '00:05', 'reach(obj)'],
    ['00:05', '00:09', 'grasp(obj)'],
    ['00:09', '00:14', 'move(obj)'],
    ['00:14', '00:17', 'place(obj)'],
    ['00:17', '00:22', 'release(obj)'],
  ];
  return (
    <Scene title="Diagram: a pilot video annotated on task, sub-task and action timelines and exported as structured CSV files">
      {(u) => (
        <>
          {/* video frame */}
          <g transform="translate(30 36)">
            <rect width="330" height="196" rx="12" fill={u('panel')} className="stroke-line" />
            <path d="M40 196L110 96H220L290 196Z" className="fill-ink-2" opacity="0.9" />
            <path d="M110 96H220" className="stroke-line" />
            <rect x="150" y="112" width="30" height="36" rx="5" fill={u('soft')} className="stroke-rose" strokeOpacity="0.6" />
            <g className="fill-mute" opacity="0.45">
              <rect x="70" y="150" width="54" height="30" rx="15" transform="rotate(-18 97 165)" />
              <rect x="196" y="140" width="54" height="30" rx="15" transform="rotate(20 223 155)" />
            </g>
            <rect x="140" y="102" width="50" height="56" rx="4" fill="none" className="stroke-pink" strokeWidth="1.6" strokeDasharray="4 3" />
            <rect x="12" y="12" width="84" height="20" rx="10" className="fill-ink" opacity="0.8" />
            <text x="22" y="26" fontSize="10" className="fill-blush font-mono">
              ▶ 00:12.4
            </text>
            <text x="318" y="26" textAnchor="end" fontSize="10" className={label}>
              pilot video
            </text>
          </g>

          {/* CSV panel */}
          <g transform="translate(378 36)">
            <rect width="194" height="196" rx="12" fill={u('panel')} stroke={u('accent')} strokeOpacity="0.8" />
            <text x="14" y="24" fontSize="11" className="fill-blush font-mono">
              annotations.csv
            </text>
            <line x1="14" y1="34" x2="180" y2="34" className="stroke-line" />
            {['start', 'end', 'label'].map((h, i) => (
              <text key={h} x={14 + i * 44} y="50" fontSize="9" className="fill-rose font-mono">
                {h}
              </text>
            ))}
            {rows.map((r, i) => (
              <g key={i} transform={`translate(14 ${70 + i * 24})`}>
                {i === 2 && <rect x="-6" y="-12" width="178" height="18" rx="4" fill={u('soft')} />}
                <text fontSize="9.5" className="fill-mute font-mono">
                  {r[0]}
                </text>
                <text x="44" fontSize="9.5" className="fill-mute font-mono">
                  {r[1]}
                </text>
                <text x="88" fontSize="9.5" className="fill-blush font-mono">
                  {r[2]}
                </text>
              </g>
            ))}
          </g>

          {/* timeline tracks */}
          <g transform="translate(30 262)">
            {tracks.map((t, i) => (
              <g key={t.name} transform={`translate(0 ${i * 30})`}>
                <text y="14" fontSize="10" className={label}>
                  {t.name}
                </text>
                <rect x="70" y="2" width="472" height="16" rx="4" className="fill-ink-2" />
                {t.segs.map(([a, b], j) => (
                  <rect
                    key={j}
                    x={70 + (a / 300) * 472}
                    y="2"
                    width={((b - a) / 300) * 472 - 2}
                    height="16"
                    rx="4"
                    fill={i === 0 ? u('soft') : u('accent')}
                    opacity={i === 0 ? 1 : 0.35 + (j % 3) * 0.2}
                  />
                ))}
              </g>
            ))}
            <line x1="250" y1="-8" x2="250" y2="90" className="stroke-blush" strokeWidth="1.5" />
            <circle cx="250" cy="-8" r="4" fill={u('dot')} />
          </g>
          <text x="30" y="386" fontSize="10" className={label}>
            timestamped labels → structured CSV
          </text>
        </>
      )}
    </Scene>
  );
}

/* 5 · Predco / Sentinel */
function Sentinel() {
  const boxes: [number, number, number, number, 'person' | 'box'][] = [
    [44, 50, 34, 70, 'person'],
    [92, 72, 62, 42, 'box'],
    [26, 62, 46, 48, 'box'],
    [110, 46, 32, 74, 'person'],
  ];
  const events = [96, 72, 110, 60, 84, 70];
  const hist = [18, 30, 22, 40, 26, 48, 34, 20, 38, 28, 44, 24];
  return (
    <Scene title="Diagram: four CCTV feeds with object detection boxes and a monitoring dashboard panel">
      {(u) => (
        <>
          {boxes.map(([bx, by, bw, bh, kind], i) => {
            const x = 30 + (i % 2) * 192;
            const y = 40 + Math.floor(i / 2) * 152;
            return (
              <g key={i} transform={`translate(${x} ${y})`}>
                <rect width="180" height="140" rx="12" fill={u('panel')} className="stroke-line" />
                <g className="stroke-line" strokeWidth="1" fill="none">
                  <path d="M90 58L0 140M90 58L180 140M0 104H180M0 122H180" opacity="0.8" />
                </g>
                {kind === 'person' ? (
                  <g className="fill-mute" opacity="0.55">
                    <circle cx={bx + bw / 2} cy={by + 12} r="8" />
                    <rect x={bx + 7} y={by + 22} width={bw - 14} height={bh - 26} rx="7" />
                  </g>
                ) : (
                  <rect x={bx + 6} y={by + 8} width={bw - 12} height={bh - 12} rx="4" className="fill-mute" opacity="0.45" />
                )}
                <rect x={bx} y={by} width={bw} height={bh} rx="3" style={{ fill: 'var(--color-pink)' }} fillOpacity="0.07" className="stroke-pink" strokeWidth="1.6" />
                <rect x={bx} y={by - 15} width="34" height="14" rx="3" className="fill-pink" />
                <text x={bx + 5} y={by - 4.5} fontSize="9" className="fill-ink font-mono" fontWeight="600">
                  obj
                </text>
                <text x="12" y="20" fontSize="10" className="fill-blush font-mono">
                  CAM 0{i + 1}
                </text>
                <circle cx="152" cy="16" r="3.5" className="fill-pink svg-blink" />
                <text x="160" y="20" fontSize="9" className={label}>
                  REC
                </text>
              </g>
            );
          })}

          <g transform="translate(420 40)">
            <rect width="152" height="292" rx="12" fill={u('panel')} stroke={u('accent')} strokeOpacity="0.8" />
            <text x="14" y="26" fontSize="11" className="fill-blush font-mono">
              detections
            </text>
            {events.map((w, i) => (
              <g key={i} transform={`translate(14 ${46 + i * 26})`}>
                <circle cx="4" cy="4" r="3.5" className={i < 2 ? 'fill-rose' : 'fill-line'} />
                <rect x="14" y="1" width={w} height="6" rx="3" className="fill-line" />
              </g>
            ))}
            <g transform="translate(14 272)">
              {hist.map((h, i) => (
                <rect key={i} x={i * 10.4} y={-h} width="7" height={h} rx="2" fill={u('bar')} />
              ))}
            </g>
          </g>
          <text x="30" y="362" fontSize="11" className={label}>
            multi-feed monitoring view
          </text>
        </>
      )}
    </Scene>
  );
}

/* 6 · Plumblush Website */
function Screen({ w, h, u, bar = true }: { w: number; h: number; u: U; bar?: boolean }) {
  const top = bar ? 22 : 12;
  return (
    <>
      <rect width={w} height={h} rx="10" fill={u('panel')} className="stroke-line" />
      {bar && (
        <g className="fill-line">
          <circle cx="12" cy="11" r="3" />
          <circle cx="22" cy="11" r="3" />
          <circle cx="32" cy="11" r="3" />
        </g>
      )}
      <rect x="8" y={top} width={w - 16} height={h * 0.34} rx="6" fill={u('accent')} opacity="0.85" />
      <rect x="8" y={top + h * 0.34 + 10} width={(w - 16) * 0.7} height="6" rx="3" className="fill-blush" opacity="0.7" />
      <rect x="8" y={top + h * 0.34 + 22} width={(w - 16) * 0.5} height="5" rx="2.5" className="fill-line" />
      {w > 90 ? (
        [0, 1, 2].map((i) => (
          <rect
            key={i}
            x={8 + i * ((w - 16) / 3)}
            y={top + h * 0.34 + 36}
            width={(w - 16) / 3 - 6}
            height={Math.max(h - (top + h * 0.34 + 44), 10)}
            rx="5"
            fill={u('soft')}
          />
        ))
      ) : (
        <rect x="8" y={top + h * 0.34 + 36} width={w - 16} height={Math.max(h - (top + h * 0.34 + 44), 10)} rx="5" fill={u('soft')} />
      )}
    </>
  );
}

function Plumblush() {
  return (
    <Scene title="Diagram: a Figma design translated into responsive desktop, tablet and mobile layouts">
      {(u) => (
        <>
          <g transform="translate(30 64)">
            <rect width="212" height="272" rx="14" fill={u('panel')} className="stroke-line" />
            <text x="14" y="22" fontSize="11" className="fill-blush font-mono">
              design.fig
            </text>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <rect key={i} x="12" y={42 + i * 16} width={i % 3 === 0 ? 44 : 36} height="6" rx="3" className={i === 1 ? 'fill-rose' : 'fill-line'} />
            ))}
            <g transform="translate(70 36)">
              <rect width="130" height="222" rx="6" className="fill-ink-2" stroke={u('accent')} strokeOpacity="0.6" />
              <rect x="10" y="12" width="110" height="68" rx="5" fill={u('accent')} opacity="0.85" />
              {[
                [10, 12],
                [120, 12],
                [10, 80],
                [120, 80],
              ].map(([x, y], i) => (
                <rect key={i} x={x - 3} y={y - 3} width="6" height="6" className="fill-ink stroke-petal" strokeWidth="1.2" />
              ))}
              <rect x="10" y="92" width="80" height="6" rx="3" className="fill-blush" opacity="0.7" />
              <rect x="10" y="104" width="60" height="5" rx="2.5" className="fill-line" />
              <rect x="10" y="122" width="52" height="86" rx="5" fill={u('soft')} />
              <rect x="68" y="122" width="52" height="86" rx="5" fill={u('soft')} />
            </g>
          </g>

          <Arrow d="M250 200h32" u={u} />

          <g transform="translate(292 56)">
            <Screen w={274} h={170} u={u} />
          </g>
          <g transform="translate(312 244)">
            <Screen w={112} h={118} u={u} bar={false} />
          </g>
          <g transform="translate(450 236)">
            <Screen w={66} h={126} u={u} bar={false} />
          </g>
          <g fontSize="10" className={label}>
            <text x="566" y="46" textAnchor="end">
              desktop
            </text>
            <text x="312" y="380">
              tablet
            </text>
            <text x="450" y="380">
              mobile
            </text>
          </g>
        </>
      )}
    </Scene>
  );
}

const visuals: Record<ProjectVisualKey, () => ReactNode> = {
  recycling: Recycling,
  credit: Credit,
  rag: Rag,
  annotation: Annotation,
  sentinel: Sentinel,
  plumblush: Plumblush,
};

export function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`Screenshot of ${project.title}`}
        loading="lazy"
        decoding="async"
        className="block h-full w-full object-cover"
      />
    );
  }
  const Visual = visuals[project.visual];
  return <Visual />;
}
