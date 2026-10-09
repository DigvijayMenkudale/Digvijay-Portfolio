import React, { useState } from 'react';
import { ExternalLink, Github, Eye, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { playClickTone } from '../utils/sound';

interface Project {
  number: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  tools: string[];
  description: string;
  challenge: string;
  solution: string;
  metrics: string[];
  githubUrl: string;
  liveUrl: string;
}

const PROJECTS: Project[] = [
  {
    number: '01',
    title: 'FaceX – Attendance System',
    subtitle: 'Facial Recognition-Based Employee Attendance System',
    category: 'Computer Vision & Desktop Application',
    image: '/src/assets/images/project_facex_attendance_1791526707581.jpg',
    tools: ['Python', 'OpenCV', 'Firebase', 'PyQt'],
    description:
      'Facial recognition-based attendance application built to automate employee check-ins and check-outs. Implemented real-time face detection and identity verification using OpenCV and stored attendance logs securely in Firebase.',
    challenge:
      'Manual sign-in sheets and fingerprint scanners are prone to buddy punching, hardware wear-and-tear, and slow queues during shift changes.',
    solution:
      'Engineered an OpenCV biometric pipeline with camera stream frame capture, facial feature extraction, matching verification, and instant cloud database logging.',
    metrics: ['Real-time face detection & identity matching', 'Automated Firebase attendance timestamp logging', 'Custom PyQt desktop interface'],
    githubUrl: 'https://github.com/DigvijayMenkudale/FaceX-Attendance-System.git',
    liveUrl: 'https://github.com/DigvijayMenkudale',
  },
  {
    number: '02',
    title: 'AI Travel Planning & Itinerary',
    subtitle: 'Personalized Travel Planner & Route Generator',
    category: 'Full-Stack Web & Generative AI',
    image: '/src/assets/images/project_ai_travel_itinerary_1791526722138.jpg',
    tools: ['React.js', 'Tailwind CSS', 'Firebase', 'Gemini AI', 'Google Maps API'],
    description:
      'AI-powered travel planning application that automatically generates personalized itineraries based on user destination, budget tier, and duration. Integrated Gemini AI for contextual recommendations and Google Maps for visual route exploration.',
    challenge:
      'Planning multi-day travel schedules requires manually researching attractions, calculating budgets, and mapping transit routes across fragmented websites.',
    solution:
      'Combined Gemini AI prompt orchestration with Google Maps visualization and Firebase persistence for custom itinerary generation and bookmarking.',
    metrics: ['Personalized multi-day itinerary generation', 'Interactive Google Maps route visualization', 'Firebase user trip persistence'],
    githubUrl: 'https://github.com/DigvijayMenkudale/AI-Travel-Planner-.git',
    liveUrl: 'https://github.com/DigvijayMenkudale',
  },
  {
    number: '03',
    title: 'AI-Powered Mock Interview',
    subtitle: 'Full-Stack Technical Interview Practice Platform',
    category: 'Full-Stack Web & Backend Engineering',
    image: '/src/assets/images/project_mock_interview_1791526735040.jpg',
    tools: ['Next.js', 'React.js', 'Python', 'FastAPI', 'PostgreSQL', 'Drizzle ORM', 'Sentence Transformers', 'Clerk Auth', 'Tailwind CSS'],
    description:
      'Full-stack mock interview practice platform featuring backend REST APIs for managing interview sessions, response evaluation, and PostgreSQL data persistence with Clerk authentication.',
    challenge:
      'Candidates preparing for technical roles lack accessible, structured environments to practice questions and receive consistent answer evaluation.',
    solution:
      'Built modular FastAPI endpoints for question management, user response capture, sentence transformer embeddings for relevance analysis, and Drizzle ORM for PostgreSQL queries.',
    metrics: ['FastAPI REST backend with PostgreSQL & Drizzle', 'Sentence Transformers semantic similarity evaluation', 'Clerk user authentication integration'],
    githubUrl: 'https://github.com/DigvijayMenkudale/AI-Powered-Mock-Interview-System.git',
    liveUrl: 'https://github.com/DigvijayMenkudale',
  },
  {
    number: '04',
    title: 'Pomegranate Disease Detection',
    subtitle: 'Computer Vision Disease Classification & Remedies System',
    category: 'Machine Learning & Computer Vision',
    image: '/src/assets/images/project_pomegranate_yolo_1791526753089.jpg',
    tools: ['Python', 'YOLOv8', 'MobileNet', 'FastAPI', 'OpenCV', 'Machine Learning'],
    description:
      'Academic computer vision system that processes uploaded pomegranate leaf and fruit images to identify diseases, analyze severity, and deliver actionable agricultural remedy recommendations.',
    challenge:
      'Early detection of bacterial blight and fungal infections in pomegranate orchards is vital to preventing crop loss, yet agricultural experts are not always accessible.',
    solution:
      'Trained and deployed YOLOv8 and MobileNet models accessible via FastAPI backend, evaluating visual symptoms and providing tailored remedial guidance.',
    metrics: ['YOLOv8 object detection on crop leaves', 'FastAPI image upload & inference backend', 'Tailored remedy & weather-based decision logic'],
    githubUrl: 'https://github.com/DigvijayMenkudale',
    liveUrl: 'https://github.com/DigvijayMenkudale',
  },
  {
    number: '05',
    title: 'EduSense – RAG Study Assistant',
    subtitle: 'Offline RAG Document Interaction with Local LLMs',
    category: 'Generative AI & RAG Architecture',
    image: '/src/assets/images/project_sapphire_ai_1791525457458.jpg',
    tools: ['Python', 'Ollama', 'Phi-3', 'ChromaDB', 'Sentence Transformers', 'pdfplumber', 'Streamlit'],
    description:
      'Offline study assistant enabling users to interact with educational PDFs and documents through local open-weight language models and retrieval-augmented question answering. Works completely locally with no cloud dependencies.',
    challenge:
      'Students and researchers needing private, offline document analysis often cannot rely on expensive, latency-heavy cloud LLM APIs.',
    solution:
      'Constructed a local RAG pipeline: PDF text extraction with pdfplumber → sentence embeddings via Sentence Transformers → ChromaDB vector storage → similarity retrieval → Phi-3 via Ollama generation.',
    metrics: ['100% Offline private RAG execution', 'ChromaDB vector embedding store', 'Local Phi-3 inference via Ollama'],
    githubUrl: 'https://github.com/DigvijayMenkudale/EduSense-RAG-Chatbot.git',
    liveUrl: 'https://github.com/DigvijayMenkudale',
  },
  {
    number: '06',
    title: 'GateSphere – Smart Visitor System',
    subtitle: 'Centralized Role-Based Visitor Management Platform',
    category: 'Full-Stack Web & Internship Project',
    image: '/src/assets/images/project_solid_starters_1791525422375.jpg',
    tools: ['Python', 'Django', 'SQLite', 'Bootstrap', 'HTML/CSS'],
    description:
      'Developed during internship at VS Software Lab, Baramati. A centralized digital platform replacing physical visitor logbooks with structured digital workflows, role-based dashboards, and visitor check-in tracking.',
    challenge:
      'Physical paper visitor registers lead to unreadable handwriting, missing records, unauthorized entries, and zero centralized search capabilities.',
    solution:
      'Created a Django web application with designated Admin, Host, and Security access roles, check-in/out tracking, host notification logs, and searchable records.',
    metrics: ['Centralized digital visitor logs & CRUD', 'Admin, Host, and Security role dashboards', 'Search & filter visitor records'],
    githubUrl: 'https://github.com/DigvijayMenkudale/GateSphere.git',
    liveUrl: 'https://github.com/DigvijayMenkudale',
  },
  {
    number: '07',
    title: 'FabTrack – Internship Project',
    subtitle: 'Manufacturing & Tracking Workflow Platform',
    category: 'Internship Project · VS Software Lab',
    image: '/src/assets/images/project_radix_system_1791525435559.jpg',
    tools: ['Python', 'Full-Stack Web', 'Database Operations', 'Git'],
    description:
      'Contributed to the FabTrack project during the 6-month Full Stack Developer internship at VS Software Lab, Baramati. Gained practical experience in backend logic, database operations, testing, and debugging.',
    challenge:
      'Translating organizational manufacturing and tracking workflows into reliable database models and web interfaces.',
    solution:
      'Collaborated on backend implementation, database queries, frontend-backend integration, and structured project documentation.',
    metrics: ['Practical internship software development', 'Backend database operations & testing', 'Collaborative version control with Git'],
    githubUrl: 'https://github.com/DigvijayMenkudale/FabTrack-ERP-System.git',
    liveUrl: 'https://github.com/DigvijayMenkudale',
  },
];

export default function WorkSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="work" className="relative py-28 px-4 md:px-8 border-t border-white/5 bg-[#070910]">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header matching video */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase mb-2">
              <span>Selected Portfolio</span>
              <span aria-hidden="true">·</span>
              <span>Academic &amp; Internship Projects</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase">
              My Work
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-400 max-w-md font-light">
            Hands-on full-stack web applications, computer vision pipelines, local RAG assistants, and backend systems developed through academic coursework and internship experience.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="space-y-12">
          {PROJECTS.map((project, index) => {
            const isEven = index % 2 === 1;

            return (
              <div
                key={project.number}
                className="group p-6 md:p-10 rounded-3xl glass-card border border-white/10 hover:border-cyan-500/40 transition-all duration-300 shadow-2xl relative overflow-hidden"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Visual Mockup Preview */}
                  <div
                    className={`lg:col-span-7 relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900 group-hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] transition-all duration-500 ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="aspect-video w-full overflow-hidden relative">
                      <img
                        src={project.image}
                        alt={`${project.title} Interface Showcase`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                    </div>

                    {/* Quick Action Overlay Button */}
                    <div className="absolute bottom-4 right-4">
                      <button
                        onClick={() => {
                          playClickTone();
                          setSelectedProject(project);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-900/90 hover:bg-cyan-500 hover:text-slate-950 text-white rounded-xl text-xs font-mono font-medium backdrop-blur-md border border-white/15 transition-all shadow-lg cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Case Study</span>
                      </button>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className={`lg:col-span-5 flex flex-col items-start ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl sm:text-4xl font-mono font-black text-cyan-400/80">
                        {project.number}
                      </span>
                      <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-300 mb-4 text-glow-cyan">
                      {project.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tech List (Zero-Pill Discipline) */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-slate-300 mb-8 pb-6 border-b border-white/10 w-full">
                      <span className="text-white font-semibold">Tech:</span>
                      {project.tools.map((tool, idx) => (
                        <React.Fragment key={tool}>
                          <span>{tool}</span>
                          {idx < project.tools.length - 1 && <span className="text-slate-500">·</span>}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          playClickTone();
                          setSelectedProject(project);
                        }}
                        className="px-4 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider transition-all shadow-[0_0_16px_rgba(6,182,212,0.3)] cursor-pointer"
                      >
                        View Architecture
                      </button>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-xl border border-white/10 transition-colors"
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-xl border border-white/10 transition-colors"
                        title="Live Demonstration"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Project Lightbox / Architecture Viewer */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel rounded-3xl border border-white/15 p-6 md:p-8 shadow-2xl">
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
                <span>Project Case Study</span>
                <span aria-hidden="true">·</span>
                <span>{selectedProject.number}</span>
              </div>

              <h3 className="text-3xl font-black text-white mb-2">{selectedProject.title}</h3>
              <p className="text-sm text-slate-300 mb-6">{selectedProject.subtitle}</p>

              <div className="aspect-video w-full rounded-2xl overflow-hidden mb-6 border border-white/10">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-6 text-sm text-slate-300">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-1">
                    The Engineering Challenge
                  </h4>
                  <p className="leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                    {selectedProject.challenge}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-1">
                    The Architectural Solution
                  </h4>
                  <p className="leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                    {selectedProject.solution}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                    Verified Production Impact &amp; Metrics
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {selectedProject.metrics.map((m, i) => (
                      <div
                        key={i}
                        className="p-3 bg-cyan-950/30 border border-cyan-500/20 rounded-xl flex items-center gap-2 text-xs font-mono text-cyan-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <a
                  href="#contact"
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono text-xs uppercase tracking-wider font-semibold rounded-xl transition-all"
                >
                  Inquire For Similar Build →
                </a>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
