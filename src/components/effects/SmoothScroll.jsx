'use client';
import { useEffect, createContext, useContext, useRef } from 'react';

const LenisContext = createContext(null);

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    let lenis = null;
    let ticker = null;

    const init = async () => {
      try {
        const [{ default: Lenis }, { gsap }] = await Promise.all([
          import('lenis'),
          import('gsap'),
        ]);

        lenis = new Lenis({
          duration: 1.1,           // was 1.4 — less interpolation work per frame
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        // ── Key fix: share GSAP's ticker instead of running a separate RAF loop ──
        // GSAP is already running a RAF for hero animations.
        // Lenis subscribing to it means ONE combined RAF, not two competing ones.
        gsap.ticker.lagSmoothing(0); // don't skip frames under load
        ticker = gsap.ticker.add((time) => {
          lenis.raf(time * 1000); // GSAP time is in seconds, Lenis needs ms
        });
      } catch (e) {
        console.warn('SmoothScroll init failed, using native scroll:', e);
      }
    };

    init();

    return () => {
      if (ticker) {
        import('gsap').then(({ gsap }) => gsap.ticker.remove(ticker)).catch(() => {});
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  );
}
