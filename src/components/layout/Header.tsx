'use client';

import GooeyNav from '@/components/GooeyNav/GooeyNav';

const Header = () => {
  const navItems = [
    { href: '#inicio', label: 'Home' },
    { href: '#sobre-mi', label: 'About Me' },
    { href: '#proyectos', label: 'Projects' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-center items-center h-12 sm:h-14 md:h-16">
          {/* GooeyNav para todas las vistas */}
          <div className="flex justify-center px-2 sm:px-3">
            <div className="scale-75 sm:scale-90 md:scale-100">
              <GooeyNav items={navItems} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 