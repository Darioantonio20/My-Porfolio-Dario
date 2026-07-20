'use client';

import { useState, useMemo } from 'react';
import ChromaGrid from '../ui/ChromaGrid';
import ProjectModal from '../ui/ProjectModal';
import { projects } from '@/data/team';
import { useLanguage } from '@/context/LanguageContext';

const filterOptions = [
  { id: 'all', labelEs: 'Todos', labelEn: 'All' },
  { id: 'uiux', labelEs: 'UI/UX & Front', labelEn: 'UI/UX & Front' },
  { id: 'fullstack', labelEs: 'Full-Stack & ERP', labelEn: 'Full-Stack & ERP' },
  { id: 'mobile', labelEs: 'Mobile / Apps', labelEn: 'Mobile / Apps' },
  { id: '2026', labelEs: 'Recientes 2026', labelEn: 'Recent 2026' },
];

const Team = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const { language, t } = useLanguage();

  const handleProjectClick = (url: string) => {
    const projectId = url.replace('/projects/', '');
    
    if (projectId && projectId !== '#') {
      setSelectedProjectId(projectId);
      setIsModalOpen(true);
    } else if (url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProjectId(null);
  };

  const translatedProjects = useMemo(() => {
    return projects.map((project) => ({
      ...project,
      subtitle: language === 'es' && (project as any).subtitleEs ? (project as any).subtitleEs : project.subtitle,
      location: language === 'es' && (project as any).locationEs ? (project as any).locationEs : project.location,
    }));
  }, [language]);

  const filteredProjects = useMemo(() => {
    return translatedProjects.filter((project) => {
      if (activeFilter === 'all') return true;
      
      const textToMatch = `${project.title} ${project.subtitle} ${project.subtitleEs || ''} ${project.handle} ${project.location} ${project.locationEs || ''}`.toLowerCase();

      if (activeFilter === 'uiux') {
        return (
          textToMatch.includes('ui/ux') ||
          textToMatch.includes('front') ||
          textToMatch.includes('landing') ||
          textToMatch.includes('rediseño') ||
          textToMatch.includes('redesign') ||
          textToMatch.includes('diseño') ||
          textToMatch.includes('support')
        );
      }

      if (activeFilter === 'fullstack') {
        return (
          textToMatch.includes('full-stack') ||
          textToMatch.includes('saas') ||
          textToMatch.includes('erp') ||
          textToMatch.includes('cms') ||
          textToMatch.includes('marketplace') ||
          textToMatch.includes('laravel') ||
          textToMatch.includes('backend') ||
          textToMatch.includes('integration') ||
          textToMatch.includes('plataforma')
        );
      }

      if (activeFilter === 'mobile') {
        return (
          textToMatch.includes('mobile') ||
          textToMatch.includes('flutter') ||
          textToMatch.includes('capacitor') ||
          textToMatch.includes('ios') ||
          textToMatch.includes('app')
        );
      }

      if (activeFilter === '2026') {
        return textToMatch.includes('2026');
      }

      return true;
    });
  }, [translatedProjects, activeFilter]);

  const getFilterCount = (filterId: string) => {
    if (filterId === 'all') return translatedProjects.length;
    return translatedProjects.filter((project) => {
      const textToMatch = `${project.title} ${project.subtitle} ${project.subtitleEs || ''} ${project.handle} ${project.location} ${project.locationEs || ''}`.toLowerCase();
      if (filterId === 'uiux') {
        return (
          textToMatch.includes('ui/ux') ||
          textToMatch.includes('front') ||
          textToMatch.includes('landing') ||
          textToMatch.includes('rediseño') ||
          textToMatch.includes('redesign') ||
          textToMatch.includes('diseño') ||
          textToMatch.includes('support')
        );
      }
      if (filterId === 'fullstack') {
        return (
          textToMatch.includes('full-stack') ||
          textToMatch.includes('saas') ||
          textToMatch.includes('erp') ||
          textToMatch.includes('cms') ||
          textToMatch.includes('marketplace') ||
          textToMatch.includes('laravel') ||
          textToMatch.includes('backend') ||
          textToMatch.includes('integration') ||
          textToMatch.includes('plataforma')
        );
      }
      if (filterId === 'mobile') {
        return (
          textToMatch.includes('mobile') ||
          textToMatch.includes('flutter') ||
          textToMatch.includes('capacitor') ||
          textToMatch.includes('ios') ||
          textToMatch.includes('app')
        );
      }
      if (filterId === '2026') {
        return textToMatch.includes('2026');
      }
      return true;
    }).length;
  };

  return (
    <>
      <section id="projects" className="relative overflow-hidden py-24 text-white bg-gradient-to-b from-black via-[#061414] to-black">
        {/* Soft gradient transitions top & bottom */}
        <div className="pointer-events-none absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black via-black/85 to-transparent z-10" />
        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black via-black/85 to-transparent z-10" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(34,197,94,0.15),transparent_22%),radial-gradient(circle_at_88%_10%,rgba(249,115,22,0.12),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(34,211,238,0.12),transparent_28%)]" />
        <div className="relative z-10 max-w-[1750px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/40 px-4 py-2 text-[0.75rem] font-bold uppercase tracking-[0.35em] text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              {t('projects.badge')}
            </span>
            <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5 drop-shadow-2xl">
              {t('projects.title')}{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_10px_20px_rgba(34,211,238,0.3)]">
                {t('projects.projects')}
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed text-cyan-100/90 font-medium drop-shadow-sm">
              {t('projects.subtitle')}
            </p>
          </div>

          {/* Mini-Filtro UI/UX */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {filterOptions.map((option) => {
              const isActive = activeFilter === option.id;
              const count = getFilterCount(option.id);

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setActiveFilter(option.id)}
                  className={`group relative flex items-center gap-2 rounded-full px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 text-black font-bold shadow-[0_0_20px_rgba(34,211,238,0.4)] scale-105'
                      : 'bg-white/6 text-cyan-100/80 border border-white/10 hover:border-cyan-400/40 hover:bg-white/12 hover:text-white'
                  }`}
                >
                  <span>{language === 'es' ? option.labelEs : option.labelEn}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[0.62rem] font-extrabold ${
                      isActive ? 'bg-black/25 text-black' : 'bg-white/10 text-cyan-300'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative min-h-[600px] w-full">
            <ChromaGrid 
              items={filteredProjects}
              className="w-full h-full"
              radius={350}
              damping={0.4}
              fadeOut={0.8}
              onCardClick={handleProjectClick}
            />
          </div>
        </div>
      </section>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        projectId={selectedProjectId}
      />
    </>
  );
};

export default Team; 
