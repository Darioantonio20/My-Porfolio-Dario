"use client";

import Image, { StaticImageData } from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// ── Spinner + fade-in image for each card ──────────────────────────────────
const CardImage = ({ src, alt, priority = false }: { src: string | StaticImageData; alt: string; priority?: boolean }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[16px]">
      {/* Spinner — visible until image loads */}
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center bg-black/40"
          style={{ pointerEvents: 'none' }}
        >
          <svg
            className="h-8 w-8 animate-spin text-emerald-400/80"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-20"
              cx="12" cy="12" r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-90"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </div>
      )}

      {/* Actual image — fades in once ready */}
      <Image
        src={src}
        alt={alt}
        width={560}
        height={320}
        priority={priority}
        quality={75}
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 308px"
        onLoad={() => setLoaded(true)}
        className="h-full w-full rounded-[16px] object-cover transition-[transform,opacity] duration-500 group-hover/image:scale-[1.04]"
        style={{
          opacity: loaded ? 1 : 0,
          willChange: 'transform, opacity',
        }}
      />
    </div>
  );
};

export interface ChromaItem {
  image: string | StaticImageData;
  title: string;
  subtitle: string;
  subtitleEs?: string;
  handle?: string;
  location?: string;
  locationEs?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
  badge?: string;
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
  const cardsRef = useRef<Array<HTMLElement | null>>([]);
  const setX = useRef<SetterFn | null>(null);
  const setY = useRef<SetterFn | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const rafPending = useRef(false);
  const pendingMove = useRef<{ x: number; y: number } | null>(null);
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

