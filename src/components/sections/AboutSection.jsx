'use client';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import ProfileCard from '../ui/ProfileCard'; // adjust path if needed

const interests = ['⚽ Football', '🎮 Gaming', '🎵 Music', '📚 Learning', '🏃 Running'];

export default function AboutSection() {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (!inView) return;
    const initAnim = async () => {
      try {
        const { gsap } = await import('gsap');
        gsap.from('.about-text-line', {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        });
        gsap.from('.about-photo', {
          opacity: 0,
          scale: 0.9,
          rotationY: 15,
          duration: 1,
          ease: 'power3.out',
          delay: 0.2,
        });
      } catch (e) {}
    };
    initAnim();
  }, [inView]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: 'var(--surface)' }}
    >
      {/* Circuit board pattern */}
      <div className="absolute inset-0 section-circuit" />

      {/* Left accent line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(91,91,255,0.4), transparent)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section label */}
        <div className="section-label mb-6 about-text-line">About Me</div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* ── Left: Story ── */}
          <div className="flex flex-col gap-8">
            <h2 className="heading-lg text-bright about-text-line">
              Crafting Digital
              <br />
              <span className="text-accent-gradient">Experiences</span>
            </h2>

            <div className="space-y-5 text-muted text-base leading-relaxed">
              <p className="about-text-line">
                My programming journey began in my childhood, sparked by the magic of creating things on a screen.
                Today, I specialize in building{' '}
                <strong className="text-bright">premium, performant frontend experiences</strong> with React and Next.js.
              </p>
              <p className="about-text-line">
                I believe great software should not only be functional, but also feel delightful and human.
                Every pixel, animation, and interaction matters.
              </p>
            </div>

            {/* Quick facts */}
            <div
              className="about-text-line p-6 rounded-2xl"
              style={{
                background: 'rgba(91,91,255,0.06)',
                border: '1px solid rgba(91,91,255,0.15)',
              }}
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Location', value: 'Bangladesh 🇧🇩' },
                  { label: 'Focus', value: 'Frontend & UI' },
                  { label: 'Experience', value: '2+ Years' },
                  { label: 'Status', value: 'Open to Work ✓' },
                ].map((fact) => (
                  <div key={fact.label}>
                    <div className="text-xs text-muted uppercase tracking-widest mb-1">{fact.label}</div>
                    <div className="text-sm font-medium text-bright">{fact.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="about-text-line">
              <div className="text-sm font-bold text-muted uppercase tracking-widest mb-4">
                When I'm Not Coding
              </div>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:border-accent hover:text-bright cursor-default"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      color: 'var(--muted)',
                    }}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: ProfileCard ── */}
          <div className="flex flex-col gap-8 about-photo items-center justify-center relative">

            {/* Decorative number */}
            <div
              className="absolute font-bold opacity-5 leading-none select-none -z-10 -right-10 top-0 pointer-events-none"
              style={{ fontSize: 'clamp(8rem, 20vw, 14rem)', color: 'var(--accent)' }}
            >
              01
            </div>

            <ProfileCard
              name="Tanjim"
              title="Frontend Developer"
              handle="P-tanjim"
              status="Open to Work ✨"
              contactText="Contact Me"
              // ↓ Replace with your actual photo. Use a portrait shot cropped to ~4:5 ratio.
              avatarUrl="https://images.unsplash.com/photo-1615109398623-88346a601842?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              behindGlowEnabled={true}
              // ↓ Matches your portfolio's --accent purple
              behindGlowColor="rgba(91, 91, 255, 0.55)"
              behindGlowSize="55%"
              // ↓ Purple → teal gradient matching your theme
              innerGradient="linear-gradient(145deg, rgba(91,91,255,0.22) 0%, rgba(91,255,200,0.10) 100%)"
              onContactClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Quote */}
            <div
              className="p-6 rounded-2xl relative overflow-hidden max-w-sm w-full"
              style={{
                background: 'rgba(13,13,22,0.8)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div
                className="absolute top-4 left-5 text-6xl font-bold opacity-10 leading-none"
                style={{ color: 'var(--accent)' }}
              >
                "
              </div>
              <p className="relative z-10 text-muted italic text-sm leading-relaxed pl-6">
                A portfolio is the mirror of a developer. I strive to make mine reflect not just
                my skills, but my passion for creating things that truly matter.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}