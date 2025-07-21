import { FaReact, FaNodeJs, FaGitAlt, FaBootstrap, FaPython, FaApple, FaJava, FaGithub, FaAndroid, FaMousePointer, FaCogs } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiFigma, SiExpress, SiFlutter, SiNetlify, SiHtml5, SiCss3, SiJavascript, SiDart, SiFlask, SiMongodb, SiPostman, SiXcode, SiMaterialdesign } from 'react-icons/si';
import { MdDevices } from 'react-icons/md';
import { BsPeopleFill } from 'react-icons/bs';
import { GiBrain } from 'react-icons/gi';

// Skills agrupadas
const uiuxSkills = [
  { name: 'Figma', icon: <SiFigma className="text-pink-400" /> },  
  { name: 'Material Design', icon: <SiMaterialdesign className="text-blue-400" /> },
  { name: 'Canva', icon: <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#19C7C7"/><text x="8" y="23" fontSize="15" fill="white" fontFamily="Arial">Ca</text></svg> },
  { name: 'AI Art Generators', icon: <GiBrain className="text-purple-400" /> },
];

const frontendSkills = [
  { name: 'React.js', icon: <FaReact className="text-cyan-400" /> },
  { name: 'Next.js', icon: <SiNextdotjs className="text-white" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-300" /> },
  { name: 'Bootstrap', icon: <FaBootstrap className="text-purple-400" /> },
  { name: 'Typescript', icon: <SiTypescript className="text-blue-400" /> },
  { name: 'HTML5', icon: <SiHtml5 className="text-orange-400" /> },
  { name: 'CSS3', icon: <SiCss3 className="text-blue-400" /> },
  { name: 'JavaScript', icon: <SiJavascript className="text-yellow-300" /> },
  { name: 'VS Code', icon: (
    <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#1F9CF0"/>
      <path d="M23.5 7.5L13.5 16L23.5 24.5V7.5Z" fill="white"/>
      <path d="M8.5 12L13.5 16L8.5 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ) },
  { name: 'Cursor AI', icon: <FaMousePointer className="text-emerald-300" /> },
  { name: 'Web & Mobile', icon: <MdDevices className="text-cyan-200" /> },
  { name: 'Flutter', icon: <SiFlutter className="text-blue-400" /> },
  { name: 'Dart', icon: <SiDart className="text-cyan-400" /> },
];

const backendSkills = [
  { name: 'Node.js', icon: <FaNodeJs className="text-emerald-400" /> },
  { name: 'Express.js', icon: <SiExpress className="text-gray-200" /> },
  { name: 'Python', icon: <FaPython className="text-yellow-300" /> },
  { name: 'Java', icon: <FaJava className="text-orange-300" /> },
  { name: 'Flask', icon: <SiFlask className="text-gray-200" /> },
  { name: 'MongoDB', icon: <SiMongodb className="text-green-400" /> },
  { name: 'CI/CD', icon: <FaCogs className="text-emerald-300" /> },
  { name: 'Git', icon: <FaGitAlt className="text-orange-400" /> },
  { name: 'GitHub', icon: <FaGithub className="text-gray-200" /> },
  { name: 'Netlify', icon: <SiNetlify className="text-cyan-400" /> },
  { name: 'Postman', icon: <SiPostman className="text-orange-400" /> },
  { name: 'Deploy in iOS', icon: <FaApple className="text-gray-200" /> },
  { name: 'TestFlight', icon: <FaApple className="text-gray-200" /> },
  { name: 'Xcode', icon: <SiXcode className="text-blue-300" /> },
  { name: 'Android Studio', icon: <FaAndroid className="text-green-400" /> },
  { name: 'Deploy en Android', icon: <FaAndroid className="text-green-400" /> },
];

const softSkills = [
  { name: 'Metodología Ágil', icon: <BsPeopleFill className="text-emerald-300" /> },
  { name: 'Scrum', icon: <BsPeopleFill className="text-cyan-300" /> },
  { name: 'Comunicación en equipo', icon: <BsPeopleFill className="text-blue-300" /> },
  { name: 'Colaboración', icon: <BsPeopleFill className="text-emerald-400" /> },
  { name: 'Resolución de problemas', icon: <BsPeopleFill className="text-cyan-400" /> },
];

const About = () => {
  return (
    <section id="sobre-mi" className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Presentación en una sola fila */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-12">
          <div className="flex-1 space-y-4">
            <h2 className="text-4xl font-bold text-white">
              Sobre{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Mí
              </span>
            </h2>
            <p className="text-lg text-cyan-200 leading-relaxed">
              Soy un desarrollador Full-Stack Jr. apasionado por la tecnología y la innovación. Me especializo en crear experiencias de usuario excepcionales utilizando las últimas tecnologías web y mobile.
            </p>
            <p className="text-lg text-cyan-200 leading-relaxed">
              Con experiencia en React, Next.js, Node.js, Python y Flutter, me encanta trabajar en proyectos desafiantes que me permitan crecer profesionalmente y aportar valor a los usuarios finales.
            </p>
          </div>
          <div className="flex flex-row md:flex-col items-center justify-center gap-8 md:gap-4 min-w-[200px]">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">4</div>
              <div className="text-cyan-200">Años de Experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">15+</div>
              <div className="text-cyan-200">Proyectos Completados</div>
            </div>
          </div>
        </div>
        {/* Hard Skills y Soft Skills */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white mb-4">Hard Skills</h3>
          {/* Skills en 3 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* UI/UX */}
            <div>
              <h4 className="text-lg font-semibold text-emerald-300 mb-2 text-center">UI/UX</h4>
              <div className="flex flex-wrap justify-center gap-4">
                {uiuxSkills.map((skill, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="text-3xl mb-1 transition-transform duration-200 group-hover:scale-125 hover:scale-125 cursor-pointer">
                      {skill.icon}
                    </div>
                    <span className="text-sm text-emerald-100">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Frontend */}
            <div>
              <h4 className="text-lg font-semibold text-cyan-300 mb-2 text-center">Frontend</h4>
              <div className="flex flex-wrap justify-center gap-4">
                {frontendSkills.map((skill, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="text-3xl mb-1 transition-transform duration-200 group-hover:scale-125 hover:scale-125 cursor-pointer">
                      {skill.icon}
                    </div>
                    <span className="text-sm text-cyan-100">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Backend */}
            <div>
              <h4 className="text-lg font-semibold text-emerald-400 mb-2 text-center">Backend</h4>
              <div className="flex flex-wrap justify-center gap-4">
                {backendSkills.map((skill, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="text-3xl mb-1 transition-transform duration-200 group-hover:scale-125 hover:scale-125 cursor-pointer">
                      {skill.icon}
                    </div>
                    <span className="text-sm text-emerald-100">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Soft Skills debajo en una fila */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-cyan-200 mb-2 text-center">Soft Skills</h4>
            <div className="flex flex-wrap justify-center gap-6">
              {softSkills.map((skill, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="text-2xl mb-1 transition-transform duration-200 group-hover:scale-125 hover:scale-125 cursor-pointer">
                    {skill.icon}
                  </div>
                  <span className="text-xs text-cyan-100">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 