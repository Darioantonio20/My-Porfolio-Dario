'use client';

const Footer = () => {
  const links = [
    {
      label: 'GitHub',
      href: 'https://github.com/Darioantonio20',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/dario-antonio/',
    },
    {
      label: 'CV',
      href: '/cv/DarioAntonioGutierrezAlvarezCV.pdf',
    },
    {
      label: 'Email',
      href: 'mailto:dariobatman18@gmail.com',
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black/80 text-white backdrop-blur-md">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(16,185,129,0.08),transparent_28%),radial-gradient(circle_at_80%_50%,rgba(34,211,238,0.07),transparent_28%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="min-w-0">
          <p className="text-sm font-semibold tracking-[0.24em] uppercase text-white/85">
            Darío Antonio Gutiérrez Álvarez
          </p>
          <p className="mt-1 text-xs text-white/45">
            Software Engineer
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/50">
            <a
              href="mailto:dariobatman18@gmail.com"
              className="transition-colors duration-300 hover:text-emerald-300"
            >
              dariobatman18@gmail.com
            </a>
            <span className="hidden text-white/25 sm:inline">/</span>
            <a
              href="tel:+529614795475"
              className="transition-colors duration-300 hover:text-emerald-300"
            >
              +52 961 479 5475
            </a>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:justify-end">
          {links.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group relative text-sm text-white/58 transition-colors duration-300 hover:text-white"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <span className="inline-block animate-[footerFade_0.7s_ease-out_forwards] opacity-0">
                {link.label}
              </span>
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-emerald-300 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
      </div>

      <style jsx>{`
        @keyframes footerFade {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
