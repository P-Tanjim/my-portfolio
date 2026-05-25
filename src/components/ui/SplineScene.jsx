'use client';
import { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

export function SplineScene({ scene, className }) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div
            className="relative flex items-center justify-center"
            style={{ width: 80, height: 80 }}
          >
            {/* Spinning ring loader */}
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                border: '2px solid rgba(91,91,255,0.15)',
                borderTop: '2px solid #5B5BFF',
                animation: 'spin 1s linear infinite',
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: '2px solid rgba(255,91,141,0.15)',
                borderTop: '2px solid #FF5B8D',
                animation: 'spin 0.7s linear infinite reverse',
              }}
            />
          </div>
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}
