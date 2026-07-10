'use client';

import GooeyNav from '@/components/GooeyNav/GooeyNav';
import { useLanguage } from '@/context/LanguageContext';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#projects', label: t('nav.projects') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-center items-center h-12 sm:h-14 md:h-16">
          <div className="scale-75 sm:scale-90 md:scale-100">
            <GooeyNav items={navItems} />
          </div>
        </div>

        {/* Language Switcher */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center bg-black/40 border border-white/10 rounded-full p-0.5 z-50">
          <button
            onClick={() => setLanguage('es')}
            className={`rounded-full px-2 py-0.5 text-[9px] sm:text-[10px] font-bold transition-all duration-200 cursor-pointer ${
              language === 'es'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-white/45 hover:text-white/70 border border-transparent'
            }`}
          >
            ES
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`rounded-full px-2 py-0.5 text-[9px] sm:text-[10px] font-bold transition-all duration-200 cursor-pointer ${
              language === 'en'
                ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/30'
                : 'text-white/45 hover:text-white/70 border border-transparent'
            }`}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 
