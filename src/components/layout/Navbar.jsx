'use client';
import { useState, useEffect, useRef } from 'react';
import { useLenis } from '../effects/SmoothScroll';
import { scrollToSection } from '../../lib/scroll';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

function Logo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <div className="relative w-10 h-10">
        {/* Geometric logo mark */}
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <polygon points="20,2 38,11 38,29 20,38 2,29 2,11" stroke="#5B5BFF" strokeWidth="1.5" fill="none" />
          <polygon points="20,8 32,14 32,26 20,32 8,26 8,14" fill="rgba(91,91,255,0.15)" stroke="rgba(91,91,255,0.4)" strokeWidth="1" />
          <text x="20" y="25" textAnchor="middle" fill="#E8E8FF" fontSize="12" fontFamily="Space Mono" fontWeight="700">T</text>
        </svg>
        <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl animate-pulse-glow" />
      </div>
      <span className="text-bright font-bold text-lg tracking-wider hidden sm:block">
        TANJIM
      </span>
    </div>
  );
}

function GlassNav({ activeSection, lenis }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    scrollToSection(href, lenis);
  };

  return (
    <nav
      className="hidden md:flex items-center rounded-full px-2 py-2 relative"
      style={{
        background: 'rgba(15, 15, 26, 0.55)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
      }}
    >
      {/* Glass highlight stripe */}
      <div
        className="absolute inset-x-0 top-0 h-[1px] rounded-full opacity-60"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }}
      />

      {navLinks.map((link, idx) => {
        const isActive = activeSection === link.href.slice(1);
        return (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            className="relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 group"
            style={{
              color: isActive ? '#E8E8FF' : hoveredIdx === idx ? '#E8E8FF' : '#6B6B8A',
              letterSpacing: '0.03em',
            }}
          >
            {/* Active / hover pill background */}
            {(isActive || hoveredIdx === idx) && (
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  background: isActive
                    ? 'rgba(91, 91, 255, 0.2)'
                    : 'rgba(255, 255, 255, 0.06)',
                  border: isActive ? '1px solid rgba(91, 91, 255, 0.35)' : '1px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.25s ease',
                }}
              />
            )}
            <span className="relative z-10">{link.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

function NavButtons({ lenis }) {
  const handleDownloadCV = () => {
    // Placeholder - replace with actual CV URL
    const link = document.createElement('a');
    link.href = '/Tanjim_Resume.pdf';
    link.download = 'Tanjim_Resume.pdf';
    link.click();
  };

  const handleContact = (e) => {
    e.preventDefault();
    scrollToSection('#contact', lenis);
  };

  return (
    <div className="hidden md:flex items-center gap-3">
      <button
        onClick={handleDownloadCV}
        className="group relative px-4 py-2 text-sm font-medium rounded-full overflow-hidden transition-all duration-300"
        style={{
          color: '#E8E8FF',
          border: '1px solid rgba(91,91,255,0.35)',
          background: 'rgba(91,91,255,0.08)',
        }}
      >
        <span className="relative z-10 flex items-center gap-2">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Resume
        </span>
        <span className="absolute inset-0 bg-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
      </button>

      <button
        onClick={handleContact}
        className="group relative px-5 py-2 text-sm font-bold rounded-full overflow-hidden transition-all duration-300"
        style={{
          color: '#0A0A0F',
          background: '#5B5BFF',
          boxShadow: '0 0 20px rgba(91,91,255,0.4)',
        }}
      >
        <span className="relative z-10">Hire Me</span>
        <span className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
      </button>
    </div>
  );
}

// Mobile hamburger menu
function MobileMenu({ isOpen, onClose, lenis }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNavClick = (e, href) => {
    e.preventDefault();
    onClose();
    setTimeout(() => scrollToSection(href, lenis), 300);
  };

  return (
    <div
      className="fixed inset-0 z-40 flex flex-col"
      style={{ background: 'rgba(10, 10, 15, 0.97)', backdropFilter: 'blur(20px)' }}
    >
      <div className="flex justify-end p-6">
        <button onClick={onClose} className="text-bright w-10 h-10 flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 gap-8">
        {navLinks.map((link, idx) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="text-4xl font-bold tracking-tight transition-all duration-300 hover:text-accent"
            style={{
              color: '#E8E8FF',
              animationDelay: `${idx * 0.08}s`,
              animation: 'slideInUp 0.5s ease forwards',
              opacity: 0,
            }}
          >
            {link.label}
          </a>
        ))}
        <div className="flex gap-4 mt-8">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="px-8 py-3 rounded-full font-bold text-ink"
            style={{ background: '#5B5BFF' }}
          >
            Hire Me
          </a>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full opacity-5 blur-3xl bg-accent" />
      <div className="absolute top-20 right-10 w-48 h-48 rounded-full opacity-5 blur-3xl bg-accent-2" />
    </div>
  );
}

export default function Navbar() {
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const updateFromScroll = (scrollY) => {
      setScrolled(scrollY > 50);

      const sections = ['about', 'skills', 'projects', 'education', 'contact'];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && scrollY >= el.offsetTop - 200) {
          setActiveSection(section);
          return;
        }
      }
      setActiveSection('hero');
    };

    const onNativeScroll = () => updateFromScroll(window.scrollY);
    window.addEventListener('scroll', onNativeScroll, { passive: true });

    if (!lenis) {
      return () => window.removeEventListener('scroll', onNativeScroll);
    }

    const onLenisScroll = ({ scroll }) => updateFromScroll(scroll);
    lenis.on('scroll', onLenisScroll);
    updateFromScroll(lenis.scroll);

    return () => {
      window.removeEventListener('scroll', onNativeScroll);
      lenis.off('scroll', onLenisScroll);
    };
  }, [lenis]);

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{ paddingTop: scrolled ? '12px' : '20px' }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
          {/* Part 1: Logo (always outside glass) */}
          <Logo />

          {/* Part 2: Glass nav links (center) */}
          <GlassNav activeSection={activeSection} lenis={lenis} />

          {/* Part 3: Action buttons */}
          <NavButtons lenis={lenis} />

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 relative z-50"
            onClick={() => setMobileOpen(true)}
          >
            <span className="w-6 h-0.5 bg-bright block transition-all" />
            <span className="w-4 h-0.5 bg-bright block transition-all self-end" />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} lenis={lenis} />

      {/* Scroll to top button */}
      <ScrollToTop lenis={lenis} />
    </>
  );
}

function ScrollToTop({ lenis }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = (scrollY) => setVisible(scrollY > 500);
    const onNativeScroll = () => update(window.scrollY);
    window.addEventListener('scroll', onNativeScroll, { passive: true });

    if (!lenis) {
      return () => window.removeEventListener('scroll', onNativeScroll);
    }

    const onLenisScroll = ({ scroll }) => update(scroll);
    lenis.on('scroll', onLenisScroll);
    update(lenis.scroll);

    return () => {
      window.removeEventListener('scroll', onNativeScroll);
      lenis.off('scroll', onLenisScroll);
    };
  }, [lenis]);

  if (!visible) return null;

  return (
    <button
      className="scroll-top-btn"
      onClick={() => {
        if (lenis) lenis.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      aria-label="Scroll to top"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}
