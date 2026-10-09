import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import { Calendar, Briefcase, ChevronRight, Check } from 'lucide-react';
import { playClickTone } from '../utils/sound';

interface ExperienceMilestone {
  year: string;
  role: string;
  company: string;
  period: string;
  tagline: string;
  bullets: string[];
  tech: string[];
}

const MILESTONES: ExperienceMilestone[] = [
  {
    year: '2024',
    role: 'Bachelor of Computer Applications (BCA)',
    company: 'Sangameshwar College',
    period: 'Completed in 2024',
    tagline: 'Undergraduate Computer Science & Programming Fundamentals',
    bullets: [
      'Completed Bachelor of Computer Applications with a strong foundation in core computer science.',
      'Developed major academic project: FaceX – Facial Recognition-Based Employee Attendance System using Python, OpenCV, Firebase, and PyQt.',
      'Studied object-oriented programming, data structures, relational database management, and web programming.',
    ],
    tech: ['Python', 'OpenCV', 'Firebase', 'PyQt', 'C / C++', 'Java', 'SQL'],
  },
  {
    year: '2024–26',
    role: 'Master of Computer Applications (MCA)',
    company: 'MIT Vishwaprayag University, Solapur',
    period: '2024 — 2026',
    tagline: 'Postgraduate Degree in Advanced Software Systems & AI',
    bullets: [
      'Developed major academic projects including AI Travel Planning & Itinerary (Personalized Travel Planner & Route Generator), AI-Powered Mock Interview (Full-Stack Technical Interview Practice Platform), EduSense – RAG Study Assistant (Offline RAG Document Interaction with Local LLMs), and Pomegranate Disease Detection with YOLOv8.',
      'Pursued Master of Computer Applications specializing in full-stack engineering, machine learning, and intelligent systems.',
      'Hands-on implementation of RAG pipelines, ChromaDB vector stores, FastAPI backends, and Next.js / React interfaces.',
    ],
    tech: ['Python', 'FastAPI', 'Next.js', 'React.js', 'YOLOv8', 'ChromaDB', 'Gemini AI', 'PostgreSQL'],
  },
  {
    year: '2026',
    role: 'Full Stack Developer Intern',
    company: 'VS Software Lab · Baramati',
    period: 'March 2026 — September 2026',
    tagline: '6-Month Full Stack Development & Production Engineering Internship',
    bullets: [
      'Worked on full-stack development projects during the 6-month internship period.',
      'Developed GateSphere, a Smart Visitor Management System using Python, Django, SQLite, and Bootstrap.',
      'Worked on FabTrack, an additional verified internship project at VS Software Lab.',
      'Gained practical experience in backend development, database operations, frontend integration, testing, debugging, and project documentation.',
    ],
    tech: ['Python', 'Django', 'SQLite', 'Bootstrap', 'REST APIs', 'Git', 'Postman'],
  },
  {
    year: 'NOW',
    role: 'Aspiring Full Stack Developer',
    company: 'Digvijay Menkudale · Portfolio',
    period: 'Present',
    tagline: 'Ready for Full Stack Engineering, AI/ML & Backend Roles',
    bullets: [
      'Seeking full-time roles in Full Stack Development, Backend Engineering, AI/ML, and Generative AI.',
      'Deep hands-on project portfolio spanning computer vision, vector search, RAG pipelines, and full-stack web platforms.',
      'Committed to writing maintainable, clean code and delivering user-focused software that solves real-world challenges.',
    ],
    tech: ['Python', 'Django', 'FastAPI', 'React.js', 'Next.js', 'PostgreSQL', 'Docker', 'Gemini AI'],
  },
];

