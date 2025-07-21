'use client';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Darioantonio20',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      color: 'hover:text-emerald-300'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/dario-antonio/',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      color: 'hover:text-cyan-300'
    }
  ];

  const contactInfo = [
    {
      icon: '📧',
      text: 'darioantonio10@hotmail.com',
      link: 'mailto:darioantonio10@hotmail.com'
    },
    {
      icon: '📱',
      text: '+52 961 479 5475',
      link: 'tel:+529614795475'
    },
    {
      icon: '📍',
      text: 'Tuxtla Gutiérrez, México',
      link: null
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-emerald-900 to-cyan-950 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.15),transparent_50%)]"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Left Column - Personal Info */}
          <div className="space-y-6">
            <div className="group">
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
                Darío Antonio Gutiérrez Álvarez
              </h3>
              <p className="text-emerald-200 text-lg leading-relaxed">
                Ingeniero en software
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group p-3 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-emerald-800/50 transition-all duration-300 hover:scale-110 hover:bg-emerald-900/50 hover:border-emerald-700/50 ${social.color}`}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div className="transition-transform duration-300 group-hover:rotate-12">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-emerald-300 mb-4">
              ¿Tienes un proyecto en mente?
            </h4>
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <div
                  key={index}
                  className="group flex items-center space-x-3 p-3 bg-gray-800/30 backdrop-blur-sm rounded-lg border border-emerald-800/30 hover:bg-emerald-900/30 hover:border-emerald-600/30 transition-all duration-300 hover:scale-105"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                    {contact.icon}
                  </span>
                  {contact.link ? (
                    <a
                      href={contact.link}
                      className="text-cyan-200 hover:text-emerald-300 transition-colors duration-300"
                    >
                      {contact.text}
                    </a>
                  ) : (
                    <span className="text-cyan-200">{contact.text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-emerald-800/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-emerald-400">
                &copy; {currentYear} <span className="text-white font-medium">Darío Antonio Gutiérrez Álvarez</span>. 
                Todos los derechos reservados.
              </p>
            </div>

            {/* Made with love */}
            <div className="flex items-center space-x-2 text-cyan-300">
              <span>Hecho con</span>
              <span className="text-emerald-400 animate-pulse">❤️</span>
              <span>en Tuxtla Gutiérrez Chiapas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-emerald-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-20 right-20 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-40"></div>
      <div className="absolute bottom-20 left-1/4 w-1 h-1 bg-emerald-300 rounded-full animate-bounce opacity-50"></div>
    </footer>
  );
};

export default Footer; 