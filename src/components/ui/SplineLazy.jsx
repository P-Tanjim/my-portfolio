'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { getPerformanceProfile } from '../../lib/performance';

const SplineScene = dynamic(
  () => import('./SplineScene').then((m) => ({ default: m.SplineScene })),
  { ssr: false, loading: () => <SplineSkeleton /> }
);

function SplineSkeleton() {
  return (
    <div
      className="w-full h-full rounded-2xl"
      style={{
        background:
          'radial-gradient(ellipse at center, rgba(91,91,255,0.12) 0%, transparent 70%)',
      }}
    />
  );
}

function SplineFallback() {
  return (
    <div
      className="w-full h-full rounded-2xl"
      aria-hidden
      style={{
        background:
          'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(91,91,255,0.2) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 70% 60%, rgba(255,91,141,0.08) 0%, transparent 60%)',
      }}
    />
  );
}

export default function SplineLazy({ scene, className }) {
  const [ref, inView] = useInView();
  const [shouldMount, setShouldMount] = useState(false);
  const [loadSpline] = useState(() => getPerformanceProfile().loadSpline);

  useEffect(() => {
    if (!loadSpline || !inView || shouldMount) return;
    const t = setTimeout(() => setShouldMount(true), 400);
    return () => clearTimeout(t);
  }, [inView, shouldMount, loadSpline]);

  return (
    <div ref={ref} className="spline-host w-full h-full">
      {!loadSpline ? (
        <SplineFallback />
      ) : shouldMount ? (
        <SplineScene scene={scene} className={className} />
      ) : (
        <SplineSkeleton />
      )}
    </div>
  );
}
