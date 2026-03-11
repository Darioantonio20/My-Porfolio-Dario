'use client';

import dynamic from 'next/dynamic';

const LetterGlitch = dynamic(() => import('@/components/Backgrounds/LetterGlitch/LetterGlitch'), {
  loading: () => <div className="h-full w-full bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.12),transparent_35%),linear-gradient(180deg,#020617,#000)]" />,
});

const Hero3DModel = dynamic(() => import('./Hero3DModel'), {
  loading: () => <div className="h-[400px] w-full rounded-2xl border border-emerald-400/20 bg-black/30 md:h-[600px]" />,
});

const Hero = () => {
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden py-8 sm:py-12 md:py-20">
      <div className="absolute inset-0 z-0 h-full min-h-[400px] w-full">
        <LetterGlitch
          glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
          glitchSpeed={50}
          centerVignette={false}
          outerVignette={true}
          smooth={true}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[80vh] grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="order-2 flex flex-col items-center lg:order-1 lg:items-center">
            <div className="relative mx-auto w-full max-w-md lg:mx-0">
              <Hero3DModel />
            </div>
          </div>

          <div className="order-1 text-center lg:order-2 lg:text-center">
            <div className="mb-6 space-y-4">
              <h1 className="break-words text-3xl font-extrabold leading-tight text-white drop-shadow-[0_12px_48px_rgba(0,0,0,1)] blur-[0.6px] xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="text-white drop-shadow-[0_12px_48px_rgba(0,0,0,1)] blur-[0.6px]">
                  Darío Antonio Gutiérrez Álvarez
                </span>
              </h1>
            </div>

            <p className="mx-auto mb-8 max-w-xs text-base font-bold text-white drop-shadow-[0_12px_48px_rgba(0,0,0,1)] blur-[0.6px] xs:max-w-md xs:text-lg sm:max-w-2xl sm:text-xl md:text-2xl lg:mx-0">
              Software Engineer
            </p>

            <div className="mx-auto flex w-full max-w-xs flex-col justify-center gap-4 xs:max-w-md sm:max-w-2xl sm:flex-row lg:mx-0 lg:justify-center">
              <a
                href="/cv/DarioAntonioGutierrezAlvarezCV.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl border border-white/60 bg-white/80 px-6 py-3 text-base font-bold text-black shadow-xl shadow-white/30 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white hover:shadow-2xl xs:px-8 xs:py-4 xs:text-lg sm:w-auto"
                style={{ boxShadow: '0 0 32px 0 rgba(255,255,255,0.25), 0 1.5px 8px 0 rgba(0,0,0,0.10)' }}
              >
                <span className="relative flex items-center">
                  <svg className="mr-2 h-6 w-6 text-emerald-500 animate-download-bounce xs:h-7 xs:w-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                  </svg>
                </span>
                Download CV
                <span className="pointer-events-none absolute inset-0 rounded-xl animate-cv-glow" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes download-bounce {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          20% {
            transform: translateY(-6px) scale(1.1);
          }
          40% {
            transform: translateY(0) scale(1);
          }
          60% {
            transform: translateY(2px) scale(0.95);
          }
          80% {
            transform: translateY(0) scale(1);
          }
        }

        .animate-download-bounce {
          animation: download-bounce 1.8s infinite;
        }

        @keyframes cv-glow {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.12);
          }
          50% {
            box-shadow: 0 0 32px 8px rgba(16, 185, 129, 0.18);
          }
        }

        .animate-cv-glow {
          animation: cv-glow 2.2s infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
