'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { getPerformanceProfile } from '../../lib/performance';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const isHovering = useRef(false);

  useEffect(() => {
    const profile = getPerformanceProfile();
    if (profile.reduceMotion || window.matchMedia('(max-width: 768px)').matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const moveDot = (clientX, clientY) => {
      mouseX.current = clientX;
      mouseY.current = clientY;
      dot.style.transform = `translate(calc(${clientX}px - 50%), calc(${clientY}px - 50%))`;
    };

    const hasRawUpdate = 'onpointerrawupdate' in window;

    const onRawUpdate = (e) => moveDot(e.clientX, e.clientY);
    const onMouseMove = (e) => {
      if (hasRawUpdate) {
        mouseX.current = e.clientX;
        mouseY.current = e.clientY;
      } else {
        moveDot(e.clientX, e.clientY);
      }
    };

    if (hasRawUpdate) {
      window.addEventListener('pointerrawupdate', onRawUpdate, { passive: true });
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const animateRing = () => {
      ringX.current += (mouseX.current - ringX.current) * 0.25;
      ringY.current += (mouseY.current - ringY.current) * 0.25;
      ring.style.transform = `translate(calc(${ringX.current}px - 50%), calc(${ringY.current}px - 50%))`;
    };

    const handleOver = (e) => {
      if (!isHovering.current && e.target.closest('a, button, [data-cursor-hover]')) {
        isHovering.current = true;
        dot.classList.add('hovering');
        ring.classList.add('hovering');
      }
    };
    const handleOut = (e) => {
      const t = e.target.closest('a, button, [data-cursor-hover]');
      if (t && isHovering.current && !t.contains(e.relatedTarget)) {
        isHovering.current = false;
        dot.classList.remove('hovering');
        ring.classList.remove('hovering');
      }
    };
    const handleDown = () => dot.classList.add('clicking');
    const handleUp = () => dot.classList.remove('clicking');

    document.addEventListener('mouseover', handleOver, { passive: true });
    document.addEventListener('mouseout', handleOut, { passive: true });
    window.addEventListener('mousedown', handleDown, { passive: true });
    window.addEventListener('mouseup', handleUp, { passive: true });

    gsap.ticker.add(animateRing);

    return () => {
      if (hasRawUpdate) window.removeEventListener('pointerrawupdate', onRawUpdate);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      gsap.ticker.remove(animateRing);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
