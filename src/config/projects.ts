import type { MaybeLink } from './site';

/**
 * ─────────────────────────────────────────────────────────────
 *  PROJECTS — edit project content here.
 *
 *  • links.github / links.demo: set a public URL, or leave null — the
 *    button is then simply not shown. Never put private/internal URLs here.
 *  • image: optional screenshot in /public (e.g. '/projects/recycling.webp').
 *    When null, the custom illustration for `visual` is shown.
 *  • outcomes: only verified results. Leave empty to hide the block.
 *  • categories drive the filter bar; layout controls the "All" view.
 * ─────────────────────────────────────────────────────────────
 */

export type ProjectCategory = 'ai-ml' | 'genai' | 'cv' | 'software';

export const projectFilters: { id: 'all' | ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'ai-ml', label: 'AI / ML' },
  { id: 'genai', label: 'Generative AI' },
  { id: 'cv', label: 'Computer Vision' },
  { id: 'software', label: 'Software Development' },
];

export type ProjectVisualKey = 'recycling' | 'credit' | 'rag' | 'sentinel' | 'plumblush' | 'annotation';

/** Drives the frame treatment around each visual. */
export type ProjectKind = 'enterprise' | 'vision' | 'ml' | 'data' | 'frontend';

export interface Project {
  id: string;
  title: string;
  /** short label shown above the title */
  category: string;
  kind: ProjectKind;
  /** e.g. "Internship · Deployed", "Prototype", "Personal project" */
  status: string;
  categories: ProjectCategory[];
  /** size in the "All" view: feature = full width, wide ≈ 7/12, narrow ≈ 5/12 */
  layout: 'feature' | 'wide' | 'narrow';
  tagline: string;
  problem: string;
  contribution: string;
  /** key implementation details */
  highlights: string[];
  /** verified outcomes only */
  outcomes: string[];
  stack: string[];
  links: { github: MaybeLink; demo: MaybeLink };
  /** shown in place of a GitHub button for private work */
  privateNote?: string;
  /** honest scope note (prototype limits, what is simulated, etc.) */
  note?: string;
  visual: ProjectVisualKey;
  image: string | null;
}

