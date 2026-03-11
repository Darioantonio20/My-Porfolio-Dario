import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';

const Footer = dynamic(() => import('@/components/layout/Footer'));
const About = dynamic(() => import('@/components/sections/About'), {
  loading: () => <div className="min-h-[900px] bg-black" aria-hidden="true" />,
});
const Awards = dynamic(() => import('@/components/sections/Awards'), {
  loading: () => <div className="min-h-[1100px] bg-gradient-to-br from-gray-900 via-emerald-950 to-cyan-950" aria-hidden="true" />,
});
const Projects = dynamic(() => import('@/components/sections/Team'), {
  loading: () => <div className="min-h-[800px] bg-gradient-to-br from-gray-900 via-emerald-950 to-cyan-950" aria-hidden="true" />,
});

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Awards />
        <Projects />
      </main>
      <Footer />
    </>
  );
}
