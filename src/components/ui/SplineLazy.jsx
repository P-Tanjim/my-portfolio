'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useInView } from '../../hooks/useInView';

const SplineScene = dynamic(
  () => import('./SplineScene').then(m => ({ default: m.SplineScene })),
  { ssr: false, loading: () => <SplineSkeleton /> }
);

function SplineSkeleton() {
  return (
    <div
      className="w-full h-full rounded-2xl"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(91,91,255,0.08) 0%, transparent 70%)',
        animation: 'pulse 2s ease-in-out infinite',
      }}
    />
  );
}

export default function SplineLazy({ scene, className }) {
  const [ref, inView] = useInView();
  // Delay mounting by 200ms after visible — lets GSAP animations finish first
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (!inView || shouldMount) return;
    const t = setTimeout(() => setShouldMount(true), 200);
    return () => clearTimeout(t);
  }, [inView, shouldMount]);

  return (
    <div ref={ref} className="w-full h-full">
      {shouldMount
        ? <SplineScene scene={scene} className={className} />
        : <SplineSkeleton />
      }
    </div>
  );
}
