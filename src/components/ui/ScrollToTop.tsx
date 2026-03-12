'use client';

import { useEffect, useState } from 'react';

const SCROLL_THRESHOLD = 320;

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-[90] inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/12 bg-[linear-gradient(135deg,rgba(16,185,129,0.92),rgba(6,182,212,0.88))] text-white shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_22px_55px_rgba(0,0,0,0.42)] focus:outline-none focus:ring-2 focus:ring-cyan-300/70 ${
        isVisible
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
