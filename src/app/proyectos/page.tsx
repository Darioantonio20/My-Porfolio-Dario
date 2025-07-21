import Link from 'next/link';
import { projects } from '@/data/team';

export default function ProyectosPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Mis{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Proyectos
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Aquí puedes explorar todos los proyectos en los que he trabajado. 
            Cada uno representa un desafío único y una oportunidad de aprendizaje.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Link
              key={index}
              href={project.url || '#'}
              className="group block bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden hover:scale-105 transition-all duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                <div className="text-4xl font-bold text-gray-400 group-hover:text-white transition-colors">
                  {project.title.split(' ')[0]}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {project.subtitle}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.handle?.split(' • ').map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-600/20 text-blue-300 text-sm rounded-full border border-blue-600/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-gray-400 text-sm">
                  {project.location}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-16">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
} 