'use client';
import { useRef, useEffect, useCallback, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const skillCategories = [
  {
    category: 'Frontend',
    color: '#5B5BFF',
    skills: [
      { name: 'HTML5', level: 95, icon: '🌐' },
      { name: 'CSS3', level: 92, icon: '🎨' },
      { name: 'JavaScript', level: 88, icon: '⚡' },
      { name: 'React', level: 90, icon: '⚛️' },
      { name: 'Next.js', level: 85, icon: '▲' },
      { name: 'Tailwind', level: 92, icon: '💨' },
    ],
  },
  {
    category: 'Backend & DB',
    color: '#FF5B8D',
    skills: [
      { name: 'MongoDB', level: 78, icon: '🍃' },
      { name: 'BetterAuth', level: 75, icon: '🔐' },
      { name: 'Node.js', level: 72, icon: '🟢' },
    ],
  },
  {
    category: 'Animation',
    color: '#5BFFC8',
    skills: [
      { name: 'GSAP', level: 85, icon: '🌀' },
      { name: 'Framer Motion', level: 82, icon: '🎭' },
    ],
  },
  {
    category: 'UI Libraries',
    color: '#FFB55B',
    skills: [
      { name: 'Daisy UI', level: 88, icon: '🌸' },
      { name: 'Hero UI', level: 84, icon: '🦸' },
    ],
  },
  {
    category: 'Tools & Deploy',
    color: '#A855F7',
    skills: [
      { name: 'Git', level: 90, icon: '📦' },
      { name: 'Vercel', level: 88, icon: '▲' },
      { name: 'Netlify', level: 85, icon: '🌐' },
    ],
  },
];

const allSkills = skillCategories.flatMap(cat =>
  cat.skills.map(s => ({ ...s, category: cat.category, color: cat.color }))
);

// Bento card with particle + spotlight effects
function SkillBentoCard({ skill, index }) {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const isHoveredRef = useRef(false);
  const timeoutsRef = useRef([]);
  const glowColor = skill.color.replace('#', '');
  const toRgb = (hex) => {
    const h = hex.replace('#', '');
    return `${parseInt(h.slice(0,2),16)}, ${parseInt(h.slice(2,4),16)}, ${parseInt(h.slice(4,6),16)}`;
  };
  const rgbColor = toRgb(skill.color);

  const clearParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    particlesRef.current.forEach(p => p.parentNode?.removeChild(p));
    particlesRef.current = [];
  }, []);

  const spawnParticles = useCallback(async () => {
    if (!cardRef.current) return;
    try {
      const { gsap } = await import('gsap');
      const { width, height } = cardRef.current.getBoundingClientRect();
      for (let i = 0; i < 6; i++) {
        const tid = setTimeout(() => {
          if (!isHoveredRef.current || !cardRef.current) return;
          const el = document.createElement('div');
          el.style.cssText = `
            position:absolute; width:4px; height:4px; border-radius:50%;
            background:rgba(${rgbColor},1); box-shadow:0 0 8px rgba(${rgbColor},0.8);
            pointer-events:none; z-index:20;
            left:${Math.random() * width}px; top:${Math.random() * height}px;
          `;
          cardRef.current.appendChild(el);
          particlesRef.current.push(el);
          gsap.fromTo(el, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
          gsap.to(el, {
            x: (Math.random() - 0.5) * 80,
            y: (Math.random() - 0.5) * 80,
            rotation: Math.random() * 360,
            duration: 2 + Math.random() * 2,
            ease: 'none',
            repeat: -1,
            yoyo: true,
          });
        }, i * 80);
        timeoutsRef.current.push(tid);
      }
    } catch (e) {}
  }, [rgbColor]);

  const handleMouseEnter = useCallback(async (e) => {
    isHoveredRef.current = true;
    spawnParticles();
    try {
      const { gsap } = await import('gsap');
      gsap.to(cardRef.current, { scale: 1.02, duration: 0.3, ease: 'power2.out' });
    } catch (err) {}
  }, [spawnParticles]);

  const handleMouseLeave = useCallback(async () => {
    isHoveredRef.current = false;
    clearParticles();
    try {
      const { gsap } = await import('gsap');
      gsap.to(cardRef.current, { scale: 1, x: 0, y: 0, duration: 0.4, ease: 'power2.out' });
    } catch (err) {}
  }, [clearParticles]);

  const handleMouseMove = useCallback(async (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const relX = (x / rect.width) * 100;
    const relY = (y / rect.height) * 100;
    cardRef.current.style.setProperty('--glow-x', `${relX}%`);
    cardRef.current.style.setProperty('--glow-y', `${relY}%`);
    try {
      const { gsap } = await import('gsap');
      const mx = (x - rect.width / 2) * 0.05;
      const my = (y - rect.height / 2) * 0.05;
      gsap.to(cardRef.current, { x: mx, y: my, duration: 0.2, ease: 'power2.out' });
    } catch (err) {}
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    card.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    card.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    card.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mousemove', handleMouseMove);
      clearParticles();
    };
  }, [handleMouseEnter, handleMouseLeave, handleMouseMove, clearParticles]);

  return (
    <div
      ref={cardRef}
      className="relative p-5 rounded-2xl overflow-hidden cursor-default transition-all duration-300"
      style={{
        background: 'rgba(19,19,31,0.9)',
        border: `1px solid rgba(255,255,255,0.06)`,
        '--glow-x': '50%',
        '--glow-y': '50%',
        willChange: 'transform',
        animationDelay: `${index * 0.05}s`,
      }}
    >
      {/* Border glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          padding: '1px',
          background: `radial-gradient(circle at var(--glow-x) var(--glow-y), ${skill.color}66 0%, transparent 60%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-xl"
              style={{ background: `${skill.color}18` }}
            >
              {skill.icon}
            </div>
            <div>
              <div className="font-bold text-bright text-sm">{skill.name}</div>
              <div className="text-xs" style={{ color: skill.color }}>{skill.category}</div>
            </div>
          </div>
          <div className="text-sm font-bold" style={{ color: skill.color }}>{skill.level}%</div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${skill.level}%`,
              background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
              boxShadow: `0 0 8px ${skill.color}66`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [animateSkills, setAnimateSkills] = useState(false);

  useEffect(() => {
    if (inView) {
      setTimeout(() => setAnimateSkills(true), 400);
    }
  }, [inView]);

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-32 overflow-hidden"
      style={{ background: 'var(--ink)' }}
    >
      {/* Hex pattern */}
      <div className="absolute inset-0 section-hex opacity-80" />

      {/* Decorative orb */}
      <div
        className="absolute top-1/2 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(91,91,255,0.08) 0%, transparent 70%)',
          transform: 'translateY(-50%) translateX(30%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="section-label mb-4">Skills</div>
            <h2 className="heading-lg text-bright">
              Tools I Master
              <br />
              <span className="text-accent-gradient">& Love</span>
            </h2>
          </div>
          <p className="text-muted max-w-sm text-sm leading-relaxed">
            Each skill here represents hours of real project work, not just tutorials.
            Hover to see them come alive.
          </p>
        </div>

        {/* Category tabs (visual only) */}
        <div className="flex flex-wrap gap-2 mb-10">
          {skillCategories.map((cat) => (
            <div
              key={cat.category}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium"
              style={{
                background: `${cat.color}12`,
                border: `1px solid ${cat.color}30`,
                color: cat.color,
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: cat.color }} />
              {cat.category}
            </div>
          ))}
        </div>

        {/* Skills bento grid */}
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          }}
        >
          {allSkills.map((skill, idx) => (
            <div
              key={skill.name}
              style={{
                opacity: animateSkills ? 1 : 0,
                transform: animateSkills ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.5s ease ${idx * 0.04}s, transform 0.5s ease ${idx * 0.04}s`,
              }}
            >
              <SkillBentoCard skill={skill} index={idx} />
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-16 text-center">
          <p className="text-muted text-sm">
            Always learning • Currently exploring{' '}
            <span className="text-accent font-medium">Three.js</span> &{' '}
            <span className="text-accent-2 font-medium">WebGL</span>
          </p>
        </div>
      </div>
    </section>
  );
}
