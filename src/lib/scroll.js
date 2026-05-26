const NAV_OFFSET = -96;

/** Scroll to a section — uses Lenis when available, native smooth scroll as fallback. */
export function scrollToSection(target, lenis) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, { offset: NAV_OFFSET });
    return;
  }

  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
