import React, { useState, useEffect } from 'react';
import { ArrowDown, Mail, Github, Linkedin } from 'lucide-react';
import Avatar3DCanvas from './Avatar3DCanvas';
import { playClickTone } from '../utils/sound';

interface HeroSectionProps {
  onOpenResume: () => void;
}

const ROLES = ['FULL STACK', 'AI & BACKEND', 'COMPUTER VISION', 'RAG & GEN AI'];

export default function HeroSection({ onOpenResume }: HeroSectionProps) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-20 px-6 md:px-12 overflow-hidden">
      {/* Background radial spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-cyan-950/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-8 py-12 relative z-10">
        {/* Left Column: Greeting & Name */}
        <div className="lg:col-span-4 flex flex-col items-start z-10 text-left order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 mb-3 text-sm font-mono text-cyan-400">
            <span>Hello! I&apos;m</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.08] mb-4">
            DIGVIJAY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              MENKUDALE
            </span>
          </h1>

          <p className="text-sm md:text-base text-slate-300 max-w-sm leading-relaxed mb-6">
            Aspiring Full Stack Developer &amp; AI Enthusiast. MCA graduate experienced in Python, Django, FastAPI, React.js, Next.js, Computer Vision, and RAG architectures.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={playClickTone}
              className="px-5 py-3 text-xs font-mono uppercase tracking-wider font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] cursor-pointer"
            >
              Get In Touch
            </a>
            <button
              onClick={() => {
                playClickTone();
                onOpenResume();
              }}
              className="px-5 py-3 text-xs font-mono uppercase tracking-wider font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all cursor-pointer"
            >
              View Resume
            </button>
          </div>

          {/* Social Quick Links */}
          <div className="flex items-center gap-4 mt-8 text-slate-400 text-xs font-mono">
            <a
              href="mailto:rushikeshmenkudale385@gmail.com"
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="https://github.com/DigvijayMenkudale"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="https://linkedin.com/in/digvijaymenkudale"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Center Column: 3D Interactive Avatar */}
        <div className="lg:col-span-4 h-[380px] sm:h-[440px] md:h-[480px] w-full flex items-center justify-center relative order-1 lg:order-2">
          {/* Subtle glow disk under avatar */}
          <div className="absolute w-56 h-56 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <Avatar3DCanvas mode="hero" className="w-full h-full" />
        </div>

        {/* Right Column: Title & Dynamic Cycling Role */}
        <div className="lg:col-span-4 flex flex-col items-start lg:items-end text-left lg:text-right z-10 order-3">
          <div className="inline-flex items-center gap-2 mb-3 text-sm font-mono text-purple-400">
            <span>Specializing In</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.08] mb-4">
            <span className="block min-h-[1.2em] transition-all duration-300 text-glow-cyan text-cyan-400">
              {ROLES[roleIndex]}
            </span>
          </h2>

          <p className="text-sm md:text-base text-slate-300 max-w-sm leading-relaxed mb-6 lg:text-right">
            Building practical web applications, intelligent retrieval-augmented generation systems, and clean backend APIs with Python, Django, and modern React.
          </p>

          {/* Factual Metrics (Zero-Pill Discipline) */}
          <div className="flex flex-col items-start lg:items-end gap-1 text-xs text-slate-400 font-mono">
            <div>
              <span className="text-white font-semibold tabular-nums">MCA</span> Graduate (2024–2026)
            </div>
            <div>
              <span className="text-white font-semibold tabular-nums">7+</span> Academic &amp; Internship Projects
            </div>
            <div>
              <span className="text-white font-semibold">VS Software Lab</span> Full Stack Intern
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Cue */}
      <div className="w-full flex justify-center py-6">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-xs font-mono text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-widest cursor-pointer"
        >
          <span>Scroll To Explore</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
