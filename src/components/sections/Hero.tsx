'use client';

import LetterGlitch from '@/components/Backgrounds/LetterGlitch/LetterGlitch';

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden py-8 sm:py-12 md:py-20">
      {/* Fondo glitch */}
      <div className="absolute inset-0 z-0 w-full h-full min-h-[400px]">
        <LetterGlitch
          glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
          glitchSpeed={50}
          centerVignette={false}
          outerVignette={true}
          smooth={true}
        />
      </div>
      {/* Contenido Hero */}
      <div className="relative z-10 w-full max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Avatar o imagen */}
          <div className="mx-auto w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-emerald-600 to-cyan-600 flex items-center justify-center text-white text-3xl sm:text-4xl md:text-5xl font-bold shadow-lg shadow-emerald-900/40">
            DA
          </div>

          {/* Título principal */}
          <div className="space-y-4">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-[0_12px_48px_rgba(0,0,0,1)] blur-[0.6px] break-words">
              <span className="text-white drop-shadow-[0_12px_48px_rgba(0,0,0,1)] blur-[0.6px]">
                Darío Antonio Gutiérrez Álvarez
              </span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-white font-bold max-w-xs xs:max-w-md sm:max-w-2xl md:max-w-4xl mx-auto drop-shadow-[0_12px_48px_rgba(0,0,0,1)] blur-[0.6px]">
            Ingeniero en Software
          </p>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 sm:mt-10 md:mt-14 w-full max-w-xs xs:max-w-md sm:max-w-2xl mx-auto">
            <a href="#proyectos" className="inline-block text-base xs:text-lg px-6 xs:px-8 py-3 xs:py-4 bg-black hover:bg-gray-900 text-white font-bold border-none rounded-lg shadow-xl shadow-black/40 transition-colors w-full sm:w-auto">
              Ver Proyectos
            </a>
            <a
              href="/cv/DarioAntonioGutierrezAlvarezCV.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-base xs:text-lg px-6 xs:px-8 py-3 xs:py-4 bg-white/80 text-black font-bold border border-white/60 rounded-xl shadow-xl shadow-white/30 drop-shadow-[0_8px_32px_rgba(255,255,255,0.7)] backdrop-blur-md transition-all duration-300 gap-3 relative overflow-hidden animate-pulse-cv hover:scale-105 hover:bg-white hover:shadow-2xl hover:border-white w-full sm:w-auto"
              style={{ boxShadow: '0 0 32px 0 rgba(255,255,255,0.25), 0 1.5px 8px 0 rgba(0,0,0,0.10)' }}
            >
              <span className="relative flex items-center">
                <svg className="w-6 h-6 xs:w-7 xs:h-7 mr-2 text-emerald-500 animate-download-bounce group-hover:animate-download-spin" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                </svg>
              </span>
              Descargar CV
              {/* Glow pulse effect */}
              <span className="absolute inset-0 rounded-xl pointer-events-none animate-cv-glow"></span>
            </a>

            <style jsx>{`
              @keyframes pulse-cv {
                0%, 100% { box-shadow: 0 0 32px 0 rgba(255,255,255,0.25), 0 1.5px 8px 0 rgba(0,0,0,0.10); }
                50% { box-shadow: 0 0 64px 8px rgba(16,185,129,0.25), 0 1.5px 8px 0 rgba(0,0,0,0.10); }
              }
              .animate-pulse-cv {
                animation: pulse-cv 2.2s infinite;
              }
              @keyframes download-bounce {
                0%, 100% { transform: translateY(0) scale(1); }
                20% { transform: translateY(-6px) scale(1.1); }
                40% { transform: translateY(0) scale(1); }
                60% { transform: translateY(2px) scale(0.95); }
                80% { transform: translateY(0) scale(1); }
              }
              .animate-download-bounce {
                animation: download-bounce 1.8s infinite;
              }
              @keyframes download-spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              .group-hover\:animate-download-spin:hover {
                animation: download-spin 0.7s linear;
              }
              @keyframes cv-glow {
                0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.12); }
                50% { box-shadow: 0 0 32px 8px rgba(16,185,129,0.18); }
              }
              .animate-cv-glow {
                animation: cv-glow 2.2s infinite;
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 