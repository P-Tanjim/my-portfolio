'use client';
import dynamic from 'next/dynamic';
import SmoothScroll from '../components/effects/SmoothScroll';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import SkillsSection from '../components/sections/SkillsSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import EducationSection from '../components/sections/EducationSection';
import ContactSection from '../components/sections/ContactSection';

// Dynamic imports for heavy WebGL/canvas effects — no SSR
const CustomCursor = dynamic(() => import('../components/effects/CustomCursor'), { ssr: false });

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />

      {/* Layout */}
      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