  useEffect(() => {
    const cards = cardsRef.current.filter((card): card is HTMLElement => Boolean(card));
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      {
        autoAlpha: 0,
        y: 30,
        scale: 0.98,
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.04,
        ease: "power2.out",
        clearProps: "transform",
      }
    );
  }, [data.length]);

  // Direct RAF handling for mouse pointer inside grid — Zero GSAP loop overhead
  const handleMove = useCallback((e: React.PointerEvent) => {
    if (rafPending.current) return;
    rafPending.current = true;
    const clientX = e.clientX;
    const clientY = e.clientY;

    requestAnimationFrame(() => {
      rafPending.current = false;
      const root = rootRef.current;
      if (!root) return;
      const bounds = root.getBoundingClientRect();
      const x = clientX - bounds.left;
      const y = clientY - bounds.top;

      root.style.setProperty("--x", `${x}px`);
      root.style.setProperty("--y", `${y}px`);
      if (fadeRef.current) fadeRef.current.style.opacity = "0.85";
    });
  }, []);

  const handleLeave = useCallback(() => {
    rafPending.current = false;
    if (fadeRef.current) fadeRef.current.style.opacity = "0";
  }, []);

  const handleCardClick = (url?: string) => {
    if (onCardClick && url) {
      onCardClick(url);
    } else if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const cardRafMap = useRef<Map<HTMLElement, boolean>>(new Map());

  // Direct RAF update for card spotlight position
  const handleCardMove: React.MouseEventHandler<HTMLElement> = useCallback((e) => {
    const card = e.currentTarget;
    if (cardRafMap.current.get(card)) return;
    cardRafMap.current.set(card, true);

    const clientX = e.clientX;
    const clientY = e.clientY;

    requestAnimationFrame(() => {
      cardRafMap.current.set(card, false);
      const rect = card.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  }, []);

  const handleCardLeave: React.MouseEventHandler<HTMLElement> = () => {
    // Left empty for pure CSS transitions
  };

  return (
    <>
      <div
        ref={rootRef}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className={`relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5 w-full rounded-[28px] sm:rounded-[36px] border border-white/10 bg-black/20 p-3.5 sm:p-6 lg:p-8 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.35)] ${className}`}
        style={
          {
            "--r": `${radius}px`,
            "--x": "50%",
            "--y": "50%",
          } as React.CSSProperties
        }
      >
        {data.map((card, index) => {
          const techStack = card.handle ? card.handle.split(" • ") : [];

          return (
            <article
              key={index}
              ref={(element) => {
                cardsRef.current[index] = element;
              }}
              onMouseMove={handleCardMove}
              onMouseLeave={handleCardLeave}
              onClick={() => handleCardClick(card.url)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleCardClick(card.url);
                }
              }}
              tabIndex={0}
              className="group relative flex w-full min-h-[460px] sm:min-h-[490px] cursor-pointer flex-col justify-between overflow-hidden rounded-[22px] sm:rounded-[26px] border border-white/15 bg-black/45 shadow-[0_24px_60px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-400/60 hover:shadow-[0_25px_70px_rgba(6,182,212,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
              style={
                {
                  "--card-border": card.borderColor || "transparent",
                  "--spotlight-color": "rgba(255,255,255,0.22)",
                  background: card.gradient,
                  willChange: "transform",
                } as React.CSSProperties
              }
            >
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_30%,rgba(2,6,23,0.88))]" />
              <div
                className="absolute inset-x-5 top-0 h-28 -translate-y-1/2 rounded-full blur-3xl opacity-85"
                style={{
                  background: card.borderColor
                    ? `${card.borderColor}77`
                    : "rgba(255,255,255,0.1)",
                }}
              />

              {card.badge && (
                <span className="absolute left-3 top-3 sm:left-4 sm:top-4 z-20 rounded-full border border-amber-300/30 bg-black/75 px-3 py-1 sm:px-3.5 sm:py-1.5 text-[0.6rem] sm:text-[0.64rem] font-bold uppercase tracking-[0.24em] sm:tracking-[0.34em] text-amber-300 backdrop-blur-md shadow-lg">
                  {card.badge}
                </span>
              )}

              <div
                className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--spotlight-color), transparent 70%)",
                }}
              />

              {/* Image Header Area */}
              <div className="relative z-10 box-border h-[180px] sm:h-[190px] w-full flex-shrink-0 p-[8px] sm:p-[10px]">
                <button
                  type="button"
                  className="group/image relative block h-full w-full cursor-zoom-in overflow-hidden rounded-[16px] sm:rounded-[18px] border border-cyan-300/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80"
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedCard(card);
                    setModalOpen(true);
                  }}
                  aria-label={`Preview image for ${card.title}`}
                >
                  <CardImage src={card.image} alt={card.title} priority={index < 3} />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85 transition-opacity duration-300 group-hover/image:opacity-100" />
                  <div className="pointer-events-none absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/70 px-3 py-1 sm:px-3.5 sm:py-1.5 text-[0.6rem] sm:text-[0.64rem] font-bold uppercase tracking-[0.2em] sm:tracking-[0.22em] text-white shadow-[0_12px_30px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-300 group-hover/image:scale-105 group-hover/image:border-cyan-300">
                      <svg className="h-3.5 w-3.5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <span>Vista Previa</span>
                    </span>
                  </div>
                </button>
              </div>

              {/* Card Main Body & Text Container */}
              <footer className="relative z-10 flex flex-1 flex-col justify-between bg-black/70 px-4 pb-4 pt-4 sm:px-5 sm:pb-5 sm:pt-4 text-white backdrop-blur-xl rounded-b-[22px] sm:rounded-b-[26px]">
                <div className="space-y-2.5 sm:space-y-3">
                  <h3
                    className="m-0 text-lg sm:text-xl font-extrabold tracking-tight text-white drop-shadow-md leading-tight"
                    title={card.title}
                  >
                    {card.title}
                  </h3>
                  
                  <p className="m-0 text-xs sm:text-sm font-normal leading-relaxed text-gray-200/90">
                    {card.subtitle}
                  </p>

                  {!!techStack.length && (
                    <div className="mt-2.5 sm:mt-3 flex flex-wrap gap-1.5">
                      {techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="rounded-lg border border-cyan-400/20 bg-cyan-950/40 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[0.62rem] sm:text-[0.66rem] font-semibold tracking-wide text-cyan-200 shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {card.location && (
                    <div className="pt-1">
                      <p
                        className="m-0 inline-flex max-w-full items-center gap-1.5 sm:gap-2 text-[0.66rem] sm:text-[0.72rem] font-medium uppercase tracking-[0.18em] sm:tracking-[0.2em] text-emerald-300/80"
                        title={card.location}
                      >
                        <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 flex-shrink-0 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="truncate">{card.location}</span>
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-4 sm:mt-5 flex items-center justify-between border-t border-white/12 pt-3 sm:pt-3.5">
                  <span className="inline text-[0.62rem] sm:text-[0.64rem] font-bold uppercase tracking-[0.28em] sm:tracking-[0.3em] text-white/50">
                    Proyecto
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCardClick(card.url)}
                    className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/50 px-3 py-1.5 sm:px-3.5 sm:py-1.5 text-[0.72rem] sm:text-[0.76rem] font-bold text-cyan-200 transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-900/80 hover:text-white hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80"
                    aria-label={`Abrir detalles de ${card.title}`}
                  >
                    <span>Ver Detalles</span>
                    <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </footer>
            </article>
          );
        })}

        {/* Lightweight GPU-accelerated spotlight gradient */}
        <div
          ref={fadeRef}
          className="pointer-events-none absolute inset-0 z-30 rounded-[28px] sm:rounded-[36px] overflow-hidden transition-opacity duration-300"
          style={{
            background: "radial-gradient(circle 450px at var(--x, 50%) var(--y, 50%), rgba(34, 211, 238, 0.08) 0%, transparent 80%)",
            opacity: 0,
          }}
        />
      </div>

      {modalOpen && selectedCard && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col items-center overflow-y-auto rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(6,17,14,0.96),rgba(2,7,8,0.98))] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-white/6 p-2 text-white/70 transition-colors hover:text-white"
              aria-label="Close preview"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-4 flex w-full justify-center">
              <Image
                src={selectedCard.image}
                alt={selectedCard.title}
                className="max-h-[65vh] w-auto max-w-full rounded-2xl object-contain"
                width={1600}
                height={900}
                sizes="100vw"
                style={{ maxWidth: "100%", maxHeight: "65vh", height: "auto" }}
              />
            </div>

            <h2 className="text-center text-2xl font-bold text-white">{selectedCard.title}</h2>
            <p className="mt-2 text-center text-white/68">{selectedCard.subtitle}</p>

            {selectedCard.handle && (
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {selectedCard.handle.split(" • ").map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[0.72rem] uppercase tracking-[0.24em] text-white/68"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {selectedCard.location && (
              <p className="mt-4 text-center text-[0.8rem] uppercase tracking-[0.28em] text-white/42">
                {selectedCard.location}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChromaGrid;
