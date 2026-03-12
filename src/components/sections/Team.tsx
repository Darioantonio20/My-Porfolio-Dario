'use client';

import { useState } from 'react';
import ChromaGrid from '../ui/ChromaGrid';
import ProjectModal from '../ui/ProjectModal';
import { projects } from '@/data/team';

const Team = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

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

  return (
    <>
      <section id="projects" className="relative overflow-hidden py-20 text-white bg-gradient-to-br from-gray-900 via-emerald-950 to-cyan-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(34,197,94,0.15),transparent_22%),radial-gradient(circle_at_88%_10%,rgba(249,115,22,0.12),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(34,211,238,0.12),transparent_28%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-cyan-200/85 backdrop-blur-sm">
              Selected Work
            </span>
            <h2 className="mt-5 text-4xl font-bold mb-4">
              My{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-lg max-w-3xl mx-auto leading-8 text-cyan-100/78">
              A curated selection of freelance and personal products across ERP workflows,
              internal tooling, marketplaces, and customer-facing experiences.
            </p>
          </div>

          <div className="relative min-h-[600px] w-full">
            <ChromaGrid 
              items={projects}
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