export const projects: Project[] = [
  {
    id: 'railtel-procurement-chatbot',
    title: 'RailTel Procurement Chatbot',
    category: 'Enterprise AI · Document Intelligence',
    kind: 'enterprise',
    status: 'Internship · Deployed on AWS EC2',
    categories: ['genai', 'ai-ml', 'software'],
    layout: 'feature',
    tagline:
      'A permission-aware RAG assistant that answers procurement questions from the right documents, with citations.',
    problem:
      'Procurement knowledge lives in long documents spread across departments. Finding the right clause is slow, and not everyone should see every document.',
    contribution:
      'Built the Node.js/TypeScript API and Python RAG service, implemented authentication and access control, evaluated answer quality, and personally deployed the application on a provided AWS EC2 instance.',
    highlights: [
      'Node.js/TypeScript (Express) REST API on PostgreSQL with SQL migrations',
      'Python FastAPI retrieval service: Gemini embeddings + FAISS with BM25 hybrid search',
      'JWT authentication with bcrypt; RBAC over a public and three department knowledge bases',
      'Permissions enforced before retrieval and again when a cited source is opened',
      'PDF/DOCX/HTML ingestion with Tesseract OCR, heading-aware chunking and website crawling',
      'Admin tools for document versioning, indexing and user management',
    ],
    outcomes: [
      '38 of 50 real procurement questions answered fully correctly in a manual evaluation',
      'Retrieval fixes recovered missing evidence for 5 of 7 failed queries (offline replay)',
      '74 Node.js and 23 pytest test files covering auth, RBAC, ingestion and citations',
      'Deployed by me on a provided AWS EC2 instance',
    ],
    stack: ['Node.js', 'TypeScript', 'Express', 'FastAPI', 'PostgreSQL', 'FAISS', 'Gemini', 'React', 'AWS EC2'],
    links: { github: null, demo: null },
    privateNote: 'Internal company project: code and documents are not public',
    visual: 'rag',
    image: null,
  },
  {
    id: 'predco-sentinel',
    title: 'PredCo Sentinel',
    category: 'Computer Vision · Video Analytics',
    kind: 'vision',
    status: 'Internship · Prototype',
    categories: ['cv', 'ai-ml', 'software'],
    layout: 'wide',
    tagline: 'A CCTV command-center prototype that runs live object detection on an RTSP stream.',
    problem:
      'Watching many camera feeds by hand is tiring and easy to get wrong. Surfacing detections and alerts in one place makes monitoring manageable.',
    contribution:
      'Built the FastAPI video pipeline and the React/Tailwind monitoring dashboard during an internship demo sprint.',
    highlights: [
      'Live RTSP ingestion with OpenCV: threaded capture with reconnect backoff',
      'YOLOv8n object detection (people and vehicles) streamed back as annotated MJPEG video',
      'Detection alerts with severity levels, snapshots and a triage workflow',
      'Rule-based natural-language search over detection events',
      'Paginated 30-camera HLS monitoring wall through a backend proxy',
    ],
    outcomes: ['End-to-end live pipeline (RTSP → detection → annotated stream) working on CPU for one camera'],
    stack: ['Python', 'FastAPI', 'OpenCV', 'YOLOv8', 'React', 'Tailwind CSS'],
    links: { github: null, demo: null },
    privateNote: 'Internship prototype: code is not public',
    note: 'Prototype scope: live AI detection runs on one camera; the 30-camera wall plays public CCTV streams without detection. No accuracy metrics were measured.',
    visual: 'sentinel',
    image: null,
  },
  {
    id: 'smart-recycling-ai',
    title: 'Smart Recycling AI',
    category: 'Computer Vision · Sustainability',
    kind: 'vision',
    status: 'Personal project',
    categories: ['cv', 'ai-ml'],
    layout: 'narrow',
    tagline: 'A ResNet18 classifier that sorts waste into six categories and suggests how to recycle it.',
    problem:
      'Sorting waste correctly is confusing, and mis-sorted items contaminate recycling streams. A quick visual check helps people make the right call.',
    contribution:
      'Built the training scripts, the ResNet18 transfer-learning model and the Streamlit app.',
    highlights: [
      'Six classes: Cardboard, Glass, Metal, Paper, Plastic and Trash',
      'Transfer learning from an ImageNet-pretrained ResNet18 (PyTorch, torchvision)',
      'Flip, rotation and crop data augmentation; custom CNN trained as a baseline',
      'Streamlit app with top-3 predictions, confidence scores and recycling guidance',
    ],
    outcomes: [],
    stack: ['Python', 'PyTorch', 'torchvision', 'ResNet18', 'Streamlit'],
    links: { github: 'https://github.com/Dimple-Proj/Smart-Recycling-AI', demo: null },
    visual: 'recycling',
    image: null,
  },
  {
    id: 'credit-risk-prediction',
    title: 'Credit Risk Prediction',
    category: 'Machine Learning · Finance',
    kind: 'ml',
    status: 'Personal project',
    categories: ['ai-ml'],
    layout: 'narrow',
    tagline: 'An XGBoost model that predicts loan default risk on the Home Credit dataset, with explanations.',
    problem:
      'Lenders need to assess applicants who may have little or no credit history. Better risk signals support more informed lending decisions.',
    contribution:
      'Built the training pipeline, model explanation and serving layer end to end.',
    highlights: [
      'Home Credit Default Risk dataset (Kaggle)',
      'scikit-learn preprocessing pipeline feeding an XGBoost classifier',
      'Class-imbalance handling (scale_pos_weight) and GridSearchCV tuning',
      '5-fold cross-validated ROC-AUC during training',
      'SHAP and feature-importance explanations; FastAPI endpoint and Streamlit UI',
    ],
    outcomes: [],
    stack: ['Python', 'scikit-learn', 'XGBoost', 'SHAP', 'FastAPI', 'Streamlit'],
    links: { github: 'https://github.com/Dimple-Proj/credit-risk-ml', demo: null },
    visual: 'credit',
    image: null,
  },
  {
    id: 'indika-ai-annotation',
    title: 'AI Data Annotation Pilot',
    category: 'Data · Annotation for a US-based client',
    kind: 'data',
    status: 'Internship · via Indika AI',
    categories: ['ai-ml'],
    layout: 'wide',
    tagline: 'Structured video annotation for an AI data pilot, following project-specific labelling requirements.',
    problem:
      'AI models are only as good as their training data. The client needed pilot videos labelled consistently against a detailed specification.',
    contribution:
      'Prepared the initial annotation report, then, following the client-provided report, annotated the pilot videos and prepared the structured CSV deliverables.',
    highlights: [
      'Worked from project-specific annotation requirements',
      'Timestamped task / sub-task / action labels with a controlled vocabulary',
      'Coarse and fine review passes per video',
      'Structured annotation and metadata CSV files per video',
    ],
    outcomes: ['9 pilot videos annotated and delivered as structured CSV files'],
    stack: ['Data annotation', 'CSV', 'Video labelling'],
    links: { github: null, demo: null },
    privateNote: 'Client work: data and reports are confidential',
    visual: 'annotation',
    image: null,
  },
  {
    id: 'plumblush-website',
    title: 'Plumblush Website',
    category: 'Frontend · UI Engineering',
    kind: 'frontend',
    status: 'Personal project',
    categories: ['software'],
    layout: 'feature',
    tagline: 'A responsive website translated from a Figma design.',
    problem:
      'A design is only as good as its implementation. The site needed to match the Figma file and hold up across screen sizes.',
    contribution: 'Designed the UI in Figma and implemented it as a responsive web page.',
    highlights: [
      'Figma-to-code implementation',
      'Responsive layout with Tailwind CSS',
      'Attention to spacing, typography and visual hierarchy',
    ],
    outcomes: [],
    stack: ['Figma', 'HTML', 'Tailwind CSS'],
    links: { github: null, demo: null }, // TODO: add repo / live URL if published
    visual: 'plumblush',
    image: null,
  },
];
