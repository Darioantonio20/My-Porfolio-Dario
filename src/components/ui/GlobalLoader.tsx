'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const GlobalLoader: React.FC = () => {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Prevent scrolling while loader is active
    document.body.style.overflow = 'hidden';

    const handleComplete = () => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = '';
      }, 500); // 500ms fade transition
    };

    // Minimum display time for a smooth aesthetic experience
    const minTimer = setTimeout(() => {
      if (document.readyState === 'complete') {
        handleComplete();
      } else {
        window.addEventListener('load', handleComplete, { once: true });
      }
    }, 1200);

    return () => {
      clearTimeout(minTimer);
      document.body.style.overflow = '';
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading Page"
      role="status"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black/85 backdrop-blur-2xl transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* High-Tech Site Colored Uiverse Spinner */}
      <div
        className="group relative inline-flex items-center justify-center rounded-3xl border border-emerald-500/30 bg-slate-950/80 p-5 text-white shadow-[0_0_60px_rgba(16,185,129,0.2)] transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_80px_rgba(34,211,238,0.3)] focus:outline-none"
        tabIndex={0}
        style={{ fontSize: '16px' }}
      >
        <div
          className="relative flex items-center justify-center overflow-hidden rounded-3xl border border-cyan-500/30 bg-black/90 shadow-[inset_0_0_30px_rgba(0,0,0,0.9)]"
          style={{ width: '13em', height: '13em' }}
        >
          {/* Concentric Decorative Rings */}
          <div
            className="absolute rounded-full border border-emerald-500/25 transition-colors duration-300 group-hover:border-emerald-400/50"
            style={{ width: '10em', height: '10em' }}
          />
          <div
            className="absolute rounded-full border border-dashed border-cyan-400/35 transition-colors duration-300 group-hover:border-cyan-300/60"
            style={{ width: '7.2em', height: '7.2em' }}
          />

          {/* 4 Corner Neon Accent Dots */}
          <div
            className="absolute rounded-full bg-emerald-400/80 shadow-[0_0_8px_#10b981]"
            style={{ left: '1em', top: '1em', width: '0.38em', height: '0.38em' }}
          />
          <div
            className="absolute rounded-full bg-cyan-400/80 shadow-[0_0_8px_#22d3ee]"
            style={{ right: '1em', top: '1em', width: '0.38em', height: '0.38em' }}
          />
          <div
            className="absolute rounded-full bg-cyan-400/80 shadow-[0_0_8px_#22d3ee]"
            style={{ left: '1em', bottom: '1em', width: '0.38em', height: '0.38em' }}
          />
          <div
            className="absolute rounded-full bg-emerald-400/80 shadow-[0_0_8px_#10b981]"
            style={{ right: '1em', bottom: '1em', width: '0.38em', height: '0.38em' }}
          />

          {/* Crosshair Lines */}
          <div
            className="absolute bg-cyan-500/25"
            style={{ width: '0.0625em', height: '7.5em' }}
          />
          <div
            className="absolute bg-cyan-500/25"
            style={{ width: '7.5em', height: '0.0625em' }}
          />

          {/* Clockwise Outer Spinning Orbit */}
          <div
            className="absolute animate-spin"
            style={{ width: '10em', height: '10em', animationDuration: '2.8s' }}
          >
            <div
              className="absolute left-1/2 top-1 -translate-x-1/2 rounded-full bg-gradient-to-b from-emerald-400 to-cyan-400 shadow-[0_0_18px_rgba(56,189,248,0.9)] transition-transform duration-300 group-hover:scale-110"
              style={{ width: '1.25em', height: '2.5em' }}
            >
              <div
                className="mx-auto rounded-full bg-amber-300 shadow-[0_0_8px_#fde047]"
                style={{ marginTop: '0.75em', width: '0.0825em', height: '1em' }}
              />
            </div>
          </div>

          {/* Counter-Clockwise Inner Orbit */}
          <div className="absolute rotate-45" style={{ width: '7.2em', height: '7.2em' }}>
            <div
              className="relative h-full w-full animate-spin"
              style={{ animationDuration: '4.25s', animationDirection: 'reverse' }}
            >
              <div
                className="absolute left-0 top-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)] transition-colors duration-300 group-hover:bg-cyan-300"
                style={{ width: '0.75em', height: '0.75em', transform: 'translateY(-50%)' }}
              />
              <div
                className="absolute right-0 top-1/2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] transition-colors duration-300 group-hover:bg-emerald-300"
                style={{ width: '0.55em', height: '0.55em', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          {/* Central Core */}
          <div
            className="relative flex items-center justify-center rounded-full border border-emerald-500/40 bg-slate-950/90 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-colors duration-300 group-hover:border-cyan-400/60"
            style={{ width: '4.8em', height: '4.8em' }}
          >
            <div
              className="absolute bg-cyan-500/30"
              style={{ width: '2.6em', height: '0.0625em' }}
            />
            <div
              className="absolute bg-cyan-500/30"
              style={{ width: '0.0625em', height: '2.6em' }}
            />
            <div
              className="rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_14px_#34d399]"
              style={{ width: '1.25em', height: '1.25em' }}
            />
            <div
              className="absolute rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24] animate-ping"
              style={{ right: '1em', bottom: '0.8em', width: '0.35em', height: '0.35em' }}
            />
          </div>

          {/* Glowing Animated Three Dots */}
          <div className="absolute bottom-3 text-base font-black tracking-[0.4em] text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)] animate-pulse">
            ...
          </div>

          <span className="sr-only">Cargando portafolio...</span>
        </div>
      </div>
    </div>
  );
};

export default GlobalLoader;
