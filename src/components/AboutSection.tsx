import React from 'react';
import Avatar3DCanvas from './Avatar3DCanvas';
import { Code2, Cpu, Globe2, ShieldCheck } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 px-6 md:px-12 border-t border-white/5 bg-[#06080e]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-12 relative z-10">
        {/* Left Column: 3D Avatar (Transitions from Hero as shown in video!) */}
        <div className="lg:col-span-5 h-[360px] md:h-[440px] flex items-center justify-center relative">
          <div className="absolute w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <Avatar3DCanvas mode="about" className="w-full h-full" />
        </div>

        {/* Right Column: About Me Bio & Core Pillars */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase mb-3">
            <span>Profile &amp; Background</span>
            <span aria-hidden="true">·</span>
            <span>MCA Graduate · Full Stack &amp; AI</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase mb-6">
            ABOUT ME
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light mb-6">
            I am an <strong className="text-white font-semibold">MCA graduate and aspiring Full Stack Developer</strong> interested
            in building practical web applications, intelligent systems, and reliable backend solutions.
            I bring hands-on project experience with <strong className="text-cyan-400 font-medium">Python, Django, React.js, Next.js, FastAPI</strong>,
            relational databases, computer vision, and Retrieval-Augmented Generation (RAG).
          </p>

          <p className="text-sm text-slate-400 leading-relaxed mb-8">
            Through academic projects and my full-stack developer internship at <strong className="text-white font-medium">VS Software Lab, Baramati</strong>,
            I have developed hands-on skills in API integration, database operations, user authentication, data processing,
            and end-to-end frontend-backend integration. I am eager to create reliable, user-focused software that solves real-world challenges.
          </p>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-4 border-t border-white/10">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Full Stack Web Development</h4>
                <p className="text-xs text-slate-400 mt-0.5">React.js, Next.js, HTML5, CSS3, JavaScript &amp; Tailwind CSS.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">AI, ML &amp; Generative AI</h4>
                <p className="text-xs text-slate-400 mt-0.5">OpenCV, YOLOv8, ChromaDB, RAG, Ollama, Phi-3 &amp; Gemini AI.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Backend &amp; REST APIs</h4>
                <p className="text-xs text-slate-400 mt-0.5">Python, Django, FastAPI, Node.js, authentication &amp; CRUD logic.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                <Globe2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Databases &amp; Operations</h4>
                <p className="text-xs text-slate-400 mt-0.5">PostgreSQL, SQLite, Firebase, ChromaDB &amp; Docker.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
