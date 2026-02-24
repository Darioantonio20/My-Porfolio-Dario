import {
  FaReact, FaNodeJs, FaGitAlt, FaBootstrap, FaPython, FaApple,
  FaJava, FaGithub, FaAndroid, FaMousePointer, FaCogs, FaPhp,
  FaDocker, FaAws, FaMicrosoft, FaDatabase
} from 'react-icons/fa';
import {
  SiNextdotjs, SiTypescript, SiTailwindcss, SiFigma, SiExpress,
  SiFlutter, SiNetlify, SiHtml5, SiCss3, SiJavascript, SiDart,
  SiFlask, SiMongodb, SiPostman, SiXcode, SiMaterialdesign,
  SiLaravel, SiMysql, SiSqlite, SiVercel, SiAndroidstudio,
  SiGooglecloud, SiJira, SiTrello, SiCodeigniter, SiBitbucket,
  SiRailway
} from 'react-icons/si';
import { MdDevices } from 'react-icons/md';
import { BsPeopleFill } from 'react-icons/bs';
import { GiBrain } from 'react-icons/gi';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { TbTargetArrow } from 'react-icons/tb';

// —— Icon helpers for brands without react-icons entries ——

const StitchIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#0F62FE" />
    <text x="4" y="23" fontSize="13" fill="white" fontFamily="Arial" fontWeight="bold">St</text>
  </svg>
);

const N8nIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#EA4B71" />
    <text x="3" y="23" fontSize="12" fill="white" fontFamily="Arial" fontWeight="bold">n8n</text>
  </svg>
);

const MCPIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#6366f1" />
    <text x="3" y="23" fontSize="11" fill="white" fontFamily="Arial" fontWeight="bold">MCP</text>
  </svg>
);

const AgentsIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="16" fill="#7C3AED" />
    <circle cx="16" cy="11" r="5" fill="white" opacity="0.9" />
    <circle cx="8" cy="24" r="3" fill="white" opacity="0.7" />
    <circle cx="24" cy="24" r="3" fill="white" opacity="0.7" />
    <line x1="16" y1="16" x2="8" y2="21" stroke="white" strokeWidth="1.5" />
    <line x1="16" y1="16" x2="24" y2="21" stroke="white" strokeWidth="1.5" />
  </svg>
);

const TestFlightIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="#0073CF" />
    <text x="4" y="23" fontSize="11" fill="white" fontFamily="Arial" fontWeight="bold">TF</text>
  </svg>
);

const OfficeIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#D83B01" />
    <text x="5" y="23" fontSize="13" fill="white" fontFamily="Arial" fontWeight="bold">O</text>
  </svg>
);

const CodeIgniter4Icon = () => (
  <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#DD4814" />
    <text x="4" y="23" fontSize="11" fill="white" fontFamily="Arial" fontWeight="bold">CI4</text>
  </svg>
);

const AntigravityIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#000000" />
    <path d="M16 6L26 24H6L16 6Z" fill="#8B5CF6" />
    <circle cx="16" cy="18" r="4" fill="white" />
  </svg>
);

const TraeIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#1D4ED8" />
    <path d="M8 8H24V12H18V24H14V12H8V8Z" fill="white" />
  </svg>
);

const WindsurfIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#0EA5E9" />
    <path d="M16 4C16 4 24 12 24 18C24 22.4183 20.4183 26 16 26C11.5817 26 8 22.4183 8 18C8 12 16 4 16 4Z" fill="white" opacity="0.8" />
    <path d="M12 18Q16 14 20 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ClawcodeIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#111827" />
    <path d="M8 12L12 8M20 8L24 12M12 24L8 20M24 20L20 24" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M12 12L20 20M20 12L12 20" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const OpenCodeIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="6" fill="#059669" />
    <path d="M10 12L6 16L10 20M22 12L26 16L22 20M18 8L14 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// —— Skill groups ——

const backendSkills = [
  { name: 'PHP', icon: <FaPhp className="text-indigo-400" /> },
  { name: 'Laravel', icon: <SiLaravel className="text-red-400" /> },
  { name: 'CodeIgniter 4', icon: <CodeIgniter4Icon /> },
  { name: 'Node.js', icon: <FaNodeJs className="text-emerald-400" /> },
  { name: 'Express.js', icon: <SiExpress className="text-gray-200" /> },
  { name: 'Python', icon: <FaPython className="text-yellow-300" /> },
  { name: 'Java', icon: <FaJava className="text-orange-300" /> },
  { name: 'Flask', icon: <SiFlask className="text-gray-200" /> },
];

