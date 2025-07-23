'use client';

import { useEffect } from 'react';
import projectsData from '@/data/projects-detail.json';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, projectId }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
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
  }, [isOpen, onClose]);

  if (!isOpen || !projectId) return null;

  const project = projectsData[projectId as keyof typeof projectsData];

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-gradient-to-br from-gray-900 via-emerald-950 to-cyan-950 rounded-2xl border border-emerald-800/50 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-emerald-900/30">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-emerald-800/50 p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-emerald-300 mb-2">
                {project.title}
              </h2>
              <p className="text-xl text-cyan-200 mb-4">
                {project.subtitle}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-emerald-700/20 text-emerald-300 text-sm rounded-full border border-emerald-600/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={onClose}
              className="ml-4 p-2 text-cyan-300 hover:text-emerald-400 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Project Image */}
          <div className="h-48 bg-gradient-to-br from-emerald-900/20 to-cyan-900/20 rounded-xl border border-emerald-800/50 flex items-center justify-center">
            <div className="text-6xl font-bold text-cyan-400">
              {project.title.split(' ')[0]}
            </div>
          </div>

          {/* Project Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold text-emerald-300 mb-3">Descripción</h3>
              <p className="text-cyan-200 leading-relaxed">
                {project.longDescription}
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide mb-2">
                  Categoría
                </h4>
                <p className="text-emerald-200">{project.category}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide mb-2">
                  Duración
                </h4>
                <p className="text-emerald-200">{project.duration}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide mb-2">
                  Equipo
                </h4>
                <p className="text-emerald-200">{project.team}</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xl font-bold text-emerald-300 mb-4">Características Principales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.features.map((feature, index) => (
                <div key={index} className="flex items-start text-cyan-200">
                  <svg className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges & Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-emerald-300 mb-4">Desafíos Técnicos</h3>
              <ul className="space-y-3">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start text-cyan-200">
                    <svg className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-emerald-300 mb-4">Soluciones Implementadas</h3>
              <ul className="space-y-3">
                {project.solutions.map((solution, index) => (
                  <li key={index} className="flex items-start text-cyan-200">
                    <svg className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span>{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-emerald-800/50">
            {project.github && project.github.trim() !== '' && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center px-6 py-3 bg-emerald-800 hover:bg-emerald-700 rounded-lg transition-colors text-emerald-200"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            )}
            {project.demo && project.demo.trim() !== '' && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center px-6 py-3 bg-cyan-700 hover:bg-cyan-800 rounded-lg transition-colors text-cyan-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal; 