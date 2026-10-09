import React, { useState } from 'react';
import { Volume2, VolumeX, FileText } from 'lucide-react';
import { toggleSound, isSoundEnabled, playClickTone } from '../utils/sound';

interface NavbarProps {
  onOpenResume: () => void;
}

export default function Navbar({ onOpenResume }: NavbarProps) {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    playClickTone();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#07090e]/85 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#hero"
          className="flex items-center gap-2 text-xl font-black tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 group cursor-pointer"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-slate-950 font-black text-sm shadow-[0_0_16px_rgba(6,182,212,0.4)]">
            DM
          </span>
          <span className="font-mono text-sm tracking-widest text-slate-300 group-hover:text-white hidden sm:inline">
            DIGVIJAY
          </span>
        </a>

        {/* Zone 2: Single-Line Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-mono uppercase tracking-wider text-slate-300">
          <a
            href="#about"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            About
          </a>
          <a
            href="#what-i-do"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            What I Do
          </a>
          <a
            href="#experience"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Experience
          </a>
          <a
            href="#work"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Work
          </a>
          <a
            href="#techstack"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Techstack
          </a>
          <a
            href="#contact"
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: Primary Action & Audio Control */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Ambient Audio Synthesizer Toggle matching video icon */}
          <button
            onClick={handleToggleSound}
            title={soundOn ? 'Mute ambient sound' : 'Enable ambient sound'}
            className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-400 hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Toggle Sound"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => {
              playClickTone();
              onOpenResume();
            }}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:shadow-[0_0_26px_rgba(6,182,212,0.55)] cursor-pointer whitespace-nowrap shrink-0"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>
        </div>
      </div>
    </header>
  );
}
