import React from 'react';
import Avatar3DCanvas from './Avatar3DCanvas';
import { Server, Layout, CheckCircle2 } from 'lucide-react';

export default function WhatIDoSection() {
  return (
    <section id="what-i-do" className="relative py-28 px-4 md:px-8 border-t border-white/5 bg-[#070911]">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title matching video */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase mb-2">
            <span>Core Capabilities</span>
            <span aria-hidden="true">·</span>
            <span>Software Engineering</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase">
            WHAT I DO
          </h2>
        </div>

        {/* 3-Column Layout: BACKEND Card | 3D Desk Character | FRONTEND Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Card: BACKEND */}
          <div className="lg:col-span-4 p-6 md:p-8 rounded-3xl glass-card border border-white/10 hover:border-cyan-500/30 transition-all shadow-xl order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest block">Backend &amp; Data</span>
                <h3 className="text-2xl font-black tracking-tight text-white uppercase">BACKEND</h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Developing structured backend services, RESTful APIs, database operations, and secure user authentication across Python and Node.js environments.
            </p>

            <ul className="space-y-3 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Python, Django &amp; FastAPI Frameworks</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>REST API Design &amp; Postman Testing</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>PostgreSQL, SQLite &amp; Firebase Databases</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Authentication &amp; Role-Based Access Control</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Docker Containerization &amp; Git Version Control</span>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Environment: Python &amp; Node</span>
              <span>Clean Modular Code</span>
            </div>
          </div>

          {/* Center Column: 3D Developer At Desk with Dynamic Laptop Screen Reflection! */}
          <div className="lg:col-span-4 h-[380px] sm:h-[440px] md:h-[480px] w-full flex items-center justify-center relative order-1 lg:order-2">
            <div className="absolute w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <Avatar3DCanvas mode="desk" className="w-full h-full" />
            <div className="absolute bottom-2 text-center pointer-events-none">
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 bg-slate-950/80 px-3 py-1 rounded-full border border-white/10">
                Live Interactive Workspace
              </span>
            </div>
          </div>

          {/* Right Card: AI & FRONTEND */}
          <div className="lg:col-span-4 p-6 md:p-8 rounded-3xl glass-card border border-white/10 hover:border-purple-500/30 transition-all shadow-xl order-3">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <Layout className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-purple-400 uppercase tracking-widest block">AI, ML &amp; UI</span>
                <h3 className="text-2xl font-black tracking-tight text-white uppercase">AI &amp; FRONTEND</h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Integrating computer vision models, local RAG question answering, and generative AI APIs into responsive, clean React and Next.js interfaces.
            </p>

            <ul className="space-y-3 text-xs text-slate-300 font-mono">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>OpenCV &amp; YOLOv8 Object/Face Detection</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>RAG, ChromaDB &amp; Sentence Transformers</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Local LLMs: Ollama, Phi-3 &amp; Gemini AI</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>React.js &amp; Next.js Component Architecture</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Tailwind CSS &amp; Responsive Web Development</span>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Vision &amp; Retrieval Models</span>
              <span>Modern Web UI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
