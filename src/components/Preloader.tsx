import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playSuccessChime } from '../utils/sound';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Accelerating progress curve
      const step = Math.max(1, Math.floor((100 - current) * 0.12) + Math.floor(Math.random() * 4));
      current = Math.min(100, current + step);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setIsDone(true);
        playSuccessChime();
        setTimeout(() => {
          onComplete();
        }, 900);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#e5ecea] text-slate-900 select-none overflow-hidden"
      >
        {/* Background oversized animated marquee text like in the video */}
        <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none opacity-[0.88] overflow-hidden">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
            className="flex whitespace-nowrap text-[12vw] font-black uppercase tracking-tighter text-slate-950/90 leading-none"
          >
            <span className="mr-8">FULL STACK DEVELOPER • SOFTWARE ENGINEER • CREATIVE TECHNOLOGIST •</span>
            <span className="mr-8">FULL STACK DEVELOPER • SOFTWARE ENGINEER • CREATIVE TECHNOLOGIST •</span>
          </motion.div>
        </div>

        {/* Center Pill Loader Container */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative z-10 flex items-center justify-center"
        >
          <div className="flex items-center gap-3 px-6 py-3.5 bg-[#090b10] text-white rounded-full shadow-2xl border border-white/10">
            {/* Pulsing indicator dot */}
            <span
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                isDone ? 'bg-emerald-400 shadow-[0_0_12px_#34d399]' : 'bg-cyan-400 animate-pulse shadow-[0_0_12px_#22d3ee]'
              }`}
            />

            <span className="font-mono text-sm tracking-widest font-semibold uppercase min-w-[110px] text-center">
              {isDone ? 'WELCOME' : `LOADING ${progress}%`}
            </span>
          </div>
        </motion.div>

        {/* Subtle skip button */}
        <button
          onClick={onComplete}
          className="absolute bottom-8 right-8 text-xs font-mono tracking-wider text-slate-500 hover:text-slate-900 transition-colors uppercase cursor-pointer"
        >
          Skip Intro →
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
