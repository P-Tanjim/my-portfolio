'use client';
import dynamic from 'next/dynamic';
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
  return (
    <div ref={ref} className="w-full h-full">
      {inView
        ? <SplineScene scene={scene} className={className} />
        : <SplineSkeleton />
      }
    </div>
  );
}
