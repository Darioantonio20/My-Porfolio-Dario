import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'Plataforma de comercio electrónico completa con React, Next.js y Stripe para pagos.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
    image: '/api/placeholder/400/250',
    github: 'https://github.com',
    live: 'https://demo.com',
    featured: true
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Aplicación de gestión de tareas con drag & drop, autenticación y base de datos en tiempo real.',
    technologies: ['React', 'Firebase', 'TypeScript', 'Framer Motion'],
    image: '/api/placeholder/400/250',
    github: 'https://github.com',
    live: 'https://demo.com',
    featured: false
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'Dashboard del clima con mapas interactivos y pronósticos detallados.',
    technologies: ['React', 'OpenWeather API', 'Chart.js', 'CSS Modules'],
    image: '/api/placeholder/400/250',
    github: 'https://github.com',
    live: 'https://demo.com',
    featured: false
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'Sitio web personal con animaciones y diseño responsivo moderno.',
    technologies: ['Next.js', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
    image: '/api/placeholder/400/250',
    github: 'https://github.com',
    live: 'https://demo.com',
    featured: false
  }
]; 