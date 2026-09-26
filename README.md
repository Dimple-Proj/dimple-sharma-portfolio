# Dimple Sharma — Portfolio

**🔗 Live Portfolio: [dimple-sharma-portfolio.vercel.app](https://dimple-sharma-portfolio.vercel.app)**

Personal portfolio of **Dimple Sharma**, an AI/ML engineer building practical intelligent
systems: machine learning, computer vision, RAG, AI agents and automation.

The site is a single-page app that presents my background, projects, experience and tech
stack, with a downloadable resume and contact links.

## Technologies

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for development and production builds
- [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- ESLint with `typescript-eslint` and React Hooks rules

No backend and no environment variables are required.

## Features

- Hero section with animated neural-field background and text scramble effect
- About, Experience and Tech Stack sections driven by a single config file
- Filterable project gallery (AI / ML, Generative AI, Computer Vision, Software)
  with a detail dialog per project
- One-click resume download from the hero, About, Contact and navigation
- Active-section navigation, scroll reveal animations and a custom cursor
- Responsive layout; links that are not set yet are hidden instead of broken

## Getting started

Requires [Node.js](https://nodejs.org/) 20.19+ (or 22.12+) and npm.

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build      # type check + production build to dist/
npm run preview    # serve the production build locally
npm run lint
```

The output in `dist/` is a static site and can be hosted on any static host
(Vercel, Netlify, GitHub Pages, Cloudflare Pages, S3, ...). `dist/` is not committed.

## Project structure

```
├── index.html            # HTML entry, meta tags, fonts
├── public/               # Static files served as-is (favicon, resume.pdf)
├── src/
│   ├── main.tsx          # React entry point
│   ├── App.tsx           # Page layout
│   ├── index.css         # Tailwind theme, colours, gradients
│   ├── components/       # Section and UI components
│   ├── config/           # Site content (site.ts, projects.ts)
│   ├── hooks/            # useActiveSection, useMagnetic, useReveal
│   └── lib/              # Shared style helpers
├── vite.config.ts
└── tsconfig*.json
```

## Where to edit

| What | File |
| --- | --- |
| Name, intro, links, about, experience, tech stack | `src/config/site.ts` |
| Projects (text, stack, links, screenshots, metrics) | `src/config/projects.ts` |
| Colour palette & gradients | `src/index.css` (`@theme` and `:root`) |

Placeholders are `null` and marked `TODO`; buttons for missing links are simply
hidden (e.g. LinkedIn until `links.linkedin` is set). To use a real screenshot, add
it to `public/` and set `image: '/your-file.webp'` on the project.

**Resume download:** the hero, About, Contact and desktop nav buttons download
`public/resume.pdf` as `Dimple_Sharma_Resume.pdf`. To update it, replace
`public/resume.pdf` with the new PDF (the file name and button labels stay the same).
Set `links.resume = null` in `site.ts` to hide every resume button.

## Deployment

The live site is hosted on [Vercel](https://vercel.com/) (Hobby plan). Build settings
are pinned in `vercel.json`, and `.vercelignore` keeps local-only files out of CLI uploads.

Any static host works. Typical settings:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | `npm install` (or `npm ci`) |
