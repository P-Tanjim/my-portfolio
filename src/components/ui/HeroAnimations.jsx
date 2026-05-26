'use client';
import { useEffect } from 'react';

export default function HeroAnimations() {
  useEffect(() => {
    (async () => {
      try {
        // Skip heavy animations on low-end devices
        const isLowEnd = navigator.hardwareConcurrency <= 4
          || navigator.deviceMemory <= 4; // deviceMemory in GB

        const { gsap } = await import('gsap');

        if (isLowEnd) {
          // Just fade everything in at once, no stagger
          gsap.from('.hero-tag, .hero-headline, .hero-typewriter, .hero-desc, .hero-cta, .hero-social, .hero-stats, .hero-3d', {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: 0.2,
          });
          return;
        }

        // Full animation for high-end devices
        const tl = gsap.timeline({ delay: 0.4 });
        tl.from('.hero-tag',        { opacity: 0, y: 20,        duration: 0.6, ease: 'power3.out' })
          .from('.hero-headline',   { opacity: 0, y: 50,        duration: 0.9, ease: 'power3.out' }, '-=0.3')
          .from('.hero-typewriter', { opacity: 0, y: 20,        duration: 0.6, ease: 'power3.out' }, '-=0.4')
          .from('.hero-desc',       { opacity: 0, y: 20,        duration: 0.6, ease: 'power3.out' }, '-=0.3')
          .from('.hero-cta',        { opacity: 0, y: 20,        duration: 0.6, ease: 'power3.out', stagger: 0.12 }, '-=0.3')
          .from('.hero-social',     { opacity: 0, x: -16,       duration: 0.5, ease: 'power3.out', stagger: 0.07 }, '-=0.4')
          .from('.hero-stats',      { opacity: 0, y: 16,        duration: 0.5, ease: 'power3.out' }, '-=0.4')
          .from('.hero-3d',         { opacity: 0, scale: 0.96,  duration: 1.0, ease: 'power3.out' }, '-=1.0');
      } catch (e) {}
    })();
  }, []);

  useEffect(() => {
    let rafId = null;

    const handleMouse = (e) => {
      if (rafId) return; // skip frames, max 60fps
      rafId = requestAnimationFrame(() => {
        // dispatch a custom event LightRays can listen to
        window.dispatchEvent(new CustomEvent('hero-mouse', {
          detail: { x: e.clientX, y: e.clientY }
        }));
        rafId = null;
      });
    };

    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouse);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}