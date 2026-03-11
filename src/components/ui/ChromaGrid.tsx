"use client";

import Image, { StaticImageData } from "next/image";
import React, { useEffect, useRef, useState } from "react";
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

  const handleMove = (e: React.PointerEvent) => {
    const root = rootRef.current;
    if (!root) return;

    const bounds = root.getBoundingClientRect();
    moveTo(e.clientX - bounds.left, e.clientY - bounds.top);
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
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleCardMove: React.MouseEventHandler<HTMLElement> = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
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
  };

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
        {data.map((card, index) => (
          <article
            key={index}
            ref={(element) => {
              cardsRef.current[index] = element;
            }}
            onMouseMove={handleCardMove}
            onMouseLeave={handleCardLeave}
            onClick={() => handleCardClick(card.url)}
            className="group relative flex h-[430px] w-[308px] cursor-pointer flex-col overflow-hidden rounded-[26px] border border-white/10 bg-black/35 shadow-[0_22px_55px_rgba(0,0,0,0.32)] transition-[border-color,box-shadow,transform] duration-500 hover:border-white/20 hover:shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
            style={
              {
                "--card-border": card.borderColor || "transparent",
                "--spotlight-color": "rgba(255,255,255,0.28)",
                background: card.gradient,
                transformStyle: "preserve-3d",
              } as React.CSSProperties
            }
          >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent_28%,rgba(2,6,23,0.75))]" />
            <div
              className="absolute inset-x-5 top-0 h-24 -translate-y-1/2 rounded-full blur-3xl opacity-80"
              style={{
                background: card.borderColor
                  ? `${card.borderColor}55`
                  : "rgba(255,255,255,0.08)",
              }}
            />

            {card.badge && (
              <span className="absolute left-4 top-4 z-20 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-amber-300 backdrop-blur-md">
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

            <div className="relative z-10 box-border h-[195px] flex-shrink-0 p-[12px]">
              <Image
                src={card.image}
                alt={card.title}
                width={280}
                height={160}
                className="h-full w-full rounded-[16px] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedCard(card);
                  setModalOpen(true);
                }}
              />
            </div>

            <footer className="relative z-10 flex min-h-[180px] flex-1 flex-col justify-between overflow-hidden bg-black/55 p-5 text-white backdrop-blur-md">
              <div className="space-y-3 overflow-hidden">
                <h3
                  className="m-0 truncate text-[1.18rem] font-bold text-white drop-shadow-lg"
                  title={card.title}
                >
                  {card.title}
                </h3>
                <p className="m-0 overflow-hidden text-[0.92rem] font-medium leading-6 text-white/72 line-clamp-2">
                  {card.subtitle}
                </p>

                {card.handle && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {card.handle.split(" • ").map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="truncate rounded-full border border-white/10 bg-white/6 px-2.5 py-1 text-[0.68rem] uppercase tracking-[0.2em] text-white/68"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {card.location && (
                  <p
                    className="m-0 mt-2 truncate text-[0.78rem] font-medium uppercase tracking-[0.28em] text-white/42"
                    title={card.location}
                  >
                    {card.location}
                  </p>
                )}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-[0.68rem] uppercase tracking-[0.36em] text-white/38">
                  Case Study
                </span>
                <span className="inline-flex items-center gap-2 text-[0.8rem] font-semibold text-white transition-transform duration-300 group-hover:translate-x-1">
                  View Details
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </footer>
          </article>
        ))}

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
