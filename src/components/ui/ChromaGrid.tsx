"use client";

import Image, { StaticImageData } from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

export interface ChromaItem {
  image: string | StaticImageData;
  title: string;
  subtitle: string;
  handle?: string;
  location?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
}

export interface ChromaGridProps {
  items?: ChromaItem[];
  className?: string;
  radius?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
  onCardClick?: (url: string) => void;
}

type SetterFn = (v: number | string) => void;

const ChromaGrid: React.FC<ChromaGridProps> = ({
  items,
  className = "",
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out",
  onCardClick,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const setX = useRef<SetterFn | null>(null);
  const setY = useRef<SetterFn | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<ChromaItem | null>(null);

  const demo: ChromaItem[] = [
    {
      image: "https://i.pravatar.cc/300?img=8",
      title: "Alex Rivera",
      subtitle: "Full Stack Developer",
      handle: "@alexrivera",
      borderColor: "#4F46E5",
      gradient: "linear-gradient(145deg,#4F46E5,#000)",
      url: "https://github.com/",
    },
    {
      image: "https://i.pravatar.cc/300?img=11",
      title: "Jordan Chen",
      subtitle: "DevOps Engineer",
      handle: "@jordanchen",
      borderColor: "#10B981",
      gradient: "linear-gradient(210deg,#10B981,#000)",
      url: "https://linkedin.com/in/",
    },
    {
      image: "https://i.pravatar.cc/300?img=3",
      title: "Morgan Blake",
      subtitle: "UI/UX Designer",
      handle: "@morganblake",
      borderColor: "#F59E0B",
      gradient: "linear-gradient(165deg,#F59E0B,#000)",
      url: "https://dribbble.com/",
    },
    {
      image: "https://i.pravatar.cc/300?img=16",
      title: "Casey Park",
      subtitle: "Data Scientist",
      handle: "@caseypark",
      borderColor: "#EF4444",
      gradient: "linear-gradient(195deg,#EF4444,#000)",
      url: "https://kaggle.com/",
    },
    {
      image: "https://i.pravatar.cc/300?img=25",
      title: "Sam Kim",
      subtitle: "Mobile Developer",
      handle: "@thesamkim",
      borderColor: "#8B5CF6",
      gradient: "linear-gradient(225deg,#8B5CF6,#000)",
      url: "https://github.com/",
    },
    {
      image: "https://i.pravatar.cc/300?img=60",
      title: "Tyler Rodriguez",
      subtitle: "Cloud Architect",
      handle: "@tylerrod",
      borderColor: "#06B6D4",
      gradient: "linear-gradient(135deg,#06B6D4,#000)",
      url: "https://aws.amazon.com/",
    },
  ];

  const data = items?.length ? items : demo;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, "--x", "px") as SetterFn;
    setY.current = gsap.quickSetter(el, "--y", "px") as SetterFn;
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  };

  const handleMove = (e: React.PointerEvent) => {
    const r = rootRef.current!.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true,
    });
  };

  const handleCardClick = (url?: string) => {
    if (onCardClick && url) {
      onCardClick(url);
    } else if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCardMove: React.MouseEventHandler<HTMLElement> = (e) => {
    const c = e.currentTarget as HTMLElement;
    const rect = c.getBoundingClientRect();
    c.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    c.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <>
      <div
        ref={rootRef}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className={`relative w-full h-full flex flex-wrap justify-center items-start gap-3 ${className}`}
        style={
          {
            "--r": `${radius}px`,
            "--x": "50%",
            "--y": "50%",
          } as React.CSSProperties
        }
      >
        {data.map((c, i) => (
          <article
            key={i}
            onMouseMove={handleCardMove}
            onClick={() => handleCardClick(c.url)}
            className="group relative flex flex-col w-[300px] h-[400px] rounded-[20px] overflow-hidden border-2 border-transparent transition-colors duration-300 cursor-pointer"
            style={
              {
                "--card-border": c.borderColor || "transparent",
                background: c.gradient,
                "--spotlight-color": "rgba(255,255,255,0.3)",
              } as React.CSSProperties
            }
          >
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)",
              }}
            />
            <div className="relative z-10 flex-shrink-0 p-[10px] box-border h-[180px]">
              <Image
                src={c.image}
                alt={c.title}
                width={280}
                height={160}
                className="w-full h-full object-cover rounded-[10px] cursor-zoom-in"
                loading="lazy"
                onClick={e => {
                  e.stopPropagation();
                  setSelectedCard(c);
                  setModalOpen(true);
                }}
              />
            </div>
            <footer className="relative z-10 p-4 text-white font-sans bg-black/60 backdrop-blur-sm flex-1 flex flex-col justify-between min-h-[120px] max-h-[200px] overflow-hidden">
              <div className="space-y-2 overflow-hidden">
                <h3 className="m-0 text-[1.1rem] font-bold text-emerald-300 drop-shadow-lg truncate" title={c.title}>
                  {c.title}
                </h3>
                <p className="m-0 text-[0.9rem] text-cyan-200 font-medium line-clamp-2 overflow-hidden">
                  {c.subtitle}
                </p>
                {c.handle && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {c.handle.split(' • ').map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-[0.75rem] bg-emerald-700/40 text-emerald-200 rounded-full border border-emerald-600/30 truncate"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {c.location && (
                  <p className="m-0 text-[0.8rem] text-emerald-100 mt-2 font-medium truncate" title={c.location}>
                    {c.location}
                  </p>
                )}
              </div>
            </footer>
          </article>
        ))}
        <div
          className="absolute inset-0 pointer-events-none z-30"
          style={{
            backdropFilter: "grayscale(1) brightness(0.78)",
            WebkitBackdropFilter: "grayscale(1) brightness(0.78)",
            background: "rgba(0,0,0,0.001)",
            maskImage:
              "radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)",
            WebkitMaskImage:
              "radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)",
          }}
        />
        <div
          ref={fadeRef}
          className="absolute inset-0 pointer-events-none transition-opacity duration-[250ms] z-40"
          style={{
            backdropFilter: "grayscale(1) brightness(0.78)",
            WebkitBackdropFilter: "grayscale(1) brightness(0.78)",
            background: "rgba(0,0,0,0.001)",
            maskImage:
              "radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)",
            opacity: 1,
          }}
        />
      </div>
      {/* Modal para mostrar la card completa */}
      {modalOpen && selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative bg-gradient-to-br from-gray-900 via-emerald-950 to-cyan-950 rounded-2xl border border-emerald-800/50 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-emerald-900/30 p-6 flex flex-col items-center">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-1 z-10"
            >
              <svg className="w-7 h-7" fill="none" stroke="#ef4444" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="w-full flex justify-center items-center mb-4">
              <Image
                src={selectedCard.image}
                alt={selectedCard.title}
                className="max-w-full max-h-[60vh] object-contain rounded-xl"
                width={0}
                height={0}
                sizes="100vw"
                style={{ height: 'auto', width: 'auto', maxWidth: '100%', maxHeight: '60vh' }}
              />
            </div>
            <h2 className="text-2xl font-bold text-emerald-300 mb-2 text-center">{selectedCard.title}</h2>
            <p className="text-cyan-200 mb-2 text-center">{selectedCard.subtitle}</p>
            {selectedCard.handle && (
              <div className="flex flex-wrap gap-1 mb-2 justify-center">
                {selectedCard.handle.split(' • ').map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-[0.85rem] bg-emerald-700/40 text-emerald-200 rounded-full border border-emerald-600/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
            {selectedCard.location && (
              <p className="text-[0.9rem] text-emerald-100 mb-2 text-center">{selectedCard.location}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChromaGrid; 