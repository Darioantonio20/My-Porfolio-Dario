'use client';

import { useState } from 'react';
import ChromaGrid from '../ui/ChromaGrid';
import ProjectModal from '../ui/ProjectModal';
import { projects } from '@/data/team';

const Team = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleProjectClick = (url: string) => {
    // Extraer el ID del proyecto de la URL
    const projectId = url.replace('/proyectos/', '');
    
    // Verificar si es un proyecto válido
    if (projectId && projectId !== '#') {
      setSelectedProjectId(projectId);
      setIsModalOpen(true);
    } else if (url.startsWith('http')) {
      // Si es un enlace externo, abrir en nueva pestaña
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProjectId(null);
  };

  return (
    <>
      <section id="proyectos" className="py-20 bg-gradient-to-br from-gray-900 via-emerald-950 to-cyan-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Mis{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Proyectos
              </span>
            </h2>
            <p className="text-lg text-cyan-200 max-w-2xl mx-auto">
              Aquí puedes ver algunos de los proyectos en los que he trabajado. 
              Cada uno representa un desafío único y una oportunidad de aprendizaje. 
              Haz clic en cualquier proyecto para ver más detalles.
            </p>
          </div>

          {/* ChromaGrid Container */}
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

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        projectId={selectedProjectId}
      />
    </>
  );
};

export default Team; 