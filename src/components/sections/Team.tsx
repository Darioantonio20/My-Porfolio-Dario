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

          {/* Información adicional */}
          <div className="mt-16 text-center">
            <p className="text-cyan-300 mb-6">
              ¿Te gustaría colaborar en un proyecto o tienes una idea en mente?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.open('mailto:darioantonio10@hotmail.com', '_blank')}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors text-white"
              >
                Contactar
              </button>
              <button 
                onClick={() => window.open('https://github.com/Darioantonio20', '_blank')}
                className="px-8 py-3 border border-emerald-400 text-emerald-300 hover:bg-emerald-900/30 rounded-lg transition-colors"
              >
                Ver en GitHub
              </button>
            </div>
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