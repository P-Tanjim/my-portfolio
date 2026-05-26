/** Client-side performance profile for animations, Lenis, and WebGL. */
export function getPerformanceProfile() {
  if (typeof window === 'undefined') {
    return { reduceMotion: false, lowEnd: false, smoothScroll: true, loadSpline: true };
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lowEnd =
    !reduceMotion &&
    (navigator.hardwareConcurrency <= 4 ||
      (navigator.deviceMemory != null && navigator.deviceMemory <= 4));

  return {
    reduceMotion,
    lowEnd,
    smoothScroll: !reduceMotion,
    loadSpline: !reduceMotion && !lowEnd,
  };
}
