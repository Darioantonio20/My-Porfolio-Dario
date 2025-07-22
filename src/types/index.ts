export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github: string;
  live?: string;
  demo?: string;
  featured: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface NavItem {
  href: string;
  label: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'design';
} 