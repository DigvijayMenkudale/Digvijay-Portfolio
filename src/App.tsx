/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import WhatIDoSection from './components/WhatIDoSection';
import ExperienceTimeline from './components/ExperienceTimeline';
import WorkSection from './components/WorkSection';
import TechStackPhysicsSection from './components/TechStackPhysicsSection';
import ContactSection from './components/ContactSection';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#06080e] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Intro Preloader matching video */}
      {!loadingComplete && (
        <Preloader onComplete={() => setLoadingComplete(true)} />
      )}

      {/* Trailing glowing purple cursor */}
      <CustomCursor />

      {/* Navigation Header */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Sections */}
      <main className="relative z-10">
        <HeroSection onOpenResume={() => setIsResumeOpen(true)} />
        <AboutSection />
        <WhatIDoSection />
        <ExperienceTimeline />
        <WorkSection />
        <TechStackPhysicsSection />
        <ContactSection />
      </main>

      {/* Resume / Curriculum Vitae Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Floating Replay Preloader Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setLoadingComplete(false)}
          title="Replay Intro Preloader Animation"
          className="p-3 bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 rounded-full border border-white/10 backdrop-blur-md shadow-xl text-xs font-mono transition-all cursor-pointer"
        >
          ↻
        </button>
      </div>
    </div>
  );
}