export default function ExperienceTimeline() {
  const [activeIdx, setActiveIdx] = useState(MILESTONES.length - 1);
  const active = MILESTONES[activeIdx];

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [markerMetrics, setMarkerMetrics] = useState<{
    centers: number[];
    centerY: number;
  } | null>(null);

  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const didDragRef = useRef(false);

  const updateMetrics = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    if (containerRect.width === 0) return;

    const centers: number[] = [];
    let centerY = 44;

    for (let i = 0; i < MILESTONES.length; i++) {
      const btn = buttonRefs.current[i];
      if (btn) {
        const btnRect = btn.getBoundingClientRect();
        // The button has items-center with the circle, so button's horizontal center is exactly the marker's center
        const centerX = btnRect.left + btnRect.width / 2 - containerRect.left;
        centers.push(centerX);
      }
    }

    const firstCircle = circleRefs.current[0];
    if (firstCircle) {
      const circleRect = firstCircle.getBoundingClientRect();
      centerY = circleRect.top + circleRect.height / 2 - containerRect.top;
    } else if (buttonRefs.current[0]) {
      const btnRect = buttonRefs.current[0].getBoundingClientRect();
      centerY = btnRect.top + 20 - containerRect.top;
    }

    if (centers.length === MILESTONES.length) {
      setMarkerMetrics({ centers, centerY });
    }
  }, []);

  useLayoutEffect(() => {
    updateMetrics();

    const observer = new ResizeObserver(() => {
      updateMetrics();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener('resize', updateMetrics);
    window.addEventListener('orientationchange', updateMetrics);

    const rafId = requestAnimationFrame(updateMetrics);
    const timerId = setTimeout(updateMetrics, 100);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateMetrics);
      window.removeEventListener('orientationchange', updateMetrics);
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
    };
  }, [updateMetrics]);

  const updateActiveFromPointer = useCallback(
    (clientX: number) => {
      if (!containerRef.current || !markerMetrics) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const pointerX = clientX - containerRect.left;

      let closestIdx = 0;
      let minDistance = Infinity;
      for (let i = 0; i < markerMetrics.centers.length; i++) {
        const dist = Math.abs(pointerX - markerMetrics.centers[i]);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = i;
        }
      }

      setActiveIdx((prev) => {
        if (prev !== closestIdx) {
          playClickTone();
        }
        return closestIdx;
      });
    },
    [markerMetrics]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    didDragRef.current = false;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture fails
    }

    updateActiveFromPointer(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    if (Math.abs(e.clientX - dragStartXRef.current) > 4) {
      didDragRef.current = true;
    }
    updateActiveFromPointer(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (activeIdx < MILESTONES.length - 1) {
        setActiveIdx(activeIdx + 1);
        playClickTone();
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (activeIdx > 0) {
        setActiveIdx(activeIdx - 1);
        playClickTone();
      }
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveIdx(0);
      playClickTone();
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveIdx(MILESTONES.length - 1);
      playClickTone();
    }
  };

  const startX = markerMetrics ? markerMetrics.centers[0] : 0;
  const endX = markerMetrics ? markerMetrics.centers[MILESTONES.length - 1] : 0;
  const activeX = markerMetrics ? markerMetrics.centers[activeIdx] : 0;
  const trackWidth = Math.max(0, endX - startX);
  const progressWidth = Math.max(0, activeX - startX);
  const topY = markerMetrics ? markerMetrics.centerY : 44;

  return (
    <section id="experience" className="relative py-28 px-4 md:px-8 border-t border-white/5 bg-[#06080f] overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header matching video */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase mb-2">
              <span>Career Trajectory</span>
              <span aria-hidden="true">·</span>
              <span>Proven Track Record</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase">
              My career &amp; experience
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-400 max-w-md font-light">
            Click or drag the interactive timeline slider to explore roles, key architectural accomplishments, and tech stacks across each milestone.
          </p>
        </div>

        {/* Interactive Timeline Scrubber Bar matching video (1:22 - 1:29) */}
        <div
          ref={containerRef}
          role="slider"
          aria-label="Career experience timeline"
          aria-valuemin={0}
          aria-valuemax={MILESTONES.length - 1}
          aria-valuenow={activeIdx}
          aria-valuetext={`${active.company} (${active.year})`}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative mb-12 p-6 glass-panel rounded-3xl border border-white/10 select-none touch-pan-y cursor-pointer focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
        >
          {/* Accessible hidden range input */}
          <input
            type="range"
            min={0}
            max={MILESTONES.length - 1}
            step={1}
            value={activeIdx}
            onChange={(e) => {
              const nextIdx = Number(e.target.value);
              if (nextIdx !== activeIdx) {
                setActiveIdx(nextIdx);
                playClickTone();
              }
            }}
            aria-label="Experience milestone slider"
            className="sr-only"
          />

          {/* Background track line: starts precisely at marker 0 center and ends precisely at marker 3 center */}
          <div
            className="absolute -translate-y-1/2 h-1 bg-slate-800 rounded-full pointer-events-none"
            style={{
              left: `${startX}px`,
              width: `${trackWidth}px`,
              top: `${topY}px`,
              opacity: markerMetrics ? 1 : 0,
            }}
          />

          {/* Active progress fill: starts precisely at marker 0 center and ends precisely at active marker center */}
          <div
            className="absolute -translate-y-1/2 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-[width] duration-300 ease-out pointer-events-none"
            style={{
              left: `${startX}px`,
              width: `${progressWidth}px`,
              top: `${topY}px`,
              opacity: markerMetrics ? 1 : 0,
            }}
          />

          {/* Nodes */}
          <div className="relative flex items-center justify-between z-10 pointer-events-auto">
            {MILESTONES.map((m, idx) => {
              const isCurrent = idx === activeIdx;
              const isPast = idx < activeIdx;

              return (
                <button
                  key={m.year}
                  ref={(el) => {
                    buttonRefs.current[idx] = el;
                  }}
                  onClick={() => {
                    if (didDragRef.current) return;
                    if (activeIdx !== idx) {
                      setActiveIdx(idx);
                      playClickTone();
                    }
                  }}
                  className="flex flex-col items-center gap-3 group cursor-pointer focus:outline-none"
                >
                  <div
                    ref={(el) => {
                      circleRefs.current[idx] = el;
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCurrent
                        ? 'bg-cyan-400 text-slate-950 scale-125 shadow-[0_0_24px_rgba(6,182,212,0.8)] border-2 border-white'
                        : isPast
                        ? 'bg-purple-600 text-white border border-purple-400'
                        : 'bg-slate-900 text-slate-400 border border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <span className="font-mono text-xs font-black">{m.year}</span>
                  </div>

                  <span
                    className={`text-xs font-mono transition-colors ${
                      isCurrent ? 'text-cyan-400 font-bold' : 'text-slate-400 group-hover:text-white'
                    }`}
                  >
                    {m.company.split('·')[0].trim()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Milestone Detail Card */}
        <div className="p-8 md:p-10 rounded-3xl glass-card border border-white/10 shadow-2xl transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                <span>{active.company}</span>
                <span aria-hidden="true">·</span>
                <Calendar className="w-3.5 h-3.5 ml-1" />
                <span>{active.period}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {active.role}
              </h3>
              <p className="text-sm text-slate-300 mt-1 font-medium text-glow-cyan">
                {active.tagline}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start">
              <span className="px-3.5 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-semibold">
                Milestone {activeIdx + 1} of {MILESTONES.length}
              </span>
            </div>
          </div>

          {/* Bullets */}
          <div className="my-6 space-y-3.5">
            {active.bullets.map((b, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                <div className="p-1 rounded-full bg-cyan-400/20 text-cyan-400 mt-1 shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>{b}</span>
              </div>
            ))}
          </div>

          {/* Technologies Used (Zero-Pill Discipline: unboxed text with subtle separator) */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-white font-medium">Stack utilized:</span>
            {active.tech.map((t, idx) => (
              <React.Fragment key={t}>
                <span className="text-slate-300">{t}</span>
                {idx < active.tech.length - 1 && <span aria-hidden="true">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
