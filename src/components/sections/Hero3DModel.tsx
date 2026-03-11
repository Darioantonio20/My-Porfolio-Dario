'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-950/60 to-cyan-950/50">
      <div className="h-14 w-14 rounded-full border border-emerald-400/30 border-t-emerald-300 animate-spin" />
    </div>
  ),
});

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

const Hero3DModel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadSpline, setShouldLoadSpline] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || shouldLoadSpline) return;

    const idleWindow = window as IdleWindow;
    let idleHandle: number | null = null;
    let timeoutHandle: number | null = null;

    const triggerLoad = () => {
      setShouldLoadSpline(true);
    };

    const scheduleLoad = () => {
      if (idleWindow.requestIdleCallback) {
        idleHandle = idleWindow.requestIdleCallback(triggerLoad, { timeout: 1200 });
        return;
      }

      timeoutHandle = window.setTimeout(triggerLoad, 350);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        scheduleLoad();
        observer.disconnect();
      },
      {
        rootMargin: '200px 0px',
        threshold: 0.15,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();

      if (idleHandle !== null && idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleHandle);
      }

      if (timeoutHandle !== null) {
        window.clearTimeout(timeoutHandle);
      }
    };
  }, [shouldLoadSpline]);

  return (
    <div ref={containerRef} className="flex h-[400px] w-full items-center justify-center md:h-[600px]">
      <div className="relative mx-auto h-full w-full max-w-md overflow-hidden rounded-2xl border-2 border-emerald-400/30 bg-gradient-to-br from-emerald-900/20 to-cyan-900/20 backdrop-blur-sm shadow-2xl shadow-emerald-500/20">
        <div className="absolute left-4 top-4 z-10 rounded-full border border-emerald-400/50 bg-black/70 px-4 py-2 text-sm text-white shadow-lg backdrop-blur-md">
          <span className="flex items-center gap-2 font-medium">
            <div className="relative">
              <svg className="h-4 w-4 text-emerald-400 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400" />
            </div>
            <span className="overflow-hidden whitespace-nowrap">
              {shouldLoadSpline ? 'Drag to rotate' : 'Loading scene'}
            </span>
          </span>
        </div>

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-emerald-400/20 animate-ping" />
          <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-emerald-400/40 animate-pulse" />
        </div>

        <div className="relative h-full w-full">
          {shouldLoadSpline ? (
            <Spline scene="https://prod.spline.design/2luUXs6ByjC2eK4F/scene.splinecode" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.12),transparent_38%)]">
              <div className="flex flex-col items-center gap-4 text-center text-white/70">
                <div className="h-14 w-14 rounded-full border border-emerald-400/30 border-t-emerald-300 animate-spin" />
                <p className="text-sm uppercase tracking-[0.28em] text-emerald-200/70">
                  Preparing interactive scene
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-0 h-8 w-8 rounded-tl-lg border-l-2 border-t-2 border-emerald-400/50" />
          <div className="absolute right-0 top-0 h-8 w-8 rounded-tr-lg border-r-2 border-t-2 border-emerald-400/50" />
          <div className="absolute bottom-0 left-0 h-8 w-8 rounded-bl-lg border-b-2 border-l-2 border-emerald-400/50" />
          <div className="absolute bottom-0 right-0 h-8 w-8 rounded-br-lg border-b-2 border-r-2 border-emerald-400/50" />
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero3DModel;
