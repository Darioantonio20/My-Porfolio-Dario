"use client";

import Image, { StaticImageData } from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// ── Spinner + fade-in image for each card ──────────────────────────────────
const CardImage = ({ src, alt }: { src: string | StaticImageData; alt: string }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[16px]">
      {/* Spinner — visible until image loads */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300"
        style={{ opacity: loaded ? 0 : 1, pointerEvents: 'none' }}
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

      {/* Actual image — fades + scales in once ready */}
      <Image
        src={src}
        alt={alt}
        width={280}
        height={160}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className="h-full w-full rounded-[16px] object-cover transition-transform duration-700 group-hover:scale-[1.04] group-hover/image:scale-[1.07]"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'scale(1)' : 'scale(1.04)',
          transition: 'opacity 0.55s cubic-bezier(0.4,0,0.2,1), transform 0.55s cubic-bezier(0.4,0,0.2,1)',
        }}
      />
    </div>
  );
};

export interface ChromaItem {
  image: string | StaticImageData;
  title: string;
  subtitle: string;
  handle?: string;
  location?: string;
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
        y: 42,
        scale: 0.96,
        rotateX: -10,
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "transform",
      }
    );
  }, [data.length]);

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

  const handleMove = useCallback((e: React.PointerEvent) => {
    const root = rootRef.current;
    if (!root) return;

    const bounds = root.getBoundingClientRect();
    pendingMove.current = { x: e.clientX - bounds.left, y: e.clientY - bounds.top };

    if (rafPending.current) return;
    rafPending.current = true;

    requestAnimationFrame(() => {
      rafPending.current = false;
      if (!pendingMove.current) return;
      moveTo(pendingMove.current.x, pendingMove.current.y);
      pendingMove.current = null;
      gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
    });
  }, [moveTo]);

  const handleLeave = useCallback(() => {
    rafPending.current = false;
    pendingMove.current = null;
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true,
    });
  }, [fadeOut]);

  const handleCardClick = (url?: string) => {
    if (onCardClick && url) {
      onCardClick(url);
    } else if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const cardRafMap = useRef<Map<HTMLElement, boolean>>(new Map());

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
      const rotateY = (x / rect.width - 0.5) * 12;
      const rotateX = (y / rect.height - 0.5) * -12;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);

      gsap.to(card, {
        rotateX,
        rotateY,
        y: -10,
        duration: 0.35,
        ease: "power2.out",
        overwrite: true,
        transformPerspective: 1400,
      });
    });
  }, []);

  const handleCardLeave: React.MouseEventHandler<HTMLElement> = (e) => {
    const card = e.currentTarget;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.55,
      ease: "power3.out",
      overwrite: true,
    });
  };

  return (
    <>
      <div
        ref={rootRef}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className={`relative flex h-full w-full flex-wrap items-start justify-center gap-4 ${className}`}
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
          const visibleTech = techStack.slice(0, 3);
          const hiddenTechCount = Math.max(techStack.length - visibleTech.length, 0);

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
              className="group relative flex h-[452px] w-[308px] cursor-pointer flex-col overflow-hidden rounded-[28px] border border-white/12 bg-black/35 shadow-[0_24px_60px_rgba(0,0,0,0.34)] transition-[border-color,box-shadow,transform] duration-500 hover:border-white/25 hover:shadow-[0_34px_95px_rgba(0,0,0,0.48)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
              style={
                {
                  "--card-border": card.borderColor || "transparent",
                  "--spotlight-color": "rgba(255,255,255,0.28)",
                  background: card.gradient,
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                } as React.CSSProperties
              }
            >
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_30%,rgba(2,6,23,0.78))]" />
              <div
                className="absolute inset-x-5 top-0 h-24 -translate-y-1/2 rounded-full blur-3xl opacity-85"
                style={{
                  background: card.borderColor
                    ? `${card.borderColor}66`
                    : "rgba(255,255,255,0.08)",
                }}
              />

              {card.badge && (
                <span className="absolute left-4 top-4 z-20 rounded-full border border-amber-300/20 bg-black/65 px-3.5 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.34em] text-amber-300 backdrop-blur-md">
                  {card.badge}
                </span>
              )}

              <div
                className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)",
                }}
              />

              <div className="relative z-10 box-border h-[196px] flex-shrink-0 p-[12px]">
                <button
                  type="button"
                  className="group/image relative block h-full w-full cursor-zoom-in overflow-hidden rounded-[16px] border border-cyan-300/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80"
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedCard(card);
                    setModalOpen(true);
                  }}
                  aria-label={`Preview image for ${card.title}`}
                >
                  <CardImage src={card.image} alt={card.title} />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/72 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover/image:opacity-100" />
                  <div className="pointer-events-none absolute bottom-3 right-3 flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-white shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition-transform duration-300 group-hover/image:scale-105">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                        <circle cx="12" cy="12" r="3" strokeWidth={1.8} />
                      </svg>
                      Preview
                    </span>
                  </div>
                </button>
              </div>

              <footer className="relative z-10 flex min-h-[190px] flex-1 flex-col justify-between overflow-hidden bg-black/58 px-5 pb-5 pt-4 text-white backdrop-blur-md">
                <div className="space-y-3 overflow-hidden">
                  <h3
                    className="m-0 text-[1.65rem] font-extrabold leading-[1.12] tracking-tight text-white drop-shadow-lg line-clamp-2"
                    title={card.title}
                  >
                    {card.title}
                  </h3>
                  <p className="m-0 overflow-hidden text-[0.94rem] font-medium leading-6 text-white/74 line-clamp-3">
                    {card.subtitle}
                  </p>

                  {!!visibleTech.length && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {visibleTech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="truncate rounded-full border border-white/12 bg-white/7 px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-white/75"
                        >
                          {tech}
                        </span>
                      ))}
                      {hiddenTechCount > 0 && (
                        <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-cyan-200">
                          +{hiddenTechCount} more
                        </span>
                      )}
                    </div>
                  )}

                  {card.location && (
                    <p
                      className="m-0 inline-flex max-w-full items-center gap-2 truncate text-[0.75rem] font-medium uppercase tracking-[0.24em] text-white/48"
                      title={card.location}
                    >
                      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-300/80" />
                      {card.location}
                    </p>
                  )}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-[0.66rem] uppercase tracking-[0.34em] text-white/38">
                    Case Study
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCardClick(card.url)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/8 px-3 py-1.5 text-[0.76rem] font-semibold text-white transition-all duration-300 hover:border-white/35 hover:bg-white/14 hover:translate-x-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80"
                    aria-label={`Open details for ${card.title}`}
                  >
                    Open Details
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </footer>
            </article>
          );
        })}

        <div
          className="pointer-events-none absolute inset-0 z-30"
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
          className="pointer-events-none absolute inset-0 z-40 transition-opacity duration-[250ms]"
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
