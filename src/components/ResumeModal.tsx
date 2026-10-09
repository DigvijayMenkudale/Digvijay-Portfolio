import React from 'react';
import { X, Download, Printer, Check, ExternalLink } from 'lucide-react';
import { playClickTone } from '../utils/sound';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    playClickTone();
    window.print();
  };

  const handleDownload = () => {
    playClickTone();
    const resumeText = `DIGVIJAY MENKUDALE
Aspiring Full Stack Developer | AI & Backend Enthusiast
Email: rushikeshmenkudale385@gmail.com
Phone: +91 7499294869
GitHub: https://github.com/DigvijayMenkudale
LinkedIn: https://linkedin.com/in/digvijaymenkudale

PROFESSIONAL SUMMARY:
MCA graduate and aspiring Full Stack Developer interested in building practical web applications, intelligent systems and backend solutions. Hands-on project experience with Python, Django, React.js, Next.js, FastAPI, relational databases, computer vision and Retrieval-Augmented Generation (RAG). Experienced in developing academic and internship projects involving API integration, database operations, authentication, data processing and frontend-backend integration. Interested in creating reliable, user-focused software that solves real-world problems.

TECHNICAL CORE COMPETENCIES:
- Frontend Development: HTML, CSS, JavaScript, React.js, Next.js, Tailwind CSS, Responsive Web Development.
- Backend Development: Python, Django, FastAPI, Node.js, REST APIs.
- Databases: PostgreSQL, SQLite, Firebase, ChromaDB.
- AI, Machine Learning & Generative AI: Machine Learning, OpenCV, YOLOv8, Generative AI, Retrieval-Augmented Generation (RAG), Vector Embeddings, Sentence Transformers, Gemini AI, Ollama, Phi-3, Image Processing.
- Tools & Development: Git, GitHub, VS Code, Postman, Docker.

INTERNSHIP EXPERIENCE:
Full Stack Developer Intern — VS Software Lab · Baramati (March 2026 – September 2026)
- Worked on full-stack development projects during the 6-month internship period.
- Developed GateSphere, a Smart Visitor Management System using Python, Django, SQLite and Bootstrap.
- Worked on FabTrack, an additional internship project.
- Gained practical experience in backend development, database operations, frontend integration, testing, debugging and project documentation.

SELECTED PROJECTS:
1. FaceX – Facial Recognition-Based Employee Attendance System (Python, OpenCV, Firebase, PyQt)
2. AI-Powered Travel Planning & Itinerary Generator (React.js, Tailwind CSS, Firebase, Gemini AI, Google Maps API)
3. AI-Powered Mock Interview System (Next.js, React.js, Python, FastAPI, PostgreSQL, Drizzle ORM, Sentence Transformers, Clerk Authentication, Tailwind CSS, REST APIs)
4. Pomegranate Disease Detection and Remedies System (Python, YOLOv8, MobileNet, FastAPI, Image Processing, Machine Learning)
5. EduSense – RAG-Based Study Assistant (Python, Ollama, Phi-3, ChromaDB, Sentence Transformers, pdfplumber, Streamlit)
6. GateSphere – Smart Visitor Management System (Python, Django, SQLite, Bootstrap)
7. FabTrack – Internship Project (VS Software Lab, Baramati)

EDUCATION:
- Master of Computer Applications (MCA) — MIT Vishwaprayag University, Solapur (2024 – 2026)
- Bachelor of Computer Applications (BCA) — Sangameshwar College (Completed in 2024)

PROFESSIONAL INTERESTS:
- Full Stack Web Development
- Backend Engineering and REST API Development
- Artificial Intelligence and Machine Learning
- Generative AI and RAG Applications
- Computer Vision
- Database Design and Integration
- Interactive and User-Focused Web Experiences
`;

    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Digvijay_Menkudale_Resume.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto glass-panel rounded-3xl border border-white/15 p-6 sm:p-10 shadow-2xl text-slate-100">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              Curriculum Vitae / Resume
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-mono font-semibold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors cursor-pointer ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content */}
        <div className="space-y-8 font-sans">
          {/* Header Bio */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/5">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Digvijay Menkudale
              </h2>
              <p className="text-sm font-mono text-cyan-400 mt-1">
                Aspiring Full Stack Developer | AI &amp; Backend Enthusiast
              </p>
            </div>
            <div className="text-xs font-mono text-slate-400 sm:text-right space-y-0.5">
              <div>rushikeshmenkudale385@gmail.com</div>
              <div>+91 7499294869</div>
              <div>Solapur, Maharashtra, India</div>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
              Professional Summary
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              MCA graduate and aspiring Full Stack Developer interested in building practical web applications, intelligent systems and backend solutions. Hands-on project experience with Python, Django, React.js, Next.js, FastAPI, relational databases, computer vision and Retrieval-Augmented Generation (RAG). Experienced in developing academic and internship projects involving API integration, database operations, authentication, data processing and frontend-backend integration. Interested in creating reliable, user-focused software that solves real-world problems.
            </p>
          </div>

          {/* Technical Core Competencies */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
              Technical Core Competencies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-cyan-400 font-bold mb-1">Frontend Development</div>
                <div className="text-slate-300 leading-relaxed">
                  HTML, CSS, JavaScript, React.js, Next.js, Tailwind CSS, Responsive Web Development.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-cyan-400 font-bold mb-1">Backend Development</div>
                <div className="text-slate-300 leading-relaxed">
                  Python, Django, FastAPI, Node.js, REST APIs.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-cyan-400 font-bold mb-1">Databases</div>
                <div className="text-slate-300 leading-relaxed">
                  PostgreSQL, SQLite, Firebase, ChromaDB.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-cyan-400 font-bold mb-1">AI, ML &amp; Generative AI</div>
                <div className="text-slate-300 leading-relaxed">
                  Machine Learning, OpenCV, YOLOv8, Generative AI, Retrieval-Augmented Generation (RAG), Vector Embeddings, Sentence Transformers, Gemini AI, Ollama, Phi-3, Image Processing.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 sm:col-span-2">
                <div className="text-cyan-400 font-bold mb-1">Tools &amp; Development</div>
                <div className="text-slate-300 leading-relaxed">
                  Git, GitHub, VS Code, Postman, Docker.
                </div>
              </div>
            </div>
          </div>

          {/* Internship Experience */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">
              Internship Experience
            </h3>
            <div className="space-y-6 text-sm">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h4 className="font-bold text-white text-base">Full Stack Developer Intern</h4>
                  <span className="text-xs font-mono text-cyan-400">March 2026 – September 2026</span>
                </div>
                <div className="text-xs font-mono text-slate-400">VS Software Lab · Baramati (6-month internship period)</div>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pt-2 leading-relaxed">
                  <li>Worked on full-stack development projects during the internship period.</li>
                  <li>Developed GateSphere, a Smart Visitor Management System using Python, Django, SQLite and Bootstrap.</li>
                  <li>Worked on FabTrack, an additional internship project at VS Software Lab.</li>
                  <li>Gained practical experience in backend development, database operations, frontend integration, testing, debugging and project documentation.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Selected Projects */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">
              Selected Projects
            </h3>
            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-cyan-400 font-bold">01. FaceX:</span> Facial Recognition-Based Employee Attendance System (Python, OpenCV, Firebase, PyQt)
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-cyan-400 font-bold">02. AI-Powered Travel Planning &amp; Itinerary Generator:</span> React.js, Tailwind CSS, Firebase, Gemini AI, Google Maps API
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-cyan-400 font-bold">03. AI-Powered Mock Interview System:</span> Next.js, React.js, Python, FastAPI, PostgreSQL, Drizzle ORM, Sentence Transformers, Clerk Auth, Tailwind CSS, REST APIs
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-cyan-400 font-bold">04. Pomegranate Disease Detection and Remedies System:</span> Python, YOLOv8, MobileNet, FastAPI, Image Processing, Machine Learning
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-cyan-400 font-bold">05. EduSense – RAG-Based Study Assistant:</span> Python, Ollama, Phi-3, ChromaDB, Sentence Transformers, pdfplumber, Streamlit
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-cyan-400 font-bold">06. GateSphere – Smart Visitor Management System:</span> Python, Django, SQLite, Bootstrap
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-cyan-400 font-bold">07. FabTrack – Internship Project:</span> VS Software Lab, Baramati
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">
              Education
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col sm:flex-row justify-between gap-1">
                <div>
                  <div className="font-bold text-white text-sm">Master of Computer Applications (MCA)</div>
                  <div className="text-slate-400 font-mono mt-0.5">MIT Vishwaprayag University, Solapur</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-1">
                    Projects: AI Travel Planning, AI Mock Interview, EduSense (RAG), Pomegranate Disease Detection (YOLOv8)
                  </div>
                </div>
                <div className="text-cyan-400 font-mono">2024 – 2026</div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col sm:flex-row justify-between gap-1">
                <div>
                  <div className="font-bold text-white text-sm">Bachelor of Computer Applications (BCA)</div>
                  <div className="text-slate-400 font-mono mt-0.5">Sangameshwar College</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-1">
                    Project: FaceX – Facial Recognition-Based Employee Attendance System (Python, OpenCV, Firebase, PyQt)
                  </div>
                </div>
                <div className="text-cyan-400 font-mono">Completed in 2024</div>
              </div>
            </div>
          </div>

          {/* Professional Interests */}
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
              Professional Interests
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-mono text-slate-300">
              <span>Full Stack Web Development</span>
              <span aria-hidden="true">·</span>
              <span>Backend Engineering &amp; REST APIs</span>
              <span aria-hidden="true">·</span>
              <span>AI &amp; Machine Learning</span>
              <span aria-hidden="true">·</span>
              <span>Generative AI &amp; RAG</span>
              <span aria-hidden="true">·</span>
              <span>Computer Vision</span>
              <span aria-hidden="true">·</span>
              <span>Database Design &amp; Integration</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
