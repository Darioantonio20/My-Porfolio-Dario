'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  FaBookOpen,
  FaTv,
  FaDumbbell,
  FaDog,
  FaGuitar,
  FaMasksTheater,
} from 'react-icons/fa6';
import { GiCape } from 'react-icons/gi';

interface AboutMeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Hobby = {
  icon: React.ReactNode;
  title: string;
  tag: string;
  desc: string;
  accent: string; // hex used for numbering, ring & tag
  from: string;   // gradient start (tailwind class)
  to: string;     // gradient end (tailwind class)
};

type LocaleContent = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  intro: string;
  hobbies: Hobby[];
  closeLabel: string;
};

const content: Record<'en' | 'es', LocaleContent> = {
  es: {
    eyebrow: 'Más allá del código',
    title: 'El lado',
    titleAccent: 'friki',
    intro:
      'Cuando cierro el editor sigo siendo el mismo friki de siempre. Toca cada tarjeta para conocer un poco más.',
    hobbies: [
      {
        icon: <FaBookOpen />,
        title: 'Lectura de Manga',
        tag: 'Otaku',
        desc: 'Me pierdo entre viñetas y arcos interminables; siempre tengo un tomo pendiente por devorar.',
        accent: '#fb923c',
        from: 'from-orange-400',
        to: 'to-rose-500',
      },
      {
        icon: <FaTv />,
        title: 'Ver Anime',
        tag: 'Maratonista',
        desc: 'Del shōnen más épico al slice of life más tranquilo, no hay temporada que se me escape.',
        accent: '#e879f9',
        from: 'from-fuchsia-400',
        to: 'to-purple-500',
      },
      {
        icon: <FaDumbbell />,
        title: 'CrossFit',
        tag: 'WOD diario',
        desc: 'Levantar, sudar y reventar el WOD del día: mi dosis diaria de energía y disciplina.',
        accent: '#34d399',
        from: 'from-emerald-400',
        to: 'to-teal-500',
      },
      {
        icon: <FaDog />,
        title: 'Caminatas Perrunas',
        tag: 'Dog lover',
        desc: 'Nada despeja la mente como una buena caminata con mi compañero de cuatro patas.',
        accent: '#fbbf24',
        from: 'from-amber-300',
        to: 'to-orange-500',
      },
      {
        icon: <FaGuitar />,
        title: 'Rock & Emo',
        tag: 'Playlist infinita',
        desc: 'Mi banda sonora va del rock que vibra al emo que se siente, siempre con los audífonos puestos.',
        accent: '#fb7185',
        from: 'from-rose-400',
        to: 'to-red-500',
      },
      {
        icon: <FaMasksTheater />,
        title: 'Convenciones Anime',
        tag: 'Cosplay & stands',
        desc: 'Cosplay, stands y comunidad: las convenciones son mi lugar feliz cada año.',
        accent: '#22d3ee',
        from: 'from-cyan-400',
        to: 'to-blue-500',
      },
      {
        icon: <GiCape />,
        title: 'Mundo Friki & Cómics',
        tag: 'Comiquero',
        desc: 'Superhéroes, villanos y universos enteros: soy fan de los cómics hasta la médula.',
        accent: '#a78bfa',
        from: 'from-violet-400',
        to: 'to-indigo-500',
      },
    ],
    closeLabel: 'Cerrar',
  },
  en: {
    eyebrow: 'Beyond the code',
    title: 'The geek',
    titleAccent: 'side',
    intro:
      "When I close the editor, I'm still the same geek at heart. Tap any card to know a bit more.",
    hobbies: [
      {
        icon: <FaBookOpen />,
        title: 'Reading Manga',
        tag: 'Otaku',
        desc: "I get lost in panels and never-ending arcs — there's always a new volume waiting to be devoured.",
        accent: '#fb923c',
        from: 'from-orange-400',
        to: 'to-rose-500',
      },
      {
        icon: <FaTv />,
        title: 'Watching Anime',
        tag: 'Binge-watcher',
        desc: 'From the most epic shōnen to the coziest slice-of-life, no season slips past me.',
        accent: '#e879f9',
        from: 'from-fuchsia-400',
        to: 'to-purple-500',
      },
      {
        icon: <FaDumbbell />,
        title: 'CrossFit',
        tag: 'Daily WOD',
        desc: 'Lifting, sweating and crushing the daily WOD — my everyday dose of energy and discipline.',
        accent: '#34d399',
        from: 'from-emerald-400',
        to: 'to-teal-500',
      },
      {
        icon: <FaDog />,
        title: 'Dog Walks',
        tag: 'Dog lover',
        desc: 'Nothing clears my head like a good walk with my four-legged best friend.',
        accent: '#fbbf24',
        from: 'from-amber-300',
        to: 'to-orange-500',
      },
      {
        icon: <FaGuitar />,
        title: 'Rock & Emo',
        tag: 'Endless playlist',
        desc: 'My soundtrack runs from roaring rock to heartfelt emo — headphones always on.',
        accent: '#fb7185',
        from: 'from-rose-400',
        to: 'to-red-500',
      },
      {
        icon: <FaMasksTheater />,
        title: 'Anime Conventions',
        tag: 'Cosplay & booths',
        desc: 'Cosplay, booths and community — conventions are my happy place every year.',
        accent: '#22d3ee',
        from: 'from-cyan-400',
        to: 'to-blue-500',
      },
      {
        icon: <GiCape />,
        title: 'Comics & Geek Culture',
        tag: 'Comic nerd',
        desc: "Superheroes, villains and whole universes — I'm a comic-book fan to the core.",
        accent: '#a78bfa',
        from: 'from-violet-400',
        to: 'to-indigo-500',
      },
    ],
    closeLabel: 'Close',
  },
};

