/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIG — edit your personal details, links and content here.
 *
 *  Anything set to `null` is a placeholder: the UI hides it (or shows a
 *  clearly marked pending state) instead of rendering a broken link.
 *  Search this folder for "TODO" to find everything left to fill in.
 *
 *  Sources: details below come from the resume
 *  (New Resume/Dimple_Sharma_Resume_ATS.pdf) and the project repositories.
 * ─────────────────────────────────────────────────────────────
 */

export type MaybeLink = string | null;

export const person = {
  name: 'Dimple Sharma',
  firstName: 'Dimple',
  initials: 'DS',
  eyebrow: 'AI / ML Engineer · Builder · Problem Solver',
  intro:
    "I'm Dimple Sharma, an AI/ML engineer in the making who enjoys turning complex ideas into practical, intelligent applications.",
  // Deliberately makes no claim about job-seeking status.
  availability: 'Open to conversations & collaborations',
  education: 'Final-year B.Tech · Artificial Intelligence & Machine Learning',
  focus: 'LLMs · RAG · AI agents · Computer vision',
};

export const profile = {
  location: 'New Delhi, India',
  role: 'AI & Agentic Automation Intern',
  company: 'PanScience Innovation',
  roleDates: '06/2026 — Present',
  education: {
    degree: 'B.Tech, Artificial Intelligence & Machine Learning',
    institution: 'JEMTEC, Greater Noida',
    status: 'Final year · Expected 2027',
  },
  /** From the resume ("C.G.P.A – 9.0 (Overall)"). Set to null to hide. */
  cgpa: '9.0' as string | null,
  cgpaLabel: 'CGPA (overall)',
  coursework: ['Data Structures & Algorithms', 'Database Management Systems'],
};

export const links: {
  email: MaybeLink;
  linkedin: MaybeLink;
  github: MaybeLink;
  resume: MaybeLink;
} = {
  email: '426dimplesharma@gmail.com',
  linkedin: null, // TODO: e.g. 'https://www.linkedin.com/in/your-handle' — hidden until set
  github: 'https://github.com/Dimple-Proj',
  resume: '/resume.pdf', // file lives at public/resume.pdf — replace it to update
};

/** Filename used when visitors download the resume. */
export const resumeDownloadName = 'Dimple_Sharma_Resume.pdf';

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const;

export const about = {
  statement:
    'I like the moment an idea stops being a notebook and starts being something people can actually use.',
  paragraphs: [
    "I'm a final-year B.Tech student specialising in Artificial Intelligence and Machine Learning, currently working as an AI & Agentic Automation Intern at PanScience Innovation.",
    'Most of what I know, I learned by building: a permission-aware RAG chatbot I deployed on AWS EC2, a computer vision dashboard for live CCTV streams, and classic ML models for waste classification and credit risk.',
    "Next, I want to go deeper on LLMs, AI agents and the cloud/MLOps side of turning models into reliable products.",
  ],
  interests: [
    'Artificial Intelligence & Machine Learning',
    'Generative AI & LLM applications',
    'AI agents & intelligent automation',
    'Computer vision & deep learning',
    'Backend development',
    'Cloud & MLOps',
  ],
  approach: [
    { title: 'Start with a real problem', text: 'Pick something that matters to someone, not just a dataset.' },
    { title: 'Build a working version', text: 'Get it end-to-end first: model, API and interface.' },
    { title: 'Learn from what breaks', text: 'Evaluate honestly, then iterate on what actually fails.' },
  ],
};

export interface TimelineEntry {
  kind: 'Experience' | 'Education';
  org: string;
  role: string;
  dates: string;
  summary: string;
  points: string[];
  tags: string[];
}

export const timeline: TimelineEntry[] = [
  {
    kind: 'Experience',
    org: 'PanScience Innovation',
    role: 'AI & Agentic Automation Intern',
    dates: '06/2026 — Present',
    summary:
      'Hands-on work across AI, automation and delivery: building, evaluating and deploying practical AI tools.',
    points: [
      'Built and evaluated a permission-aware RAG chatbot for procurement documents (Node.js/TypeScript, FastAPI, PostgreSQL, FAISS, Gemini) and deployed it on a provided AWS EC2 instance.',
      'Worked on OCR text extraction (Tesseract, PyMuPDF; English and Hindi) and role-based access control for a tender automation platform.',
      'Built the PredCo Sentinel CCTV analytics prototype: RTSP ingestion with OpenCV, YOLOv8 detection and an alert triage dashboard.',
      'Annotated 9 pilot videos for a US-based client (via Indika AI), delivering structured annotation and metadata CSV files.',
    ],
    tags: ['RAG', 'Computer vision', 'AWS EC2', 'Data annotation'],
  },
  {
    kind: 'Education',
    org: 'JEMTEC, Greater Noida',
    role: 'B.Tech — Artificial Intelligence & Machine Learning',
    dates: 'Expected 2027',
    summary: 'Final-year student · CGPA 9.0 (overall).',
    points: [
      'Coursework includes Data Structures & Algorithms and Database Management Systems.',
      'Hands-on projects in machine learning, computer vision, RAG and full-stack development.',
    ],
    tags: ['Machine learning', 'Deep learning', 'Computer vision'],
  },
];

/**
 * Tech stack — every item is backed by a project or the internship.
 * `usedIn` is shown on the page so visitors can see where each group was used.
 */
export const stack: { group: string; items: string[]; usedIn: string }[] = [
  { group: 'Programming', items: ['Python', 'JavaScript', 'TypeScript', 'SQL'], usedIn: 'All projects' },
  {
    group: 'AI / Machine Learning',
    items: ['PyTorch', 'scikit-learn', 'XGBoost', 'Deep Learning', 'Computer Vision', 'OpenCV', 'YOLOv8'],
    usedIn: 'Smart Recycling · Credit Risk · PredCo',
  },
  {
    group: 'Generative AI',
    items: ['LLMs (Gemini)', 'RAG', 'Embeddings', 'AI agents', 'OCR'],
    usedIn: 'RailTel chatbot · Tender platform',
  },
  { group: 'Backend', items: ['Node.js', 'Express', 'FastAPI', 'REST APIs'], usedIn: 'RailTel chatbot · PredCo' },
  { group: 'Frontend', items: ['React', 'Tailwind CSS', 'Vite', 'Streamlit'], usedIn: 'PredCo · RailTel · Plumblush' },
  { group: 'Databases & Search', items: ['PostgreSQL', 'FAISS', 'BM25 hybrid search'], usedIn: 'RailTel chatbot' },
  { group: 'Auth & Security', items: ['JWT', 'RBAC', 'bcrypt'], usedIn: 'RailTel chatbot · Tender platform' },
  {
    group: 'Deployment & Tools',
    items: ['AWS EC2', 'Application deployment', 'Git', 'GitHub', 'pytest'],
    usedIn: 'RailTel chatbot (EC2)',
  },
  { group: 'Data Processing', items: ['Pandas', 'NumPy', 'Data annotation'], usedIn: 'Credit Risk · Indika AI pilot' },
];
