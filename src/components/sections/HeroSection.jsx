'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import LightRays from '../effects/LightRays';

const SplineScene = dynamic(
  () => import('../ui/SplineScene').then(m => ({ default: m.SplineScene })),
  { ssr: false }
);

const titles = ['Frontend Developer', 'React Specialist', 'UI Craftsman', 'Next.js Engineer'];

// ── Typewriter ──────────────────────────────────────────────────────────────
function TypewriterText({ texts }) {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const target = texts[currentIndex];
    let timeout;
    if (isPaused) {
      timeout = setTimeout(() => setIsPaused(false), 1000);
    } else if (isDeleting) {
      if (currentText.length === 0) {
        setIsDeleting(false);
        setCurrentIndex(i => (i + 1) % texts.length);
      } else {
        timeout = setTimeout(() => setCurrentText(t => t.slice(0, -1)), 50);
      }
    } else {
      if (currentText.length === target.length) {
        setIsPaused(true);
        timeout = setTimeout(() => setIsDeleting(true), 1800);
      } else {
        timeout = setTimeout(() => setCurrentText(target.slice(0, currentText.length + 1)), 80);
      }
    }
    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, isPaused, texts]);

  return (
    <span>
      {currentText}
      <span
        className="inline-block w-0.5 h-7 ml-1 align-middle"
        style={{ background: '#5B5BFF', animation: 'blink 1s step-end infinite' }}
      />
    </span>
  );
}

