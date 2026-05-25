'use client';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const interests = ['⚽ Football', '🎮 Gaming', '🎵 Music', '📚 Learning', '🏃 Running'];

function InteractivePhotoCard() {
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  const handleMouseMove = async (e) => {
    try {
      const { gsap } = await import('gsap');
      const card = cardRef.current;
      const image = imageRef.current;
      if (!card || !image) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -15;
      const rotateY = ((x - centerX) / centerX) * 15;
      
      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        ease: 'power2.out',
        duration: 0.5
      });
      
      gsap.to(image, {
        x: (x - centerX) * 0.05,
        y: (y - centerY) * 0.05,
        ease: 'power2.out',
        duration: 0.5
      });
    } catch (err) {}
  };

  const handleMouseLeave = async () => {
    try {
      const { gsap } = await import('gsap');
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        ease: 'elastic.out(1, 0.3)',
        duration: 1
      });
      gsap.to(imageRef.current, {
        x: 0,
        y: 0,
        ease: 'elastic.out(1, 0.3)',
        duration: 1
      });
    } catch (err) {}
  };

  return (
    <div className="relative w-full aspect-[4/5] max-w-sm mx-auto" style={{ perspective: '1000px' }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(19,19,31,0.5)',
        }}
      >
        {/* Glow behind image */}
        <div 
          className="absolute inset-0 opacity-40 mix-blend-screen transition-opacity duration-500 hover:opacity-80"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(91,91,255,0.3) 0%, transparent 60%)',
            transform: 'translateZ(-50px)'
          }}
        />
        
        {/* The Photo */}
        <div
          ref={imageRef}
          className="absolute inset-5 rounded-2xl overflow-hidden"
          style={{
            transform: 'translateZ(30px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          }}
        >
          {/* You can replace this with your actual photo later! */}
          <img 
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop" 
            alt="Tanjim"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#04040a] via-transparent to-transparent opacity-80" />
        </div>

        {/* Floating badges */}
        <div 
          className="absolute bottom-12 right-10 px-4 py-2 rounded-full backdrop-blur-md"
          style={{
            background: 'rgba(91,91,255,0.15)',
            border: '1px solid rgba(91,91,255,0.3)',
            transform: 'translateZ(60px)',
          }}
        >
          <span className="text-bright font-mono text-xs flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5BFFC8] animate-pulse" />
            Developer
          </span>
        </div>
        
        <div 
          className="absolute top-12 left-10 px-3 py-1.5 rounded-full backdrop-blur-md"
          style={{
            background: 'rgba(255,91,141,0.15)',
            border: '1px solid rgba(255,91,141,0.3)',
            transform: 'translateZ(40px)',
          }}
        >
          <span className="text-bright font-mono text-[10px] uppercase tracking-wider">
            UI / UX
          </span>
        </div>
      </div>
    </div>
  );
}

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

          {/* Left: Story */}
          <div className="flex flex-col gap-8">
            <h2 className="heading-lg text-bright about-text-line">
              Crafting Digital
              <br />
              <span className="text-accent-gradient">Experiences</span>
            </h2>

            <div className="space-y-5 text-muted text-base leading-relaxed">
              <p className="about-text-line">
                My programming journey began in my childhood, sparked by the magic of creating things on a screen. 
                Today, I specialize in building <strong className="text-bright">premium, performant frontend experiences</strong> with React and Next.js.
              </p>
              <p className="about-text-line">
                I believe great software should not only be functional, but also feel delightful and human. Every pixel, animation, and interaction matters.
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
              <div className="text-sm font-bold text-muted uppercase tracking-widest mb-4">When I'm Not Coding</div>
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

          {/* Right: Interactive Photo Card */}
          <div className="flex flex-col gap-8 about-photo justify-center">
            {/* Decorative number */}
            <div
              className="absolute font-bold opacity-5 leading-none select-none -z-10 -right-10 top-0"
              style={{ fontSize: 'clamp(8rem, 20vw, 14rem)', color: 'var(--accent)' }}
            >
              01
            </div>

            <InteractivePhotoCard />

            {/* Quote */}
            <div
              className="p-6 rounded-2xl relative overflow-hidden max-w-sm mx-auto mt-4"
              style={{
                background: 'rgba(13,13,22,0.8)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div
                className="absolute top-4 left-5 text-6xl font-bold opacity-10 leading-none"
                style={{ color: 'var(--accent)' }}
              >"</div>
              <p className="relative z-10 text-muted italic text-sm leading-relaxed pl-6">
                A portfolio is the mirror of a developer. I strive to make mine reflect
                not just my skills, but my passion for creating things that truly matter.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
