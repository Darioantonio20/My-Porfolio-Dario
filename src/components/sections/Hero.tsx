'use client';

import Button from '../ui/Button';

const Hero = () => {
  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-gray-900 to-cyan-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Avatar o imagen */}
          <div className="mx-auto w-32 h-32 rounded-full bg-gradient-to-r from-emerald-600 to-cyan-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-emerald-900/40">
            DA
          </div>

          {/* Título principal */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-emerald-300 drop-shadow-lg">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Darío Antonio Gutiérrez Álvarez
              </span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-lg text-emerald-200 max-w-2xl mx-auto">
            Ingeniero en Software
          </p>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white border-none">
              Ver Proyectos
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-emerald-400 text-emerald-300 hover:bg-emerald-900/30">
              Descargar CV
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg
              className="w-6 h-6 text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 