const databaseSkills = [
  { name: 'MySQL', icon: <SiMysql className="text-blue-400" /> },
  { name: 'SQLite', icon: <SiSqlite className="text-cyan-300" /> },
  { name: 'MongoDB', icon: <SiMongodb className="text-green-400" /> },
];

const frontendSkills = [
  { name: 'React.js', icon: <FaReact className="text-cyan-400" /> },
  { name: 'Next.js', icon: <SiNextdotjs className="text-white" /> },
  { name: 'TypeScript', icon: <SiTypescript className="text-blue-400" /> },
  { name: 'JavaScript', icon: <SiJavascript className="text-yellow-300" /> },
  { name: 'HTML5', icon: <SiHtml5 className="text-orange-400" /> },
  { name: 'CSS3', icon: <SiCss3 className="text-blue-400" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-300" /> },
  { name: 'Bootstrap', icon: <FaBootstrap className="text-purple-400" /> },
  { name: 'Flutter', icon: <SiFlutter className="text-blue-400" /> },
  { name: 'Dart', icon: <SiDart className="text-cyan-400" /> },
];

const devToolsSkills = [
  { name: 'Antigravity', icon: <AntigravityIcon /> },
  { name: 'Trae', icon: <TraeIcon /> },
  { name: 'Windsurf', icon: <WindsurfIcon /> },
  { name: 'Cursor AI', icon: <FaMousePointer className="text-emerald-300" /> },
  { name: 'Android Studio', icon: <SiAndroidstudio className="text-green-400" /> },
  { name: 'Xcode', icon: <SiXcode className="text-blue-300" /> },
  {
    name: 'VS Code', icon: (
      <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#1F9CF0" />
        <path d="M23.5 7.5L13.5 16L23.5 24.5V7.5Z" fill="white" />
        <path d="M8.5 12L13.5 16L8.5 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  { name: 'Web & Mobile', icon: <MdDevices className="text-cyan-200" /> },
];

const deploymentSkills = [
  { name: 'Git', icon: <FaGitAlt className="text-orange-400" /> },
  { name: 'GitHub', icon: <FaGithub className="text-gray-200" /> },
  { name: 'Bitbucket', icon: <SiBitbucket className="text-blue-400" /> },
  { name: 'Netlify', icon: <SiNetlify className="text-cyan-400" /> },
  { name: 'Vercel', icon: <SiVercel className="text-white" /> },
  { name: 'Railway', icon: <SiRailway className="text-purple-400" /> },
  { name: 'Docker', icon: <FaDocker className="text-blue-400" /> },
  { name: 'Postman', icon: <SiPostman className="text-orange-400" /> },
  { name: 'Clawcode', icon: <ClawcodeIcon /> },
  { name: 'Open Code', icon: <OpenCodeIcon /> },
  { name: 'iOS / TestFlight', icon: <TestFlightIcon /> },
  { name: 'Android Deployment', icon: <FaAndroid className="text-green-400" /> },
];

const uiuxSkills = [
  { name: 'Figma', icon: <SiFigma className="text-pink-400" /> },
  { name: 'Material Design', icon: <SiMaterialdesign className="text-blue-400" /> },
  { name: 'Stitch', icon: <StitchIcon /> },
  {
    name: 'Canva', icon: (
      <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#19C7C7" />
        <text x="8" y="23" fontSize="15" fill="white" fontFamily="Arial">Ca</text>
      </svg>
    )
  },
  { name: 'AI Art / Generators', icon: <GiBrain className="text-purple-400" /> },
];

const cloudAiSkills = [
  { name: 'AWS', icon: <FaAws className="text-yellow-400" /> },
  { name: 'Google Cloud', icon: <SiGooglecloud className="text-blue-400" /> },
  { name: 'n8n', icon: <N8nIcon /> },
  { name: 'AI Assistants', icon: <HiOutlineSparkles className="text-purple-300" /> },
  { name: 'Agents Orchestration', icon: <AgentsIcon /> },
  { name: 'MCP', icon: <MCPIcon /> },
];

const productivitySkills = [
  { name: 'Microsoft Office', icon: <OfficeIcon /> },
  { name: 'Agile', icon: <BsPeopleFill className="text-emerald-300" /> },
  { name: 'Scrum', icon: <FaCogs className="text-cyan-300" /> },
  { name: 'Jira', icon: <SiJira className="text-blue-400" /> },
  { name: 'Trello', icon: <SiTrello className="text-blue-300" /> },
];

const softSkills = [
  { name: 'Team Communication', icon: <BsPeopleFill className="text-blue-300" /> },
  { name: 'Problem Solving', icon: <TbTargetArrow className="text-cyan-400" /> },
  { name: 'Collaboration', icon: <BsPeopleFill className="text-emerald-400" /> },
];

// —— Colour accents per section ——
type SkillItem = { name: string; icon: React.ReactNode };

interface SkillSectionProps {
  title: string;
  skills: SkillItem[];
  accent: string;   // Tailwind text-color class, e.g. "text-emerald-300"
  labelColor: string;
}

const SkillSection = ({ title, skills, accent, labelColor }: SkillSectionProps) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-4">
    <h4 className={`text-base font-semibold ${accent} text-center tracking-wide uppercase`}>
      {title}
    </h4>
    <div className="flex flex-wrap justify-center gap-5">
      {skills.map((skill, idx) => (
        <div key={idx} className="flex flex-col items-center gap-1 group">
          <div className="text-3xl transition-transform duration-200 hover:scale-125 cursor-pointer">
            {skill.icon}
          </div>
          <span className={`text-xs ${labelColor} leading-tight text-center max-w-[68px]`}>
            {skill.name}
          </span>
        </div>
      ))}
    </div>
  </div>
);

// —— Main Component ——

const About = () => {
  return (
    <section id="sobre-mi" className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* About Me header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-16">
          <div className="flex-1 space-y-4">
            <h2 className="text-4xl font-bold text-white">
              About{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Me
              </span>
            </h2>
            <p className="text-lg text-cyan-200 leading-relaxed">
              I am a passionate Full-Stack Developer focused on technology and innovation.
              I specialize in creating exceptional user experiences using the latest web and mobile technologies.
            </p>
            <p className="text-lg text-cyan-200 leading-relaxed">
              With experience in React, Next.js, Node.js, Python, Flutter, Laravel and cloud platforms,
              I love working on challenging projects that allow me to grow professionally and deliver value to end users.
            </p>
          </div>
          <div className="flex flex-row md:flex-col items-center justify-center gap-8 md:gap-4 min-w-[200px]">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">4+</div>
              <div className="text-cyan-200">Years of Experience</div>
            </div>
          </div>
        </div>

        {/* ── HARD SKILLS ── */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-white text-center">Hard Skills</h3>

          {/* Row 1: Backend · Databases · Frontend */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SkillSection
              title="⚙️ Backend"
              skills={backendSkills}
              accent="text-orange-300"
              labelColor="text-orange-100"
            />
            <SkillSection
              title="🗄️ Databases"
              skills={databaseSkills}
              accent="text-sky-300"
              labelColor="text-sky-100"
            />
            <SkillSection
              title="🖥️ Frontend"
              skills={frontendSkills}
              accent="text-cyan-300"
              labelColor="text-cyan-100"
            />
          </div>

          {/* Row 2: Dev Tools · Deployment & CI/CD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SkillSection
              title="🛠️ Mobile & Web Dev Tools"
              skills={devToolsSkills}
              accent="text-emerald-300"
              labelColor="text-emerald-100"
            />
            <SkillSection
              title="🚀 Deployment & CI/CD"
              skills={deploymentSkills}
              accent="text-violet-300"
              labelColor="text-violet-100"
            />
          </div>

          {/* Row 3: UI/UX · Cloud & AI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SkillSection
              title="🎨 UI / UX"
              skills={uiuxSkills}
              accent="text-pink-300"
              labelColor="text-pink-100"
            />
            <SkillSection
              title="☁️ Cloud & AI"
              skills={cloudAiSkills}
              accent="text-purple-300"
              labelColor="text-purple-100"
            />
          </div>

          {/* Row 4: Productivity & Methodologies (full width) */}
          <div>
            <SkillSection
              title="📋 Productivity & Methodologies"
              skills={productivitySkills}
              accent="text-yellow-300"
              labelColor="text-yellow-100"
            />
          </div>
        </div>

        {/* ── SOFT SKILLS ── */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Soft Skills</h3>
          <div className="flex flex-wrap justify-center gap-8">
            {softSkills.map((skill, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1 group">
                <div className="text-3xl transition-transform duration-200 hover:scale-125 cursor-pointer">
                  {skill.icon}
                </div>
                <span className="text-xs text-cyan-100 text-center">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;