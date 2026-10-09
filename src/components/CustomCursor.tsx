import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on desktop/pointer-enabled devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('interactive-cursor') ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth spring follower
    let animationFrameId: number;
    const animateTrail = () => {
      setTrail((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.18,
        y: prev.y + (pos.y - prev.y) * 0.18,
      }));
      animationFrameId = requestAnimationFrame(animateTrail);
    };
    animationFrameId = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pos.x, pos.y, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Primary pointer dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[100] transition-transform duration-75"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <div
          className={`rounded-full bg-cyan-400 transition-all duration-150 ${
            isClicked ? 'w-2 h-2 scale-75' : isHovered ? 'w-3 h-3 bg-white' : 'w-2 h-2'
          }`}
        />
      </div>

      {/* Trailing glowing purple aura orb matching the video */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[99] will-change-transform"
        style={{
          transform: `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <div
          className={`rounded-full transition-all duration-300 ${
            isHovered
              ? 'w-12 h-12 bg-purple-600/35 border border-purple-400/50 shadow-[0_0_28px_rgba(168,85,247,0.5)]'
              : 'w-7 h-7 bg-purple-500/25 border border-purple-400/30 shadow-[0_0_18px_rgba(168,85,247,0.35)]'
          } ${isClicked ? 'scale-75' : ''}`}
        />
      </div>
    </>
  );
}
