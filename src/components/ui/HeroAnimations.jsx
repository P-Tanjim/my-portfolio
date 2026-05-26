'use client';
import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { getPerformanceProfile } from '../../lib/performance';

const HERO_TARGETS =
  '.hero-tag, .hero-headline, .hero-typewriter, .hero-desc, .hero-cta, .hero-social, .hero-stats, .hero-3d';

function clearHeroWillChange() {
  document.querySelectorAll(HERO_TARGETS).forEach((el) => {
    el.style.willChange = 'auto';
  });
}

export default function HeroAnimations() {
  useLayoutEffect(() => {
    try {
      const profile = getPerformanceProfile();

      if (profile.reduceMotion || profile.lowEnd) {
        gsap.from(HERO_TARGETS, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          delay: 0.1,
          onComplete: clearHeroWillChange,
        });
        return;
      }

      const tl = gsap.timeline({
        delay: 0.25,
        onComplete: clearHeroWillChange,
      });
      tl.from('.hero-tag', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' })
        .from('.hero-headline', { opacity: 0, y: 50, duration: 0.9, ease: 'power3.out' }, '-=0.3')
        .from('.hero-typewriter', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .from('.hero-desc', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .from('.hero-cta', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out', stagger: 0.12 }, '-=0.3')
        .from('.hero-social', { opacity: 0, x: -16, duration: 0.5, ease: 'power3.out', stagger: 0.07 }, '-=0.4')
        .from('.hero-stats', { opacity: 0, y: 16, duration: 0.5, ease: 'power3.out' }, '-=0.4')
        .from('.hero-3d', { opacity: 0, scale: 0.96, duration: 1.0, ease: 'power3.out' }, '-=1.0');
    } catch {
      clearHeroWillChange();
    }
  }, []);

  return null;
}
