'use client';
import { useEffect, createContext, useContext, useState } from 'react';
import { getPerformanceProfile } from '../../lib/performance';

const LenisContext = createContext(null);

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScrollProvider({ children }) {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const profile = getPerformanceProfile();
    if (!profile.smoothScroll) return;

    let instance = null;
    let ticker = null;
    let cancelled = false;

    const init = async () => {
      try {
        const [{ default: Lenis }, { gsap }] = await Promise.all([
          import('lenis'),
          import('gsap'),
        ]);

        if (cancelled) return;

        instance = new Lenis({
          lerp: profile.lowEnd ? 0.12 : 0.1,
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1.5,
          autoRaf: false,
        });

        setLenis(instance);

        ticker = () => {
          instance.raf(performance.now());
        };
        gsap.ticker.add(ticker);
      } catch (e) {
        console.warn('SmoothScroll init failed, using native scroll:', e);
      }
    };

    init();

    return () => {
      cancelled = true;

      if (ticker) {
        import('gsap').then(({ gsap }) => gsap.ticker.remove(ticker)).catch(() => {});
      }
      if (instance) {
        instance.destroy();
      }
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