const AboutMeModal: React.FC<AboutMeModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const locale = content[language === 'es' ? 'es' : 'en'];

  const [shouldRender, setShouldRender] = useState(false);
  const [visible, setVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);

  // Measured content heights, so the accordion animates to an exact pixel
  // value instead of relying on layout-heavy techniques (grid-template-rows
  // with fr units forces the browser to recompute layout every animation
  // frame, which is what was causing the stutter).
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [heights, setHeights] = useState<number[]>([]);

  // Mount / unmount lifecycle so the closing transition can play out
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setOpenIndex(0);
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    setVisible(false);
    const timeout = setTimeout(() => setShouldRender(false), 220);
    return () => clearTimeout(timeout);
  }, [isOpen]);

  // Measure each row's natural height once it's in the DOM (and whenever the
  // language or viewport width changes text wrapping).
  useEffect(() => {
    if (!shouldRender) return;

    const measure = () => {
      setHeights(contentRefs.current.map((el) => el?.scrollHeight ?? 0));
    };

    const raf = requestAnimationFrame(measure);
    window.addEventListener('resize', measure);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
    };
  }, [shouldRender, language]);

  // Escape to close + lock body scroll while mounted
  useEffect(() => {
    if (!shouldRender) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [shouldRender, onClose]);

  if (!shouldRender) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={locale.eyebrow}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-slate-950/78 backdrop-blur-sm transition-opacity duration-200 ease-out ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[28px] border border-white/10 bg-[#04100d] shadow-[0_30px_90px_rgba(0,0,0,0.55)] transition-all duration-[220ms] ease-out sm:rounded-[28px] ${
          visible
            ? 'translate-y-0 opacity-100 sm:scale-100'
            : 'translate-y-8 opacity-0 sm:translate-y-0 sm:scale-95'
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 bg-white/[0.02] px-5 py-5 sm:px-7">
          <div>
            <span className="inline-flex rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-emerald-200">
              {locale.eyebrow}
            </span>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl">
              {locale.title}{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                {locale.titleAccent}
              </span>
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-white/60">
              {locale.intro}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full border border-white/12 bg-white/6 p-2.5 text-white/70 transition-colors hover:border-white/25 hover:text-white"
            aria-label={locale.closeLabel}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Accordion list */}
        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3 sm:px-5 sm:py-5">
          <div className="flex flex-col gap-2">
            {locale.hobbies.map((hobby, index) => {
              const isOpenRow = openIndex === index;

              return (
                <div
                  key={hobby.title}
                  className="overflow-hidden rounded-2xl border transition-colors duration-200"
                  style={{
                    borderColor: isOpenRow ? `${hobby.accent}55` : 'rgba(255,255,255,0.08)',
                    background: isOpenRow ? `${hobby.accent}0f` : 'rgba(255,255,255,0.02)',
                    // Isolates this row's layout from the rest of the list so
                    // toggling it never forces the browser to re-measure
                    // siblings — the single biggest win for a smooth accordion.
                    contain: 'layout',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpenRow ? -1 : index)}
                    className="flex w-full items-center gap-3 px-3 py-3 text-left sm:gap-4 sm:px-4"
                    aria-expanded={isOpenRow}
                  >
                    <span
                      className="text-xs font-semibold tabular-nums"
                      style={{ color: isOpenRow ? hobby.accent : 'rgba(255,255,255,0.3)' }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${hobby.from} ${hobby.to} text-base text-white transition-transform duration-200 ${
                        isOpenRow ? 'scale-105' : ''
                      }`}
                    >
                      {hobby.icon}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-white sm:text-base">
                        {hobby.title}
                      </span>
                    </span>

                    <span
                      className="hidden shrink-0 rounded-full border px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-wide sm:inline-block"
                      style={{
                        borderColor: `${hobby.accent}40`,
                        color: hobby.accent,
                      }}
                    >
                      {hobby.tag}
                    </span>

                    <svg
                      className={`h-4 w-4 shrink-0 text-white/40 transition-transform duration-200 ${
                        isOpenRow ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Height-measured reveal: animates to an exact pixel value
                      instead of "auto"/fr units, so there's nothing to
                      recompute mid-transition — just a cheap max-height tween. */}
                  <div
                    className="overflow-hidden transition-[max-height] duration-[220ms] ease-out"
                    style={{ maxHeight: isOpenRow ? `${heights[index] || 320}px` : '0px' }}
                  >
                    <div ref={(el) => { contentRefs.current[index] = el; }}>
                      <p className="px-3 pb-4 pl-[3.75rem] pr-4 text-sm leading-6 text-white/68 sm:pl-[4.75rem]">
                        {hobby.desc}
                      </p>
                      <span
                        className="ml-3 mb-4 inline-flex rounded-full border px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-wide sm:hidden"
                        style={{
                          borderColor: `${hobby.accent}40`,
                          color: hobby.accent,
                        }}
                      >
                        {hobby.tag}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMeModal;
