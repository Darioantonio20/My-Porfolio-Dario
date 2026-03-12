'use client';

import { useEffect, useState, useRef } from 'react';

const SCROLL_THRESHOLD = 320;

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 2 + 1.5,
    delay: Math.random() * 2,
    opacity: Math.random() * 0.6 + 0.2,
  }));
}

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [particles] = useState<Particle[]>(() => generateParticles(8));
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!mounted) return null;

  const buttonStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '28px',
    right: '28px',
    zIndex: 90,
    width: '58px',
    height: '58px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    padding: 0,
    overflow: 'visible',
    background: 'transparent',
    transition: 'opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
    opacity: isVisible ? 1 : 0,
    transform: isVisible
      ? isClicked
        ? 'translateY(-2px) scale(0.92)'
        : isHovered
        ? 'translateY(-6px) scale(1.12)'
        : 'translateY(0) scale(1)'
      : 'translateY(24px) scale(0.8)',
    pointerEvents: isVisible ? 'auto' : 'none',
  };

  const innerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #818cf8 100%)',
    boxShadow: isHovered
      ? '0 0 0 2px rgba(16,185,129,0.4), 0 20px 60px rgba(16,185,129,0.5), 0 0 40px rgba(6,182,212,0.4), inset 0 1px 1px rgba(255,255,255,0.25)'
      : '0 0 0 1px rgba(16,185,129,0.2), 0 12px 40px rgba(16,185,129,0.3), 0 0 20px rgba(6,182,212,0.2), inset 0 1px 1px rgba(255,255,255,0.15)',
    transition: 'box-shadow 0.4s ease',
  };

  return (
    <>
      <style>{`
        @keyframes stt-pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(2.1); opacity: 0; }
        }
        @keyframes stt-pulse-ring2 {
          0%   { transform: scale(1);   opacity: 0.4; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        @keyframes stt-float-particle {
          0%   { transform: translateY(0px)   scale(1);   opacity: var(--p-opacity); }
          50%  { transform: translateY(-12px) scale(1.3); opacity: calc(var(--p-opacity) * 1.5); }
          100% { transform: translateY(0px)   scale(1);   opacity: var(--p-opacity); }
        }
        @keyframes stt-rotate-bg {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes stt-arrow-bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-3px); }
        }
        .stt-arrow-icon {
          animation: stt-arrow-bounce 1.6s ease-in-out infinite;
        }
        .stt-hover .stt-arrow-icon {
          animation: stt-arrow-bounce 0.7s ease-in-out infinite;
        }
      `}</style>

      <button
        ref={buttonRef}
        type="button"
        onClick={scrollToTop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Subir al inicio"
        className={isHovered ? 'stt-hover' : ''}
        style={buttonStyle}
      >
        {/* Pulse rings — only shown when hovered */}
        {isHovered && (
          <>
            <span
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '2px solid rgba(16,185,129,0.7)',
                animation: 'stt-pulse-ring 1.1s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
              }}
            />
            <span
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '2px solid rgba(6,182,212,0.5)',
                animation: 'stt-pulse-ring2 1.1s cubic-bezier(0.215, 0.61, 0.355, 1) infinite 0.15s',
              }}
            />
          </>
        )}

        {/* Rotating conic gradient halo (always visible) */}
        <span
          style={{
            position: 'absolute',
            inset: '-4px',
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, rgba(16,185,129,0.8), rgba(6,182,212,0.6), rgba(129,140,248,0.8), rgba(16,185,129,0.8))',
            animation: 'stt-rotate-bg 3s linear infinite',
            opacity: isHovered ? 1 : 0.55,
            transition: 'opacity 0.3s ease',
            filter: 'blur(1px)',
          }}
        />

        {/* Solid inner circle on top of halo */}
        <span style={{ position: 'absolute', inset: '2px', borderRadius: '50%', background: '#0f1117' }} />

        {/* Main gradient face */}
        <span style={innerStyle}>
          {/* Shimmer sweep */}
          <span className="stt-shimmer-bar" />

          {/* Floating particles */}
          {isHovered &&
            particles.map((p) => (
              <span
                key={p.id}
                style={
                  {
                    position: 'absolute',
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    borderRadius: '50%',
                    background: p.id % 2 === 0 ? '#10b981' : '#06b6d4',
                    '--p-opacity': p.opacity,
                    opacity: p.opacity,
                    animation: `stt-float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
                    pointerEvents: 'none',
                  } as React.CSSProperties
                }
              />
            ))}

          {/* Arrow icon */}
          <svg
            className="stt-arrow-icon"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              position: 'relative',
              zIndex: 1,
              filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))',
              transition: 'transform 0.3s ease',
            }}
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </span>
      </button>
    </>
  );
}
