import Spline from '@splinetool/react-spline';

const Hero3DModel = () => {
  return (
    <div className="w-full h-[400px] md:h-[600px] flex items-center justify-center">
      {/* Marco delimitado para el área de interacción */}
      <div className="relative w-full h-full max-w-md mx-auto border-2 border-emerald-400/30 rounded-2xl bg-gradient-to-br from-emerald-900/20 to-cyan-900/20 backdrop-blur-sm shadow-2xl shadow-emerald-500/20 overflow-hidden">
        {/* Indicador de interacción mejorado */}
        <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-md text-white text-sm px-4 py-2 rounded-full border border-emerald-400/50 shadow-lg">
          <span className="flex items-center gap-2 font-medium">
            {/* Icono de rotación animado */}
            <div className="relative">
              <svg className="w-4 h-4 text-emerald-400 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {/* Punto central */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-emerald-400 rounded-full"></div>
            </div>
            
            {/* Texto con efecto de typing */}
            <div className="overflow-hidden">
              <span className="hidden sm:inline-block animate-typing whitespace-nowrap">
                Arrastra para rotar
              </span>
              <span className="sm:hidden animate-typing whitespace-nowrap">
                Toca y mueve
              </span>
            </div>
            
            {/* Flechas de dirección */}
            <div className="hidden sm:flex items-center gap-1">
              <svg className="w-3 h-3 text-emerald-400 animate-bounce-x" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <svg className="w-3 h-3 text-emerald-400 animate-bounce-x-reverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </span>
        </div>
        
        {/* Indicador de área interactiva */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-emerald-400/20 rounded-full animate-ping"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-emerald-400/40 rounded-full animate-pulse"></div>
        </div>
        
        {/* Modelo 3D dentro del marco */}
        <div className="w-full h-full relative">
          <Spline scene="https://prod.spline.design/2luUXs6ByjC2eK4F/scene.splinecode" />
        </div>
        
        {/* Bordes decorativos */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-emerald-400/50 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-emerald-400/50 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-emerald-400/50 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-emerald-400/50 rounded-br-lg"></div>
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
        
        @keyframes typing {
          0%, 50% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-2px);
          }
          75% {
            transform: translateX(2px);
          }
        }
        
        @keyframes bounce-x {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-3px);
          }
        }
        
        @keyframes bounce-x-reverse {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(3px);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-typing {
          animation: typing 2s ease-in-out infinite;
        }
        
        .animate-bounce-x {
          animation: bounce-x 1.5s ease-in-out infinite;
        }
        
        .animate-bounce-x-reverse {
          animation: bounce-x-reverse 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero3DModel; 


