'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  // Raw mouse position — updated synchronously on every move
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  // Ring's current smoothed position
  const ringX = useRef(0);
  const ringY = useRef(0);
  const rafRef = useRef(null);
  const isHovering = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // ── Dot: move instantly via transform (compositor thread, zero reflow) ──
    const handleMouseMove = (e) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      // Dot follows instantly — no RAF needed, transform is compositor-only
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    // ── Ring: smoothly lagged via RAF, also compositor-only ──
    const animateRing = () => {
      // 0.25 = ring reaches 99% of target in ~140ms at 60fps (was 0.12 = ~600ms)
      const ease = 0.25;
      ringX.current += (mouseX.current - ringX.current) * ease;
      ringY.current += (mouseY.current - ringY.current) * ease;
      ring.style.transform = `translate(${ringX.current}px, ${ringY.current}px)`;
      rafRef.current = requestAnimationFrame(animateRing);
    };

    // ── Hover states: event delegation — one listener, no DOM scanning ──
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor-hover]');
      if (target && !isHovering.current) {
        isHovering.current = true;
        dot.classList.add('hovering');
        ring.classList.add('hovering');
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, [data-cursor-hover]');
      if (target && isHovering.current) {
        // Only clear if we're not moving to a child of the same element
        if (!target.contains(e.relatedTarget)) {
          isHovering.current = false;
          dot.classList.remove('hovering');
          ring.classList.remove('hovering');
        }
      }
    };

    const handleMouseDown = () => dot.classList.add('clicking');
    const handleMouseUp = () => dot.classList.remove('clicking');

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    rafRef.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
