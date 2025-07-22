'use client';

import Link from 'next/link';
import GooeyNav from '@/components/GooeyNav/GooeyNav';

const Header = () => {
  const navItems = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#sobre-mi', label: 'Sobre Mí' },
    { href: '#proyectos', label: 'Proyectos' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-white tracking-wide">
            Portfolio
          </Link>
          {/* GooeyNav para todas las vistas */}
          <div className="flex-1 flex justify-center">
            <GooeyNav items={navItems} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 