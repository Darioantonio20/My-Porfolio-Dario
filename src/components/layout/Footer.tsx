'use client';

const Footer = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Darioantonio20',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      color: 'hover:text-emerald-300'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/dario-antonio/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      color: 'hover:text-cyan-300'
    }
  ];

  const contactInfo = [
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      text: 'dariobatman18@gmail.com',
      link: 'mailto:dariobatman18@gmail.com'
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      text: '+52 961 479 5475',
      link: 'tel:+529614795475'
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      text: 'Tuxtla Gutiérrez, México',
      link: null
    }
  ];

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Animated Background Layers */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 via-transparent to-cyan-900/20 animate-pulse"></div>
        
        {/* Moving gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-800/10 to-transparent animate-[gradient_8s_ease-in-out_infinite]"></div>
        
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(16,185,129,0.1),transparent_50%)] animate-[pulse_4s_ease-in-out_infinite]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(6,182,212,0.1),transparent_50%)] animate-[pulse_6s_ease-in-out_infinite]"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        </div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-emerald-400 rounded-full animate-[bounce_3s_ease-in-out_infinite] opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-[bounce_4s_ease-in-out_infinite] opacity-40"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-emerald-300 rounded-full animate-[bounce_5s_ease-in-out_infinite] opacity-50"></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-cyan-300 rounded-full animate-[bounce_6s_ease-in-out_infinite] opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/2 w-1 h-1 bg-emerald-500 rounded-full animate-[bounce_7s_ease-in-out_infinite] opacity-40"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
          {/* Left Column - Personal Info */}
          <div className="space-y-3">
            <div className="group">
              <h3 className="text-lg font-bold mb-1 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
                Darío Antonio Gutiérrez Álvarez
              </h3>
              <p className="text-emerald-200 text-xs leading-relaxed">
                Software Engineer
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-2">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group p-1.5 bg-black/50 backdrop-blur-sm rounded-lg border border-emerald-800/50 transition-all duration-300 hover:scale-110 hover:bg-emerald-900/50 hover:border-emerald-700/50 ${social.color}`}
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
          <div className="space-y-3">
            <div className="text-center">
              <h4 className="text-base font-bold text-emerald-300 mb-1">
                Contact
              </h4>
             
            </div>
            
            {/* Contact Info in 3 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {contactInfo.map((contact, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden bg-black/40 backdrop-blur-sm rounded-lg border border-emerald-800/40 hover:bg-emerald-900/20 hover:border-emerald-600/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-900/20"
                >
                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/0 via-emerald-800/10 to-cyan-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative flex flex-col items-center text-center p-2 space-y-1">
                    {/* Icon container */}
                    <div className="flex-shrink-0 w-6 h-6 bg-emerald-900/50 rounded-lg border border-emerald-700/50 flex items-center justify-center group-hover:bg-emerald-800/70 group-hover:border-emerald-600/70 transition-all duration-300 group-hover:scale-110">
                      <span className="text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300">
                        {contact.icon}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {contact.link ? (
                        <a
                          href={contact.link}
                          className="block text-cyan-200 hover:text-emerald-300 transition-colors duration-300 text-xs font-medium group-hover:scale-105 transform transition-transform duration-300 leading-tight"
                        >
                          {contact.text}
                        </a>
                      ) : (
                        <span className="block text-cyan-200 text-xs font-medium leading-tight">
                          {contact.text}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
      `}</style>
    </footer>
  );
};

export default Footer; 