// ── Social icon button ──────────────────────────────────────────────────────
function SocialLink({ href, label, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <span
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'rgba(91,91,255,0.18)', boxShadow: '0 0 18px rgba(91,91,255,0.35)' }}
      />
      <span className="relative text-muted group-hover:text-bright transition-colors duration-300 text-sm font-mono">
        {icon}
      </span>
    </a>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function HeroSection() {
  useEffect(() => {
    const initAnim = async () => {
      try {
        const { gsap } = await import('gsap');
        const tl = gsap.timeline({ delay: 0.4 });
        tl.from('.hero-tag',        { opacity: 0, y: 20,  duration: 0.6, ease: 'power3.out' })
          .from('.hero-headline',   { opacity: 0, y: 50,  duration: 0.9, ease: 'power3.out' }, '-=0.3')
          .from('.hero-typewriter', { opacity: 0, y: 20,  duration: 0.6, ease: 'power3.out' }, '-=0.4')
          .from('.hero-desc',       { opacity: 0, y: 20,  duration: 0.6, ease: 'power3.out' }, '-=0.3')
          .from('.hero-cta',        { opacity: 0, y: 20,  duration: 0.6, ease: 'power3.out', stagger: 0.12 }, '-=0.3')
          .from('.hero-social',     { opacity: 0, x: -16, duration: 0.5, ease: 'power3.out', stagger: 0.07 }, '-=0.4')
          .from('.hero-stats',      { opacity: 0, y: 16,  duration: 0.5, ease: 'power3.out' }, '-=0.4')
          .from('.hero-3d',         { opacity: 0, scale: 0.96, duration: 1.0, ease: 'power3.out' }, '-=1.0');
      } catch (e) {}
    };
    initAnim();
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#000000' }}   /* ← near-black, not var(--ink) */
    >
      {/* ── Light rays — tight beam, high contrast on dark bg ── */}
      <LightRays
        raysOrigin="top-center"
        raysColor="#5B5BFF"
        raysSpeed={0.6}
        lightSpread={0.38}   /* tight beam */
        rayLength={1.8}
        pulsating={true}
        fadeDistance={1.4}
        saturation={1.0}
        followMouse={true}
        mouseInfluence={0.09}
        noiseAmount={0.03}
        distortion={0.025}
      />

      {/* ── Second subtler beam in accent-2 colour ── */}
      {/* <LightRays
        raysOrigin="top-right"
        raysColor="#FF5B8D"
        raysSpeed={0.4}
        lightSpread={0.25}
        rayLength={1.2}
        pulsating={false}
        fadeDistance={1.0}
        saturation={0.7}
        followMouse={false}
        mouseInfluence={0}
        noiseAmount={0.05}
        distortion={0.01}
      /> */}

      {/* ── Very fine grid texture ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(91,91,255,0.025) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(91,91,255,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Vignette — keeps edges ultra-dark ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, #04040a 100%)',
        }}
      />

      {/* ── Bottom fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, #04040a, transparent)' }}
      />

      {/* ══════════ CONTENT ══════════ */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4 min-h-[80vh]">

          {/* ── LEFT: text ── */}
          <div className="flex flex-col gap-7 ml-10 w-full lg:w-[30%] z-10 self-start mt-20">

            {/* Tag */}
            <div className="hero-tag">
              <span className="tag-pill">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-3 animate-pulse" />
                Available for work
              </span>
            </div>

            {/* Headline */}
            <div className="hero-headline">
              <h1
                className="text-bright leading-[0.92]"
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                }}
              >
                Hi, I&apos;m
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #5B5BFF 0%, #FF5B8D 55%, #5BFFC8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Tanjim
                </span>
              </h1>
            </div>

            {/* Typewriter */}
            <div
              className="hero-typewriter text-lg md:text-xl font-mono min-h-[2rem]"
              style={{ color: 'var(--muted)' }}
            >
              <TypewriterText texts={titles} />
            </div>

            
          </div>

          {/* ── MIDDLE: Spline 3D scene ── */}
          <div
            className="hero-3d absolute w-full flex items-center justify-center z-0"
            style={{ height: 600 }}
          >
            {/* Outer glow halo */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
            />

            {/* Spline canvas */}
            <div
              className="relative w-full h-full rounded-2xl overflow-hidden"
            >
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />

              {/* Frosted bottom strip — hides Spline watermark */}
              <div
                className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(4,4,10,0.95), transparent)' }}
              />
            </div>

            {/* Status badge */}
            <div
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full z-20 whitespace-nowrap"
              style={{
                background: 'rgba(4,4,10,0.9)',
                border: '1px solid rgba(91,255,200,0.25)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              }}
            >
              <div className="w-2 h-2 rounded-full bg-accent-3 animate-pulse" />
              <span className="text-xs font-mono" style={{ color: '#5BFFC8' }}>
                Available for work
              </span>
            </div>
          </div>

          {/* ── RIGHT: text ── */}
          <div className="flex flex-col gap-7 w-full lg:w-[30%] z-10 lg:mt-32">
            
            {/* Description */}
            <p
              className="hero-desc leading-relaxed text-sm md:text-base"
              style={{ color: 'rgba(232,232,255,0.5)' }}
            >
              I craft premium digital experiences with cutting-edge technologies —
              turning complex ideas into smooth, beautiful, and performant web applications.
            </p>

            {/* Socials */}
            <div className="hero-social flex flex-wrap items-center gap-2.5">
              <SocialLink href="https://github.com/P-tanjim"  label="GitHub"   icon="⌥" />
              <SocialLink href="#"                             label="LinkedIn" icon="in" />
              <SocialLink href="#"                             label="Twitter"  icon="𝕏" />
              <SocialLink href="#"                             label="Facebook" icon="f" />
              <div className="w-px h-5 bg-border mx-1 hidden xl:block" />
              <a
                href="mailto:hello@tanjim.dev"
                className="text-xs font-mono transition-colors duration-300"
                style={{ color: 'var(--muted)' }}
                onMouseOver={e => e.currentTarget.style.color = 'var(--bright)'}
                onMouseOut={e => e.currentTarget.style.color = 'var(--muted)'}
              >
                hello@tanjim.dev
              </a>
            </div>

            {/* Stats */}
            <div
              className="hero-stats grid grid-cols-2 gap-4 pt-5"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              {[
                { num: '15+',  label: 'Projects' },
                { num: '2+',   label: 'Years Coding' },
                { num: '100%', label: 'Dedication' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-bright" style={{ fontFamily: 'Space Mono' }}>{stat.num}</div>
                  <div className="text-xs text-muted uppercase tracking-widest mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-muted text-xs font-mono tracking-widest uppercase" style={{ fontSize: 10 }}>Scroll</span>
        <div
          className="w-px h-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(91,91,255,0.6), transparent)',
            animation: 'float 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  );
}
