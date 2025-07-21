'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import PanZoom from 'react-easy-panzoom';
import ConstanciaEgreso from '@/assets/img/university/ConstanciadeEgreso.png';

const awards = [
  {
    title: 'Constancia de Egreso - UP Chiapas',
    description: 'Ingeniería en Software, Universidad Politécnica de Chiapas, 2025',
    image: ConstanciaEgreso,
    type: 'Constancia',
    date: 'Mayo 2025',
  },
  // Más reconocimientos aquí
];

const Awards = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const panzoomRef = useRef<unknown>(null);
  const [fade, setFade] = useState(false);

  const openModal = (img: string, title: string) => {
    setModalImg(img);
    setModalTitle(title);
    setZoom(1);
    setModalOpen(true);
    setTimeout(() => setFade(true), 10);
  };
  const closeModal = () => {
    setFade(false);
    setTimeout(() => {
      setModalOpen(false);
      setModalImg(null);
      setModalTitle(null);
      setZoom(1);
    }, 250);
  };
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeModal();
  };
  const handleZoomIn = () => {
    setZoom((z) => Math.min(z + 0.25, 3));
    (panzoomRef.current as unknown as { zoomIn?: () => void })?.zoomIn?.();
  };
  const handleZoomOut = () => {
    setZoom((z) => Math.max(z - 0.25, 0.5));
    (panzoomRef.current as unknown as { zoomOut?: () => void })?.zoomOut?.();
  };
  const handleZoomReset = () => {
    setZoom(1);
    (panzoomRef.current as unknown as { autoCenter?: () => void; reset?: () => void })?.autoCenter?.();
    (panzoomRef.current as unknown as { autoCenter?: () => void; reset?: () => void })?.reset?.();
  };
  // Doble click para zoom in/out
  const handleDoubleClick = () => {
    if (zoom === 1) {
      setZoom(2);
      (panzoomRef.current as unknown as { zoomTo?: (z: number, x: number, y: number) => void })?.zoomTo?.(2, 0, 0);
    } else {
      handleZoomReset();
    }
  };

  return (
    <section id="reconocimientos" className="py-20 bg-gradient-to-br from-gray-900 via-emerald-950 to-cyan-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Reconocimientos & <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Constancias</span>
          </h2>
          <p className="text-lg text-cyan-200 max-w-2xl mx-auto">
            Aquí puedes ver mis logros académicos, profesionales y certificaciones.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {awards.map((award, idx) => (
            <div
              key={idx}
              className="bg-black/70 border border-emerald-800/40 rounded-xl shadow-lg hover:shadow-emerald-900/40 transition-shadow duration-300 flex flex-col items-center p-6 cursor-pointer group"
              onClick={() => openModal(award.image.src, award.title)}
            >
              <div className="w-full h-48 relative mb-4 rounded-lg overflow-hidden border border-emerald-900/40 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={award.image.src}
                  alt={award.title}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={idx === 0}
                />
              </div>
              <h3 className="text-xl font-bold text-emerald-300 mb-2 text-center">{award.title}</h3>
              <p className="text-cyan-200 text-center mb-2">{award.description}</p>
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <span className="bg-emerald-900/60 px-2 py-1 rounded-full">{award.type}</span>
                <span className="text-cyan-400">{award.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para ampliar imagen */}
      {modalOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}
          onClick={handleBackdropClick}
        >
          {/* Fondo animado y blur */}
          <div className={`absolute inset-0 bg-gradient-to-br from-black/90 via-emerald-950/80 to-cyan-950/80 backdrop-blur-[6px] transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`} />
          {/* Modal principal */}
          <div
            className={`relative bg-gradient-to-br from-black via-gray-900 to-emerald-950 rounded-3xl p-8 max-w-5xl w-full border border-emerald-800/60 shadow-2xl flex flex-col items-center animate-modal-pop transition-all duration-300 ${fade ? 'scale-100' : 'scale-95'}`}
            style={{ boxShadow: '0 8px 40px 0 rgba(16,185,129,0.25), 0 1.5px 8px 0 rgba(0,0,0,0.25)' }}
          >
            {/* Botón de cierre */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 p-3 rounded-full bg-black/60 hover:bg-emerald-800/80 border border-emerald-900 text-cyan-200 hover:text-white shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 scale-100 hover:scale-110 active:scale-95"
              aria-label="Cerrar"
              title="Cerrar"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Botones de zoom */}
            <div className="flex gap-4 mb-6 mt-2">
              {/* Zoom Out */}
              <button
                onClick={handleZoomOut}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-black/40 hover:bg-emerald-800/80 border-2 border-emerald-700 text-emerald-200 hover:text-white shadow-lg backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 transform hover:scale-110 active:scale-95"
                aria-label="Alejar"
                title="Alejar (-)"
              >
                {/* Lupa con - */}
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              {/* Reset */}
              <button
                onClick={handleZoomReset}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-black/40 hover:bg-cyan-800/80 border-2 border-cyan-700 text-cyan-200 hover:text-white shadow-lg backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 transform hover:rotate-90 active:scale-95"
                aria-label="Resetear zoom"
                title="Restablecer zoom"
              >
                {/* Icono de reload */}
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M4 4v5h.582M20 20v-5h-.581" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5.21 17.89A9 9 0 1 0 6 5.08" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {/* Zoom In */}
              <button
                onClick={handleZoomIn}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-black/40 hover:bg-emerald-800/80 border-2 border-emerald-700 text-emerald-200 hover:text-white shadow-lg backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 transform hover:scale-110 active:scale-95"
                aria-label="Acercar"
                title="Acercar (+)"
              >
                {/* Lupa con + */}
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="11" y1="8" x2="11" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            {/* Imagen con animación y sombra */}
            <div className="w-full h-[70vh] max-h-[80vh] overflow-auto flex items-center justify-center bg-black rounded-2xl border border-emerald-900/40 shadow-2xl animate-fade-in-img">
              <PanZoom
                ref={panzoomRef}
                minZoom={0.5}
                maxZoom={3}
                zoom={zoom}
                autoCenter
                boundaryRatioVertical={1}
                boundaryRatioHorizontal={1}
                style={{ width: '100%', height: '100%' }}
                enableBoundingBox
                enablePan
                enableZoom
                realPinch
                transition="transform 0.2s"
              >
                {modalImg && (
                  <Image
                    src={modalImg}
                    alt={modalTitle!}
                    width={1200}
                    height={900}
                    className="object-contain object-center max-h-[70vh] max-w-full select-none shadow-2xl rounded-xl animate-fade-in-img"
                    draggable={false}
                    priority
                    onDoubleClick={handleDoubleClick}
                  />
                )}
              </PanZoom>
            </div>
            {/* Título con gradiente y sombra */}
            <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mt-6 text-center drop-shadow-lg animate-fade-in-img">
              {modalTitle}
            </h3>
          </div>
        </div>
      )}
    </section>
  );
};

export default Awards; 