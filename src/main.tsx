import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { links } from './config/site';

if (import.meta.env.DEV) {
  const missing = Object.entries(links)
    .filter(([, value]) => !value)
    .map(([key]) => key);
  if (missing.length) {
    console.info(
      `[portfolio] Placeholder links still to fill in src/config/site.ts: ${missing.join(', ')}`,
    );
  }
}

// A small hello for anyone curious enough to open the console.
console.log(
  '%c DS %c Hey, curious one — you found the console. I like people who look under the hood. Say hi → #contact',
  'background:linear-gradient(90deg,#f20a79,#ff4da6,#ffb3d6);color:#090509;font-weight:800;padding:3px 8px;border-radius:6px',
  'color:#ff4da6;padding-left:6px',
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
