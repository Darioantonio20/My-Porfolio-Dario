'use client';

import Image, { StaticImageData } from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import projectsData from '@/data/projects-detail.json';
import { projects } from '@/data/team';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string | null;
}

interface ProjectDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  challenges: string[];
  solutions: string[];
  github: string;
  demo: string;
  image?: string;
  gallery?: string[];
  category: string;
  duration: string;
  team: string;
}

type GalleryImage = string | StaticImageData;

const projectDetails = projectsData as Record<string, ProjectDetail>;

const imageKey = (image: GalleryImage) => (typeof image === 'string' ? image : image.src);

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, projectId }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const imageStageRef = useRef<HTMLDivElement>(null);

  const project = projectId ? projectDetails[projectId] : null;

  const projectCard = useMemo(
    () => projects.find((item) => item.url === `/proyectos/${projectId}`),
    [projectId]
  );

  const gallery = useMemo(() => {
    if (!project?.gallery?.length) {
      return [];
    }

    return project.gallery.filter(
      (image, index, collection) => index === collection.findIndex((candidate) => candidate === image)
    );
  }, [project]);

  const coverImage = projectCard?.image ?? project?.image;
  const activeImage = gallery[selectedImageIndex] ?? coverImage;
  const showGallery = gallery.length > 1;

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isPreviewOpen) {
          setIsPreviewOpen(false);
          return;
        }

        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isPreviewOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    setSelectedImageIndex(0);
    setIsPreviewOpen(false);
  }, [isOpen, projectId]);

  useEffect(() => {
    if (!isOpen || !panelRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, y: 28, scale: 0.985 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.48, ease: 'power3.out' }
      );

      gsap.fromTo(
        '[data-modal-reveal]',
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.56,
          stagger: 0.06,
          ease: 'power3.out',
          delay: 0.08,
        }
      );
    }, panelRef);

    return () => ctx.revert();
  }, [isOpen, projectId]);

  useEffect(() => {
    if (!isOpen || !imageStageRef.current) return;

    gsap.fromTo(
      imageStageRef.current,
      { autoAlpha: 0, scale: 0.99 },
      { autoAlpha: 1, scale: 1, duration: 0.34, ease: 'power2.out' }
    );
  }, [isOpen, selectedImageIndex, projectId]);

  if (!isOpen || !projectId || !project) return null;

  const hasLinks =
    (project.github && project.github.trim() !== '') ||
    (project.demo && project.demo.trim() !== '');

  const goToPreviousImage = () => {
    if (!showGallery) return;
    setSelectedImageIndex((current) => (current === 0 ? gallery.length - 1 : current - 1));
  };

  const goToNextImage = () => {
    if (!showGallery) return;
    setSelectedImageIndex((current) => (current === gallery.length - 1 ? 0 : current + 1));
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
        <div className="absolute inset-0 bg-slate-950/82 backdrop-blur-md" onClick={onClose} />

        <div
          ref={panelRef}
          className="relative z-10 w-full max-w-7xl overflow-hidden rounded-[30px] border border-white/10 bg-[#04100d]/95 shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_16%,rgba(34,197,94,0.14),transparent_24%),radial-gradient(circle_at_86%_12%,rgba(249,115,22,0.18),transparent_26%),linear-gradient(135deg,rgba(5,16,13,0.98),rgba(2,8,7,0.99))]" />

          <div className="relative">
            <div className="sticky top-0 z-20 border-b border-white/10 bg-black/30 px-5 py-4 backdrop-blur-xl sm:px-6">
              <div className="flex items-start justify-between gap-4">
                <div className="max-w-4xl flex-1">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-emerald-200">
                      {project.category}
                    </span>
                    <span className="text-[0.68rem] uppercase tracking-[0.28em] text-white/38">
                      {project.duration}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-[2.35rem]">
                    {project.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-white/62 sm:text-base sm:leading-7">
                    {project.subtitle}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-full border border-white/12 bg-white/6 p-3 text-white/72 transition-colors hover:border-white/25 hover:text-white"
                  aria-label="Close project details"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="max-h-[calc(92vh-92px)] overflow-y-auto">
              <div className="grid gap-6 p-4 sm:p-6 xl:grid-cols-[minmax(0,1.18fr)_340px] xl:p-8">
                <div className="space-y-5" data-modal-reveal>
                  <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-3 shadow-[0_24px_70px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:p-4">
                    <div
                      ref={imageStageRef}
                      className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-[22px] border border-white/10 bg-black/55 sm:min-h-[420px] xl:min-h-[520px]"
                    >
                      {activeImage ? (
                        <Image
                          src={activeImage}
                          alt={`${project.title} preview ${selectedImageIndex + 1}`}
                          width={1600}
                          height={1000}
                          sizes="(max-width: 1280px) 100vw, 62vw"
                          className="h-full w-full object-contain"
                          priority
                        />
                      ) : (
                        <div className="flex h-full min-h-[320px] items-center justify-center text-white/45">
                          No preview available
                        </div>
                      )}

                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),transparent_30%,rgba(0,0,0,0.55))]" />

                      <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/45 px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.28em] text-white/72 backdrop-blur-md">
                        <span>Preview</span>
                        <span className="text-white/38">{showGallery ? `${selectedImageIndex + 1}/${gallery.length}` : '1/1'}</span>
                      </div>

                      {showGallery && (
                        <div className="absolute right-4 top-4 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={goToPreviousImage}
                            className="rounded-full border border-white/12 bg-black/45 p-2.5 text-white/70 transition-colors hover:border-white/25 hover:text-white"
                            aria-label="Previous image"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={goToNextImage}
                            className="rounded-full border border-white/12 bg-black/45 p-2.5 text-white/70 transition-colors hover:border-white/25 hover:text-white"
                            aria-label="Next image"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      )}

                      {activeImage && (
                        <button
                          type="button"
                          onClick={() => setIsPreviewOpen(true)}
                          className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/12 px-4 py-2 text-sm font-semibold text-emerald-100 backdrop-blur-md transition-all duration-300 hover:border-emerald-300/40 hover:bg-emerald-400/18 hover:text-white"
                        >
                          View Larger
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 3h6m0 0v6m0-6L10 14M9 21H3m0 0v-6m0 6l11-11" />
                          </svg>
                        </button>
                      )}
                    </div>

                    {showGallery && (
                      <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5 xl:grid-cols-4 2xl:grid-cols-5">
                        {gallery.map((image, index) => {
                          const isActive = index === selectedImageIndex;

                          return (
                            <button
                              key={imageKey(image)}
                              type="button"
                              onClick={() => setSelectedImageIndex(index)}
                              className={`group relative overflow-hidden rounded-[18px] border transition-all duration-300 ${
                                isActive
                                  ? 'border-emerald-400/70 shadow-[0_0_0_1px_rgba(52,211,153,0.2)]'
                                  : 'border-white/10 hover:border-white/25'
                              }`}
                              aria-label={`Preview image ${index + 1}`}
                            >
                              <Image
                                src={image}
                                alt={`${project.title} thumbnail ${index + 1}`}
                                width={280}
                                height={180}
                                className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <span className="pointer-events-none absolute inset-0 bg-black/25" />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <section className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm lg:col-span-2" data-modal-reveal>
                      <h3 className="text-lg font-semibold text-white">Key Features</h3>
                      <ul className="mt-4 grid gap-3 md:grid-cols-2">
                        {project.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3 text-white/72">
                            <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm" data-modal-reveal>
                      <h3 className="text-lg font-semibold text-white">Challenges</h3>
                      <ul className="mt-4 space-y-3">
                        {project.challenges.map((challenge, index) => (
                          <li key={index} className="flex items-start gap-3 text-white/72">
                            <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 9v2m0 4h.01m-7.938 4h15.876c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm" data-modal-reveal>
                      <h3 className="text-lg font-semibold text-white">Solutions</h3>
                      <ul className="mt-4 space-y-3">
                        {project.solutions.map((solution, index) => (
                          <li key={index} className="flex items-start gap-3 text-white/72">
                            <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            <span>{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>
                </div>

                <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start" data-modal-reveal>
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-cyan-300/78">
                      Overview
                    </p>
                    <p className="mt-4 leading-7 text-white/78">
                      {project.description}
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                    <div className="rounded-[22px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                      <p className="text-[0.66rem] uppercase tracking-[0.28em] text-white/38">Category</p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-white/88">{project.category}</p>
                    </div>
                    <div className="rounded-[22px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                      <p className="text-[0.66rem] uppercase tracking-[0.28em] text-white/38">Duration</p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-white/88">{project.duration}</p>
                    </div>
                    <div className="rounded-[22px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                      <p className="text-[0.66rem] uppercase tracking-[0.28em] text-white/38">Team</p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-white/88">{project.team}</p>
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-cyan-300/78">
                      Focus Areas
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs uppercase tracking-[0.24em] text-white/70"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-cyan-300/78">
                      Context
                    </p>
                    <p className="mt-4 leading-7 text-white/74">
                      {project.longDescription}
                    </p>
                  </div>

                  {hasLinks && (
                    <div className="flex flex-col gap-3 rounded-[24px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                      {project.github && project.github.trim() !== '' && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center rounded-2xl border border-white/12 bg-white/6 px-6 py-3 text-white transition-colors hover:border-white/25 hover:bg-white/10"
                        >
                          <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          View on GitHub
                        </a>
                      )}
                      {project.demo && project.demo.trim() !== '' && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-400/12 px-6 py-3 text-cyan-100 transition-colors hover:border-cyan-300/40 hover:bg-cyan-400/18"
                        >
                          <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          View Demo
                        </a>
                      )}
                    </div>
                  )}
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isPreviewOpen && activeImage && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/92 backdrop-blur-lg" onClick={() => setIsPreviewOpen(false)} />

          <div className="relative z-10 w-full max-w-7xl">
            <div className="rounded-[30px] border border-white/10 bg-[#030a09]/96 p-4 shadow-[0_40px_120px_rgba(0,0,0,0.6)] sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.3em] text-white/42">
                    Large Preview
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-white">
                    {project.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  {showGallery && (
                    <>
                      <button
                        type="button"
                        onClick={goToPreviousImage}
                        className="rounded-full border border-white/12 bg-white/6 p-2.5 text-white/70 transition-colors hover:border-white/25 hover:text-white"
                        aria-label="Previous image"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={goToNextImage}
                        className="rounded-full border border-white/12 bg-white/6 p-2.5 text-white/70 transition-colors hover:border-white/25 hover:text-white"
                        aria-label="Next image"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={() => setIsPreviewOpen(false)}
                    className="rounded-full border border-white/12 bg-white/6 p-3 text-white/72 transition-colors hover:border-white/25 hover:text-white"
                    aria-label="Close large preview"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex max-h-[80vh] items-center justify-center overflow-hidden rounded-[24px] border border-white/10 bg-black/55">
                <Image
                  src={activeImage}
                  alt={`${project.title} large preview ${selectedImageIndex + 1}`}
                  width={2000}
                  height={1400}
                  sizes="100vw"
                  className="max-h-[78vh] w-auto max-w-full object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectModal;
