import TypewriterText from '../ui/TypewriterText';
import HeroAnimations from '../ui/HeroAnimations';

import SplineLazy from '../ui/SplineLazy';

const titles = ['Frontend Developer', 'React Specialist', 'UI Craftsman', 'Next.js Engineer'];

// Pure server-renderable — hover is all CSS via Tailwind `group-hover`
function SocialLink({ href, label, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group relative w-10 h-10 flex hover:cursor-none items-center justify-center rounded-full transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <span
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'rgba(91,91,255,0.18)', boxShadow: '0 0 18px rgba(91,91,255,0.35)' }}
      />
      <span className="relative text-muted group-hover:text-bright transition-colors duration-300 text-sm font-mono">
        {icon}
      </span>
    </a>
  );
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#000000' }}
    >
      {/* Renders null — just fires GSAP timeline after hydration */}
      <HeroAnimations />

      {/* Lightweight static glow (replaces WebGL light rays) */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 90% 55% at 50% -15%, rgba(91,91,255,0.14) 0%, transparent 65%)',
        }}
      />

      {/* Fine grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(91,91,255,0.025) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(91,91,255,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, #04040a 100%)',
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, #04040a, transparent)' }}
      />

      {/* ══ CONTENT ══ */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4 min-h-[80vh]">

          {/* LEFT */}
          <div className="flex flex-col gap-7 ml-10 w-full lg:w-[30%] z-20 self-start mt-20 pointer-events-none">
            <div className="hero-tag">
              <span className="tag-pill">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-3 animate-pulse" />
                Available for work
              </span>
            </div>

            <div className="hero-headline">
              <h1
                className="text-bright leading-[0.92]"
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                }}
              >
                Hi, I&apos;m
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #5B5BFF 0%, #FF5B8D 55%, #5BFFC8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Tanjim
                </span>
              </h1>
            </div>

            <div
              className="hero-typewriter text-lg md:text-xl font-mono min-h-[2rem]"
              style={{ color: 'var(--muted)' }}
            >
              <TypewriterText texts={titles} />
            </div>
          </div>

          {/* MIDDLE: Spline */}
          <div
            className="hero-3d absolute w-full flex items-center justify-center z-10"
            style={{ height: 600 }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <SplineLazy
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(4,4,10,0.95), transparent)' }}
              />
            </div>

            
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-7 w-full lg:w-[30%] z-20 lg:mt-32 pointer-events-none">
            <p
              className="hero-desc leading-relaxed text-sm md:text-base pointer-events-none"
              style={{ color: 'rgba(232,232,255,0.5)' }}
            >
              I craft premium digital experiences with cutting-edge technologies —
              turning complex ideas into smooth, beautiful, and performant web applications.
            </p>

            <div className="hero-social flex flex-wrap hover:cursor-none items-center gap-2.5 pointer-events-auto">
              <SocialLink href="https://github.com/P-tanjim" label="GitHub"   icon="</>" />
              <SocialLink href="https://www.linkedin.com/in/moksedur/"                            label="LinkedIn" icon="in" />
              <SocialLink href="https://mail.google.com/mail/?view=cm&fs=1&to=moksedurtanjim27@gmail.com&su=Portfolio%20Contact&body=Hello%20Tanjim,"                            label="Gmail"  icon="✉" />
              <SocialLink href="https://www.facebook.com/moksedur.rahman.tanjim"                            label="Facebook" icon="f" />
              <div className="w-px h-5 bg-border mx-1 hidden xl:block" />
              {/* onMouseOver/Out removed — Tailwind v4 CSS var hover works fine */}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=moksedurtanjim27@gmail.com&su=Portfolio%20Contact&body=Hello%20Tanjim,"
                className="text-xs font-mono text-[var(--muted)] hover:cursor-none hover:text-[var(--bright)] transition-colors duration-300"
              >
                hello@tanjim.dev
              </a>
            </div>

            <div
              className="hero-stats grid grid-cols-2 gap-4 pt-5 pointer-events-none"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              {[
                { num: '15+',  label: 'Projects' },
                { num: '2+',   label: 'Years Coding' },
                { num: '100%', label: 'Dedication' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-bright" style={{ fontFamily: 'Space Mono' }}>
                    {stat.num}
                  </div>
                  <div className="text-xs text-muted uppercase tracking-widest mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-muted text-xs font-mono tracking-widest uppercase" style={{ fontSize: 10 }}>
          Scroll
        </span>
        <div
          className="w-px h-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(91,91,255,0.6), transparent)',
            animation: 'float 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  );
}