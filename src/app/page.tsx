import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Awards from '@/components/sections/Awards';
import Projects from '@/components/sections/Team';


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
