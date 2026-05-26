'use client';
import { useLenis } from '../effects/SmoothScroll';
import { scrollToSection } from '../../lib/scroll';

export default function Footer() {
  const lenis = useLenis();
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative py-12 overflow-hidden"
      style={{ background: 'var(--ink)', borderTop: '1px solid rgba(255,255,255,0.04)' }}
    >
      {/* Subtle top highlight */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(91,91,255,0.3), rgba(255,91,141,0.2), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Left: Logo & copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
                <polygon points="20,2 38,11 38,29 20,38 2,29 2,11" stroke="#5B5BFF" strokeWidth="1.5" fill="none" />
                <text x="20" y="25" textAnchor="middle" fill="#E8E8FF" fontSize="12" fontFamily="Space Mono" fontWeight="700">T</text>
              </svg>
              <span className="font-bold text-bright" style={{ fontFamily: 'Space Mono', letterSpacing: '0.1em', fontSize: 13 }}>
                TANJIM
              </span>
            </div>
            <p className="text-xs text-muted" style={{ fontFamily: 'Space Mono' }}>
              © {year} · Built with Next.js & passion
            </p>
          </div>

          {/* Center: Nav links */}
          <div className="flex items-center gap-6">
            {['About', 'Skills', 'Projects', 'Contact'].map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(`#${link.toLowerCase()}`, lenis);
                }}
                className="text-xs text-muted hover:text-bright transition-colors duration-300"
                style={{ fontFamily: 'Space Mono', letterSpacing: '0.05em' }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right: Status */}
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: '#5BFFC8', boxShadow: '0 0 8px rgba(91,255,200,0.6)', animation: 'pulse 2s infinite' }}
            />
            <span className="text-xs" style={{ fontFamily: 'Space Mono', color: '#5BFFC8' }}>
              Available for work
            </span>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted text-center" style={{ fontFamily: 'Space Mono' }}>
            Designed & developed in Bangladesh 🇧🇩
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted" style={{ fontFamily: 'Space Mono' }}>
              Stack: Next.js · GSAP · Framer Motion · Tailwind
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
