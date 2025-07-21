import Link from 'next/link';

export default function JasaiLivePage() {
  const project = {
    title: "Jasai Live",
    subtitle: "Plataforma de Streaming",
    description: "Proyecto integrador de sexto cuatrimestre de la escuela UP Chiapa. Una plataforma completa de streaming que permite a los usuarios ver contenido en vivo y bajo demanda.",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Express"],
    features: [
      "Streaming en tiempo real",
      "Chat interactivo",
      "Sistema de usuarios",
      "Gestión de contenido",
      "Dashboard administrativo"
    ],
    challenges: [
      "Implementación de WebRTC para streaming",
      "Optimización de rendimiento",
      "Escalabilidad de la base de datos",
      "Sincronización en tiempo real"
    ],
    github: "https://github.com/Darioantonio20/Jasai-Live",
    demo: "https://jasai-live-demo.vercel.app",
    image: "https://i.pravatar.cc/300?img=8"
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/proyectos"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a Proyectos
          </Link>
          
          <h1 className="text-5xl font-bold mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            {project.subtitle}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-600/20 text-blue-300 rounded-full border border-blue-600/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Project Image */}
        <div className="mb-12">
          <div className="h-64 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl border border-gray-700/50 flex items-center justify-center">
            <div className="text-6xl font-bold text-gray-400">
              {project.title.split(' ')[0]}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Descripción</h2>
          <p className="text-gray-300 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Características Principales</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {project.features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-300">
                <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Challenges */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Desafíos Técnicos</h2>
          <ul className="space-y-3">
            {project.challenges.map((challenge, index) => (
              <li key={index} className="flex items-start text-gray-300">
                <svg className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                {challenge}
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Ver en GitHub
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Ver Demo
          </a>
        </div>
      </div>
    </div>
  );
} 